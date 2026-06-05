/* ============================================================
 * RolesV2 — mock data (R01–R07)
 * ============================================================ */

export type RoleId = string;

export interface RoleItem {
  id: RoleId;
  label: string; // "Losa" | "Muros" | "Soldadura" | …
}

export interface RoleGroup {
  id: string;
  title: string; // "Líder" | "Maestro de obras" | "Transportista"
  defaultOpen: boolean;
  items: RoleItem[];
}

export interface PermissionItem {
  id: string;
  label: string;
  checked: boolean;
}

export interface PermissionSection {
  id: string;
  title: string;
  defaultOpen: boolean;
  items: PermissionItem[];
}

export type KebabAction = "editar" | "duplicar" | "eliminar";

export interface KebabItem {
  action: KebabAction;
  label: string;
  icon: "edit" | "duplicar" | "delete";
  disabled?: boolean;
}

// ── Sidebar Apps dropdown ─────────────────────────────────────

export const APPS = ["Boletas", "Asistencia", "Vacaciones", "Reportes"];

// ── Role groups (left column) ─────────────────────────────────
// Figma R01-R05: only "Líder" group is open (Losa active).
// R06-R07: same shape, but "Muros" item is the active one.
// We render the full set in either case; only the active id differs.

export const ROLE_GROUPS: RoleGroup[] = [
  {
    id: "lider",
    title: "Líder",
    defaultOpen: true,
    items: [
      { id: "lider-losa",      label: "Losa" },
      { id: "lider-muros",     label: "Muros" },
      { id: "lider-soldadura", label: "Soldadura" },
    ],
  },
  {
    id: "maestro",
    title: "Maestro de obras",
    defaultOpen: false,
    items: [
      { id: "maestro-fundaciones", label: "Fundaciones" },
      { id: "maestro-muros",       label: "Muros" },
    ],
  },
  {
    id: "transportista",
    title: "Transportista",
    defaultOpen: false,
    items: [
      { id: "trans-general", label: "General" },
    ],
  },
];

// ── Permission sections (right card body) ─────────────────────
// Figma:
//   Boletas de salida (open)   → 8 rows (first 4 checked)
//   Boletas de entrega (closed)
//   Boletas de tralado (open)  → 1 row (unchecked)

export const PERMISSION_SECTIONS: PermissionSection[] = [
  {
    id: "salida",
    title: "Boletas de salida",
    defaultOpen: true,
    items: [
      { id: "salida-1", label: "Solicitar materiales para obra",  checked: true },
      { id: "salida-2", label: "Corregir boleta rechazada",       checked: true },
      { id: "salida-3", label: "Modificar borrador de boleta",    checked: true },
      { id: "salida-4", label: "Ajustar materiales en revisión",  checked: true },
      { id: "salida-5", label: "Eliminar boleta del sistema",     checked: false },
      { id: "salida-6", label: "Consultar detalle de boleta",     checked: false },
      { id: "salida-7", label: "Enviar boleta al maestro",        checked: false },
      { id: "salida-8", label: "Rechazar boleta con observación", checked: false },
    ],
  },
  {
    id: "entrega",
    title: "Boletas de entrega",
    defaultOpen: false,
    items: [],
  },
  {
    id: "tralado",
    title: "Boletas de tralado",
    defaultOpen: true,
    items: [
      { id: "tralado-1", label: "Confirmar entrega de devolución en almacén", checked: false },
    ],
  },
];

// ── Kebab menu (R02) ──────────────────────────────────────────

export const KEBAB_ITEMS: KebabItem[] = [
  { action: "editar",   label: "Editar",   icon: "edit" },
  { action: "duplicar", label: "Duplicar", icon: "duplicar" },
  { action: "eliminar", label: "Eliminar", icon: "delete", disabled: true },
];

// ── Role modal (R04 edit / R05 create) ────────────────────────

export const EDIT_ROLE_PREFILL = {
  app: "Boletas",
  name: "Líder",
  area: "Losa",
};

export const AREA_OPTIONS = ["Losa", "Muros", "Soldadura", "Fundaciones", "General"];

// ── Add-permission popover (R07) ──────────────────────────────

export const PERMISSION_LABEL_OPTIONS = [
  "Solicitar materiales para obra",
  "Corregir boleta rechazada",
  "Modificar borrador de boleta",
  "Ajustar materiales en revisión",
];
