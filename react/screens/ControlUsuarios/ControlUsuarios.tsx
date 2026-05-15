import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Button } from "../../Button/Button";
import { FormField, Tag } from "../../Form/Form";
import { Icon } from "../../Icon/Icon";
import { SelectionDropdown } from "../../SelectionDropdown/SelectionDropdown";
import { springs } from "../../springs";
import { haptic } from "../../haptic";
import "./ControlUsuarios.css";

/* ============================================================
 * H4 — Control de usuarios
 * Prototipo interactivo: 10 frames (U01–U05, R01–R02, CUA01–CUA03)
 * unificadas en un solo shell con state machine local.
 * ============================================================ */

type Section = "usuarios" | "roles" | "cuadrillas";

type Frame =
  | "U01" | "U02" | "U03" | "U04" | "U05"
  | "R01" | "R02"
  | "CUA01" | "CUA02" | "CUA03";

/* ── Modelos seed ────────────────────────────────────────── */

interface Usuario {
  id: string;
  nombre: string;
  cedula: string;
  area: string;
  contacto: string;
  rol: string;
  correo: string;
  fechaIngreso: string;
  activo: boolean;
}

const SEED_USUARIOS: Usuario[] = [
  { id: "u1", nombre: "Juan Perez Garcia",   cedula: "3-0138-0148", area: "Producción", contacto: "8812-3232", rol: "Ingeniero", correo: "juanperez@adelante.cr", fechaIngreso: "12/05/26", activo: true  },
  { id: "u2", nombre: "Juan Perez Mora",     cedula: "1-0234-5678", area: "Producción", contacto: "8812-3232", rol: "Ingeniero", correo: "juanperez@adelante.cr", fechaIngreso: "12/05/26", activo: false },
  { id: "u3", nombre: "Juan Perez Solano",   cedula: "1-0234-5678", area: "Producción", contacto: "8812-3232", rol: "Ingeniero", correo: "juanperez@adelante.cr", fechaIngreso: "12/05/26", activo: true  },
  { id: "u4", nombre: "Juan Perez Vargas",   cedula: "1-0234-5678", area: "Producción", contacto: "8812-3232", rol: "Ingeniero", correo: "juanperez@adelante.cr", fechaIngreso: "12/05/26", activo: false },
  { id: "u5", nombre: "Juan Perez Quirós",   cedula: "1-0234-5678", area: "Producción", contacto: "8812-3232", rol: "Ingeniero", correo: "juanperez@adelante.cr", fechaIngreso: "12/05/26", activo: true  },
];

interface RolItem {
  id: string;
  nombre: string;
  permisos: string[];
  funciones: string[];
}

const SEED_ROLES: RolItem[] = [
  { id: "r1", nombre: "Encargados-Fundaciones", permisos: ["Solicitar material", "Solicitar material"], funciones: ["Solicitar material", "Solicitar material"] },
  { id: "r2", nombre: "Encargados-Muros",       permisos: ["Solicitar material", "Solicitar material"], funciones: ["Solicitar material", "Solicitar material", "Solicitar material", "Solicitar material", "Solicitar material"] },
];

interface Cuadrilla {
  id: string;
  categoria: string;
  encargado: string;
  peones: string[];
  ubicaciones: string[];
  actividades: number;
}

const SEED_CUADRILLAS: Cuadrilla[] = [
  { id: "c1", categoria: "Aceros", encargado: "Franklin Ballesteros", peones: ["Juan Perez","Juan Perez","Juan Perez","Juan Perez","Juan Perez"], ubicaciones: ["VN.B27","VN.B27"], actividades: 26 },
  { id: "c2", categoria: "Aceros", encargado: "Franklin Ballesteros", peones: ["Juan Perez","Juan Perez","Juan Perez","Juan Perez","Juan Perez"], ubicaciones: ["VN.B27","VN.B27"], actividades: 26 },
];

/* ── Borrador para crear usuario ─────────────────────────── */

type UserDraft = {
  nombre: string; cedula: string;
  provincia: string; canton: string; distrito: string;
  direccion: string; telefono: string; correo: string;
  area: string; puesto: string; salario: string; fechaIngreso: string;
  rol: string;
};
const EMPTY_DRAFT: UserDraft = {
  nombre: "", cedula: "", provincia: "", canton: "", distrito: "",
  direccion: "", telefono: "", correo: "",
  area: "", puesto: "", salario: "", fechaIngreso: "",
  rol: "Encargado",
};

