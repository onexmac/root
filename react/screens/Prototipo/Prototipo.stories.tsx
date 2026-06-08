import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { Prototipo } from "./Prototipo";

const meta: Meta<typeof Prototipo> = {
  title: "Screens/Prototipo",
  component: Prototipo,
  parameters: {
    layout: "fullscreen",
    backgrounds: {
      default: "light",
      values: [{ name: "light", value: "#e5e5e5" }],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Prototipo>;

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
 * 🧭 Prototipo unificado — arranca en Usuarios.
 *  Click "ROLES" en el sidebar → navega a la pantalla RolesV2.
 *  Click "USUARIOS" en el sidebar de Roles → vuelve.
 *  Los chips de Roles en Usuarios.UsuarioTab vienen de RolesV2/ROLE_GROUPS.
 */
export const Default: Story = {
  name: "🧭 Prototipo — Usuarios + Roles",
  render: () => (
    <Frame>
      <Prototipo
        initialScreen="usuarios"
        usuariosProps={{ initialCollapsed: false, stepperFooter: true }}
      />
    </Frame>
  ),
};

/**
 * 🪪 Arranca en Roles. Click "USUARIOS" en el sidebar → navega a Usuarios.
 */
export const StartOnRoles: Story = {
  name: "🪪 Arranca en Roles",
  render: () => (
    <Frame>
      <Prototipo
        initialScreen="roles"
        usuariosProps={{ stepperFooter: true }}
      />
    </Frame>
  ),
};
