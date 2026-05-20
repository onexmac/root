import type { StoryObj, Meta } from "@storybook/react-vite";
import React from "react";

const meta: Meta = {
  title: "Adelante / Foundations",
  parameters: { layout: "padded" },
};
export default meta;

// ─── Colors ──────────────────────────────────────────────────────────────────

const COLORS: { token: string; hex: string; note: string }[] = [
  { token: "--ds-color-green-100", hex: "#ADD010", note: "CTA principal" },
  { token: "--ds-color-green-200", hex: "#88A024", note: "CTA pressed" },
  { token: "--ds-color-red-100",   hex: "#C96C6C", note: "Danger" },
  { token: "--ds-color-red-200",   hex: "#BB4A4A", note: "Danger pressed" },
  { token: "--ds-color-gray-500",  hex: "#5D636C", note: "Texto secundario" },
  { token: "--ds-color-gray-400",  hex: "#747B86", note: "Placeholder" },
  { token: "--ds-color-gray-300",  hex: "#AAAFB6", note: "Bordes suaves" },
  { token: "--ds-color-gray-200",  hex: "#D9D9D9", note: "Bordes" },
  { token: "--ds-color-gray-100",  hex: "#EBEBEB", note: "Fondo hover" },
  { token: "--ds-color-black",     hex: "#000000",          note: "Texto principal" },
  { token: "--ds-color-black-100", hex: "rgba(0,0,0,0.8)",  note: "Halos pressed" },
  { token: "--ds-color-white",     hex: "#FFFFFF",          note: "Fondo claro" },
  { token: "--ds-color-surface",   hex: "#F3F3F3", note: "Fondo de página" },
  { token: "--ds-color-yellow",    hex: "#F0C802", note: "Advertencia" },
];

