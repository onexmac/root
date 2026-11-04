import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Button } from "../../Button/Button";
import { CheckBox } from "../../Form/Form";
import { Icon } from "../../Icon/Icon";
import { SelectionDropdown } from "../../SelectionDropdown/SelectionDropdown";
import { TabsMenu } from "../../TabsMenu/TabsMenu";
import { ToggleCards } from "../../ToggleCards/ToggleCards";
import { springs } from "../../springs";
import "./RolesGrid.css";

/* ============================================================
 * H4 — Roles & Permisos · grid de cards (RR01–RR06)
 *
 *  RR01  sidebar EXPANDED · grid de cards colapsadas (3 col)
 *  RR02  card EXPANDIDA · modo edición (icono editar)
 *  RR03  card EXPANDIDA · modo edición · icono check (guardar)
 *  RR04  card · "+" abre dropdown para agregar permiso
 *  RR05  card EXPANDIDA · view mode (pills ver/editar read-only)
 *  RR06  sidebar COLAPSADO · grid (2 col)
 *
 *  Cada card se expande con ToggleCards. El icono de la esquina
 *  superior derecha entra a modo edición (hover "Editar") y se
 *  convierte en check para guardar; en edición cada fila puede
 *  togglear su selector + pills ver/editar y eliminarse (hover
 *  "Eliminar"). El "+" despliega un SelectionDropdown con los
 *  permisos disponibles para agregar.
 *
 *  DS: Button, CheckBox, Icon, SelectionDropdown, TabsMenu,
 *  ToggleCards.
 *  NOT-IN-DS: pill compacta `ScopePill` (ver/editar/categoría).
 * ============================================================ */

// ── Tipos ────────────────────────────────────────────────────

type Category = "CAMPO" | "OFICINA" | "LOGÍSTICA" | "GERENCIA";

interface Permission {
  id: string;
  label: string;
  enabled: boolean;
  ver: boolean;
  editar: boolean;
}

interface RoleCard {
  id: string;
  roleLabel: string;
  perms: Permission[];
}

// ── Seed data ────────────────────────────────────────────────

const CATEGORIES: Category[] = ["CAMPO", "OFICINA", "LOGÍSTICA", "GERENCIA"];

const PERM_CATALOG = [
  "Solicitar material",
  "Aprobar pedidos",
  "Hacer pedidos",
  "Cerrar reporte diario",
  "Asignar cuadrillas",
  "Aprobar traslados",
  "Editar plantillas",
  "Ver historial de obra",
];

let pid = 0;
const perm = (label: string, ver: boolean, editar: boolean): Permission => ({
  id: `p-${pid++}`,
  label,
  enabled: true,
  ver,
  editar,
});

const makeCard = (id: string, roleLabel: string): RoleCard => ({
  id,
  roleLabel,
  perms: [
    perm("Solicitar material", true, true),
    perm("Aprobar pedidos", true, false),
    perm("Hacer pedidos", false, true),
    perm("Cerrar reporte diario", true, true),
    perm("Asignar cuadrillas", false, false),
  ],
});

const SEED_CARDS: RoleCard[] = [
  makeCard("c-1", "Encargados-Fundaciones"),
  makeCard("c-2", "Encargados-Muros"),
  makeCard("c-3", "Encargados-Acabados"),
  makeCard("c-4", "Maestros-Fundaciones"),
  makeCard("c-5", "Maestros-Muros"),
  makeCard("c-6", "Maestros-Acabados"),
];

// ── NOT-IN-DS: scope pill (ver / editar / categoría) ─────────

interface ScopePillProps {
  label: string;
  active: boolean;
  interactive?: boolean;
  onClick?: () => void;
}
function ScopePill({ label, active, interactive = false, onClick }: ScopePillProps) {
  const cls = [
    "rg-pill",
    active ? "rg-pill--active" : "rg-pill--standard",
    interactive ? "rg-pill--clickable" : "",
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <button type="button" className={cls} onClick={interactive ? onClick : undefined} disabled={!interactive}>
      {label}
    </button>
  );
}

// ── Hover tooltip (Editar / Eliminar / Guardar) ──────────────

