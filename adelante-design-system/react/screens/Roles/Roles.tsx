import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Button } from "../../Button/Button";
import { OptionsExtra, FormField, OptionLabel } from "../../Form/Form";
import { Icon } from "../../Icon/Icon";
import { SelectionDropdown } from "../../SelectionDropdown/SelectionDropdown";
import { TabsMenu, TabFilterChip } from "../../TabsMenu/TabsMenu";
import { springs } from "../../springs";
import "./Roles.css";

/* ============================================================
 * H4 — Roles & Permisos (desktop prototype, r01–r06)
 *
 *  r01  sidebar EXPANDED · view mode
 *  r02  sidebar COLLAPSED · view mode (edit btn → "Editar")
 *  r03  sidebar COLLAPSED · view mode · category dropdown OPEN
 *  r04  sidebar COLLAPSED · EDIT mode (administrar/ver/editar pills + X
 *                                     delete con hover "Eliminar")
 *  r05  sidebar COLLAPSED · view mode · ADD-permiso modal abierto
 *  r06  sidebar COLLAPSED · view mode · ADD-rol popover abierto
 *       (anclado bajo el botón + del topbar, sin scrim, chevron-down
 *        para cerrar; FormField "Nombre del rol" + SelectionDropdown
 *        "Categoría" + Cancelar/Agregar)
 *
 *  DS components: Button, OptionsExtra, FormField, OptionLabel, Icon,
 *  SelectionDropdown, TabsMenu, TabFilterChip.
 *
 *  NOT-IN-DS: pill compacta `SmallPill` (28 px) usada para badges
 *  (CAMPO) y selectors de acción (administrar/ver/editar).
 *  Promotion candidate.
 * ============================================================ */

// ── Tipos ────────────────────────────────────────────────────

type Category = "CAMPO" | "OFICINA" | "LOGÍSTICA" | "GERENCIA";
type ActionScope = "administrar" | "ver" | "editar";

interface RoleItem {
  id: string;
  label: string;       // "Fundaciones" | "Muros" | …
  groupLabel: string;  // "ENCARGADO" | "MAESTRO DE OBRA"
  fullName: string;    // "Encargado de muros"
}

interface RoleGroup {
  title: string;
  items: RoleItem[];
}

interface Permission {
  id: string;
  label: string;
  enabled: boolean;
  scopes: ActionScope[];              // acciones activas (multi-select edit mode)
  availableActions: ActionScope[];    // pills mostradas en view mode
}

// ── Seed data ────────────────────────────────────────────────

const ROLE_GROUPS: RoleGroup[] = [
  {
    title: "ENCARGADO",
    items: [
      { id: "enc-fnd", label: "Fundaciones", groupLabel: "ENCARGADO", fullName: "Encargado de fundaciones" },
      { id: "enc-mur", label: "Muros",       groupLabel: "ENCARGADO", fullName: "Encargado de muros" },
    ],
  },
  {
    title: "MAESTRO DE OBRA",
    items: [
      { id: "mae-fnd", label: "Fundaciones", groupLabel: "MAESTRO DE OBRA", fullName: "Maestro de obra · fundaciones" },
      { id: "mae-mur", label: "Muros",       groupLabel: "MAESTRO DE OBRA", fullName: "Maestro de obra · muros" },
    ],
  },
];

