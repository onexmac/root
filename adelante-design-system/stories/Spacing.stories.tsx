import type { StoryObj, Meta } from "@storybook/react-vite";
import React from "react";

const meta: Meta = {
  title: "Spacing",
  parameters: { layout: "padded" },
};
export default meta;

const RADIUS_ROWS = [
  { label: "corner radiuos 4",  radius: "var(--ds-radius-sm)" },
  { label: "corner radiuos 8",  radius: "var(--ds-radius-md)" },
  { label: "corner radiuos 16", radius: "var(--ds-radius-lg)" },
  { label: "corner radiuos 32", radius: "var(--ds-radius-xl)" },
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
        margin:        "0 0 32px 0",
        color:         "var(--ds-color-black)",
      }}>
        corner radiuos
      </h1>

      <div style={{
        border:        "1px solid var(--ds-color-gray-200)",
        borderRadius:  20,
        padding:       "16px 24px",
        display:       "flex",
        flexDirection: "column",
        gap:           20,
      }}>
        {RADIUS_ROWS.map((row) => (
          <div key={row.label} style={{
            display:     "flex",
            alignItems:  "center",
            gap:         32,
          }}>
            <span style={{
              fontSize:   "var(--ds-font-size-body-md)",
              fontWeight: "var(--ds-font-weight-regular)",
              lineHeight: "var(--ds-line-height-body-md)",
              color:      "var(--ds-color-black)",
              minWidth:   180,
            }}>
              {row.label}
            </span>
            <div style={{
              width:        71,
              height:       43,
              background:   "var(--ds-color-gray-100)",
              borderRadius: row.radius,
              flexShrink:   0,
            }} />
          </div>
        ))}
      </div>
    </div>
  ),
};
