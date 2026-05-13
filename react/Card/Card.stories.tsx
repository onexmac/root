import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { SummaryCard, MaterialList, DetailCard } from "./Card";

const meta: Meta<typeof SummaryCard> = {
  title: "Core/Card/SummaryCard",
  component: SummaryCard,
  tags: ["autodocs"],
  argTypes: {
    visibility:  { control: "select", options: ["open", "close"] },
    statusState: { control: "select", options: ["completo", "incompleto", "pendiente", "sin-stock"] },
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

export const AllStates: Story = {
  name: "Todos los estados",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, padding: 16, background: "var(--ds-color-surface)" }}>
      <SummaryCard visibility="open"  statusState="completo"   />
      <SummaryCard visibility="close" statusState="incompleto" />
      <SummaryCard visibility="open"  statusState="pendiente"  />
      <SummaryCard visibility="close" statusState="sin-stock"  />
    </div>
  ),
};

export const MaterialListExample: StoryObj = {
  name: "MaterialList",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, padding: 16, background: "var(--ds-color-surface)" }}>
      <MaterialList description="CONECTOR ADAPTADOR HEMBRA EAGLE 110V SALIDA MACHO EAGLE 220V" qtyState="completo"   qty={5} />
      <MaterialList description="CABLE THHN #12 ROJO 100M"                                      qtyState="pendiente"  qty={2} />
      <MaterialList description="TUBO PVC 1/2 PULGADA"                                           qtyState="incompleto" qty={1} />
      <MaterialList description="BREAKER 20A SCHNEIDER"                                          qtyState="sin-stock"  qty={0} />
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
          { description: "CONECTOR ADAPTADOR HEMBRA EAGLE 110V SALIDA MACHO EAGLE 220V", qtyState: "completo",   qty: 4 },
          { description: "CABLE THHN #12 ROJO 100M",                                     qtyState: "pendiente",  qty: 2 },
          { description: "TUBO PVC 1/2 PULGADA",                                          qtyState: "incompleto", qty: 1 },
        ]}
      />
    </div>
  ),
};
