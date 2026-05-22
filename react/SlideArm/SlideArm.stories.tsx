import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { SlideArm } from "./SlideArm";

const meta: Meta<typeof SlideArm> = {
  title: "Nuevos/SlideArm",
  component: SlideArm,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "SlideArm — la perilla colapsada es un botón verde compacto al borde " +
          "trailing. Tap → la barra crece con springs.expanding hacia un " +
          "SlideToConfirm full-width y aparece un cancel X arriba (springs.popping, " +
          "anchor bottom-right). Tap cancel o drag-to-confirm desarma con " +
          "springs.shrinking. El SlideToConfirm queda SIEMPRE montado, solo se " +
          "gatea su gesture con `enabled` para evitar crossfade glitch. Port " +
          "fiel de P2/Components/PedirBar.swift.",
      },
    },
  },
  argTypes: {
    label: { control: "text" },
    collapsedWidth: { control: { type: "range", min: 80, max: 280, step: 8 } },
    height: { control: { type: "range", min: 56, max: 96, step: 4 } },
    cornerRadius: { control: { type: "range", min: 0, max: 40, step: 2 } },
    successHoldMs: { control: { type: "range", min: 200, max: 3000, step: 100 } },
  },
};

export default meta;

type Story = StoryObj<typeof SlideArm>;

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
  render: (args) => wrap(<SlideArm {...args} />),
};

export const CrearUsuario: Story = {
  args: {
    label: "CREAR USUARIO",
    collapsedWidth: 200,
    onConfirm: () => console.log("usuario creado"),
  },
  render: (args) => wrap(<SlideArm {...args} />),
};
