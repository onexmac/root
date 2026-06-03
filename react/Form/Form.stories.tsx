import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { FormField, CheckBox, OptionsExtra, Tag, ProgressBar, OptionLabel } from "./Form";

// ─── formField — nombres de stories alineados a Figma (state: ...) ─────────────
const meta: Meta<typeof FormField> = {
  title: "Form/Form",
  component: FormField,
  tags: ["autodocs"],
  argTypes: {
    state: { control: "select", options: ["standard", "active", "x", "ayuda", "advertencia", "disabled"] },
  },
  args: { label: "Nombre", placeholder: "Escribir aquí", state: "standard" },
};
export default meta;
type Story = StoryObj<typeof FormField>;

export const Standard:    Story = { name: "formField / state: standard",    args: { state: "standard" } };
export const Active:      Story = { name: "formField / state: active",      args: { state: "active",      value: "Texto activo" } };
export const X:           Story = { name: "formField / state: x",           args: { state: "x" } };
export const Ayuda:       Story = { name: "formField / state: ayuda",       args: { state: "ayuda",       helperText: "Mensaje de ayuda" } };
export const Advertencia: Story = { name: "formField / state: advertencia", args: { state: "advertencia", helperText: "Mensaje de advertencia" } };
export const Disabled:    Story = { name: "formField / state: disabled",    args: { state: "disabled",    value: "No editable" } };

export const AllStates: Story = {
  name: "formField / All states",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, padding: 16 }}>
      <FormField state="ayuda"       label="Nombre" helperText="Mensaje de ayuda" />
      <FormField state="advertencia" label="Nombre" helperText="Mensaje de advertencia" />
      <FormField state="standard"    label="Nombre" />
      <FormField state="active"      label="Nombre" />
      <FormField state="disabled"    label="Nombre" />
      <FormField state="x"           label="Nombre" />
    </div>
  ),
};

// ─── checkBox ─────────────────────────────────────────────────────────────────
export const CheckBoxDisabled: StoryObj = { name: "checkBox / state: disabled", render: () => <CheckBox state="disabled" label="option label" /> };
export const CheckBoxChecked:  StoryObj = { name: "checkBox / state: checked",  render: () => <CheckBox state="checked"  label="option label" /> };
export const CheckBoxHover:    StoryObj = { name: "checkBox / state: hover",    render: () => <CheckBox state="hover"    label="option label" /> };
export const CheckBoxStandard: StoryObj = { name: "checkBox / state: standard", render: () => <CheckBox state="standard" label="option label" /> };
export const CheckBoxAll: StoryObj = {
  name: "checkBox / All states",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, padding: 16 }}>
      <CheckBox state="disabled" label="option label" />
      <CheckBox state="checked"  label="option label" />
      <CheckBox state="hover"    label="option label" />
      <CheckBox state="standard" label="option label" />
    </div>
  ),
};

// ─── optionsExtra ─────────────────────────────────────────────────────────────────
export const OptionsExtraAdd:      StoryObj = { name: "optionsExtra / state: add",      render: () => <OptionsExtra state="add"      label="option label" /> };
export const OptionsExtraRemove:   StoryObj = { name: "optionsExtra / state: remove",   render: () => <OptionsExtra state="remove"   label="option label" /> };
export const OptionsExtraStandard: StoryObj = { name: "optionsExtra / state: standard", render: () => <OptionsExtra state="standard" label="option label" /> };
export const OptionsExtraDisabled: StoryObj = { name: "optionsExtra / state: disabled", render: () => <OptionsExtra state="disabled" label="option label" /> };
export const OptionsExtraAll: StoryObj = {
  name: "optionsExtra / All states",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, padding: 16 }}>
      <OptionsExtra state="add"      label="option label" />
      <OptionsExtra state="remove"   label="option label" />
      <OptionsExtra state="standard" label="option label" />
      <OptionsExtra state="disabled" label="option label" />
    </div>
  ),
};

// ─── selectors (Tag en código) ────────────────────────────────────────────────
export const TagActive:    StoryObj = { name: "selectors / state: active",   render: () => <Tag state="active"   label="Label" /> };
export const TagDisabled:  StoryObj = { name: "selectors / state: disabled", render: () => <Tag state="disabled" label="Label" /> };
export const TagStandard:  StoryObj = { name: "selectors / state: standard", render: () => <Tag state="standard" label="Label" /> };
export const TagLabelIcon: StoryObj = { name: "selectors / label+icon",      render: () => <Tag state="active" layout="label+icon" icon="info" label="Label" /> };
export const TagLabel:     StoryObj = { name: "selectors / label",           render: () => <Tag layout="label" label="Label" /> };
export const TagAll: StoryObj = {
  name: "selectors / All states",
  render: () => (
    <div style={{ display: "flex", gap: 12, padding: 16 }}>
      <Tag state="active"   label="Label" />
      <Tag state="standard" label="Label" />
      <Tag state="disabled" label="Label" />
    </div>
  ),
};

// ─── progressBar ──────────────────────────────────────────────────────────────
export const Progress0:   StoryObj = { name: "progressBar / 0%",   render: () => <ProgressBar progress={0}   label="0% completado"   description="Faltan 4 materiales" /> };
export const Progress25:  StoryObj = { name: "progressBar / 25%",  render: () => <ProgressBar progress={25}  label="25% completado"  description="Faltan 4 materiales" /> };
export const Progress50:  StoryObj = { name: "progressBar / 50%",  render: () => <ProgressBar progress={50}  label="50% completado"  description="Faltan 4 materiales" /> };
export const Progress75:  StoryObj = { name: "progressBar / 75%",  render: () => <ProgressBar progress={75}  label="75% completado"  description="Faltan 4 materiales" /> };
export const Progress100: StoryObj = { name: "progressBar / 100%", render: () => <ProgressBar progress={100} label="100% completado" /> };
export const ProgressAll: StoryObj = {
  name: "progressBar / All steps",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 32, padding: 24 }}>
      <ProgressBar progress={0}   label="0% completado"   description="Faltan 4 materiales" />
      <ProgressBar progress={25}  label="25% completado"  description="Faltan 4 materiales" />
      <ProgressBar progress={50}  label="50% completado"  description="Faltan 4 materiales" />
      <ProgressBar progress={75}  label="75% completado"  description="Faltan 4 materiales" />
      <ProgressBar progress={100} label="100% completado" />
    </div>
  ),
};

// ─── optionLabel ──────────────────────────────────────────────────────────────
export const OptionLabelActive:   StoryObj = { name: "optionLabel / state: active",   render: () => <OptionLabel state="active"   label="option label" /> };
export const OptionLabelStandard: StoryObj = { name: "optionLabel / state: standard", render: () => <OptionLabel state="standard" label="option label" /> };
export const OptionLabelDisabled: StoryObj = { name: "optionLabel / state: disabled", render: () => <OptionLabel state="disabled" label="option label" /> };
export const OptionLabelAll: StoryObj = {
  name: "optionLabel / All states",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, padding: 16 }}>
      <OptionLabel state="active"   label="option label" />
      <OptionLabel state="standard" label="option label" />
      <OptionLabel state="disabled" label="option label" />
    </div>
  ),
};
