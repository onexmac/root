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

/** Vista en marco de navegador desktop */
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

/** Vista en marco de iPad */
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

/** Componente sin marco — útil para inspeccionar */
export const Bare: Story = {
  name: "🔍 Sin marco",
  parameters: { backgrounds: { default: "light" }, layout: "fullscreen" },
};
