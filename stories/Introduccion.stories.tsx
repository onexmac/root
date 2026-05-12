import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";

const meta: Meta = {
  title: "Adelante / Introducción",
  parameters: { layout: "fullscreen" },
};
export default meta;

const PALETTE = [
  { name: "green-100",  hex: "#ADD010", note: "CTA principal" },
  { name: "green-200",  hex: "#88A024", note: "CTA pressed" },
  { name: "red-100",    hex: "#C96C6C", note: "Danger" },
  { name: "red-200",    hex: "#BB4A4A", note: "Danger pressed" },
  { name: "gray-500",   hex: "#5D636C", note: "Texto secundario" },
  { name: "gray-400",   hex: "#747B86", note: "Placeholder" },
  { name: "gray-300",   hex: "#AAAFB6", note: "Bordes suaves" },
  { name: "gray-200",   hex: "#D9D9D9", note: "Bordes" },
  { name: "gray-100",   hex: "#EBEBEB", note: "Fondo hover" },
  { name: "black",      hex: "#000000", note: "Texto principal" },
  { name: "white",      hex: "#FFFFFF", note: "Fondo claro" },
  { name: "surface",    hex: "#F3F3F3", note: "Fondo de página" },
  { name: "yellow",     hex: "#F0C802", note: "Advertencia" },
];

export const Bienvenida: StoryObj = {
  render: () => (
    <div style={{ fontFamily: "Roboto, sans-serif", maxWidth: 860, margin: "0 auto", padding: "48px 32px", background: "#fff", minHeight: "100vh" }}>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 40 }}>
        <div style={{ width: 52, height: 52, borderRadius: 12, background: "#ADD010", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 6px 0 rgba(0,0,0,0.16)", flexShrink: 0 }}>
          <svg width="26" height="26" fill="none" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        </div>
        <div>
          <div style={{ fontSize: 26, fontWeight: 700, color: "#000", lineHeight: 1.2 }}>Adelante Desarrollos</div>
          <div style={{ fontSize: 14, color: "#747B86" }}>Sistema Losa Flotante · v1.0</div>
        </div>
      </div>

      <p style={{ fontSize: 16, color: "#5D636C", lineHeight: 1.7, marginBottom: 40, maxWidth: 580 }}>
        Sistema de diseño oficial basado en <strong style={{ color: "#000" }}>Losa Flotante</strong>.
        Todos los componentes están construidos sobre tokens de Figma y reflejan el diseño aprobado.
      </p>

      <hr style={{ borderColor: "#EBEBEB", marginBottom: 40 }} />

      {/* Colors */}
      <h2 style={{ fontSize: 20, fontWeight: 600, color: "#000", marginBottom: 20 }}>Paleta de colores</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: 12, marginBottom: 48 }}>
        {PALETTE.map((c) => (
          <div key={c.hex} style={{ borderRadius: 12, overflow: "hidden", border: "1px solid #EBEBEB" }}>
            <div style={{ height: 56, background: c.hex, border: c.hex === "#FFFFFF" ? "1px solid #E5E7EB" : undefined }} />
            <div style={{ padding: "8px 10px", background: "#fff" }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#111" }}>{c.name}</div>
              <div style={{ fontSize: 11, color: "#747B86", fontFamily: "monospace" }}>{c.hex}</div>
              <div style={{ fontSize: 11, color: "#AAAFB6" }}>{c.note}</div>
            </div>
          </div>
        ))}
      </div>

      <hr style={{ borderColor: "#EBEBEB", marginBottom: 40 }} />

      {/* Figma link */}
      <p style={{ fontSize: 14, color: "#747B86" }}>
        El sistema de diseño completo está disponible en{" "}
        <a href="https://www.figma.com/design/oRDLRL9OUNcTQ0k6G5MBPS/Losa-Flotante" target="_blank" rel="noreferrer" style={{ color: "#ADD010", fontWeight: 600 }}>
          Losa Flotante — Figma
        </a>
      </p>
    </div>
  ),
};