const ROLES_DISPONIBLES = ["Maestro de obras", "Encargado", "Transportista", "Bodeguero", "Peón"];

/* Catálogos seed para los SelectionDropdowns (prototype) */
const CATALOGOS = {
  provincia:    ["San José", "Alajuela", "Cartago", "Heredia", "Guanacaste", "Puntarenas", "Limón"],
  canton:       ["Central", "Escazú", "Desamparados", "Pérez Zeledón"],
  distrito:     ["Hospital", "Catedral", "Pavas", "Hatillo"],
  area:         ["Producción", "Administración", "Almacén", "Calidad"],
  salario:      ["₡500.000", "₡750.000", "₡1.000.000", "₡1.500.000"],
  fechaIngreso: ["01/05/26", "15/05/26", "01/06/26", "15/06/26"],
  categoriaRol: ["CAMPO", "Oficina", "Logística"],
};

/* ============================================================
 * Componente principal
 * ============================================================ */

export function ControlUsuarios() {
  const [frame, setFrame] = useState<Frame>("U01");

  // Estado optimista
  const [usuarios, setUsuarios] = useState<Usuario[]>(SEED_USUARIOS);
  const [roles] = useState<RolItem[]>(SEED_ROLES);
  const [cuadrillas] = useState<Cuadrilla[]>(SEED_CUADRILLAS);

  // Estado UI derivado del frame
  const section: Section = useMemo(() => {
    if (frame.startsWith("U")) return "usuarios";
    if (frame.startsWith("R")) return "roles";
    return "cuadrillas";
  }, [frame]);

  // Sidebar expansion is independent of frame — user can toggle on any screen.
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const selectedUser = frame === "U03" ? usuarios[0] : null;
  const newUserOpen = frame === "U04" || frame === "U05";
  const newUserTab: "personal" | "rol" = frame === "U05" ? "rol" : "personal";

  const [draft, setDraft] = useState<UserDraft>(EMPTY_DRAFT);

  const goTo = (next: Frame) => {
    haptic.select();
    setFrame(next);
  };

  const crearUsuario = () => {
    haptic.complete();
    const nuevo: Usuario = {
      id: `u${Date.now()}`,
      nombre: draft.nombre || "Nuevo Usuario",
      cedula: draft.cedula || "—",
      area: draft.area || "Producción",
      contacto: draft.telefono || "—",
      rol: draft.rol || "Peón",
      correo: draft.correo || "—",
      fechaIngreso: draft.fechaIngreso || "—",
      activo: true,
    };
    setUsuarios((prev) => [nuevo, ...prev]);
    setDraft(EMPTY_DRAFT);
    setFrame("U02");
  };

  const eliminarUsuario = (id: string) => {
    haptic.delete();
    setUsuarios((prev) => prev.filter((u) => u.id !== id));
    setFrame("U02");
  };

  return (
    <div className="cu">
      {/* Sidebar */}
      <Sidebar
        expanded={sidebarExpanded}
        onToggle={() => setSidebarExpanded((v) => !v)}
        active={section}
        onNavigate={(s) => {
          // Cambiar de sección no fuerza expandir/colapsar — respeta el estado actual.
          if (s === "usuarios")   setFrame(sidebarExpanded ? "U01" : "U02");
          if (s === "roles")      goTo("R01");
          if (s === "cuadrillas") goTo("CUA01");
        }}
      />

      {/* Main */}
      <main className="cu__main">
        {section === "usuarios" && (
          <UsuariosView
            usuarios={usuarios}
            onAdd={() => goTo("U04")}
            onPickUser={() => goTo("U03")}
          />
        )}
        {section === "roles" && (
          <RolesView
            roles={roles}
            frame={frame as "R01" | "R02"}
            onToggleEdit={() => goTo(frame === "R01" ? "R02" : "R01")}
          />
        )}
        {section === "cuadrillas" && (
          <CuadrillasView
            cuadrillas={cuadrillas}
            frame={frame as "CUA01" | "CUA02" | "CUA03"}
            onTabPeones={() => goTo("CUA02")}
            onTabUbicaciones={() => goTo("CUA03")}
            onCollapse={() => goTo("CUA01")}
          />
        )}
      </main>

      {/* Overlay drawers — motion directo, sin AnimatePresence (sin exit anim) */}
      {selectedUser && (
        <DetailDrawer
          usuario={selectedUser}
          onClose={() => goTo("U02")}
          onEdit={() => goTo("U04")}
          onDelete={() => eliminarUsuario(selectedUser.id)}
        />
      )}
      {newUserOpen && (
        <NewUserDrawer
          tab={newUserTab}
          draft={draft}
          onChange={setDraft}
          onClose={() => { setDraft(EMPTY_DRAFT); goTo("U02"); }}
          onTabChange={(t) => goTo(t === "personal" ? "U04" : "U05")}
          onSubmit={crearUsuario}
        />
      )}

    </div>
  );
}

