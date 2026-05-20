import type { Meta, StoryObj } from "@storybook/react-vite";
import React, { useState } from "react";
import { QuantitySelector } from "./QuantitySelector";

const meta: Meta<typeof QuantitySelector> = {
  title: "Sistema de Diseño/QuantitySelector",
  component: QuantitySelector,
  parameters: { layout: "centered" },
  argTypes: {
    state: {
      control: { type: "inline-radio" },
      options: ["pendiente", "incompleto", "completo", "sin-stock"],
    },
    mode: { control: { type: "inline-radio" }, options: ["standard", "pressed"] },
    size: { control: { type: "inline-radio" }, options: ["sm", "md", "lg"] },
    value: { control: { type: "number", min: 0, max: 999 } },
  },
};

export default meta;
type Story = StoryObj<typeof QuantitySelector>;

/* ─── States (standard) ──────────────────────────────────────────── */

export const Pendiente: Story = { args: { value: 3, state: "pendiente", size: "sm" } };
export const Incompleto: Story = { args: { value: 3, state: "incompleto", size: "sm" } };
export const Completo: Story = { args: { value: 3, state: "completo", size: "sm" } };
export const SinStock: Story = { args: { value: 3, state: "sin-stock", size: "sm" } };

/* ─── States (pressed) ───────────────────────────────────────────── */

export const PendientePressed: Story = {
  args: { value: 3, state: "pendiente", mode: "pressed", size: "sm" },
};
export const IncompletoPressed: Story = {
  args: { value: 3, state: "incompleto", mode: "pressed", size: "sm" },
};
export const CompletoPressed: Story = {
  args: { value: 3, state: "completo", mode: "pressed", size: "sm" },
};
export const SinStockPressed: Story = {
  args: { value: 3, state: "sin-stock", mode: "pressed", size: "sm" },
};

/* ─── Sizes ──────────────────────────────────────────────────────── */

export const SizeSmall: Story = {
  name: "Size: sm (49px)",
  args: { value: 5, state: "completo", size: "sm" },
};
export const SizeMedium: Story = {
  name: "Size: md (64px)",
  args: { value: 5, state: "completo", size: "md" },
};
export const SizeLarge: Story = {
  name: "Size: lg (96px)",
  args: { value: 5, state: "completo", size: "lg" },
};

/* ─── Edge values ────────────────────────────────────────────────── */

export const ValueZero: Story = {
  name: "Value: 0 (mínimo)",
  args: { value: 0, state: "pendiente", size: "sm" },
};
export const ValueMax: Story = {
  name: "Value: 999 (máximo)",
  args: { value: 999, state: "sin-stock", size: "sm" },
};

/* ─── All states grid ────────────────────────────────────────────── */

export const AllStates: Story = {
  name: "Grid: todos los estados",
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, auto)", gap: 24, alignItems: "center" }}>
      {(["pendiente", "incompleto", "completo", "sin-stock"] as const).map((s) => (
        <div key={s} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <QuantitySelector value={3} state={s} size="sm" />
          <span style={{ fontSize: 11, color: "#5d636c" }}>{s}</span>
        </div>
      ))}
      {(["pendiente", "incompleto", "completo", "sin-stock"] as const).map((s) => (
        <div key={`${s}-p`} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <QuantitySelector value={3} state={s} mode="pressed" size="sm" />
          <span style={{ fontSize: 11, color: "#5d636c" }}>{s} pressed</span>
        </div>
      ))}
    </div>
  ),
};

/* ─── All sizes grid ─────────────────────────────────────────────── */

export const AllSizes: Story = {
  name: "Grid: todos los tamaños",
  render: () => (
    <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
      {(["sm", "md", "lg"] as const).map((sz) => (
        <div key={sz} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <QuantitySelector value={7} state="completo" size={sz} />
          <span style={{ fontSize: 11, color: "#5d636c" }}>{sz}</span>
        </div>
      ))}
    </div>
  ),
};

/* ─── Interactive ────────────────────────────────────────────────── */

export const Interactive: Story = {
  name: "Interactive / Tap to increment",
  render: () => {
    const [val, setVal] = useState(0);
    const getState = (v: number) => {
      if (v === 0) return "pendiente" as const;
      if (v < 3) return "incompleto" as const;
      if (v >= 5) return "sin-stock" as const;
      return "completo" as const;
    };
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
        <QuantitySelector
          value={val}
          state={getState(val)}
          onTap={() => setVal((v) => (v >= 6 ? 0 : v + 1))}
        />
        <p style={{ margin: 0, fontSize: 12, color: "#5d636c" }}>
          Tap para incrementar (reset a 0 en 7)
        </p>
      </div>
    );
  },
};
