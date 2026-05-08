import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { SearchBar } from "./SearchBar";

const meta: Meta<typeof SearchBar> = {
  title: "Core/SearchBar",
  component: SearchBar,
  tags: ["autodocs"],
  argTypes: {
    state:  { control: "select", options: ["standard", "pressed"] },
    layout: { control: "select", options: ["label", "normal", "icon", "expanded"] },
  },
  args: { placeholder: "Buscar", state: "standard", layout: "label", label: "LADRILLO" },
};
export default meta;
type Story = StoryObj<typeof SearchBar>;

export const Label:    Story = { args: { layout: "label" } };
export const Normal:   Story = { args: { layout: "normal" } };
export const IconOnly: Story = { args: { layout: "icon" } };
export const Expanded: Story = { args: { layout: "expanded" } };
export const Pressed:  Story = { args: { state: "pressed" } };

export const AllLayouts: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, padding: 16, background: "var(--ds-color-surface)" }}>
      <SearchBar layout="label"    label="LADRILLO" />
      <SearchBar layout="normal"   placeholder="Buscar producto..." />
      <SearchBar layout="icon"     label="Buscar" />
      <SearchBar layout="expanded" label="Bodegas" />
    </div>
  ),
};
