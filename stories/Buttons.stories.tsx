import type { StoryObj, Meta } from "@storybook/react-vite";
import React from "react";
import { Button } from "../react/Button/Button";
import type { ButtonColor, ButtonState } from "../react/Button/Button";
import { QuantitySelector } from "../react/QuantitySelector/QuantitySelector";
import type { QuantitySelectorState } from "../react/QuantitySelector/QuantitySelector";
import { SlideButton } from "../react/SlideButton/SlideButton";
import { Icon } from "../react/Icon/Icon";
import { NavAnnotation, NavStateLabel, NavSection } from "./helpers";

const meta: Meta = {
  title: "Buttons",
  parameters: { layout: "padded" },
};
export default meta;

function BtnRow({ color, state }: { color: ButtonColor; state: ButtonState }) {
  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      <Button layout="label"      label="label" icon="go" color={color} state={state} />
      <Button layout="icon-right" label="label" icon="go" color={color} state={state} />
      <Button layout="icon-left"  label="label" icon="go" color={color} state={state} />
      <Button layout="icon"                     icon="go" color={color} state={state} />
    </div>
  );
}

const PRIMARY_ROWS: { color: ButtonColor; state: ButtonState; stateLabel: string }[] = [
  { color: "red",   state: "standard", stateLabel: "state: standard" },
  { color: "red",   state: "pressed",  stateLabel: "state: pressed"  },
  { color: "green", state: "standard", stateLabel: "state: standard" },
  { color: "green", state: "pressed",  stateLabel: "state: pressed"  },
  { color: "gray",  state: "disabled", stateLabel: "state: disabled" },
  { color: "gray",  state: "disabled", stateLabel: "state: disabled" },
];

const SECONDARY_ROWS: { color: ButtonColor; state: ButtonState; stateLabel: string }[] = [
  { color: "black", state: "standard", stateLabel: "state: standard" },
  { color: "black", state: "pressed",  stateLabel: "state: pressed"  },
  { color: "white", state: "standard", stateLabel: "state: standard" },
  { color: "white", state: "pressed",  stateLabel: "state: pressed"  },
];

const QS_ROWS: { state: QuantitySelectorState; mode: "standard" | "pressed" }[] = [
  { state: "incompleto", mode: "standard" },
  { state: "incompleto", mode: "pressed"  },
  { state: "pendiente",  mode: "standard" },
  { state: "pendiente",  mode: "pressed"  },
  { state: "completo",   mode: "standard" },
  { state: "completo",   mode: "pressed"  },
  { state: "sin-stock",  mode: "standard" },
  { state: "sin-stock",  mode: "pressed"  },
];

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
        BUTTONS
      </h1>

      <div style={{ display: "flex", flexDirection: "column", gap: 72 }}>

        {/* ── 1. labels ────────────────────────────────────────────────── */}
        <NavSection name="labels" desc="This ones go into the buttons">
          <div style={{
            background:    "var(--ds-color-black)",
            borderRadius:  20,
            padding:       "8px 0",
            width:         120,
            display:       "flex",
            flexDirection: "column",
          }}>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "12px 16px" }}>
              <span style={{ color: "white", fontSize: 16, fontWeight: 600, lineHeight: "24px" }}>label</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 16px" }}>
              <span style={{ color: "white", fontSize: 16, fontWeight: 600, lineHeight: "24px" }}>label</span>
              <Icon name="go" size="md" color="white" />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 16px" }}>
              <Icon name="go" size="md" color="white" />
              <span style={{ color: "white", fontSize: 16, fontWeight: 600, lineHeight: "24px" }}>label</span>
            </div>
          </div>
        </NavSection>

        {/* ── 2. setButtons ────────────────────────────────────────────── */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: 48 }}>
          <div style={{ flex: 1 }}>
            <div style={{
              border:        "1px dashed var(--ds-color-gray-300)",
              borderRadius:  16,
              padding:       "20px 20px 24px",
            }}>
              <div style={{
                textAlign:    "right",
                fontSize:     14,
                fontWeight:   600,
                color:        "var(--ds-color-black)",
                marginBottom: 12,
                fontFamily:   "inherit",
              }}>
                primaryButton
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {PRIMARY_ROWS.map((row, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <BtnRow color={row.color} state={row.state} />
                    <NavStateLabel text={row.stateLabel} />
                  </div>
                ))}
              </div>
              <div style={{ height: 1, background: "var(--ds-color-gray-100)", margin: "20px 0" }} />
              <div style={{
                textAlign:    "right",
                fontSize:     14,
                fontWeight:   600,
                color:        "var(--ds-color-black)",
                marginBottom: 12,
                fontFamily:   "inherit",
              }}>
                secondaryButton
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {SECONDARY_ROWS.map((row, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <BtnRow color={row.color} state={row.state} />
                    <NavStateLabel text={row.stateLabel} />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <NavAnnotation name="setButtons" desc="" />
        </div>

        {/* ── 3. quantitySelector ──────────────────────────────────────── */}
        <NavSection name="quantitySelector" desc="This is a quantity selector">
          {QS_ROWS.map((row, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <QuantitySelector value={3} state={row.state} mode={row.mode} />
              <NavStateLabel text={`state: ${row.state} / mode: ${row.mode}`} />
            </div>
          ))}
        </NavSection>

        {/* ── 4. slideButton ───────────────────────────────────────────── */}
        <NavSection name="slideButton" desc="This is a slide button">
          <div>
            <SlideButton label="Pedir" onConfirm={() => {}} />
            <NavStateLabel text="state: pressed" />
          </div>
          <div>
            <SlideButton label="Pedir" onConfirm={() => {}} />
            <NavStateLabel text="state: standard" />
          </div>
        </NavSection>

      </div>
    </div>
  ),
};
