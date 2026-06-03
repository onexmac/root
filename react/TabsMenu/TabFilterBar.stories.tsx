import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { TabFilterChip } from "./TabsMenu";

const meta: Meta<typeof TabFilterChip> = {
  title: "Nav/TabFilterBar",
  component: TabFilterChip,
  tags: ["autodocs"],
  argTypes: {
    state:    { control: "select",  options: ["active", "disabled"] },
    label:    { control: "text" },
    icon:     { control: "select",  options: ["completado", "sin-stock", "sin-autorizar"] },
    showIcon: { control: "boolean" },
  },
  args: { state: "active", label: "Aprobado", icon: "completado", showIcon: true },
};
export default meta;
type Story = StoryObj<typeof TabFilterChip>;

export const Active:     Story = { args: { state: "active",   label: "Aprobado",  icon: "completado",    showIcon: true  } };
export const Disabled:   Story = { args: { state: "disabled", label: "Pendiente", icon: "sin-autorizar", showIcon: true  } };
export const NoIcon:     Story = { args: { state: "active",   label: "Aprobado",  showIcon: false } };

export const AllStates: StoryObj = {
  name: "All states",
  render: () => (
    <div style={{ display: "flex", gap: 8, padding: 16, flexWrap: "wrap" }}>
      <TabFilterChip label="Aprobado"  state="active"   icon="completado"    />
      <TabFilterChip label="Denegado"  state="disabled" icon="sin-stock"     />
      <TabFilterChip label="Pendiente" state="disabled" icon="sin-autorizar" />
      <TabFilterChip label="Sin icono" state="active"   showIcon={false}     />
      <TabFilterChip label="Sin icono" state="disabled" showIcon={false}     />
    </div>
  ),
};
