import type { StoryObj, Meta } from "@storybook/react-vite";
import React from "react";

const meta: Meta = {
  title: "Shadow",
  parameters: { layout: "padded" },
};
export default meta;

const SPEC_TEXT: React.CSSProperties = {
  fontSize:   12,
  fontWeight: 400,
  lineHeight: "16px",
  color:      "var(--ds-color-black)",
  margin:     0,
};

interface ShadowLayer { x: number; y: number; blur: number; spread: number; color: string }

function SpecCol({ layer }: { layer: ShadowLayer }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 2, minWidth: 140 }}>
      <p style={SPEC_TEXT}>x: {layer.x}</p>
      <p style={SPEC_TEXT}>y: {layer.y}</p>
      <p style={SPEC_TEXT}>blur: {layer.blur}</p>
      <p style={SPEC_TEXT}>spread: {layer.spread}</p>
      <p style={SPEC_TEXT}>color: {layer.color}</p>
    </div>
  );
}

const SHADOWS: { name: string; css: string; layers: ShadowLayer[] }[] = [
  {
    name: "shadow 01",
    css:  "0px 4px 8px 0px #AAAFB640",
    layers: [
      { x: 0, y: 4, blur: 8, spread: 0, color: "gray 300 al 25%" },
    ],
  },
  {
    name: "shadow 02_soft",
    css:  "0px 6px 0px 0px #00000029",
    layers: [
      { x: 0, y: 6, blur: 0, spread: 0, color: "black al 16%" },
    ],
  },
  {
    name: "shadow 03_big",
    css:  "0px 6px 0px 0px #00000029, 0px 2px 4px 0px #00000029",
    layers: [
      { x: 0, y: 6, blur: 0, spread: 0, color: "black al 16%" },
      { x: 0, y: 2, blur: 4, spread: 0, color: "black al 16%" },
    ],
  },
];

export const Overview: StoryObj = {
  name: "Overview",
  parameters: { layout: "fullscreen" },
  render: () => (
    <div style={{
      background:  "var(--ds-color-surface)",
      padding:     "54px 40px 60px",
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
        whiteSpace:      "pre",
      }}>
        {"01.00\nversion"}
      </div>

      <h1 style={{
        fontSize:      32,
        fontWeight:    600,
        lineHeight:    "40px",
        letterSpacing: "0.4px",
        margin:        "0 0 40px 0",
        color:         "var(--ds-color-black)",
      }}>
        shadow
      </h1>

      <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 520 }}>
        {SHADOWS.map((s) => (
          <div key={s.name} style={{
            background:    "var(--ds-color-white)",
            border:        "1px solid #e8eaed",
            borderRadius:  16,
            padding:       "20px 24px",
            display:       "flex",
            alignItems:    "flex-start",
            gap:           24,
          }}>
            {/* Left: name + preview */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10, flexShrink: 0 }}>
              <p style={{ fontSize: 12, fontWeight: 600, lineHeight: "16px", color: "var(--ds-color-black)", margin: 0 }}>
                {s.name}
              </p>
              <div style={{
                width:        52,
                height:       44,
                background:   "var(--ds-color-white)",
                borderRadius: 8,
                boxShadow:    s.css,
              }} />
            </div>

            {/* Right: spec columns */}
            <div style={{ display: "flex", gap: 24, paddingTop: 20 }}>
              {s.layers.map((layer, i) => (
                <SpecCol key={i} layer={layer} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
};

/* ── individual token stories (controls-enabled) ── */
export const Shadow01: StoryObj = {
  name: "shadow 01",
  parameters: { layout: "centered" },
  render: () => (
    <div style={{ padding: 32 }}>
      <div style={{
        width: 120, height: 80, background: "var(--ds-color-white)",
        borderRadius: 12, boxShadow: "0px 4px 8px 0px #AAAFB640",
      }} />
    </div>
  ),
};

export const Shadow02Soft: StoryObj = {
  name: "shadow 02_soft",
  parameters: { layout: "centered" },
  render: () => (
    <div style={{ padding: 32 }}>
      <div style={{
        width: 120, height: 80, background: "var(--ds-color-white)",
        borderRadius: 12, boxShadow: "0px 6px 0px 0px #00000029",
      }} />
    </div>
  ),
};

export const Shadow03Big: StoryObj = {
  name: "shadow 03_big",
  parameters: { layout: "centered" },
  render: () => (
    <div style={{ padding: 32 }}>
      <div style={{
        width: 120, height: 80, background: "var(--ds-color-white)",
        borderRadius: 12, boxShadow: "0px 6px 0px 0px #00000029, 0px 2px 4px 0px #00000029",
      }} />
    </div>
  ),
};


