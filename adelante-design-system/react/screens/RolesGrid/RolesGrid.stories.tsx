import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { RolesGrid } from "./RolesGrid";

const meta: Meta<typeof RolesGrid> = {
  title: "Screens/Roles Grid",
  component: RolesGrid,
  parameters: {
    layout: "fullscreen",
    backgrounds: { default: "light", values: [{ name: "light", value: "#e5e5e5" }] },
  },
};

export default meta;
type Story = StoryObj<typeof RolesGrid>;

const Frame = ({ collapsed = false }: { collapsed?: boolean }) => (
  <div
    style={{
      width: "100vw",
      minHeight: "100dvh",
      background: "#e5e5e5",
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "center",
      padding: 24,
    }}
  >
    <RolesGrid initialCollapsed={collapsed} />
  </div>
);

/**
 * 🖥 Roles & Permisos — grid de cards (RR01–RR06).
 *
 *  • Sidebar colapsa/expande (icono `menu`) — mismo patrón que Roles.
 *  • Cada card se expande con el ToggleCards → muestra todos los
 *    permisos con pills ver/editar (RR05).
 *  • Icono editar (esquina sup. der.) → modo edición: togglear
 *    selectores + pills, eliminar filas (hover "Eliminar"). El icono
 *    se vuelve check para guardar (hover "Guardar"). Hover en editar
 *    muestra "Editar".
 *  • "+" despliega un dropdown con permisos disponibles (RR04).
 */
export const Desktop: Story = {
  name: "🖥 RR01 — sidebar expandido",
  render: () => <Frame />,
};

export const Collapsed: Story = {
  name: "🖥 RR06 — sidebar colapsado",
  render: () => <Frame collapsed />,
};

export const Bare: Story = {
  name: "🔍 Sin marco",
};
