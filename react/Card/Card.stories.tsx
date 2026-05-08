import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { SummaryCard, MaterialList, DetailCard } from "./Card";

const meta: Meta<typeof SummaryCard> = {
  title: "Core/Card/SummaryCard",
  component: SummaryCard,
  tags: ["autodocs"],
  argTypes: { visibility: { control: "select", options: ["open", "close"] } },
  args: { title: "Solicitud #001", subtitle: "Bodega A", status: "Pendiente", visibility: "open" },
};
export default meta;
type Story = StoryObj<typeof SummaryCard>;

export const Open:  Story = { args: { visibility: "open"  } };
export const Close: Story = { args: { visibility: "close" } };

export const BothStates: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, padding: 16 }}>
      <SummaryCard visibility="open"  title="Solicitud #001" subtitle="Bodega A" status="Pendiente" />
      <SummaryCard visibility="close" title="Solicitud #002" subtitle="Bodega B" status="Completo" />
    </div>
  ),
};

export const MaterialListExample: StoryObj = {
  name: "MaterialList",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, padding: 16 }}>
      <MaterialList description="CONECTOR ADAPTADOR HEMBRA EAGLE 110V" qtyState="completo" qty={5} />
      <MaterialList description="CABLE THHN #12 ROJO 100M" qtyState="pendiente" qty={2} />
      <MaterialList description="TUBO PVC 1/2 PULGADA" qtyState="incompleto" qty={1} />
      <MaterialList description="BREAKER 20A SCHNEIDER" qtyState="sin-stock" qty={0} />
    </div>
  ),
};

export const DetailCardExample: StoryObj = {
  name: "DetailCard",
  render: () => (
    <DetailCard
      title="Solicitud #042"
      subtitle="Proyecto Losa Flotante"
      status="En curso"
      materials={[
        { description: "CONECTOR ADAPTADOR HEMBRA EAGLE 110V", qtyState: "completo", qty: 4 },
        { description: "CABLE THHN #12 ROJO 100M", qtyState: "pendiente", qty: 2 },
        { description: "TUBO PVC 1/2 PULGADA",     qtyState: "incompleto", qty: 1 },
      ]}
    />
  ),
};
