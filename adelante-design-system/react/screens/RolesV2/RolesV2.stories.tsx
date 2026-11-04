import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { RolesV2 } from "./RolesV2";

const meta: Meta<typeof RolesV2> = {
  title: "Screens/RolesV02",
  component: RolesV2,
  parameters: {
    layout: "fullscreen",
    backgrounds: {
      default: "light",
      values: [{ name: "light", value: "#e5e5e5" }],
    },
  },
};

export default meta;
type Story = StoryObj<typeof RolesV2>;

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
 * 🖥 R01 — Base. Sidebar colapsado, grupo "Líder/Losa" activo, search cerrado.
 *  · Click kebab → popover R02
 *  · Click search icon → expande a R03
 *  · Click FAB list → morph a pill R06 → click pill → popover R07
 *  · Click + topbar → modal NUEVO ROL (R05)
 */
export const Desktop: Story = {
  name: "🖥 R01 — Base",
  render: () => (
    <Frame>
      <RolesV2 />
    </Frame>
  ),
};

/**
 * ⋮ R02 — Kebab abierto (Editar / Duplicar / Eliminar disabled).
 */
export const KebabOpen: Story = {
  name: "⋮ R02 — Opciones de rol",
  render: () => (
    <Frame>
      <RolesV2 initialKebabOpen />
    </Frame>
  ),
};

/**
 * 🔎 R03.1 — Search cerrado (icono DS).
 *  Estado idéntico a R01: SearchBar layout="icon" en la esquina superior
 *  derecha del card. Click sobre el icono → expande a R03.2.
 */
export const SearchClosed: Story = {
  name: "🔎 R03.1 — Search cerrado",
  render: () => (
    <Frame>
      <RolesV2 />
    </Frame>
  ),
};

/**
 * 🔍 R03.2 — Search expandido full-width (DS SearchBar layout="label").
 *  La pill ocupa el ancho del body del card; el header "Boletas de salida"
 *  y la lista de permisos se desplazan hacia abajo ~90px (motion spring).
 */
export const SearchOpen: Story = {
  name: "🔍 R03.2 — Búsqueda expandida",
  render: () => (
    <Frame>
      <RolesV2 initialSearchOpen />
    </Frame>
  ),
};

/**
 * ✏️ R04 — Modal "Líder de losa" (edit), Apps + Nombre + Área prellenados.
 */
export const EditRole: Story = {
  name: "✏️ R04 — Editar rol",
  render: () => (
    <Frame>
      <RolesV2 initialModal="edit" />
    </Frame>
  ),
};

/**
 * ➕ R05 — Modal "NUEVO ROL" (create), placeholders vacíos.
 */
export const CreateRole: Story = {
  name: "➕ R05 — Nuevo rol",
  render: () => (
    <Frame>
      <RolesV2 initialModal="create" />
    </Frame>
  ),
};

/**
 * 🟢 R06 — FAB inferior morphed a "+ Agregar permiso" pill negra.
 *  Grupo "Muros" activo (Maestro de obras / Líder).
 */
export const AddPermPill: Story = {
  name: "🟢 R06 — Agregar permiso (pill)",
  render: () => (
    <Frame>
      <RolesV2
        initialAddPermStage="pill"
        initialActiveRoleId="lider-muros"
      />
    </Frame>
  ),
};

/**
 * 📝 R07 — Popover "Agregar permiso" abierto sobre la pill.
 */
export const AddPermPopover: Story = {
  name: "📝 R07 — Agregar permiso (popover)",
  render: () => (
    <Frame>
      <RolesV2
        initialAddPermStage="popover"
        initialActiveRoleId="lider-muros"
      />
    </Frame>
  ),
};
