import type { StoryObj, Meta } from "@storybook/react-vite";
import React from "react";
import { Icon } from "../react/iconos/Icon";
import type { IconName } from "../react/iconos/Icon";
import { SearchBar } from "../react/SearchBar/SearchBar";
import { TabsMenu, FilterBar, TabFilterChip } from "../react/TabsMenu/TabsMenu";
import { ToggleCards } from "../react/ToggleCards/ToggleCards";
import { SelectionDropdown } from "../react/SelectionDropdown/SelectionDropdown";
import { NavigationControls, FilterOptions, ToggleMenu } from "../react/Nav/Nav";
import { Button } from "../react/buttons/Button";
import type { ButtonColor, ButtonState } from "../react/buttons/Button";
import { QuantitySelector } from "../react/QuantitySelector/QuantitySelector";
import type { QuantitySelectorState } from "../react/QuantitySelector/QuantitySelector";
import { SlideButton } from "../react/SlideButton/SlideButton";
import { SummaryCard, MaterialList, DetailCard } from "../react/cards/Card";
import { FormField, CheckBox, Tag, ProgressBar, OptionLabel } from "../react/forms/Form";

const meta: Meta = {
  title: "Adelante / Foundations",
  parameters: { layout: "padded" },
};
export default meta;

// ─── Color ───────────────────────────────────────────────────────────────────

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

