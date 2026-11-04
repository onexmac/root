import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { Boletas } from "./Boletas";
import { DesktopFrame, TabletFrame } from "../../../.storybook/DeviceFrame";

const meta: Meta<typeof Boletas> = {
  title: "Screens/Boletas",
  component: Boletas,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "dark",
      values: [
        { name: "dark",  value: "#111" },
        { name: "light", value: "#e5e5e5" },
      ],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Boletas>;

/**
 * 🖥️ Vista en marco de navegador desktop — para presentaciones y docs.
 */
export const Desktop: Story = {
  name: "🖥️ Desktop — Navegador",
  decorators: [
    (Story) => (
      <DesktopFrame>
        <Story />
      </DesktopFrame>
    ),
  ],
};

/**
 * 🪟 Vista en marco de iPad.
 */
export const Tablet: Story = {
  name: "🪟 Tablet — iPad",
  decorators: [
    (Story) => (
      <TabletFrame>
        <Story />
      </TabletFrame>
    ),
  ],
};

/**
 * 🧪 Prueba de usuario — comparte este link para pruebas en desktop real.
 * Se ve a pantalla completa como una app web.
 */
export const UserTest: Story = {
  name: "🧪 Prueba de Usuario (link)",
  parameters: {
    layout: "fullscreen",
    backgrounds: { disable: true },
    viewport: { defaultViewport: "desktop" },
  },
  decorators: [
    (Story) => (
      <div style={{
        width: "100vw",
        minHeight: "100vh",
        background: "#f3f3f3",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
      }}>
        <Story />
      </div>
    ),
  ],
};

/**
 * 🔍 Sin marco — útil para inspeccionar estilos.
 */
export const Bare: Story = {
  name: "🔍 Sin marco",
  parameters: {
    layout: "fullscreen",
    backgrounds: { default: "light" },
  },
};
