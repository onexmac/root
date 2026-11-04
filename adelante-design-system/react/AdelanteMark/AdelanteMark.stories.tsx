import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { AdelanteMark } from "./AdelanteMark";

const meta: Meta<typeof AdelanteMark> = {
  title: "New/AdelanteMark",
  component: AdelanteMark,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "AdelanteMark — the canonical brand mark, a 2-path SVG with " +
          "`fill='currentColor'`. Recolor via the parent's `color` CSS " +
          "property; never override the fill attribute. Three appearance " +
          "modes (Light / Dark / Tinted) compose the mark with different " +
          "backgrounds; the mark itself is the same path coords in every " +
          "case. Spec: `~/Desktop/ICON.md`.",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof AdelanteMark>;

const Frame = ({
  bg,
  color,
  label,
  children,
}: {
  bg: string;
  color: string;
  label: string;
  children: React.ReactNode;
}) => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
    <div
      style={{
        background: bg,
        color,
        padding: "20% 16%",
        borderRadius: 24,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: 128,
        height: 128,
        boxSizing: "border-box",
      }}
    >
      {children}
    </div>
    <span
      style={{
        fontSize: 12,
        color: "var(--ds-color-gray-500)",
        fontFamily: "var(--ds-font-family)",
      }}
    >
      {label}
    </span>
  </div>
);

/** Default in-app brand mark — green on whatever surface. */
export const Default: Story = {
  render: () => (
    <div style={{ padding: 32 }}>
      <AdelanteMark style={{ color: "var(--ds-color-green-100)", width: 160 }} />
    </div>
  ),
};

/**
 * Three appearance modes side-by-side. The padding ratios (20% vertical /
 * 16% horizontal) match the iOS AppIcon's safe-zone proportions so the
 * web and native marks stay in sync.
 */
export const AppearanceModes: Story = {
  name: "Three appearance modes",
  render: () => (
    <div style={{ display: "flex", gap: 32, padding: 32 }}>
      <Frame bg="#FFFFFF" color="var(--ds-color-green-100)" label="Light">
        <AdelanteMark style={{ width: 96 }} />
      </Frame>
      <Frame bg="var(--ds-color-green-100)" color="#000000" label="Dark">
        <AdelanteMark style={{ width: 96 }} />
      </Frame>
      <Frame bg="#F3F3F3" color="#111111" label="Tinted">
        <AdelanteMark style={{ width: 96 }} />
      </Frame>
    </div>
  ),
};

/**
 * Scale showcase — same mark at favicon, in-app, and hero sizes. The
 * SVG path is identical in every case; only the wrapper width changes.
 */
export const Scale: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 24, padding: 32, color: "var(--ds-color-green-100)" }}>
      <AdelanteMark style={{ width: 32 }} />
      <AdelanteMark style={{ width: 64 }} />
      <AdelanteMark style={{ width: 128 }} />
      <AdelanteMark style={{ width: 256 }} />
    </div>
  ),
};