/* ============================================================
 * Sidebar (no-DS: el sidebar lateral oscuro no está en el DS;
 * Nav.tsx existe pero no calza visualmente — construido aquí)
 * ============================================================ */

function Sidebar({
  expanded,
  onToggle,
  active,
  onNavigate,
}: {
  expanded: boolean;
  onToggle: () => void;
  active: Section;
  onNavigate: (s: Section) => void;
}) {
  return (
    <motion.aside
      className={`cu-sidebar ${expanded ? "is-expanded" : ""}`}
      animate={{ width: expanded ? 280 : 104 }}
      transition={springs.expanding}
    >
      <button
        type="button"
        className="cu-sidebar__toggle"
        onClick={onToggle}
        aria-label={expanded ? "Colapsar menú" : "Expandir menú"}
        aria-expanded={expanded}
      >
        <Icon
          name={expanded ? "back" : "arrow-right"}
          size="md"
          color="var(--ds-color-white)"
        />
      </button>

      <SidebarItem iconName="rol"        label="ROLES"      expanded={expanded} active={active === "roles"}      onClick={() => onNavigate("roles")} />
      <SidebarItem iconName="user"       label="USUARIOS"   expanded={expanded} active={active === "usuarios"}   onClick={() => onNavigate("usuarios")} />
      <SidebarItem iconName="cuadrillas" label="CUADRILLAS" expanded={expanded} active={active === "cuadrillas"} onClick={() => onNavigate("cuadrillas")} />
    </motion.aside>
  );
}

function SidebarItem({
  iconName, label, expanded, active, onClick,
}: {
  iconName: React.ComponentProps<typeof Icon>["name"];
  label: string;
  expanded: boolean;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      type="button"
      className={`cu-sidebar__item ${active ? "is-active" : ""}`}
      onClick={onClick}
      whileTap={{ scale: 0.97 }}
      transition={springs.snappy}
    >
      <span className="cu-sidebar__icon" aria-hidden>
        <Icon name={iconName} size="md" color="var(--ds-color-white)" />
      </span>
      {expanded && <span className="cu-sidebar__label">{label}</span>}
    </motion.button>
  );
}

/* ============================================================
 * USUARIOS — U01/U02 (lista) + U03 detail vía drawer
 * ============================================================ */

