import type { StoryObj, Meta } from "@storybook/react-vite";
import React from "react";
import { Icon } from "../react/iconos/Icon";
import type { IconName } from "../react/iconos/Icon";

const meta: Meta = {
  title: "Iconos",
  parameters: { layout: "padded" },
};
export default meta;

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

export const Overview: StoryObj = {
  name: "Overview",
  parameters: { layout: "fullscreen" },
  render: () => (
    <div style={{
      background: "var(--ds-color-surface)",
      minHeight:  "100vh",
      padding:    "40px 48px",
      fontFamily: "var(--ds-font-family)",
      position:   "relative",
    }}>
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

      <p style={{
        fontSize:   "var(--ds-font-size-body-sm)",
        fontWeight: "var(--ds-font-weight-semibold)",
        color:      "var(--ds-color-gray-500)",
        margin:     "4px 0 40px",
      }}>
        phosphor icons/ bold
      </p>

      <div style={{ display: "flex", gap: 80 }}>
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
