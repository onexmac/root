import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { Usuarios } from "./Usuarios";

const meta: Meta<typeof Usuarios> = {
  title: "Screens/Usuarios",
  component: Usuarios,
  parameters: {
    layout: "fullscreen",
    backgrounds: {
      default: "light",
      values: [{ name: "light", value: "#e5e5e5" }],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Usuarios>;

const Frame: React.FC<React.PropsWithChildren> = ({ children }) => (
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
    {children}
  </div>
);

/**
 * 🖥 U01 — Lista base, sidebar expandido.
 *
 *  • Hover sobre badge verde → tooltip "Activo".
 *  • Hover sobre badge gris  → tooltip "Inactivo".
 *  • Hover sobre header de columna → pill negro (U02).
 *  • Click sobre header → popover de filtrado (U03).
 *  • Hover sobre kebab ⋮ → chip "Editar" (U02 fila 1).
 *  • Hover sobre fila → fondo gris (U02 fila 4).
 *  • Click sobre fila → drawer derecho (U04/U05/U06/U07).
 */
export const Desktop: Story = {
  name: "🖥 U01 — Desktop",
  render: () => (
    <Frame>
      <Usuarios />
    </Frame>
  ),
};

/**
 * 🗂 U02 — Sidebar colapsado (icon-only).
 */
export const Collapsed: Story = {
  name: "🗂 U02 — Sidebar colapsado",
  render: () => (
    <Frame>
      <Usuarios initialCollapsed />
    </Frame>
  ),
};

/**
 * 🔎 U03 — Popover de filtrado sobre columna "Rol".
 */
export const FilterOpen: Story = {
  name: "🔎 U03 — Filtro abierto",
  render: () => (
    <Frame>
      <Usuarios initialCollapsed initialFilter="rol" />
    </Frame>
  ),
};

/**
 * 📋 U04 — Drawer derecho abierto sobre detalle de Juan.
 *  Navegar entre tabs Personal / Puesto / Usuario con los chips
 *  o con los botones ◀ ▶ del footer.
 */
export const DrawerOpen: Story = {
  name: "📋 U04–U07 — Drawer abierto",
  render: () => (
    <Frame>
      <Usuarios initialCollapsed initialDrawer />
    </Frame>
  ),
};

/**
 * ✏️ U08–U011 — Drawer en modo edición.
 *  Inputs editables, ToggleCards negros y footer Cancelar + Guardar.
 */
export const EditMode: Story = {
  name: "✏️ U08–U011 — Drawer editar",
  render: () => (
    <Frame>
      <Usuarios initialCollapsed initialEditMode />
    </Frame>
  ),
};

/**
 * ➕ U012–U017 — Drawer en modo creación.
 *  Header "NUEVO USUARIO", inputs vacíos con Placeholder/Label, CTA "Crear usuario".
 *  También accesible click → botón + arriba a la derecha en Usuarios.
 */
export const CreateMode: Story = {
  name: "➕ U012–U017 — Nuevo usuario",
  render: () => (
    <Frame>
      <Usuarios initialCollapsed initialCreateMode />
    </Frame>
  ),
};

/**
 * 📅 U014 — CreateMode, tab Personal/Datos.
 *  El campo "Fecha de nacimiento" arranca cerrado; al click en el dropdown se
 *  despliega el calendario como overlay (la interfaz no se mueve). Click en un
 *  día → cierra calendario y guarda el valor.
 */
export const UsuariosV02: Story = {
  name: "usuariosV02",
  render: () => (
    <Frame>
      <Usuarios initialCollapsed initialCreateMode />
    </Frame>
  ),
};
