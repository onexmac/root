import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { Roles } from "./Roles";

const meta: Meta<typeof Roles> = {
  title: "Screens/Roles",
  component: Roles,
  parameters: {
    layout: "fullscreen",
    backgrounds: { default: "light", values: [{ name: "light", value: "#e5e5e5" }] },
  },
};

export default meta;
type Story = StoryObj<typeof Roles>;

/**
 * 🖥 Prototipo desktop — Roles & Permisos (r01–r05 unificadas).
 *
 *  • Sidebar colapsa/expande (icono `menu`).
 *  • Dropdown de categoría (CAMPO / OFICINA / LOGÍSTICA / GERENCIA).
 *  • Checkbox activa / desactiva cada permiso.
 *  • Hover en botón editar → "Editar".
 *  • Click en editar (icono o "Editar permisos") → modo edición (r04):
 *      – aparecen selectors extra y el icono `delete` con hover "Eliminar".
 *      – "Guardar cambios" confirma; "Cancelar" descarta.
 *  • "Agregar permisos" abre modal (r05) para crear un permiso nuevo.
 */
export const Desktop: Story = {
  name: "🖥 Desktop — 1440 × 1024",
  render: () => (
    <div
      style={{
        width: "100vw",
        minHeight: "100dvh",
        background: "#e5e5e5",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
      }}
    >
      <Roles />
    </div>
  ),
};

/**
 * 🔍 Sin marco — sólo el componente.
 */
export const Bare: Story = {
  name: "🔍 Sin marco",
};

/**
 * 🆕 R02 → R06 — Agregar rol (sidebar colapsado).
 *
 *  • Estado inicial: r02 (sidebar colapsado, view mode).
 *  • Click en el botón `+` del topbar → abre el popover r06
 *    "Agregar rol" (sin scrim, anclado bajo el +, chevron-down
 *    para cerrar).
 *  • Campos: `Nombre del rol` (FormField) + `Categoría`
 *    (SelectionDropdown).
 *  • "Agregar" actualiza la categoría visible y cierra el popover.
 */
export const AddRole: Story = {
  name: "🆕 R02 → R06 — Agregar rol",
  render: () => (
    <div
      style={{
        width: "100vw",
        minHeight: "100dvh",
        background: "#e5e5e5",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
      }}
    >
      <Roles initialCollapsed />
    </div>
  ),
};
