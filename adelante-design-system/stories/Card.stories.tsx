import type { StoryObj, Meta } from "@storybook/react-vite";
import React from "react";
import { SummaryCard, MaterialList, DetailCard } from "../react/Card/Card";
import { NavStateLabel, NavSection } from "./helpers";

const meta: Meta = {
  title: "Card",
  parameters: { layout: "padded" },
};
export default meta;

const SAMPLE_MATERIALS = [
  { description: "CONECTOR ADAPTADOR HEMBRA EAGLE 110V SALIDA MACHO EAGLE 220V", qtyState: "incompleto" as const, qty: 3 },
  { description: "CONECTOR ADAPTADOR HEMBRA EAGLE 110V SALIDA MACHO EAGLE 220V", qtyState: "incompleto" as const, qty: 3 },
  { description: "CONECTOR ADAPTADOR HEMBRA EAGLE 110V SALIDA MACHO EAGLE 220V", qtyState: "incompleto" as const, qty: 3 },
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
        cards
      </h1>

      <div style={{ display: "flex", flexDirection: "column", gap: 72 }}>

        {/* ── 1. summaryCard ─────────────────────────────────────────────── */}
        <NavSection name="summaryCard" desc="This is a summary card">
          <div style={{
            border:        "1px dashed var(--ds-color-gray-300)",
            borderRadius:  16,
            padding:       24,
            display:       "flex",
            flexDirection: "column",
            gap:           24,
          }}>
            <div>
              <SummaryCard visibility="open" statusState="completo" />
              <NavStateLabel text="state: open" />
            </div>
            <div>
              <SummaryCard visibility="close" statusState="completo" />
              <NavStateLabel text="state: close" />
            </div>
          </div>
        </NavSection>

        {/* ── 2. materialList ────────────────────────────────────────────── */}
        <NavSection name="materialList" desc="This is a material list">
          <MaterialList
            description="CONECTOR ADAPTADOR HEMBRA EAGLE 110V SALIDA MACHO EAGLE 220V"
            qtyState="incompleto"
            qty={3}
          />
        </NavSection>

        {/* ── 3. detailCard ──────────────────────────────────────────────── */}
        <NavSection name="detailCard" desc="This is a material detail card">
          <DetailCard
            statusState="completo"
            materials={SAMPLE_MATERIALS}
          />
        </NavSection>

      </div>
    </div>
  ),
};
