import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { SlideButton } from "./SlideButton";

const meta: Meta<typeof SlideButton> = {
  title: "Sistema de Diseño/SlideButton",
  component: SlideButton,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  args: {
    label: "Pedir",
    confirmedLabel: "Confirmado",
    onConfirm: () => console.log("confirmed"),
  },
};

export default meta;
type Story = StoryObj<typeof SlideButton>;

export const Default: Story = {};

export const Disabled: Story = {
  args: { disabled: true, disabledLabel: "No disponible" },
};

export const AllStates: Story = {
  name: "SlideButton / All states",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 32, padding: 24 }}>
      <div>
        <p style={{ margin: "0 0 8px", fontSize: 12, color: "#5d636c" }}>Standard</p>
        <SlideButton label="Pedir" onConfirm={() => console.log("confirmed")} />
      </div>
      <div>
        <p style={{ margin: "0 0 8px", fontSize: 12, color: "#5d636c" }}>Disabled</p>
        <SlideButton label="Pedir" onConfirm={() => {}} disabled />
      </div>
    </div>
  ),
};
