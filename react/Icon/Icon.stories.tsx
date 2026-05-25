import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { Icon, IconName } from "./Icon";

// Catálogo exacto del Figma (Losa Flotante) — orden idéntico
const ALL_ICONS: IconName[] = [
  "home", "filter", "user", "close",
  "folder", "edit", "open", "info",
  "arrow-right", "plus", "back", "minus",
  "search", "delete", "go", "place",
  "good", "alert", "list", "remove",
  "boleta", "calculator", "traslado", "cuadrillas",
  "entrega", "rol", "sin-stock", "options",
  "completado", "menu", "incompleto",
  "pendiente", "sin-autorizar",
];

// Labels del Figma para el gallery
const ICON_LABELS: Partial<Record<IconName, string>> = {
  home: "Home", filter: "Filter", user: "User", close: "Close",
  folder: "Folder", edit: "Edit", open: "Open", info: "Info",
  "arrow-right": "Arrow", plus: "Add", back: "Back", minus: "Minus",
  search: "Lens", delete: "Delete", go: "Go", place: "place",
  good: "Good", alert: "Warning", list: "List", remove: "Remove",
  boleta: "Boleta", calculator: "Calculator", traslado: "Traslado", cuadrillas: "Cuadrillas",
  entrega: "Entrega", rol: "Rol", "sin-stock": "Sin stock", options: "options",
  completado: "Completado", menu: "menu", incompleto: "Incompleto",
  pendiente: "Pendiente", "sin-autorizar": "Sin autorizar",
};

const meta: Meta<typeof Icon> = {
  title: "Icons/Icon",
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
  name: "Catálogo completo (Figma)",
  render: () => (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: 16, padding: 16,
      background: "var(--ds-color-surface)",
    }}>
      {ALL_ICONS.map((name) => (
        <div key={name} style={{
          display: "flex", flexDirection: "column", alignItems: "center",
          gap: 8, padding: 12, background: "white",
          border: "1px solid var(--ds-color-gray-100)", borderRadius: 8,
        }}>
          <Icon name={name} size="lg" />
          <code style={{ fontSize: 11, color: "var(--ds-color-gray-500)" }}>
            {ICON_LABELS[name] ?? name}
          </code>
        </div>
      ))}
    </div>
  ),
};


