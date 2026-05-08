import type { Meta, StoryObj } from "@storybook/react-vite";
import React, { useState } from "react";
import { QuantitySelector } from "./QuantitySelector";

const meta: Meta<typeof QuantitySelector> = {
  title: "Core/Button/QuantitySelector",
  component: QuantitySelector,
  tags: ["autodocs"],
  argTypes: {
    state: { control: "select", options: ["incompleto", "pendiente", "completo", "sin-stock"] },
    mode:  { control: "select", options: ["standard", "pressed"] },
  },
  args: { state: "pendiente", qty: 1 },
};
export default meta;
type Story = StoryObj<typeof QuantitySelector>;

export const Incompleto: Story = { args: { state: "incompleto", qty: 2 } };
export const Pendiente:  Story = { args: { state: "pendiente",  qty: 0 } };
export const Completo:   Story = { args: { state: "completo",   qty: 5 } };
export const SinStock:   Story = { args: { state: "sin-stock",  qty: 0 } };

export const Interactive: Story = {
  render: () => {
    const [qty, setQty] = useState(2);
    const state = qty === 0 ? "sin-stock" : qty < 3 ? "incompleto" : qty < 5 ? "pendiente" : "completo";
    return <QuantitySelector qty={qty} onQtyChange={setQty} state={state} />;
  },
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 16, padding: 16 }}>
      <QuantitySelector state="incompleto" qty={2} />
      <QuantitySelector state="pendiente" qty={0} />
      <QuantitySelector state="completo" qty={5} />
      <QuantitySelector state="sin-stock" qty={0} />
    </div>
  ),
};