function UsuariosView({
  usuarios, onAdd, onPickUser,
}: {
  usuarios: Usuario[];
  onAdd: () => void;
  onPickUser: (u: Usuario) => void;
}) {
  return (
    <div className="cu-section">
      <div className="cu-section__header">
        <h1 className="cu-section__title">USUARIOS</h1>
        <PlusButton onClick={onAdd} ariaLabel="Nuevo usuario" />
      </div>

      <div className="cu-table">
        <div className="cu-table__head">
          <div className="cu-table__col cu-table__col--name">Trabajador</div>
          <div className="cu-table__col">Área</div>
          <div className="cu-table__col">Contacto</div>
          <div className="cu-table__col">Rol</div>
          <div className="cu-table__col cu-table__col--status">Estado</div>
        </div>
        <ul className="cu-table__body">
          {usuarios.map((u) => (
            <motion.li
              key={u.id}
              className="cu-table__row"
              onClick={() => onPickUser(u)}
              whileHover={{ background: "var(--ds-color-gray-100)" }}
              transition={springs.snappy}
              layout
            >
              <div className="cu-table__col cu-table__col--name">
                <Avatar />
                <span className="cu-table__name">{u.nombre.split(" ").slice(0, 2).join(" ")}</span>
              </div>
              <div className="cu-table__col">{u.area}</div>
              <div className="cu-table__col">{u.contacto}</div>
              <div className="cu-table__col">
                <Tag label={u.rol} state="standard" />
              </div>
              <div className="cu-table__col cu-table__col--status">
                <StatusPill activo={u.activo} />
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function StatusPill({ activo }: { activo: boolean }) {
  return (
    <span className={`cu-status ${activo ? "is-active" : "is-inactive"}`}>
      {activo ? "Activo" : "Inactivo"}
      <Icon name="check" size="sm" color="currentColor" />
    </span>
  );
}

function Avatar() {
  return (
    <span className="cu-avatar" aria-hidden>
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
        <circle cx="12" cy="9" r="3.5" stroke="currentColor" strokeWidth="1.6"/>
        <path d="M5 20a7 7 0 0 1 14 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
      </svg>
    </span>
  );
}

/* ============================================================
 * U03 — Detail drawer
 * ============================================================ */

function DetailDrawer({
  usuario, onClose, onEdit, onDelete,
}: {
  usuario: Usuario;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <Drawer onClose={onClose}>
      <header className="cu-drawer__head">
        <Avatar />
        <h2 className="cu-drawer__title">{usuario.nombre}</h2>
        <CloseIconButton onClick={onClose} />
      </header>
      <div className="cu-drawer__role">
        <Tag label={usuario.rol} state="standard" />
      </div>

      <dl className="cu-drawer__fields">
        <Field label="Cédula"        value={usuario.cedula} />
        <Field label="Área"          value={usuario.area} />
        <Field label="Rol"           value={usuario.rol} />
        <Field label="Telefono"      value={usuario.contacto} />
        <Field label="Correo"        value={usuario.correo} />
        <Field label="Fecha de ingreso" value={usuario.fechaIngreso} />
      </dl>

      <div className="cu-drawer__actions">
        <Button label="Editar"   color="black" layout="icon-right" icon="edit"   onClick={onEdit} />
        <Button label="Eliminar" color="white" layout="icon-right" icon="delete" onClick={onDelete} />
      </div>
    </Drawer>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="cu-field">
      <dt className="cu-field__label">{label}:</dt>
      <dd className="cu-field__value">{value}</dd>
    </div>
  );
}

/* ============================================================
 * U04 / U05 — New user drawer
 * ============================================================ */

function NewUserDrawer({
  tab, draft, onChange, onClose, onTabChange, onSubmit,
}: {
  tab: "personal" | "rol";
  draft: UserDraft;
  onChange: (d: UserDraft) => void;
  onClose: () => void;
  onTabChange: (t: "personal" | "rol") => void;
  onSubmit: () => void;
}) {
  const set = <K extends keyof UserDraft>(k: K, v: UserDraft[K]) =>
    onChange({ ...draft, [k]: v });

  return (
    <Drawer onClose={onClose}>
      <header className="cu-drawer__head">
        <Avatar />
        <h2 className="cu-drawer__title">NUEVO USUARIO</h2>
        <CloseIconButton onClick={onClose} />
      </header>

      <div className="cu-newuser__tabs">
        <button
          className={`cu-newuser__tab ${tab === "personal" ? "is-active" : ""}`}
          onClick={() => onTabChange("personal")}
          type="button"
        >Personal</button>
        <button
          className={`cu-newuser__tab ${tab === "rol" ? "is-active" : ""}`}
          onClick={() => onTabChange("rol")}
          type="button"
        >Rol y asignación</button>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        {tab === "personal" ? (
          <motion.div
            key="personal"
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={springs.expanding}
            className="cu-newuser__pane"
          >
            <h3 className="cu-newuser__group">DATOS PERSONALES</h3>
            <FormField label="Nombre completo" placeholder="Placeholder" value={draft.nombre}
              onChange={(e) => set("nombre", e.target.value)} />
            <FormField label="Cédula" placeholder="Placeholder" value={draft.cedula}
              onChange={(e) => set("cedula", e.target.value)} />

            <h3 className="cu-newuser__group">CONTACTO</h3>
            <div className="cu-newuser__row">
              <DropdownField label="Provincia" value={draft.provincia} options={CATALOGOS.provincia} onSelect={(v) => set("provincia", v)} />
              <DropdownField label="Cantón"    value={draft.canton}    options={CATALOGOS.canton}    onSelect={(v) => set("canton", v)} />
            </div>
            <DropdownField label="Distrito" value={draft.distrito} options={CATALOGOS.distrito} onSelect={(v) => set("distrito", v)} />
            <FormField label="Dirección" placeholder="Placeholder" value={draft.direccion}
              onChange={(e) => set("direccion", e.target.value)} />
            <div className="cu-newuser__row">
              <FormField label="Teléfono" placeholder="Placeholder" value={draft.telefono}
                onChange={(e) => set("telefono", e.target.value)} />
              <FormField label="Correo"   placeholder="Placeholder" value={draft.correo}
                onChange={(e) => set("correo", e.target.value)} />
            </div>

            <div className="cu-newuser__nav cu-newuser__nav--end">
              <RoundNavButton direction="forward" onClick={() => onTabChange("rol")} />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="rol"
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 12 }}
            transition={springs.expanding}
            className="cu-newuser__pane"
          >
            <h3 className="cu-newuser__group">ASIGNACIÓN</h3>
            <div className="cu-newuser__row">
              <DropdownField label="Área de trabajo" value={draft.area} options={CATALOGOS.area} onSelect={(v) => set("area", v)} />
              <FormField label="Puesto de trabajo" placeholder="Placeholder" value={draft.puesto}
                onChange={(e) => set("puesto", e.target.value)} />
            </div>
            <div className="cu-newuser__row">
              <DropdownField label="Salario"          value={draft.salario}      options={CATALOGOS.salario}      onSelect={(v) => set("salario", v)} />
              <DropdownField label="Fecha de ingreso" value={draft.fechaIngreso} options={CATALOGOS.fechaIngreso} onSelect={(v) => set("fechaIngreso", v)} />
            </div>

            <h3 className="cu-newuser__group">ROL</h3>
            <div className="cu-roles-grid">
              {ROLES_DISPONIBLES.map((r) => (
                <Tag
                  key={r}
                  label={r}
                  state={draft.rol === r ? "active" : "standard"}
                  onClick={() => set("rol", r)}
                />
              ))}
            </div>

            <div className="cu-newuser__nav cu-newuser__nav--between">
              <RoundNavButton direction="back" onClick={() => onTabChange("personal")} />
              <Button label="Crear usuario" color="black" layout="icon-left" icon="user" onClick={onSubmit} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Drawer>
  );
}

/** Wrapper: external label + DS SelectionDropdown.
 *  `size`:
 *   - "full"    → ocupa todo el ancho del container (default, para forms en grid)
 *   - "compact" → más bajo, para casillas pequeñas (RoleCard edit)
 */
function DropdownField({
  label, value, options, onSelect, size = "full",
}: {
  label: string;
  value: string;
  options: string[];
  onSelect: (v: string) => void;
  size?: "full" | "compact";
}) {
  return (
    <div className="cu-dropdown-field">
      {label && <span className="cu-dropdown-field__label">{label}</span>}
      <SelectionDropdown
        className={`cu-sd cu-sd--${size}`}
        label={value || "Label"}
        items={options.map((opt) => ({
          label: opt,
          onClick: () => onSelect(opt),
        }))}
      />
    </div>
  );
}

function RoundNavButton({ direction, onClick }: { direction: "back" | "forward"; onClick: () => void }) {
  return (
    <motion.button
      type="button"
      className="cu-round-nav"
      onClick={onClick}
      whileTap={{ scale: 0.94 }}
      transition={springs.snappy}
      aria-label={direction === "back" ? "Atrás" : "Siguiente"}
    >
      <Icon name={direction === "back" ? "back" : "arrow-right"} size="md" color="var(--ds-color-black)" />
    </motion.button>
  );
}

/* ============================================================
 * ROLES — R01 / R02
 * ⚠️ STUB: las "RoleCard" con tabs internos (Permisos/Funciones)
 *    NO existen como componente del DS. Replicadas en este screen,
 *    marcadas para futura promoción al DS.
 * ============================================================ */

function RolesView({
  roles, frame, onToggleEdit,
}: {
  roles: RolItem[];
  frame: "R01" | "R02";
  onToggleEdit: () => void;
}) {
  return (
    <div className="cu-section">
      <div className="cu-section__header">
        <h1 className="cu-section__title">ROLES</h1>
        <div className="cu-section__header-right">
          <SelectionDropdown
            className="cu-sd cu-sd--category"
            label="Categorias de roles"
            items={CATALOGOS.categoriaRol.map((c) => ({ label: c }))}
          />
          <PlusButton onClick={onToggleEdit} ariaLabel="Agregar rol" />
        </div>
      </div>

      <h2 className="cu-roles__category">CAMPO</h2>
      <div className="cu-roles__grid">
        {roles.map((r, i) => (
          <RoleCard
            key={r.id}
            rol={r}
            mode={frame === "R02" && i === 0 ? "edit" : i === 1 && frame === "R02" ? "expanded" : "normal"}
            initialTab={i === 0 ? "permisos" : "funciones"}
            onAdd={onToggleEdit}
          />
        ))}
      </div>
    </div>
  );
}

/** STUB de RoleCard — composición que debería existir en el DS */
function RoleCard({
  rol, mode, initialTab, onAdd,
}: {
  rol: RolItem;
  mode: "normal" | "edit" | "expanded";
  initialTab: "permisos" | "funciones";
  onAdd: () => void;
}) {
  const [tab, setTab] = useState<"permisos" | "funciones">(initialTab);
  const items = tab === "permisos" ? rol.permisos : rol.funciones;
  const title = tab === "permisos" ? "Permisos" : "Funciones";

  return (
    <div className="cu-role-card-wrap">
      <div className="cu-role-card__nametag">
        <Tag label={rol.nombre} state="standard" />
      </div>

      <motion.div className="cu-role-card" layout transition={springs.expanding}>
        <header className="cu-role-card__tabs">
          <button
            type="button"
            className={`cu-role-card__tab ${tab === "permisos" ? "is-active" : ""}`}
            onClick={() => setTab("permisos")}
          >Permisos</button>
          <button
            type="button"
            className={`cu-role-card__tab ${tab === "funciones" ? "is-active" : ""}`}
            onClick={() => setTab("funciones")}
          >Funciones</button>
          <button
            type="button"
            className="cu-role-card__add"
            onClick={onAdd}
            aria-label="Agregar"
          >
            <Icon name="plus" size="sm" color="var(--ds-color-white)" />
          </button>
        </header>

        <div className="cu-role-card__body">
          {mode === "edit" ? (
            <SelectionDropdown
              className="cu-sd cu-sd--compact"
              label="Label"
              items={[{ label: "Solicitar material" }, { label: "Aprobar pedido" }]}
            />
          ) : (
            <>
              <h4 className="cu-role-card__title">{title}</h4>
              <ul className="cu-role-card__list">
                {items.map((label, idx) => (
                  <li key={idx} className="cu-role-card__item">
                    <span className="cu-role-card__check" aria-hidden>
                      <Icon name="check" size="sm" color="var(--ds-color-white)" />
                    </span>
                    {label}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                className="cu-role-card__collapse"
                onClick={onAdd}
                aria-label="Toggle"
              >
                <Icon name={mode === "expanded" ? "chevron-down" : "chevron-up"} size="sm" color="var(--ds-color-white)" />
              </button>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}

/* ============================================================
 * CUADRILLAS — CUA01 / CUA02 / CUA03
 * ============================================================ */

function CuadrillasView({
  cuadrillas, frame, onTabPeones, onTabUbicaciones, onCollapse,
}: {
  cuadrillas: Cuadrilla[];
  frame: "CUA01" | "CUA02" | "CUA03";
  onTabPeones: () => void;
  onTabUbicaciones: () => void;
  onCollapse: () => void;
}) {
  return (
    <div className="cu-section">
      <div className="cu-section__header">
        <h1 className="cu-section__title">CUADRILLAS</h1>
        <PlusButton onClick={() => {}} ariaLabel="Nueva cuadrilla" />
      </div>

      <div className="cu-cuadrillas__grid">
        {cuadrillas.map((c, i) => (
          <CuadrillaCard
            key={c.id}
            cuadrilla={c}
            expanded={i === 0 && (frame === "CUA02" || frame === "CUA03")}
            activeTab={frame === "CUA02" ? "peones" : frame === "CUA03" ? "ubicaciones" : null}
            onPeones={i === 0 ? onTabPeones : () => {}}
            onUbicaciones={i === 0 ? onTabUbicaciones : () => {}}
            onCollapse={onCollapse}
          />
        ))}
      </div>
    </div>
  );
}

function CuadrillaCard({
  cuadrilla, expanded, activeTab, onPeones, onUbicaciones, onCollapse,
}: {
  cuadrilla: Cuadrilla;
  expanded: boolean;
  activeTab: "peones" | "ubicaciones" | null;
  onPeones: () => void;
  onUbicaciones: () => void;
  onCollapse: () => void;
}) {
  return (
    <div className="cu-cuad-wrap">
      <div className="cu-cuad__nametag">
        <Tag label={cuadrilla.categoria} state="standard" />
      </div>
      <motion.div className="cu-cuad" layout transition={springs.expanding}>
        <header className="cu-cuad__header">
          <Avatar />
          <span className="cu-cuad__name">{cuadrilla.encargado}</span>
          {expanded && (
            <button
              type="button"
              className="cu-cuad__add"
              onClick={onCollapse}
              aria-label="Agregar"
            >
              <Icon name="plus" size="md" color="var(--ds-color-black)" />
            </button>
          )}
        </header>

        <div className="cu-cuad__chips">
          <Tag
            label={`${cuadrilla.peones.length} peones`}
            state={activeTab === "peones" ? "active" : "standard"}
            onClick={onPeones}
          />
          <Tag
            label={`49 ${activeTab === "ubicaciones" ? "ubicaciones" : "proyectos"}`}
            state={activeTab === "ubicaciones" ? "active" : "standard"}
            onClick={onUbicaciones}
          />
          <Tag
            label={`${cuadrilla.actividades} actividades`}
            state="standard"
          />
        </div>

        <AnimatePresence initial={false}>
          {expanded && activeTab === "peones" && (
            <motion.ul
              key="peones"
              className="cu-cuad__list"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={springs.expanding}
            >
              {cuadrilla.peones.map((p, idx) => (
                <li key={idx} className="cu-cuad__item">
                  <Avatar />
                  <span>{p}</span>
                </li>
              ))}
            </motion.ul>
          )}
          {expanded && activeTab === "ubicaciones" && (
            <motion.ul
              key="ubicaciones"
              className="cu-cuad__list"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={springs.expanding}
            >
              {cuadrilla.ubicaciones.map((u, idx) => (
                <li key={idx} className="cu-cuad__item">
                  <span className="cu-cuad__pin" aria-hidden>
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
                      <path d="M12 21s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12Z" stroke="currentColor" strokeWidth="1.6"/>
                      <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.6"/>
                    </svg>
                  </span>
                  <span>{u}</span>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

/* ============================================================
 * Piezas comunes
 * ============================================================ */

function Drawer({ onClose, children }: { onClose: () => void; children: React.ReactNode }) {
  // Slide-in via CSS @keyframes — la posición de reposo es la visible,
  // así que aunque el browser pause la animation, el drawer queda visible.
  return (
    <>
      <div className="cu-drawer__scrim" onClick={onClose} />
      <aside className="cu-drawer" role="dialog">
        {children}
      </aside>
    </>
  );
}

function CloseIconButton({ onClick }: { onClick: () => void }) {
  return (
    <button type="button" className="cu-close" onClick={onClick} aria-label="Cerrar">
      <Icon name="close" size="md" color="var(--ds-color-black)" />
    </button>
  );
}

function PlusButton({ onClick, ariaLabel }: { onClick: () => void; ariaLabel: string }) {
  return (
    <motion.button
      type="button"
      className="cu-plus"
      onClick={onClick}
      aria-label={ariaLabel}
      whileTap={{ scale: 0.94 }}
      transition={springs.snappy}
    >
      <Icon name="plus" size="lg" color="var(--ds-color-black)" />
    </motion.button>
  );
}

/** Marcador visible para componentes ausentes en el DS. */
function DsStub({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="cu-stub" title={label} data-stub={label}>
      {children}
    </div>
  );
}