export const Color: StoryObj = {
  name: "color",
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
      {/* 01.00 version — rotado */}
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

      {/* Título */}
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

      {/* Grupos */}
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



// ─── Tipografia ──────────────────────────────────────────────────────────────

interface TypeRow {
  name:          string;
  fontSize:      string;
  lineHeight:    string;
  letterSpacing: string;
  fontWeight:    string;
  /** display values for the 4 columns */
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

export const Tipografia: StoryObj = {
  name: "tipografia",
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
      {/* 01.00 version — rotado */}
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

      {/* Título */}
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

      {/* Font name */}
      <p style={{
        fontSize:   "var(--ds-font-size-body-md)",
        fontWeight: "var(--ds-font-weight-semibold)",
        lineHeight: "var(--ds-line-height-body-md)",
        margin:     "0 0 32px 0",
        color:      "var(--ds-color-black)",
      }}>
        font name: roboto
      </p>

      {/* Cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {TYPE_CARDS.map((card) => (
          <div key={card.category} style={{
            background:   "var(--ds-color-white)",
            borderRadius: "var(--ds-radius-lg)",
            boxShadow:    "var(--ds-shadow-01)",
            padding:      "16px 20px 20px",
          }}>
            {/* Category label */}
            <p style={{
              fontSize:   "var(--ds-font-size-body-sm)",
              fontWeight: "var(--ds-font-weight-regular)",
              lineHeight: "var(--ds-line-height-body-sm)",
              color:      "var(--ds-color-gray-400)",
              margin:     "0 0 12px 0",
            }}>
              {card.category}
            </p>

            {/* Column headers */}
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

            {/* Groups */}
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

// ─── Corner Radiuos ───────────────────────────────────────────────────────────

const RADIUS_ROWS = [
  { label: "corner radiuos 4",  radius: "var(--ds-radius-sm)" },
  { label: "corner radiuos 8",  radius: "var(--ds-radius-md)" },
  { label: "corner radiuos 16", radius: "var(--ds-radius-lg)" },
  { label: "corner radiuos 32", radius: "var(--ds-radius-xl)" },
];

export const CornerRadiuos: StoryObj = {
  name: "corner radiuos",
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
      {/* 01.00 version — rotado */}
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

      {/* Título */}
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

      {/* Card contenedor */}
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

// ─── Iconos ───────────────────────────────────────────────────────────────────

const ICONS_LEFT: { icon: IconName; label: string; desc: string }[] = [
  { icon: "home",          label: "Home",          desc: "This is home" },
  { icon: "user",          label: "User",          desc: "This is user" },
  { icon: "folder",        label: "Folder",        desc: "This is folder" },
  { icon: "open",          label: "Open",          desc: "This is open" },
  { icon: "arrow-right",   label: "Arrow",         desc: "This is arrow" },
  { icon: "back",          label: "Back",          desc: "This is back" },
  { icon: "search",        label: "Lens",          desc: "This is lens" },
  { icon: "go",            label: "Go",            desc: "This is go" },
  { icon: "good",          label: "Good",          desc: "This is good" },
  { icon: "list",          label: "List",          desc: "This is list" },
  { icon: "boleta",        label: "Boleta",        desc: "This is boleta" },
  { icon: "traslado",      label: "Traslado",      desc: "This is traslado" },
  { icon: "entrega",       label: "Entrega",       desc: "This is entrega" },
  { icon: "sin-stock",     label: "Sin stock",     desc: "This is sin stock" },
  { icon: "completado",    label: "Completado",    desc: "This is complete" },
  { icon: "incompleto",    label: "Incompleto",    desc: "This is incomplete" },
  { icon: "pendiente",     label: "Pendiente",     desc: "This is pendiente" },
  { icon: "sin-autorizar", label: "Sin autorizar", desc: "This is sin autorizar" },
];

const ICONS_RIGHT: { icon: IconName; label: string; desc: string }[] = [
  { icon: "filter",     label: "Filter",     desc: "This is filter" },
  { icon: "close",      label: "Close",      desc: "This is close" },
  { icon: "edit",       label: "Edit",       desc: "This is edit" },
  { icon: "info",       label: "Info",       desc: "This is info" },
  { icon: "plus",       label: "Add",        desc: "This is add" },
  { icon: "minus",      label: "Minus",      desc: "This is minus" },
  { icon: "delete",     label: "Delete",     desc: "This is delete" },
  { icon: "place",      label: "place",      desc: "This is place" },
  { icon: "alert",      label: "Warning",    desc: "This is warning" },
  { icon: "remove",     label: "Remove",     desc: "This is remove" },
  { icon: "calculator", label: "Calculator", desc: "This is calculator" },
  { icon: "cuadrillas", label: "Cuadrillas", desc: "This is calculator" },
  { icon: "rol",        label: "Rol",        desc: "This is calculator" },
  { icon: "options",    label: "options",    desc: "This is options" },
  { icon: "menu",       label: "menu",       desc: "This is menu" },
];

export const Iconos: StoryObj = {
  name: "iconos",
  parameters: { layout: "fullscreen" },
  render: () => (
    <div style={{
      background: "var(--ds-color-surface)",
      minHeight:  "100vh",
      padding:    "40px 48px",
      fontFamily: "var(--ds-font-family)",
      position:   "relative",
    }}>
      {/* "01.00 version" rotado */}
      <span style={{
        position:      "absolute",
        top:           120,
        right:         -36,
        transform:     "rotate(90deg)",
        fontSize:      "var(--ds-font-size-body-sm)",
        fontWeight:    "var(--ds-font-weight-regular)",
        color:         "var(--ds-color-gray-500)",
        letterSpacing: "0.4px",
        whiteSpace:    "nowrap",
      }}>
        01.00 version
      </span>

      {/* Título */}
      <h1 style={{
        fontSize:      "var(--ds-font-size-heading)",
        fontWeight:    "var(--ds-font-weight-semibold)",
        lineHeight:    "var(--ds-line-height-heading)",
        letterSpacing: "0.4px",
        margin:        0,
        color:         "var(--ds-color-black)",
      }}>
        ICONOGRAPHY
      </h1>

      {/* Subtítulo */}
      <p style={{
        fontSize:   "var(--ds-font-size-body-sm)",
        fontWeight: "var(--ds-font-weight-semibold)",
        color:      "var(--ds-color-gray-500)",
        margin:     "4px 0 40px",
      }}>
        phosphor icons/ bold
      </p>

      {/* Columnas de íconos */}
      <div style={{ display: "flex", gap: 80 }}>
        {/* Columna izquierda */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {ICONS_LEFT.map(({ icon, label, desc }) => (
            <div key={icon} style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ textAlign: "right", minWidth: 140 }}>
                <div style={{
                  fontSize:   "var(--ds-font-size-body-sm)",
                  fontWeight: "var(--ds-font-weight-semibold)",
                  color:      "var(--ds-color-black)",
                  lineHeight: "var(--ds-line-height-body-sm)",
                }}>
                  {label}
                </div>
                <div style={{
                  fontSize:   "var(--ds-font-size-body-sm)",
                  fontWeight: "var(--ds-font-weight-regular)",
                  color:      "var(--ds-color-gray-500)",
                  lineHeight: "var(--ds-line-height-body-sm)",
                }}>
                  {desc}
                </div>
              </div>
              <Icon name={icon} size="lg" color="var(--ds-color-black)" />
            </div>
          ))}
        </div>

        {/* Columna derecha */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {ICONS_RIGHT.map(({ icon, label, desc }) => (
            <div key={icon} style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ textAlign: "right", minWidth: 140 }}>
                <div style={{
                  fontSize:   "var(--ds-font-size-body-sm)",
                  fontWeight: "var(--ds-font-weight-semibold)",
                  color:      "var(--ds-color-black)",
                  lineHeight: "var(--ds-line-height-body-sm)",
                }}>
                  {label}
                </div>
                <div style={{
                  fontSize:   "var(--ds-font-size-body-sm)",
                  fontWeight: "var(--ds-font-weight-regular)",
                  color:      "var(--ds-color-gray-500)",
                  lineHeight: "var(--ds-line-height-body-sm)",
                }}>
                  {desc}
                </div>
              </div>
              <Icon name={icon} size="lg" color="var(--ds-color-black)" />
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
};

// ─── Navigation ──────────────────────────────────────────────────────────────

function NavAnnotation({ name, desc }: { name: string; desc: string }) {
  return (
    <div style={{ minWidth: 160, textAlign: "right", flexShrink: 0, paddingTop: 4 }}>
      <div style={{
        fontSize:      14,
        fontWeight:    600,
        letterSpacing: "0.4px",
        color:         "var(--ds-color-black)",
        lineHeight:    "20px",
        fontFamily:    "inherit",
      }}>{name}</div>
      <div style={{
        fontSize:   14,
        fontWeight: 400,
        color:      "var(--ds-color-gray-500)",
        lineHeight: "20px",
        fontFamily: "inherit",
      }}>{desc}</div>
    </div>
  );
}

function NavStateLabel({ text }: { text: string }) {
  return (
    <span style={{
      display:    "block",
      fontSize:   12,
      fontWeight: 400,
      color:      "var(--ds-color-gray-500)",
      lineHeight: "20px",
      marginTop:  6,
      fontFamily: "inherit",
    }}>{text}</span>
  );
}

function NavSection({ name, desc, children }: {
  name: string;
  desc: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 48 }}>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 24 }}>
        {children}
      </div>
      <NavAnnotation name={name} desc={desc} />
    </div>
  );
}

export const Navigation: StoryObj = {
  name: "navigation",
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

      {/* 01.00 version — rotado */}
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

      {/* Título */}
      <h1 style={{
        fontSize:      32,
        fontWeight:    600,
        lineHeight:    "40px",
        letterSpacing: "0.4px",
        margin:        "0 0 72px 0",
        color:         "var(--ds-color-black)",
      }}>
        NAVIGATION
      </h1>

      <div style={{ display: "flex", flexDirection: "column", gap: 72 }}>

        {/* ── 1. searchBar ─────────────────────────────────────────────── */}
        <NavSection name="searchBar" desc="This is search bar">
          <div>
            <SearchBar layout="label" value="LADRILLO" />
            <NavStateLabel text="layout: label / state: standard" />
          </div>
          <div>
            <SearchBar layout="normal" />
            <NavStateLabel text="layout: normal / state: standard" />
          </div>
          <div>
            <SearchBar layout="icon" />
            <NavStateLabel text="layout: icon / state: standard" />
          </div>
          <div>
            <SearchBar layout="icon" state="pressed" />
            <NavStateLabel text="layout: icon / state: pressed" />
          </div>
          <div>
            <SearchBar
              layout="expanded"
              value="LADRILLO"
              suggestions={[
                { id: 1, name: "LADRILLO TIPO A" },
                { id: 2, name: "LADRILLO TIPO B" },
              ]}
            />
            <NavStateLabel text="layout: expanded / state: standard" />
          </div>
        </NavSection>

        {/* ── 2. tabsMenu ──────────────────────────────────────────────── */}
        <NavSection name="tabsMenu" desc="This is a tabs">
          <div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <TabsMenu label="Boleta"   layout="label+icon" icon="boleta"  state="standard" />
              <TabsMenu label="Traslado" layout="label+icon" icon="traslado" state="standard" />
              <TabsMenu label="Entrega"  layout="label+icon" icon="entrega"  state="standard" />
            </div>
            <NavStateLabel text="layout: label+icon / state: standard / mode: normal" />
          </div>
          <div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <TabsMenu label="Boleta"   layout="label+icon" icon="boleta"  state="pressed" />
              <TabsMenu label="Traslado" layout="label+icon" icon="traslado" state="standard" />
              <TabsMenu label="Entrega"  layout="label+icon" icon="entrega"  state="standard" />
            </div>
            <NavStateLabel text="layout: label+icon / state: pressed / mode: normal" />
          </div>
          <div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <TabsMenu label="Opción 1" layout="label" state="standard" />
              <TabsMenu label="Opción 2" layout="label" state="standard" />
              <TabsMenu label="Opción 3" layout="label" state="standard" />
            </div>
            <NavStateLabel text="layout: label / state: standard / mode: normal" />
          </div>
          <div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <TabsMenu label="Opción 1" layout="label" state="pressed" />
              <TabsMenu label="Opción 2" layout="label" state="standard" />
              <TabsMenu label="Opción 3" layout="label" state="standard" />
            </div>
            <NavStateLabel text="layout: label / state: pressed / mode: normal" />
          </div>
          <div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", opacity: 0.4 }}>
              <TabsMenu label="Opción 1" layout="label" state="standard" />
              <TabsMenu label="Opción 2" layout="label" state="standard" />
              <TabsMenu label="Opción 3" layout="label" state="standard" />
            </div>
            <NavStateLabel text="layout: label / mode: disabled" />
          </div>
        </NavSection>

        {/* ── 3. toggleCards ───────────────────────────────────────────── */}
        <NavSection name="toggleCards" desc="This is a toggle cards">
          <div>
            <div style={{ display: "flex", gap: 8 }}>
              <ToggleCards size="big" mode="normal" visibility="open" />
              <ToggleCards size="big" mode="normal" visibility="open" />
              <ToggleCards size="big" mode="normal" visibility="open" />
              <ToggleCards size="big" mode="normal" visibility="open" />
            </div>
            <NavStateLabel text="size: big / mode: normal / visibility: open / state: standard" />
          </div>
          <div>
            <div style={{ display: "flex", gap: 8 }}>
              <ToggleCards size="big" mode="disabled" visibility="open" />
              <ToggleCards size="big" mode="disabled" visibility="open" />
              <ToggleCards size="big" mode="disabled" visibility="open" />
              <ToggleCards size="big" mode="disabled" visibility="open" />
            </div>
            <NavStateLabel text="size: big / mode: disabled / visibility: open" />
          </div>
          <div>
            <div style={{ display: "flex", gap: 8 }}>
              <ToggleCards size="small" mode="normal" visibility="open" />
              <ToggleCards size="small" mode="normal" visibility="open" />
              <ToggleCards size="small" mode="normal" visibility="open" />
              <ToggleCards size="small" mode="normal" visibility="open" />
            </div>
            <NavStateLabel text="size: small / mode: normal / state: standard" />
          </div>
          <div>
            <div style={{ display: "flex", gap: 8 }}>
              <ToggleCards size="small" mode="disabled" visibility="open" />
              <ToggleCards size="small" mode="disabled" visibility="open" />
              <ToggleCards size="small" mode="disabled" visibility="open" />
              <ToggleCards size="small" mode="disabled" visibility="open" />
            </div>
            <NavStateLabel text="size: small / mode: disabled" />
          </div>
          <div>
            <div style={{ display: "flex", gap: 8 }}>
              <ToggleCards size="big" mode="normal" visibility="close" />
              <ToggleCards size="big" mode="normal" visibility="close" />
            </div>
            <NavStateLabel text="size: big / visibility: close" />
          </div>
          <div>
            <div style={{ display: "flex", gap: 8 }}>
              <ToggleCards size="small" mode="normal" visibility="close" />
              <ToggleCards size="small" mode="normal" visibility="close" />
            </div>
            <NavStateLabel text="size: small / visibility: close" />
          </div>
        </NavSection>

        {/* ── 4. toggleMenu ────────────────────────────────────────────── */}
        <NavSection name="toggleMenu" desc="This is a toggle menu">
          <div>
            <ToggleMenu mode="open" state="standard" />
            <NavStateLabel text="mode: open / state: standard" />
          </div>
          <div>
            <ToggleMenu mode="open" state="pressed" />
            <NavStateLabel text="mode: open / state: pressed" />
          </div>
          <div>
            <ToggleMenu mode="close" state="standard" />
            <NavStateLabel text="mode: close / state: standard" />
          </div>
          <div>
            <ToggleMenu mode="close" state="pressed" />
            <NavStateLabel text="mode: close / state: pressed" />
          </div>
        </NavSection>

        {/* ── 5. navigationControls ────────────────────────────────────── */}
        <NavSection name="navigationControls" desc="This is a navigation controls">
          <div>
            <NavigationControls navigation="back" state="standard" />
            <NavStateLabel text="navigation: back / state: standard" />
          </div>
          <div>
            <NavigationControls navigation="back" state="pressed" />
            <NavStateLabel text="navigation: back / state: pressed" />
          </div>
          <div>
            <NavigationControls navigation="go" state="standard" />
            <NavStateLabel text="navigation: go / state: standard" />
          </div>
          <div>
            <NavigationControls navigation="go" state="pressed" />
            <NavStateLabel text="navigation: go / state: pressed" />
          </div>
        </NavSection>

        {/* ── 6. filterOptions ─────────────────────────────────────────── */}
        <NavSection name="filterOptions" desc="This is a filter options">
          <div>
            <FilterOptions mode="normal" state="standard" />
            <NavStateLabel text="mode: normal / state: standard" />
          </div>
          <div>
            <FilterOptions mode="normal" state="pressed" />
            <NavStateLabel text="mode: normal / state: pressed" />
          </div>
          <div>
            <FilterOptions mode="close" state="standard" />
            <NavStateLabel text="mode: close / state: standard" />
          </div>
        </NavSection>

        {/* ── 7. tabFilterBar ──────────────────────────────────────────── */}
        <NavSection name="tabFilterBar" desc="This is a tab filter bar">
          <div>
            <TabFilterChip label="Aprobado" state="active" icon="completado" />
            <NavStateLabel text="state: active" />
          </div>
          <div>
            <TabFilterChip label="Pendiente" state="disabled" icon="sin-autorizar" />
            <NavStateLabel text="state: disabled" />
          </div>
        </NavSection>

        {/* ── 8. filterBar ─────────────────────────────────────────────── */}
        <NavSection name="filterBar" desc="This is a filter bar">
          <div>
            <FilterBar chips={[
              { label: "Aprobado",  state: "active",   icon: "completado"    },
              { label: "Denegado",  state: "disabled", icon: "sin-stock"     },
              { label: "Pendiente", state: "disabled", icon: "sin-autorizar" },
            ]} />
            <NavStateLabel text="state: standard" />
          </div>
        </NavSection>

        {/* ── 9. selectionDropdown ─────────────────────────────────────── */}
        <NavSection name="selectionDropdown" desc="This is a drop down">
          <div>
            <SelectionDropdown label="Tipo de material" />
            <NavStateLabel text="state: compressed" />
          </div>
          <div>
            <SelectionDropdown
              label="Tipo de material"
              isOpen={true}
              items={[
                { label: "Ladrillo" },
                { label: "Bloque" },
                { label: "Cerámica" },
              ]}
            />
            <NavStateLabel text="state: expanded" />
          </div>
        </NavSection>

      </div>
    </div>
  ),
};

// ─── Buttons ──────────────────────────────────────────────────────────────────

function BtnRow({ color, state }: { color: ButtonColor; state: ButtonState }) {
  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      <Button layout="label"     label="label" icon="go" color={color} state={state} />
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

export const Buttons: StoryObj = {
  name: "buttons",
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

      {/* 01.00 version — rotado */}
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

      {/* Título */}
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
            {/* Normal: solo texto centrado */}
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "12px 16px" }}>
              <span style={{ color: "white", fontSize: 16, fontWeight: 600, lineHeight: "24px" }}>label</span>
            </div>
            {/* Right: texto + icono derecho */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 16px" }}>
              <span style={{ color: "white", fontSize: 16, fontWeight: 600, lineHeight: "24px" }}>label</span>
              <Icon name="go" size="md" color="white" />
            </div>
            {/* Left: icono izquierdo + texto */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 16px" }}>
              <Icon name="go" size="md" color="white" />
              <span style={{ color: "white", fontSize: 16, fontWeight: 600, lineHeight: "24px" }}>label</span>
            </div>
          </div>
        </NavSection>

        {/* ── 2. setButtons (primaryButton + secondaryButton) ──────────── */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: 48 }}>
          <div style={{ flex: 1 }}>
            <div style={{
              border:        "1px dashed var(--ds-color-gray-300)",
              borderRadius:  16,
              padding:       "20px 20px 24px",
            }}>
              {/* primaryButton sub-header */}
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

              {/* Primary rows */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {PRIMARY_ROWS.map((row, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <BtnRow color={row.color} state={row.state} />
                    <NavStateLabel text={row.stateLabel} />
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div style={{ height: 1, background: "var(--ds-color-gray-100)", margin: "20px 0" }} />

              {/* secondaryButton sub-header */}
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

              {/* Secondary rows */}
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

// ─── Cards ───────────────────────────────────────────────────────────────────

const SAMPLE_MATERIALS = [
  { description: "CONECTOR ADAPTADOR HEMBRA EAGLE 110V SALIDA MACHO EAGLE 220V", qtyState: "incompleto" as const, qty: 3 },
  { description: "CONECTOR ADAPTADOR HEMBRA EAGLE 110V SALIDA MACHO EAGLE 220V", qtyState: "incompleto" as const, qty: 3 },
  { description: "CONECTOR ADAPTADOR HEMBRA EAGLE 110V SALIDA MACHO EAGLE 220V", qtyState: "incompleto" as const, qty: 3 },
];

export const Cards: StoryObj = {
  name: "cards",
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

      {/* 01.00 version — rotado */}
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

      {/* Título */}
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

// ─── Forms ───────────────────────────────────────────────────────────────────

export const Forms: StoryObj = {
  name: "forms",
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

      {/* 01.00 version — rotado */}
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

      {/* Título */}
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
