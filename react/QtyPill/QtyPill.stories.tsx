import type { Meta, StoryObj } from "@storybook/react-vite";
import { QtyPill } from "./QtyPill";

const meta: Meta<typeof QtyPill> = {
  title: "Components/QtyPill",
  component: QtyPill,
  parameters: { layout: "centered" },
  argTypes: {
    variant: {
      control: { type: "inline-radio" },
      options: ["pendiente", "incompleto", "completo", "sin-stock"],
    },
    mode: { control: { type: "inline-radio" }, options: ["standard", "pressed"] },
    size: { control: { type: "inline-radio" }, options: ["sm", "md", "lg"] },
    value: { control: { type: "number", min: 0, max: 999 } },
  },
};

export default meta;
type Story = StoryObj<typeof QtyPill>;

/** Pendiente — gris, sin anillo. No se ha registrado. */
export const Pendiente: Story = { args: { value: 3, variant: "pendiente", size: "sm" } };

/** Incompleto — anillo amarillo a la mitad derecha. Faltan materiales. */
export const Incompleto: Story = { args: { value: 3, variant: "incompleto", size: "sm" } };

/** Completo — anillo verde completo. Están todos. */
export const Completo: Story = { args: { value: 3, variant: "completo", size: "sm" } };

/** Sin stock — anillo rojo completo. No hay disponible. */
export const SinStock: Story = { args: { value: 3, variant: "sin-stock", size: "sm" } };

/** Pressed (estado fijo) — halo shadow alrededor. También se aplica auto al :active de un Tappable. */
export const PendientePressed: Story = {
  args: { value: 3, variant: "pendiente", mode: "pressed", size: "sm" },
};

export const IncompletoPressed: Story = {
  args: { value: 3, variant: "incompleto", mode: "pressed", size: "sm" },
};

export const CompletoPressed: Story = {
  args: { value: 3, variant: "completo", mode: "pressed", size: "sm" },
};

export const SinStockPressed: Story = {
  args: { value: 3, variant: "sin-stock", mode: "pressed", size: "sm" },
};

/** Tappable — botón interactivo, halo automático en :active al mantener presionado. */
export const Tappable: Story = {
  args: {
    value: 5,
    variant: "incompleto",
    size: "md",
    onTap: () => console.log("tap"),
  },
};

export const Large: Story = { args: { value: 120, variant: "completo", size: "lg" } };
