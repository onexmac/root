import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { TabFilterChip, FilterBar } from "./TabsMenu";

const meta: Meta<typeof FilterBar> = {
  title: "Nav",
  component: FilterBar,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof FilterBar>;

export const Default: Story = {
  args: {
    chips: [
      { label: "Aprobado",  state: "active",   icon: "completado"    },
      { label: "Denegado",  state: "disabled", icon: "sin-stock"     },
      { label: "Pendiente", state: "disabled", icon: "sin-autorizar" },
    ],
  },
};

export const TabFilterBarActive: StoryObj = {
  name: "TabFilterBar / active",
  render: () => (
    <TabFilterChip label="Aprobado" state="active" icon="completado" />
  ),
};

export const TabFilterBarDisabled: StoryObj = {
  name: "TabFilterBar / disabled",
  render: () => (
    <TabFilterChip label="Pendiente" state="disabled" icon="sin-autorizar" />
  ),
};

export const AllStates: StoryObj = {
  name: "TabFilterBar / all states",
  render: () => (
    <div style={{ display: "flex", gap: 8, padding: 16 }}>
      <TabFilterChip label="Aprobado"  state="active"   icon="completado"    />
      <TabFilterChip label="Denegado"  state="disabled" icon="sin-stock"     />
      <TabFilterChip label="Pendiente" state="disabled" icon="sin-autorizar" />
    </div>
  ),
};