const MOCK_PERMS: Permission[] = [
  { id: "p-01", label: "Registros de campo",    enabled: false, scopes: ["ver"],          availableActions: ["ver", "editar"] },
  { id: "p-02", label: "Aprobar pedidos",       enabled: true,  scopes: ["editar"],       availableActions: ["editar"] },
  { id: "p-03", label: "Hacer pedidos",         enabled: true,  scopes: ["editar"],       availableActions: ["editar"] },
  { id: "p-04", label: "Cerrar reporte diario", enabled: true,  scopes: ["editar"],       availableActions: ["editar"] },
  { id: "p-05", label: "Asignar cuadrillas",    enabled: true,  scopes: ["administrar"],  availableActions: ["editar"] },
  { id: "p-06", label: "Solicitar materiales",  enabled: true,  scopes: ["editar"],       availableActions: ["editar"] },
  { id: "p-07", label: "Aprobar traslados",     enabled: true,  scopes: ["editar"],       availableActions: ["editar"] },
  { id: "p-08", label: "Editar plantillas",     enabled: true,  scopes: ["editar"],       availableActions: ["editar"] },
  { id: "p-09", label: "Ver historial de obra", enabled: true,  scopes: ["editar"],       availableActions: ["editar"] },
];

const CATEGORIES: Category[] = ["CAMPO", "OFICINA", "LOGÍSTICA", "GERENCIA"];
const SCOPES: ActionScope[] = ["administrar", "ver", "editar"];

// ── NOT-IN-DS: small pill (badge + selector) ──

