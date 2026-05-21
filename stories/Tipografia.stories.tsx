import type { StoryObj, Meta } from "@storybook/react-vite";
import React from "react";

const meta: Meta = {
  title: "Tipografia",
  parameters: { layout: "padded" },
};
export default meta;

interface TypeRow {
  name:          string;
  fontSize:      string;
  lineHeight:    string;
  letterSpacing: string;
  fontWeight:    string;
  vals:          [string | number, string | number, string | number, string | number];
}

const TYPE_CARDS: { category: string; groups: TypeRow[][] }[] = [
  {
    category: "body",
    groups: [
      [
        { name: "regular",  fontSize: "var(--ds-font-size-body-sm)",  lineHeight: "var(--ds-line-height-body-sm)",  letterSpacing: "0",     fontWeight: "var(--ds-font-weight-regular)",  vals: [12, 16, 0,   400] },
        { name: "semibold", fontSize: "var(--ds-font-size-body-sm)",  lineHeight: "var(--ds-line-height-body-sm)",  letterSpacing: "0.4px", fontWeight: "var(--ds-font-weight-semibold)", vals: [12, 16, 0.4, 600] },
      ],
      [
        { name: "regular",  fontSize: "var(--ds-font-size-body-md)",  lineHeight: "var(--ds-line-height-body-md)",  letterSpacing: "0",     fontWeight: "var(--ds-font-weight-regular)",  vals: [16, 24, 0,   400] },
        { name: "semibold", fontSize: "var(--ds-font-size-body-md)",  lineHeight: "var(--ds-line-height-body-md)",  letterSpacing: "0",     fontWeight: "var(--ds-font-weight-semibold)", vals: [16, 24, 0,   600] },
      ],
    ],
  },
  {
    category: "subtitle",
    groups: [
      [
        { name: "regular",  fontSize: "var(--ds-font-size-subtitle)",    lineHeight: "var(--ds-line-height-subtitle)",    letterSpacing: "0.4px", fontWeight: "var(--ds-font-weight-regular)",  vals: [20, 24, 0.4, 400] },
        { name: "semibold", fontSize: "var(--ds-font-size-subtitle)",    lineHeight: "var(--ds-line-height-subtitle)",    letterSpacing: "0.4px", fontWeight: "var(--ds-font-weight-semibold)", vals: [20, 24, 0.4, 600] },
      ],
      [
        { name: "regular",  fontSize: "var(--ds-font-size-subtitle-lg)", lineHeight: "var(--ds-line-height-subtitle-lg)", letterSpacing: "0.4px", fontWeight: "var(--ds-font-weight-regular)",  vals: [24, 24, 0.4, 400] },
        { name: "semibold", fontSize: "var(--ds-font-size-subtitle-lg)", lineHeight: "var(--ds-line-height-subtitle-lg)", letterSpacing: "0.4px", fontWeight: "var(--ds-font-weight-semibold)", vals: [24, 24, 0.4, 600] },
      ],
    ],
  },
  {
    category: "heading",
    groups: [
      [
        { name: "semibold", fontSize: "var(--ds-font-size-heading)", lineHeight: "var(--ds-line-height-heading)", letterSpacing: "0.4px", fontWeight: "var(--ds-font-weight-semibold)", vals: [32, 40, 0.4, 600] },
      ],
    ],
  },
];

const COL_HEADERS = ["size", "line height", "spacing", "weight"];
const COL_STYLE: React.CSSProperties = {
  fontSize:      "var(--ds-font-size-body-sm)",
  lineHeight:    "var(--ds-line-height-body-sm)",
  color:         "var(--ds-color-gray-400)",
  fontWeight:    "var(--ds-font-weight-regular)",
  textAlign:     "right" as const,
};

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
        margin:        "0 0 8px 0",
        color:         "var(--ds-color-black)",
      }}>
        tipografia
      </h1>

      <p style={{
        fontSize:   "var(--ds-font-size-body-md)",
        fontWeight: "var(--ds-font-weight-semibold)",
        lineHeight: "var(--ds-line-height-body-md)",
        margin:     "0 0 32px 0",
        color:      "var(--ds-color-black)",
      }}>
        font name: roboto
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {TYPE_CARDS.map((card) => (
          <div key={card.category} style={{
            background:   "var(--ds-color-white)",
            borderRadius: "var(--ds-radius-lg)",
            boxShadow:    "var(--ds-shadow-01)",
            padding:      "16px 20px 20px",
          }}>
            <p style={{
              fontSize:   "var(--ds-font-size-body-sm)",
              fontWeight: "var(--ds-font-weight-regular)",
              lineHeight: "var(--ds-line-height-body-sm)",
              color:      "var(--ds-color-gray-400)",
              margin:     "0 0 12px 0",
            }}>
              {card.category}
            </p>

            <div style={{
              display:             "grid",
              gridTemplateColumns: "1fr 60px 100px 80px 70px",
              gap:                 "0 8px",
              marginBottom:        8,
            }}>
              <span />
              {COL_HEADERS.map((h) => (
                <span key={h} style={{ ...COL_STYLE, textAlign: "left" }}>{h}</span>
              ))}
            </div>

            {card.groups.map((group, gi) => (
              <React.Fragment key={gi}>
                {gi > 0 && <div style={{ height: 12 }} />}
                {group.map((row) => (
                  <div
                    key={row.name + row.vals[0]}
                    style={{
                      display:             "grid",
                      gridTemplateColumns: "1fr 60px 100px 80px 70px",
                      gap:                 "0 8px",
                      alignItems:          "baseline",
                      marginBottom:        4,
                      fontFamily:          "var(--ds-font-family)",
                      fontSize:            row.fontSize,
                      lineHeight:          row.lineHeight,
                      letterSpacing:       row.letterSpacing,
                      fontWeight:          row.fontWeight,
                      color:               "var(--ds-color-black)",
                    }}
                  >
                    <span>{row.name}</span>
                    {row.vals.map((v, i) => (
                      <span key={i}>{v}</span>
                    ))}
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        ))}
      </div>
    </div>
  ),
};
