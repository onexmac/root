import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { Icon, IconName } from "./Icon";

// Catálogo exacto del nodo Figma 1153-3008 (Losa Flotante)
const ALL_ICONS: IconName[] = [
  // Fila 1
  "home", "user", "folder", "open",
  // Fila 2
  "arrow-right", "back", "search", "go",
  // Fila 3
  "check", "list", "boleta", "traslado",
  // Fila 4
  "entrega", "sin-stock", "completado", "incompleto",
  // Fila 5
  "pendiente", "sin-autorizar", "filter", "close",
  // Fila 6
  "edit", "info", "plus", "minus",
  // Fila 7
  "delete", "place", "alert", "remove",
  // Fila 8
  "calculator", "cuadrillas", "rol",
];

// Labels del Figma para el gallery
const ICON_LABELS: Partial<Record<IconName, string>> = {
  home: "Home", user: "User", folder: "Folder", open: "Open",
  "arrow-right": "Arrow", back: "Back", search: "Lens", go: "Go",
  check: "Good", list: "List", boleta: "Boleta", traslado: "Traslado",
  entrega: "Entrega", "sin-stock": "Sin stock", completado: "Completado", incompleto: "Incompleto",
  pendiente: "Pendiente", "sin-autorizar": "Sin autorizar", filter: "Filter", close: "Close",
  edit: "Edit", info: "Info", plus: "Add", minus: "Minus",
  delete: "Delete", place: "Place", alert: "Warning", remove: "Remove",
  calculator: "Calculator", cuadrillas: "Cuadrillas", rol: "Rol",
};

const meta: Meta<typeof Icon> = {
  title: "Sistema de Diseño/Icon",
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


