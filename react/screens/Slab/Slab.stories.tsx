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

/** Vista en marco de iPhone 16 */
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
  parameters: { backgrounds: { default: "light" } },
};
