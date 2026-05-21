import type { Meta, StoryObj } from "@storybook/react-vite";
import { QuantitySelector } from "./QuantitySelector";

const meta: Meta<typeof QuantitySelector> = {
  title: "Buttons/QuantitySelector",
  component: QuantitySelector,
  parameters: { layout: "centered" },
  argTypes: {
    state: {
      control: { type: "inline-radio" },
      options: ["pendiente", "incompleto", "completo", "sin-stock"],
    },
    mode:  { control: { type: "inline-radio" }, options: ["standard", "pressed"] },
    size:  { control: { type: "inline-radio" }, options: ["sm", "md", "lg"] },
    value: { control: { type: "number", min: 0, max: 999 } },
  },
  args: {
    value: 3,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onTap: () => {},
  },
};

export default meta;
type Story = StoryObj<typeof QuantitySelector>;

// ─── Estados (mode=standard) ─────────────────────────────────────────────────

export const Pendiente: Story = { args: { value: 3, state: "pendiente" } };
export const Incompleto: Story = { args: { value: 3, state: "incompleto" } };
export const Completo: Story = { args: { value: 3, state: "completo" } };
export const SinStock: Story = { args: { value: 3, state: "sin-stock" } };

// ─── Mode pressed ────────────────────────────────────────────────────────────

export const PendientePressed: Story = { args: { value: 3, state: "pendiente", mode: "pressed" } };
export const IncompletoPressed: Story = { args: { value: 3, state: "incompleto", mode: "pressed" } };
export const CompletoPressed: Story = { args: { value: 3, state: "completo", mode: "pressed" } };
export const SinStockPressed: Story = { args: { value: 3, state: "sin-stock", mode: "pressed" } };