type SmallPillTone = "standard" | "active";
interface SmallPillProps {
  label: string;
  tone?: SmallPillTone;
  onClick?: () => void;
}
function SmallPill({ label, tone = "standard", onClick }: SmallPillProps) {
  return (
    <button
      type="button"
      className={`roles-pill roles-pill--${tone}${onClick ? " roles-pill--clickable" : ""}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

// ── NOT-IN-DS: group header pill (large rounded black) ──

function GroupHeaderPill({ label }: { label: string }) {
  return <span className="roles-grouphead">{label}</span>;
}

// ── Hover tooltip ──

interface HoverHintProps { label: string; show: boolean; }
function HoverHint({ label, show }: HoverHintProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.span
          className="roles-hint"
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 4 }}
          transition={springs.snappy}
        >
          {label}
        </motion.span>
      )}
    </AnimatePresence>
  );
}

// ── Add-role morph (+ button → green bar → white popover) ───
//
//  Imita el flujo U02 → U03 → U04 del Figma de Usuarios: el botón
//  `+` se expande horizontalmente formando una barra verde y luego
//  esa barra se transforma en el popover blanco con el formulario.

type AddRoleStage = "closed" | "bar" | "open";
interface AddRoleMorphProps {
  stage: AddRoleStage;
  ddOpen: boolean;
  setDdOpen: (v: boolean) => void;
  onOpen:   () => void;
  onClose:  () => void;
  onSubmit: (name: string, category: Category) => void;
}
function AddRoleMorph({ stage, ddOpen, setDdOpen, onOpen, onClose, onSubmit }: AddRoleMorphProps) {
  // Animación de apertura: 56 → 80 → 380. Una vez en `open`, si el
  // dropdown interno se abre, crece hacia 720 para que las 4 opciones
  // + botones se vean sin scroll (fiel a Figma).
  const openHeight = ddOpen ? 720 : 380;
  const dims = {
    closed: { width: 56,  height: 56,         borderRadius: 16 },
    bar:    { width: 440, height: 80,         borderRadius: 24 },
    open:   { width: 440, height: openHeight, borderRadius: 32 },
  } as const;

  const isClosed = stage === "closed";
  const isOpen   = stage === "open";

  return (
    <div className="roles-add-role-wrap">
      <motion.div
        className={`roles-add-role-morph roles-add-role-morph--${stage}`}
        initial={false}
        animate={{
          ...dims[stage],
          backgroundColor: isOpen ? "#ffffff" : "var(--ds-color-green-100)",
        }}
        transition={springs.expanding}
        role={isOpen ? "dialog" : undefined}
        aria-label={isOpen ? "Agregar rol" : undefined}
        onClick={isClosed ? onOpen : undefined}
        style={{ cursor: isClosed ? "pointer" : "default" }}
      >
        <AnimatePresence mode="wait">
          {!isOpen && (
            <motion.div
              key="plus"
              className="roles-add-role-morph__plus"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.12 }}
            >
              <Icon name="plus" size="md" />
            </motion.div>
          )}
          {isOpen && (
            <motion.div
              key="form"
              className="roles-add-role-morph__form"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.18, delay: 0.08 }}
            >
              <AddRoleForm
                ddOpen={ddOpen}
                setDdOpen={setDdOpen}
                onClose={onClose}
                onSubmit={onSubmit}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

// ── Add-permission morph (CTA → bar → popover) ──────────────
//
//  Mismo flujo que AddRoleMorph pero anclado a la esquina inferior
//  derecha del detail card. La barra crece hacia ARRIBA porque el
//  espacio bajo el card está fuera del shell.

interface AddPermissionMorphProps {
  stage: AddRoleStage;
  onOpen:   () => void;
  onClose:  () => void;
  onSubmit: (label: string, scope: ActionScope) => void;
}
function AddPermissionMorph({ stage, onOpen, onClose, onSubmit }: AddPermissionMorphProps) {
  const dims = {
    closed: { width: 220, height: 56,  borderRadius: 16 },
    bar:    { width: 440, height: 80,  borderRadius: 24 },
    open:   { width: 440, height: 400, borderRadius: 32 },
  } as const;

  const isClosed = stage === "closed";
  const isOpen   = stage === "open";

  return (
    <div className="roles-add-perm-wrap">
      <motion.div
        className={`roles-add-perm-morph roles-add-perm-morph--${stage}`}
        initial={false}
        animate={{
          ...dims[stage],
          backgroundColor: isOpen ? "#ffffff" : "var(--ds-color-green-100)",
        }}
        transition={springs.expanding}
        role={isOpen ? "dialog" : undefined}
        aria-label={isOpen ? "Agregar permisos" : undefined}
        onClick={isClosed ? onOpen : undefined}
        style={{ cursor: isClosed ? "pointer" : "default" }}
      >
        <AnimatePresence mode="wait">
          {isClosed && (
            <motion.div
              key="cta"
              className="roles-add-perm-morph__cta"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.12 }}
            >
              <span className="roles-add-perm-morph__label">Agregar permisos</span>
              <Icon name="list" size="md" />
            </motion.div>
          )}
          {stage === "bar" && (
            <motion.div
              key="bar"
              className="roles-add-perm-morph__cta"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.12 }}
            >
              <Icon name="list" size="md" />
            </motion.div>
          )}
          {isOpen && (
            <motion.div
              key="form"
              className="roles-add-perm-morph__form"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.18, delay: 0.08 }}
            >
              <AddPermissionForm onClose={onClose} onSubmit={onSubmit} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

// ── Componente principal ─────────────────────────────────────

interface RolesProps {
  initialCollapsed?: boolean;
}

export function Roles({ initialCollapsed = false }: RolesProps = {}) {
  const [sidebarExpanded, setSidebarExpanded] = useState(!initialCollapsed);
  const [dropdownOpen, setDropdownOpen]       = useState(false);
  const [editMode, setEditMode]               = useState(false);
  const [addPermStage, setAddPermStage]       = useState<"closed" | "bar" | "open">("closed");
  const [addRoleStage, setAddRoleStage]       = useState<"closed" | "bar" | "open">("closed");
  const [addRoleDdOpen, setAddRoleDdOpen]     = useState(false);

  const [category, setCategory]   = useState<Category>("CAMPO");
  const [selectedRoleId, setRoleId] = useState<string>("enc-mur");
  const [perms, setPerms]         = useState<Permission[]>(MOCK_PERMS);
  const [draft, setDraft]         = useState<Permission[]>(MOCK_PERMS);

  const [hoverEdit, setHoverEdit]     = useState(false);
  const [hoverDelete, setHoverDelete] = useState<string | null>(null);

  const allRoles = ROLE_GROUPS.flatMap((g) => g.items);
  const selectedRole = allRoles.find((r) => r.id === selectedRoleId) ?? allRoles[1];

  const enterEdit = () => { setDraft(perms); setEditMode(true); };
  const saveEdit  = () => { setPerms(draft); setEditMode(false); };

  const togglePerm = (id: string) => {
    const upd = (d: Permission[]) =>
      d.map((p) => (p.id === id ? { ...p, enabled: !p.enabled } : p));
    if (editMode) setDraft(upd); else setPerms(upd);
  };
  const toggleScope = (id: string, s: ActionScope) =>
    setDraft((d) => d.map((p) => {
      if (p.id !== id) return p;
      const next = p.scopes.includes(s)
        ? p.scopes.filter((x) => x !== s)
        : [...p.scopes, s];
      return { ...p, scopes: next };
    }));
  const deletePerm = (id: string) =>
    setDraft((d) => d.filter((p) => p.id !== id));

  const closeAddPerm = () => {
    setAddPermStage("bar");
    setTimeout(() => setAddPermStage("closed"), 220);
  };
  const openAddPerm = () => {
    setAddPermStage("bar");
    setTimeout(() => setAddPermStage("open"), 220);
  };
  const addPermission = (label: string, scope: ActionScope) => {
    const id = `p-${String(perms.length + 1).padStart(2, "0")}`;
    setPerms((d) => [...d, { id, label, enabled: true, scopes: [scope], availableActions: [scope] }]);
    closeAddPerm();
  };

  const rows = editMode ? draft : perms;

  return (
    <div className="roles-shell">
      {/* ── Sidebar ─────────────────────────────────────────── */}
      <motion.aside
        className={`roles-sidebar roles-sidebar--${sidebarExpanded ? "expanded" : "collapsed"}`}
        initial={false}
        animate={{ width: sidebarExpanded ? 320 : 80 }}
        // Secuencia: al colapsar los tabs cierran primero (380ms), luego
        // el sidebar se angosta. Al expandir el sidebar crece primero
        // y los tabs se abren después.
        transition={{ ...springs.expanding, delay: sidebarExpanded ? 0 : 0.5 }}
      >
        <motion.button
          type="button"
          className="roles-sidebar__menu"
          onClick={() => setSidebarExpanded((v) => !v)}
          aria-label={sidebarExpanded ? "Colapsar menú" : "Expandir menú"}
          animate={{ rotate: sidebarExpanded ? 0 : 90 }}
          transition={springs.snappy}
        >
          <Icon name="menu" size="md" />
        </motion.button>

        <div className="roles-sidebar__items">
          <TabsMenu label="ROLES"      layout="label+icon" icon="rol" />
          <TabsMenu label="USUARIOS"   layout="label+icon" icon="user" />
          <TabsMenu label="CUADRILLAS" layout="label+icon" icon="cuadrillas" />
        </div>
      </motion.aside>

      {/* ── Main column ─────────────────────────────────────── */}
      <main className="roles-main">
        {/* Top bar */}
        <header className="roles-topbar">
          <h1 className="roles-title">ROLES</h1>

          <div className="roles-topbar__right">
            <div className="roles-dropdown-wrap">
              <SelectionDropdown
                label={dropdownOpen ? "Categorías de roles" : category}
                isOpen={dropdownOpen}
                onToggle={() => setDropdownOpen((v) => !v)}
                items={CATEGORIES.map((c) => ({
                  label: c,
                  onClick: () => { setCategory(c); setDropdownOpen(false); },
                }))}
              />
            </div>
            <AddRoleMorph
              stage={addRoleStage}
              ddOpen={addRoleDdOpen}
              setDdOpen={setAddRoleDdOpen}
              onOpen={() => {
                setAddRoleStage("bar");
                setTimeout(() => setAddRoleStage("open"), 220);
              }}
              onClose={() => {
                setAddRoleDdOpen(false);
                setAddRoleStage("bar");
                setTimeout(() => setAddRoleStage("closed"), 220);
              }}
              onSubmit={(_name, cat) => {
                setCategory(cat);
                setAddRoleDdOpen(false);
                setAddRoleStage("bar");
                setTimeout(() => setAddRoleStage("closed"), 220);
              }}
            />
          </div>
        </header>

        {/* Category label */}
        <h2 className="roles-category">{category}</h2>

        {/* Content */}
        <section className="roles-content">
          {/* Left card — grouped role list */}
          <div className="roles-card roles-card--list">
            {ROLE_GROUPS.map((g) => (
              <div key={g.title} className="roles-group">
                <GroupHeaderPill label={g.title} />
                <div className="roles-group__items">
                  {g.items.map((it) => (
                    <OptionLabel
                      key={it.id}
                      label={it.label}
                      state={it.id === selectedRoleId ? "active" : "standard"}
                      onClick={() => setRoleId(it.id)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Right card — permission detail */}
          <div className="roles-card roles-card--detail">
            <div className="roles-detail__header">
              <div className="roles-avatar">
                <Icon name="user" size="lg" />
              </div>
              <div className="roles-detail__title">
                <span className="roles-detail__name">{selectedRole.fullName}</span>
                <SmallPill label={category} tone="standard" />
              </div>

              {!editMode && (
                <div
                  className="roles-edit-btn-wrap"
                  onMouseEnter={() => setHoverEdit(true)}
                  onMouseLeave={() => setHoverEdit(false)}
                >
                  <HoverHint label="Editar" show={hoverEdit} />
                  <Button
                    color="black"
                    layout="icon"
                    icon="edit"
                    ariaLabel="Editar permisos"
                    onClick={enterEdit}
                  />
                </div>
              )}
              {editMode && (
                <div className="roles-edit-btn-wrap">
                  <Button
                    color="gray"
                    layout="icon"
                    icon="edit"
                    state="disabled"
                    ariaLabel="Modo edición"
                  />
                </div>
              )}
            </div>

            {/* Permissions/Funciones tabs */}
            <div className="roles-filters">
              <TabFilterChip label="Permisos"  state="active"   icon="check" />
              <TabFilterChip label="Funciones" state="disabled" icon="check" />
            </div>

            {/* Permission rows */}
            <ul className="roles-perms">
              {rows.map((p) => (
                <li key={p.id} className="roles-perm">
                  <div className="roles-perm__main">
                    <OptionsExtra
                      label={p.label}
                      checked={p.enabled}
                      state={p.enabled ? "add" : "standard"}
                      onChange={() => togglePerm(p.id)}
                    />
                  </div>

                  {!editMode && (
                    <div className="roles-perm__tags">
                      {p.scopes.map((s) => (
                        <SmallPill key={s} label={s} tone="standard" />
                      ))}
                    </div>
                  )}
                  {editMode && (
                    <div className="roles-perm__tags">
                      {SCOPES.map((s) => (
                        <SmallPill
                          key={s}
                          label={s}
                          tone={p.scopes.includes(s) ? "active" : "standard"}
                          onClick={() => toggleScope(p.id, s)}
                        />
                      ))}
                    </div>
                  )}

                  {editMode && (
                    <button
                      type="button"
                      className="roles-perm__delete"
                      onMouseEnter={() => setHoverDelete(p.id)}
                      onMouseLeave={() => setHoverDelete(null)}
                      onClick={() => deletePerm(p.id)}
                      aria-label={`Eliminar ${p.label}`}
                    >
                      <HoverHint label="Eliminar" show={hoverDelete === p.id} />
                      <Icon name="delete" size="md" />
                    </button>
                  )}
                </li>
              ))}
            </ul>

            {/* Footer CTA — morphs from green pill into the add popover */}
            {!editMode && (
              <AddPermissionMorph
                stage={addPermStage}
                onOpen={openAddPerm}
                onClose={closeAddPerm}
                onSubmit={addPermission}
              />
            )}
            {editMode && (
              <div className="roles-detail__footer">
                <Button
                  color="white"
                  label="Cancelar"
                  onClick={() => { setEditMode(false); setDraft(perms); }}
                />
                <Button
                  color="green"
                  layout="icon-right"
                  icon="good"
                  label="Guardar cambios"
                  onClick={saveEdit}
                />
              </div>
            )}
          </div>
        </section>

      </main>
    </div>
  );
}

// ── Add Permission form (r05) ────────────────────────────────

interface AddFormProps {
  onClose: () => void;
  onSubmit: (label: string, scope: ActionScope) => void;
}
function AddPermissionForm({ onClose, onSubmit }: AddFormProps) {
  const [label, setLabel] = useState("");
  const [scope, setScope] = useState<ActionScope>("ver");
  const scopeOrder: ActionScope[] = ["ver", "editar", "administrar"];

  return (
    <div className="roles-modal__inner">
      <button
        type="button"
        className="roles-modal__close"
        onClick={onClose}
        aria-label="Cerrar"
      >
        <Icon name="close" size="md" />
      </button>

      <FormField
        label="Nombre del permiso"
        placeholder="Placeholder"
        value={label}
        state={label ? "x" : "standard"}
        onChange={(e) => setLabel(e.target.value)}
        onClear={() => setLabel("")}
      />

      <div className="roles-modal__section">
        <span className="roles-modal__section-label">Acciones</span>
        <div className="roles-modal__scope-row">
          {scopeOrder.map((s) => (
            <SmallPill
              key={s}
              label={s}
              tone={scope === s ? "active" : "standard"}
              onClick={() => setScope(s)}
            />
          ))}
          <button
            type="button"
            className="roles-modal__add-scope"
            aria-label="Agregar acción"
          >
            <Icon name="plus" size="sm" />
          </button>
        </div>
      </div>

      <div className="roles-modal__actions">
        <Button color="white" label="Cancelar" onClick={onClose} />
        <Button
          color="green"
          layout="icon-right"
          icon="list"
          label="Agregar"
          onClick={() => label.trim() && onSubmit(label.trim(), scope)}
        />
      </div>
    </div>
  );
}

// ── Add Role form (r06) ──────────────────────────────────────

interface AddRoleFormProps {
  ddOpen: boolean;
  setDdOpen: (v: boolean) => void;
  onClose: () => void;
  onSubmit: (name: string, category: Category) => void;
}
function AddRoleForm({ ddOpen, setDdOpen, onClose, onSubmit }: AddRoleFormProps) {
  const [name, setName] = useState("");
  const [cat, setCat]   = useState<Category | null>(null);

  const canSubmit = name.trim().length > 0 && cat !== null;

  return (
    <div className="roles-add-role__inner">
      <button
        type="button"
        className="roles-add-role__close"
        onClick={onClose}
        aria-label="Cerrar"
      >
        <Icon name="close" size="md" />
      </button>

      <FormField
        label="Nombre del rol"
        placeholder="Placeholder"
        value={name}
        state={name ? "x" : "standard"}
        onChange={(e) => setName(e.target.value)}
        onClear={() => setName("")}
      />

      <div className="roles-add-role__section">
        <span className="roles-add-role__section-label">Categoría</span>
        <div className="roles-add-role__dd-wrap">
          <SelectionDropdown
            label={ddOpen ? "Categorías de roles" : (cat ?? "Label")}
            isOpen={ddOpen}
            onToggle={() => setDdOpen(!ddOpen)}
            items={CATEGORIES.map((c) => ({
              label: c,
              onClick: () => { setCat(c); setDdOpen(false); },
            }))}
          />
        </div>
      </div>

      <div className="roles-add-role__actions">
        <Button color="white" label="Cancelar" onClick={onClose} />
        <Button
          color="green"
          layout="icon-right"
          icon="list"
          label="Agregar"
          state={canSubmit ? "standard" : "disabled"}
          onClick={() => canSubmit && onSubmit(name.trim(), cat as Category)}
        />
      </div>
    </div>
  );
}
