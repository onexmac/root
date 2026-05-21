import type { StoryObj, Meta } from "@storybook/react-vite";
import React from "react";

const meta: Meta = {
  title: "Color",
  parameters: { layout: "padded" },
};
export default meta;

const COLOR_GROUPS: {
  label: string;
  swatches: { bg: string; hex: string; name?: string; border?: boolean }[];
}[] = [
  {
    label: "green/primary",
    swatches: [
      { bg: "var(--ds-color-green-100)", hex: "#ADD010", name: "green 100" },
      { bg: "var(--ds-color-green-200)", hex: "#88A024", name: "green 200" },
    ],
  },
  {
    label: "gray/primary",
    swatches: [
      { bg: "var(--ds-color-gray-500)", hex: "#5D636C", name: "gray 500" },
      { bg: "var(--ds-color-gray-400)", hex: "#747B86", name: "gray 400" },
      { bg: "var(--ds-color-gray-300)", hex: "#AAAFB6", name: "gray 300" },
      { bg: "var(--ds-color-gray-200)", hex: "#D9D9D9", name: "gray200" },
      { bg: "var(--ds-color-gray-100)", hex: "#EBEBEB", name: "gray 100" },
    ],
  },
  {
    label: "red/secundary",
    swatches: [
      { bg: "var(--ds-color-red-100)", hex: "#C96C6C", name: "red 100" },
      { bg: "var(--ds-color-red-200)", hex: "#BB4A4A", name: "red 200" },
    ],
  },
  {
    label: "black/white",
    swatches: [
      { bg: "var(--ds-color-white)",     hex: "#FFFFFF",          border: true },
      { bg: "var(--ds-color-black)",     hex: "#000000" },
      { bg: "var(--ds-color-black-100)", hex: "#000000\n80%", name: "black 100" },
    ],
  },
  {
    label: "background",
    swatches: [
      { bg: "var(--ds-color-surface)", hex: "#F3F3F3", name: "background", border: true },
    ],
  },
  {
    label: "extra",
    swatches: [
      { bg: "var(--ds-color-yellow)", hex: "#F0C802", name: "yellow" },
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
        color
      </h1>

      <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
        {COLOR_GROUPS.map((group) => (
          <div key={group.label}>
            <p style={{
              fontSize:      "var(--ds-font-size-body-md)",
              fontWeight:    600,
              lineHeight:    "var(--ds-line-height-body-md)",
              margin:        "0 0 16px 0",
              color:         "var(--ds-color-black)",
            }}>
              {group.label}
            </p>

            <div style={{ display: "flex", gap: 18 }}>
              {group.swatches.map((sw, i) => (
                <div key={i} style={{ width: 102 }}>
                  <div style={{
                    width:        102,
                    height:       102,
                    borderRadius: 20,
                    background:   sw.bg,
                    border:       sw.border ? "1px solid var(--ds-color-gray-300)" : undefined,
                  }} />
                  <p style={{
                    fontSize:   "var(--ds-font-size-body-md)",
                    lineHeight: "var(--ds-line-height-body-md)",
                    color:      "var(--ds-color-black)",
                    margin:     "8px 0 0",
                    whiteSpace: "pre-line",
                  }}>
                    {sw.hex}
                  </p>
                  {sw.name && (
                    <p style={{
                      fontSize:   "var(--ds-font-size-body-md)",
                      lineHeight: "var(--ds-line-height-body-md)",
                      color:      "var(--ds-color-black)",
                      margin:     0,
                    }}>
                      {sw.name}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
};
