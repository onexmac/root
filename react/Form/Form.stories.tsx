import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { FormField, CheckBox, Tag, ProgressBar, OptionLabel } from "./Form";

// ── FormField ──
const meta: Meta<typeof FormField> = {
  title: "Sistema de Diseño/Form",
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
      <CheckBox state="add"      label="option label" />
      <CheckBox state="remove"   label="option label" />
      <CheckBox state="standard" label="option label" />
      <CheckBox state="disabled" label="option label" />
    </div>
  ),
};

// ── Tag ──
export const TagAll: StoryObj = {
  name: "Tag / All states",
  render: () => (
    <div style={{ display: "flex", gap: 12, padding: 16 }}>
      <Tag state="active"   label="Label" />
      <Tag state="standard" label="Label" />
    </div>
  ),
};

// ── ProgressBar ──
export const ProgressAll: StoryObj = {
  name: "ProgressBar / All steps",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 32, padding: 24 }}>
      <ProgressBar progress={0} label="0% completado" description="Faltan 4 materiales" />
      <ProgressBar progress={25}  label="25% completado"  description="Faltan 4 materiales" />
      <ProgressBar progress={50}  label="50% completado"  description="Faltan 4 materiales" />
      <ProgressBar progress={75}  label="75% completado"  description="Faltan 4 materiales" />
      <ProgressBar progress={100} label="100% completado" />
    </div>
  ),
};

// ── OptionLabel ──
export const OptionLabelAll: StoryObj = {
  name: "OptionLabel / All states",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, padding: 16 }}>
      <OptionLabel state="active"   label="option label" />
      <OptionLabel state="standard" label="option label" />
      <OptionLabel state="disabled" label="option label" />
    </div>
  ),
};
