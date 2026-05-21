import type { Meta, StoryObj } from "@storybook/react-vite";
import { SlideToConfirm } from "./SlideToConfirm";

const meta: Meta<typeof SlideToConfirm> = {
  title: "Buttons/SlideToConfirm",
  component: SlideToConfirm,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Slide-to-confirm donde la perilla verde crece con el drag (no es un knob fijo). " +
          "El track negro muestra un chevron-hint trailing que se desvanece a medida que se " +
          "avanza. Pasa el umbral (default 0.72), se commit con un slight overshoot via " +
          "springs.completing y auto-resetea via springs.settling después de successHoldMs. " +
          "Si el usuario solo tap-ea sin arrastrar, hace un nudge de +52px para invitar al " +
          "drag. Port fiel de P2/Components/SlideToConfirm.swift.",
      },
    },
  },
  argTypes: {
    label: { control: "text" },
    knobWidth: { control: { type: "range", min: 80, max: 280, step: 8 } },
    threshold: { control: { type: "range", min: 0.4, max: 0.95, step: 0.01 } },
    height: { control: { type: "range", min: 56, max: 96, step: 4 } },
    cornerRadius: { control: { type: "range", min: 0, max: 40, step: 2 } },
    successHoldMs: { control: { type: "range", min: 200, max: 3000, step: 100 } },
    enabled: { control: "boolean" },
  },
};

export default meta;

type Story = StoryObj<typeof SlideToConfirm>;

const wrap = (children: React.ReactNode) => (
  <div style={{ width: 360, padding: 24, background: "var(--ds-color-surface)" }}>
    {children}
  </div>
);

export const Default: Story = {
  args: {
    label: "PEDIR",
    onConfirm: () => console.log("confirmed"),
  },
  render: (args) => wrap(<SlideToConfirm {...args} />),
};

export const CrearUsuario: Story = {
  args: {
    label: "CREAR USUARIO",
    knobWidth: 200,
    onConfirm: () => console.log("usuario creado"),
  },
  render: (args) => wrap(<SlideToConfirm {...args} />),
};

export const Disabled: Story = {
  args: {
    label: "PEDIR",
    enabled: false,
    onConfirm: () => console.log("never"),
  },
  render: (args) => wrap(<SlideToConfirm {...args} />),
};
