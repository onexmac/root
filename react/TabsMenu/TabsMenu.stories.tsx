import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { TabsMenu } from "./TabsMenu";

const meta: Meta<typeof TabsMenu> = {
  title: "Nav/TabsMenu",
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
