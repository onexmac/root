import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { SummaryCard, MaterialList, DetailCard } from "./Card";
import type { QuantitySelectorState } from "../QuantitySelector/QuantitySelector";

const meta: Meta<typeof SummaryCard> = {
  title: "Cards/Card",
  component: SummaryCard,
  tags: ["autodocs"],
  argTypes: {
    visibility: { control: "select", options: ["open", "close"] },
  },
  args: {
    company: "NOVARUM",
    code: "C.01",
    orderNumber: "BS000095",
    timestamp: "Ayer 10:25 am",
    statusState: "completo",
    visibility: "open",
  },
};
export default meta;
type Story = StoryObj<typeof SummaryCard>;

export const Open:  Story = { args: { visibility: "open"  } };
export const Close: Story = { args: { visibility: "close" } };

export const MaterialListExample: StoryObj<{ qtyState: QuantitySelectorState; qty: number }> = {
  name: "MaterialList",
  argTypes: {
    qtyState: { control: "select", options: ["pendiente", "incompleto", "completo", "sin-stock"] },
    qty:      { control: { type: "number", min: 0, max: 999 } },
  },
  args: { qtyState: "incompleto", qty: 3 },
  render: ({ qtyState, qty }) => (
    <div style={{ padding: 16, background: "var(--ds-color-surface)" }}>
      <MaterialList
        description="CONECTOR ADAPTADOR HEMBRA EAGLE 110V SALIDA MACHO EAGLE 220V"
        qtyState={qtyState}
        qty={qty}
        onStateChange={() => {}}
      />
    </div>
  ),
};

export const DetailCardExample: StoryObj = {
  name: "DetailCard",
  render: () => (
    <div style={{ padding: 16, background: "var(--ds-color-surface)" }}>
      <DetailCard
        company="NOVARUM"
        code="C.01"
        orderNumber="BS000095"
        timestamp="Ayer 10:25 am"
        statusState="completo"
        materials={[
          { description: "CONECTOR ADAPTADOR HEMBRA EAGLE 110V SALIDA MACHO EAGLE 220V", qtyState: "incompleto", qty: 3 },
          { description: "CONECTOR ADAPTADOR HEMBRA EAGLE 110V SALIDA MACHO EAGLE 220V", qtyState: "incompleto", qty: 3 },
          { description: "CONECTOR ADAPTADOR HEMBRA EAGLE 110V SALIDA MACHO EAGLE 220V", qtyState: "incompleto", qty: 3 },
        ]}
      />
    </div>
  ),
};
