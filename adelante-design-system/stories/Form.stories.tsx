import type { StoryObj, Meta } from "@storybook/react-vite";
import React from "react";
import { FormField, CheckBox, Tag, ProgressBar, OptionLabel } from "../react/Form/Form";
import { NavStateLabel, NavSection } from "./helpers";

const meta: Meta = {
  title: "Form",
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  name: "Overview",
  parameters: { layout: "fullscreen" },
  render: () => (
    <div style={{
      background:  "var(--ds-color-surface)",
      padding:     "54px 48px 120px",
      fontFamily:  "var(--ds-font-family)",
      minHeight:   "100vh",
      position:    "relative",
      boxSizing:   "border-box",
    }}>
      <div style={{
        position:        "absolute",
        top:             20,
        right:           20,
        writingMode:     "vertical-rl",
        textOrientation: "mixed",
        transform:       "rotate(180deg)",
        fontSize:        10,
        fontWeight:      600,
        letterSpacing:   "0.4px",
        lineHeight:      1.4,
        textAlign:       "center",
        color:           "var(--ds-color-black)",
      }}>
        {"01.00\nversion"}
      </div>

      <h1 style={{
        fontSize:      32,
        fontWeight:    600,
        lineHeight:    "40px",
        letterSpacing: "0.4px",
        margin:        "0 0 72px 0",
        color:         "var(--ds-color-black)",
      }}>
        forms
      </h1>

      <div style={{ display: "flex", flexDirection: "column", gap: 72 }}>

        {/* ── 1. optionLabel ─────────────────────────────────────────────── */}
        <NavSection name="optionLabel" desc="This is a option label">
          <div style={{
            border:        "1px dashed var(--ds-color-gray-300)",
            borderRadius:  16,
            padding:       24,
            display:       "flex",
            flexDirection: "column",
            gap:           16,
          }}>
            <div>
              <OptionLabel state="active" label="option label" />
              <NavStateLabel text="state: active" />
            </div>
            <div>
              <OptionLabel state="standard" label="option label" />
              <NavStateLabel text="state: standard" />
            </div>
            <div>
              <OptionLabel state="disabled" label="option label" />
              <NavStateLabel text="state: disabled" />
            </div>
          </div>
        </NavSection>

        {/* ── 2. checkBox ────────────────────────────────────────────────── */}
        <NavSection name="checkBox" desc="This is a check box">
          <div style={{
            border:        "1px dashed var(--ds-color-gray-300)",
            borderRadius:  16,
            padding:       24,
            display:       "flex",
            flexDirection: "column",
            gap:           16,
          }}>
            <div>
              <CheckBox state="add" label="option label" />
              <NavStateLabel text="state: add" />
            </div>
            <div>
              <CheckBox state="remove" label="option label" />
              <NavStateLabel text="state: remove" />
            </div>
            <div>
              <CheckBox state="standard" label="option label" />
              <NavStateLabel text="state: standard" />
            </div>
            <div>
              <CheckBox state="disabled" label="option label" />
              <NavStateLabel text="state: disabled" />
            </div>
          </div>
        </NavSection>

        {/* ── 3. selectors ───────────────────────────────────────────────── */}
        <NavSection name="selectors" desc="This is a selectors">
          <div style={{
            border:        "1px dashed var(--ds-color-gray-300)",
            borderRadius:  16,
            padding:       24,
            display:       "flex",
            flexDirection: "row",
            gap:           24,
            flexWrap:      "wrap",
            alignItems:    "flex-start",
          }}>
            <div>
              <Tag state="active" label="Label" />
              <NavStateLabel text="state: active" />
            </div>
            <div>
              <Tag state="standard" label="Label" />
              <NavStateLabel text="state: standard" />
            </div>
            <div>
              <Tag state="disabled" label="Label" />
              <NavStateLabel text="state: disabled" />
            </div>
          </div>
        </NavSection>

        {/* ── 4. formField ───────────────────────────────────────────────── */}
        <NavSection name="formField" desc="This is a field">
          <div style={{
            border:        "1px dashed var(--ds-color-gray-300)",
            borderRadius:  16,
            padding:       24,
            display:       "flex",
            flexDirection: "column",
            gap:           16,
          }}>
            <div>
              <FormField state="ayuda" label="Nombre" placeholder="Placeholder" helperText="Mensaje de ayuda" />
              <NavStateLabel text="state: ayuda" />
            </div>
            <div>
              <FormField state="advertencia" label="Nombre" placeholder="Placeholder" helperText="Mensaje de advertencia" />
              <NavStateLabel text="state: advertencia" />
            </div>
            <div>
              <FormField state="standard" label="Nombre" placeholder="Placeholder" />
              <NavStateLabel text="state: standard" />
            </div>
            <div>
              <FormField state="active" label="Nombre" placeholder="Placeholder" />
              <NavStateLabel text="state: active" />
            </div>
            <div>
              <FormField state="disabled" label="Nombre" placeholder="Placeholder" />
              <NavStateLabel text="state: disabled" />
            </div>
            <div>
              <FormField state="x" label="Nombre" placeholder="Placeholder" />
              <NavStateLabel text="state: x" />
            </div>
          </div>
        </NavSection>

        {/* ── 5. progressBar ─────────────────────────────────────────────── */}
        <NavSection name="progressBar" desc="This is a progress bar">
          <div style={{
            border:        "1px dashed var(--ds-color-gray-300)",
            borderRadius:  16,
            padding:       24,
            display:       "flex",
            flexDirection: "column",
            gap:           16,
          }}>
            <ProgressBar progress={0}   label="0% completado"   description="Faltan 4 materiales" />
            <ProgressBar progress={25}  label="25% completado"  description="Faltan 4 materiales" />
            <ProgressBar progress={50}  label="50% completado"  description="Faltan 4 materiales" />
            <ProgressBar progress={75}  label="75% completado"  description="Faltan 4 materiales" />
            <ProgressBar progress={100} label="100% completado" />
          </div>
        </NavSection>

      </div>
    </div>
  ),
};
