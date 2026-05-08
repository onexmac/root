import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { Icon, IconName } from "./Icon";

const ALL_ICONS: IconName[] = [
  "search", "back", "forward", "close", "filter",
  "chevron-up", "chevron-down", "check", "home",
  "plus", "minus", "menu", "alert", "info", "stock", "arrow-right",
];

const meta: Meta<typeof Icon> = {
  title: "Core/Icon",
  component: Icon,
  tags: ["autodocs"],
  argTypes: {
    name: { control: "select", options: ALL_ICONS },
    size: { control: "select", options: ["sm", "md", "lg"] },
  },
  args: { name: "home", size: "md" },
};
export default meta;
type Story = StoryObj<typeof Icon>;

export const Default: Story = {};

export const Gallery: Story = {
  render: () => (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: 16, padding: 16,
    }}>
      {ALL_ICONS.map((name) => (
        <div key={name} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, padding: 12, border: "1px solid var(--ds-color-gray-100)", borderRadius: 8 }}>
          <Icon name={name} size="lg" />
          <code style={{ fontSize: 12 }}>{name}</code>
        </div>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
      <Icon name="home" size="sm" />
      <Icon name="home" size="md" />
      <Icon name="home" size="lg" />
    </div>
  ),
};
