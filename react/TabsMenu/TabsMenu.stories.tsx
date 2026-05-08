import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { TabsMenu, TabFilterChip, FilterBar } from "./TabsMenu";

const meta: Meta<typeof TabsMenu> = {
  title: "Core/TabsMenu",
  component: TabsMenu,
  tags: ["autodocs"],
  argTypes: {
    state:  { control: "select", options: ["standard", "pressed"] },
    layout: { control: "select", options: ["label", "label+icon"] },
    icon:   { control: "select", options: ["home", "check", "stock"] },
  },
  args: { label: "Boleta", state: "standard", layout: "label+icon", icon: "home" },
};
export default meta;
type Story = StoryObj<typeof TabsMenu>;

export const Label:        Story = { args: { layout: "label" } };
export const LabelWithIcon: Story = { args: { layout: "label+icon" } };
export const Pressed:      Story = { args: { state: "pressed" } };

export const All: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, padding: 16 }}>
      <TabsMenu label="Boleta"   state="standard" layout="label+icon" icon="home" />
      <TabsMenu label="Boleta"   state="pressed"  layout="label+icon" icon="home" />
      <TabsMenu label="Opciones" state="standard" layout="label" />
      <TabsMenu label="Opciones" state="pressed"  layout="label" />
    </div>
  ),
};

export const FilterChips: StoryObj = {
  name: "TabFilterChip / All states",
  render: () => (
    <div style={{ display: "flex", gap: 12, padding: 16 }}>
      <TabFilterChip label="Aprobado"  state="active"   icon="check" />
      <TabFilterChip label="Denegado"  state="disabled" icon="close" />
      <TabFilterChip label="Pendiente" state="disabled" icon="alert" />
    </div>
  ),
};

export const FilterBarExample: StoryObj = {
  name: "FilterBar",
  render: () => (
    <FilterBar chips={[
      { label: "Aprobado",  state: "active",   icon: "check" },
      { label: "Denegado",  state: "disabled", icon: "close" },
      { label: "Pendiente", state: "disabled", icon: "alert" },
    ]} />
  ),
};
