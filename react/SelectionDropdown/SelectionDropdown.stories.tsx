import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { SelectionDropdown } from "./SelectionDropdown";

const meta: Meta<typeof SelectionDropdown> = {
  title: "Sistema de Diseño/SelectionDropdown",
  component: SelectionDropdown,
  parameters: { layout: "centered" },
  decorators: [
    (Story) => (
      <div style={{ width: 400, padding: 24, background: "#f3f3f3" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof SelectionDropdown>;

const SAMPLE_ITEMS = [
  { label: "LADRILLO", onClick: () => console.log("Ladrillo") },
  { label: "CEMENTO",  onClick: () => console.log("Cemento") },
  { label: "VARILLA",  onClick: () => console.log("Varilla") },
  { label: "ARENA",    onClick: () => console.log("Arena") },
];

export const Compressed: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    return <SelectionDropdown {...args} isOpen={isOpen} onToggle={() => setIsOpen(!isOpen)} />;
  },
  args: {
    label: "Tipo de material",
    items: SAMPLE_ITEMS,
  },
};

export const Expanded: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(true);
    return <SelectionDropdown {...args} isOpen={isOpen} onToggle={() => setIsOpen(!isOpen)} />;
  },
  args: {
    label: "Tipo de material",
    items: SAMPLE_ITEMS,
  },
};

