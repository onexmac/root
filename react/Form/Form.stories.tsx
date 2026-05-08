import type { Meta, StoryObj } from "@storybook/react-vite";
import React, { useState } from "react";
import { FormField, CheckBox, Tag, ProgressBar, OptionLabel } from "./Form";

// ── FormField ──
const meta: Meta<typeof FormField> = {
  title: "Core/Form/FormField",
  component: FormField,
  tags: ["autodocs"],
  argTypes: {
    state: { control: "select", options: ["standard", "active", "x", "ayuda", "advertencia", "disabled"] },
  },
  args: { label: "Nombre", placeholder: "Escribir aquí", state: "standard" },
};
export default meta;
type Story = StoryObj<typeof FormField>;

export const Standard:    Story = { args: { state: "standard" } };
export const Active:      Story = { args: { state: "active",   value: "Texto activo" } };
export const WithClear:   Story = { args: { state: "x",        value: "Texto borrable" } };
export const Ayuda:       Story = { args: { state: "ayuda",    helperText: "Este es un texto de ayuda" } };
export const Advertencia: Story = { args: { state: "advertencia", helperText: "Este campo es obligatorio" } };
export const Disabled:    Story = { args: { state: "disabled", value: "No editable" } };

export const AllStates: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, padding: 16 }}>
      <FormField state="standard"    label="standard" />
      <FormField state="active"      label="active"   value="Texto activo" />
      <FormField state="x"           label="x"        value="Texto borrable" />
      <FormField state="ayuda"       label="ayuda" />
      <FormField state="advertencia" label="advertencia" />
      <FormField state="disabled"    label="disabled" value="No editable" />
    </div>
  ),
};

// ── CheckBox ──
export const CheckBoxAll: StoryObj = {
  name: "CheckBox / All states",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, padding: 16 }}>
      <CheckBox state="add"      label="Agregar opción" />
      <CheckBox state="remove"   label="Remover opción" />
      <CheckBox state="standard" label="Opción estándar" />
      <CheckBox state="disabled" label="Opción deshabilitada" />
    </div>
  ),
};

export const CheckBoxInteractive: StoryObj = {
  name: "CheckBox / Interactive",
  render: () => {
    const [c, setC] = useState(false);
    return <CheckBox label="Acepto los términos" checked={c} onChange={setC} />;
  },
};

// ── Tag ──
export const TagAll: StoryObj = {
  name: "Tag / All states",
  render: () => (
    <div style={{ display: "flex", gap: 12, padding: 16 }}>
      <Tag state="active"   label="Activo" />
      <Tag state="standard" label="Estándar" />
    </div>
  ),
};

// ── ProgressBar ──
export const ProgressAll: StoryObj = {
  name: "ProgressBar / All steps",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, padding: 16 }}>
      {[0, 25, 50, 75, 100].map((p) => (
        <ProgressBar key={p} progress={p} label={`Paso ${p / 25 + 1}`} />
      ))}
    </div>
  ),
};

// ── OptionLabel ──
export const OptionLabelAll: StoryObj = {
  name: "OptionLabel / All states",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, padding: 16 }}>
      <OptionLabel state="active"   label="Opción activa" />
      <OptionLabel state="standard" label="Opción estándar" />
      <OptionLabel state="disabled" label="Opción deshabilitada" />
    </div>
  ),
};
