import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { Slab } from "./Slab";
import { PhoneFrame, TabletFrame } from "../../../.storybook/DeviceFrame";

const meta: Meta<typeof Slab> = {
  title: "Screens/Slab",
  component: Slab,
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
type Story = StoryObj<typeof Slab>;

/**
 * 📱 Vista en marco de iPhone — para presentaciones y docs.
 */
export const Mobile: Story = {
  name: "📱 Mobile — iPhone 16",
  decorators: [
    (Story) => (
      <PhoneFrame>
        <Story />
      </PhoneFrame>
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
 * 🧪 Prueba de usuario — abre este link o escanea el QR en un celular real.
 * Se ve a pantalla completa, sin marcos, como una app nativa.
 */
export const UserTest: Story = {
  name: "🧪 Prueba de Usuario (QR)",
  parameters: {
    layout: "fullscreen",
    backgrounds: { disable: true },
    viewport: { defaultViewport: "iphone16" },
  },
  decorators: [
    (Story) => (
      <div style={{
        width: "100vw",
        height: "100dvh",
        overflow: "hidden",
        background: "#f3f3f3",
        display: "flex",
        alignItems: "center",
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
    layout: "centered",
    backgrounds: { default: "light" },
  },
};