function HoverHint({ label, show }: { label: string; show: boolean }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.span
          className="rg-hint"
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

// ── Permission card ──────────────────────────────────────────

interface PermissionCardProps {
  card: RoleCard;
  onChange: (perms: Permission[]) => void;
}

function PermissionCard({ card, onChange }: PermissionCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [draft, setDraft] = useState<Permission[]>(card.perms);
  const [adding, setAdding] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [hoverEdit, setHoverEdit] = useState(false);
  const [hoverDelete, setHoverDelete] = useState<string | null>(null);

  const rows = editMode ? draft : card.perms;

  const enterEdit = () => {
    setDraft(card.perms);
    setEditMode(true);
    setExpanded(true);
    setAdding(false);
  };
  const saveEdit = () => {
    onChange(draft);
    setEditMode(false);
  };

  // El checkbox togglea siempre: en edición sobre el draft, en vista
  // commitea directo al permiso (sin abrir el modo edición).
  const toggleEnabled = (id: string) => {
    const flip = (list: Permission[]) =>
      list.map((p) => (p.id === id ? { ...p, enabled: !p.enabled } : p));
    if (editMode) setDraft(flip);
    else onChange(flip(card.perms));
  };
  const toggleScope = (id: string, scope: "ver" | "editar") =>
    setDraft((d) => d.map((p) => (p.id === id ? { ...p, [scope]: !p[scope] } : p)));
  const deleteRow = (id: string) => setDraft((d) => d.filter((p) => p.id !== id));

  const available = PERM_CATALOG.filter(
    (label) => !card.perms.some((p) => p.label === label),
  );

  const addPermission = (label: string) => {
    onChange([...card.perms, perm(label, true, false)]);
    setAddOpen(false);
    setAdding(false);
  };

  const toggleAdd = () => {
    if (editMode) return;
    setAdding((v) => {
      const next = !v;
      setAddOpen(next);
      return next;
    });
  };

  const renderRow = (p: Permission) => (
    <div key={p.id} className="rg-row">
      <div className="rg-row__main">
        <CheckBox
          label={p.label}
          /* El checkbox refleja el estado real y se puede marcar/desmarcar
             siempre, sin abrir el modo edición. */
          checked={p.enabled}
          state={p.enabled ? "add" : "standard"}
          onChange={() => toggleEnabled(p.id)}
        />
      </div>

      <div className="rg-row__scopes">
        {editMode ? (
          /* Edición: todas las opciones, seleccionables */
          <>
            <ScopePill
              label="ver"
              active={p.ver}
              interactive
              onClick={() => toggleScope(p.id, "ver")}
            />
            <ScopePill
              label="editar"
              active={p.editar}
              interactive
              onClick={() => toggleScope(p.id, "editar")}
            />
          </>
        ) : (
          /* Vista: solo los selectores activos, en state standard.
             Click en cualquiera abre el modo edición. */
          <>
            {p.ver && <ScopePill label="ver" active={false} interactive onClick={enterEdit} />}
            {p.editar && (
              <ScopePill label="editar" active={false} interactive onClick={enterEdit} />
            )}
          </>
        )}
      </div>

      {editMode && (
        <button
          type="button"
          className="rg-row__delete"
          onMouseEnter={() => setHoverDelete(p.id)}
          onMouseLeave={() => setHoverDelete(null)}
          onClick={() => deleteRow(p.id)}
          aria-label={`Eliminar ${p.label}`}
        >
          <HoverHint label="Eliminar" show={hoverDelete === p.id} />
          <Icon name="delete" size="md" color="currentColor" />
        </button>
      )}
    </div>
  );

  return (
    <div className="rg-card-wrap">
      <span className="rg-card-role">{card.roleLabel}</span>

      <div className={`rg-card${expanded ? " rg-card--expanded" : ""}`}>
        {/* Header */}
        <div className="rg-card__head">
          <span className="rg-card__head-pill">Permisos</span>

          <button
            type="button"
            className={`rg-card__add${adding ? " rg-card__add--active" : ""}`}
            onClick={toggleAdd}
            disabled={editMode}
            aria-label="Agregar permiso"
            aria-expanded={adding}
          >
            <Icon name="plus" size="sm" color="currentColor" />
          </button>

          <div className="rg-card__head-spacer" />

          {!adding &&
            (!editMode ? (
              <button
                type="button"
                className="rg-card__icon-btn"
                onMouseEnter={() => setHoverEdit(true)}
                onMouseLeave={() => setHoverEdit(false)}
                onClick={enterEdit}
                aria-label="Editar permisos"
              >
                <HoverHint label="Editar" show={hoverEdit} />
                <Icon name="edit" size="md" color="currentColor" />
              </button>
            ) : (
              <button
                type="button"
                className="rg-card__icon-btn rg-card__icon-btn--save"
                onMouseEnter={() => setHoverEdit(true)}
                onMouseLeave={() => setHoverEdit(false)}
                onClick={saveEdit}
                aria-label="Guardar cambios"
              >
                <HoverHint label="Guardar" show={hoverEdit} />
                <Icon name="good" size="md" color="currentColor" />
              </button>
            ))}
        </div>

        {adding ? (
          /* Modo "+": el card muestra solo el selector de permisos
             (RR04). Las filas y el panel normal quedan ocultos. */
          <div className="rg-card__add-mode">
            {available.length > 0 ? (
              <SelectionDropdown
                label="Agregar permiso"
                isOpen={addOpen}
                onToggle={() => setAddOpen((v) => !v)}
                items={available.map((label) => ({
                  label,
                  onClick: () => addPermission(label),
                }))}
              />
            ) : (
              <span className="rg-card__add-empty">No hay más permisos por agregar</span>
            )}
          </div>
        ) : (
          /* Modo normal: panel blanco con las filas de permisos */
          <div className="rg-card__panel">
            <div className="rg-card__panel-head">
              <span className="rg-card__panel-title">Permisos</span>
              <ToggleCards
                size="small"
                visibility={expanded ? "open" : "close"}
                onClick={() => {
                  if (editMode) return;
                  setExpanded((v) => !v);
                }}
                ariaLabel={expanded ? "Colapsar permisos" : "Expandir permisos"}
              />
            </div>

            {/* Primeras 2 filas: siempre visibles, no se animan */}
            <div className="rg-rows">{rows.slice(0, 2).map(renderRow)}</div>

            {/* Resto: se revela con grid-template-rows (0fr→1fr) — nativo y
               fluido. Solo crece este card; las filas/cards de abajo se
               deslizan, las de los lados no se mueven (CSS grid reflow). */}
            <div className={`rg-rows__more${expanded ? " is-open" : ""}`} aria-hidden={!expanded}>
              <div className="rg-rows__more-clip">
                <div className="rg-rows">{rows.slice(2).map(renderRow)}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Pantalla principal ───────────────────────────────────────

interface RolesGridProps {
  initialCollapsed?: boolean;
}

export function RolesGrid({ initialCollapsed = false }: RolesGridProps = {}) {
  const [sidebarExpanded, setSidebarExpanded] = useState(!initialCollapsed);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [category, setCategory] = useState<Category>("CAMPO");
  const [cards, setCards] = useState<RoleCard[]>(SEED_CARDS);

  const updateCard = (id: string, perms: Permission[]) =>
    setCards((cs) => cs.map((c) => (c.id === id ? { ...c, perms } : c)));

  const addCard = () =>
    setCards((cs) => [...cs, makeCard(`c-${cs.length + 1}-${Date.now()}`, "Nuevo rol")]);

  return (
    <div className="rg-shell">
      {/* ── Sidebar ─────────────────────────────────────────── */}
      <motion.aside
        className={`rg-sidebar rg-sidebar--${sidebarExpanded ? "expanded" : "collapsed"}`}
        initial={false}
        animate={{ width: sidebarExpanded ? 320 : 80 }}
        transition={{ ...springs.expanding, delay: sidebarExpanded ? 0 : 0.5 }}
      >
        <motion.button
          type="button"
          className="rg-sidebar__menu"
          onClick={() => setSidebarExpanded((v) => !v)}
          aria-label={sidebarExpanded ? "Colapsar menú" : "Expandir menú"}
          animate={{ rotate: sidebarExpanded ? 0 : 90 }}
          transition={springs.snappy}
        >
          <Icon name="menu" size="md" />
        </motion.button>

        <div className="rg-sidebar__items">
          <TabsMenu label="ROLES" layout="label+icon" icon="rol" />
          <TabsMenu label="USUARIOS" layout="label+icon" icon="user" />
          <TabsMenu label="CUADRILLAS" layout="label+icon" icon="cuadrillas" />
        </div>
      </motion.aside>

      {/* ── Main ────────────────────────────────────────────── */}
      <main className="rg-main">
        <header className="rg-topbar">
          <h1 className="rg-title">ROLES</h1>
          <Button
            color="green"
            layout="icon"
            icon="plus"
            ariaLabel="Agregar rol"
            onClick={addCard}
          />
        </header>

        <div className="rg-subhead">
          <span className="rg-subhead__label">Categorías de roles</span>
          <div className="rg-dropdown-wrap">
            <SelectionDropdown
              label={dropdownOpen ? "Categorías de roles" : category}
              isOpen={dropdownOpen}
              onToggle={() => setDropdownOpen((v) => !v)}
              items={CATEGORIES.map((c) => ({
                label: c,
                onClick: () => {
                  setCategory(c);
                  setDropdownOpen(false);
                },
              }))}
            />
          </div>
        </div>

        <h2 className="rg-category">{category}</h2>

        <section className="rg-grid">
          {cards.map((c) => (
            <PermissionCard
              key={c.id}
              card={c}
              onChange={(perms) => updateCard(c.id, perms)}
            />
          ))}
        </section>
      </main>
    </div>
  );
}
