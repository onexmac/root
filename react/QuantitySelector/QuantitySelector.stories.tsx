import type { Meta, StoryObj } from "@storybook/react-vite";
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
