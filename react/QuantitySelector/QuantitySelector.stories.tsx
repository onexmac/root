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

/** Pendiente — gris, sin anillo. No se ha registrado. */
export const Pendiente: Story = { args: { value: 3, state: "pendiente", size: "sm" } };

/** Incompleto — anillo amarillo a la mitad derecha. Faltan materiales. */
export const Incompleto: Story = { args: { value: 3, state: "incompleto", size: "sm" } };

/** Completo — anillo verde completo. Están todos. */
export const Completo: Story = { args: { value: 3, state: "completo", size: "sm" } };

/** Sin stock — anillo rojo completo. No hay disponible. */
export const SinStock: Story = { args: { value: 3, state: "sin-stock", size: "sm" } };

/** Pressed (estado fijo) — halo shadow alrededor. También se aplica auto al :active de un Tappable. */
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

/** Interactive — tap para incrementar cantidad con animación. */
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