export const Colors: StoryObj = {
  render: () => (
    <div>
      <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 20 }}>Colores</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: 12 }}>
        {COLORS.map((c) => (
          <div key={c.token} style={{ borderRadius: 10, overflow: "hidden", border: "1px solid #EBEBEB" }}>
            <div style={{ height: 60, background: c.hex, border: c.hex === "#FFFFFF" ? "1px solid #E5E7EB" : undefined }} />
            <div style={{ padding: "8px 10px", background: "#fff" }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: "#111", marginBottom: 2 }}>{c.note}</div>
              <div style={{ fontSize: 10, color: "#747B86", fontFamily: "monospace" }}>{c.token}</div>
              <div style={{ fontSize: 10, color: "#AAAFB6", fontFamily: "monospace" }}>{c.hex}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
};

// ─── Typography ──────────────────────────────────────────────────────────────

const TYPE_SCALE = [
  { token: "body-sm / regular",      size: "12px", lineHeight: "16px", letterSpacing: "0",     weight: 400, sample: "Texto pequeño regular — body-sm" },
  { token: "body-sm / semibold",      size: "12px", lineHeight: "16px", letterSpacing: "0.4px", weight: 600, sample: "Texto pequeño semibold — body-sm" },
  { token: "body-md / regular",       size: "16px", lineHeight: "24px", letterSpacing: "0",     weight: 400, sample: "Texto de cuerpo regular — body-md" },
  { token: "body-md / semibold",      size: "16px", lineHeight: "24px", letterSpacing: "0",     weight: 600, sample: "Texto de cuerpo semibold — body-md" },
  { token: "subtitle / regular",      size: "20px", lineHeight: "24px", letterSpacing: "0.4px", weight: 400, sample: "Subtítulo regular — subtitle" },
  { token: "subtitle / semibold",     size: "20px", lineHeight: "24px", letterSpacing: "0.4px", weight: 600, sample: "Subtítulo semibold — subtitle" },
  { token: "subtitle-lg / regular",   size: "24px", lineHeight: "24px", letterSpacing: "0.4px", weight: 400, sample: "Subtítulo grande regular — subtitle-lg" },
  { token: "subtitle-lg / semibold",  size: "24px", lineHeight: "24px", letterSpacing: "0.4px", weight: 600, sample: "Subtítulo grande semibold — subtitle-lg" },
  { token: "heading / semibold",      size: "32px", lineHeight: "40px", letterSpacing: "0.4px", weight: 600, sample: "Encabezado — heading" },
];

export const Typography: StoryObj = {
  render: () => (
    <div>
      <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 24 }}>Tipografía</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        {TYPE_SCALE.map((t) => (
          <div key={t.token} style={{ borderBottom: "1px solid #EBEBEB", paddingBottom: 20 }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 8 }}>
              <code style={{ background: "#EBEBEB", padding: "2px 8px", borderRadius: 4, fontSize: 12 }}>{t.token}</code>
              <span style={{ fontSize: 12, color: "#747B86" }}>
                {t.size} / lh {t.lineHeight} / ls {t.letterSpacing} / w {t.weight}
              </span>
            </div>
            <div style={{ fontFamily: "Roboto, sans-serif", fontSize: t.size, lineHeight: t.lineHeight, fontWeight: t.weight, letterSpacing: t.letterSpacing, color: "#000" }}>
              {t.sample}
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
};

// ─── Spacing ─────────────────────────────────────────────────────────────────

const SPACING = [
  { token: "--ds-space-1", value: "4px"  },
  { token: "--ds-space-2", value: "8px"  },
  { token: "--ds-space-3", value: "12px" },
  { token: "--ds-space-4", value: "16px" },
  { token: "--ds-space-5", value: "20px" },
  { token: "--ds-space-6", value: "24px" },
];

export const Spacing: StoryObj = {
  render: () => (
    <div>
      <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 20 }}>Spacing</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {SPACING.map((s) => (
          <div key={s.token} style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ width: parseInt(s.value), height: 24, background: "#ADD010", borderRadius: 4, flexShrink: 0 }} />
            <code style={{ fontSize: 12, color: "#5D636C", minWidth: 160 }}>{s.token}</code>
            <span style={{ fontSize: 12, color: "#747B86" }}>{s.value}</span>
          </div>
        ))}
      </div>

      <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 20, marginTop: 40 }}>Border Radius</h2>
      <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
        {[
          { token: "--ds-radius-sm", value: "4px",  label: "sm" },
          { token: "--ds-radius-md", value: "8px",  label: "md" },
          { token: "--ds-radius-lg", value: "16px", label: "lg" },
          { token: "--ds-radius-xl", value: "32px", label: "xl" },
        ].map((r) => (
          <div key={r.token} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <div style={{ width: 64, height: 64, background: "#ADD010", borderRadius: r.value }} />
            <code style={{ fontSize: 11 }}>{r.label}</code>
            <span style={{ fontSize: 11, color: "#747B86" }}>{r.value}</span>
          </div>
        ))}
      </div>

      <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 20, marginTop: 40 }}>Sombras</h2>
      <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
        {[
          { token: "--ds-shadow-01",      value: "0 4px 8px rgba(170,175,182,.25)", label: "shadow-01 · cards" },
          { token: "--ds-shadow-02-soft", value: "0 6px 0 rgba(0,0,0,.16)",         label: "shadow-02 · botones" },
          { token: "--ds-shadow-03-big",  value: "0 2px 4px rgba(0,0,0,.16), 0 0 6px rgba(0,0,0,.16)", label: "shadow-03 · modales" },
        ].map((s) => (
          <div key={s.token} style={{ padding: 24, background: "#fff", borderRadius: 12, boxShadow: s.value, minWidth: 160 }}>
            <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 4 }}>{s.label}</div>
            <code style={{ fontSize: 10, color: "#747B86", wordBreak: "break-all" }}>{s.token}</code>
          </div>
        ))}
      </div>
    </div>
  ),
};
