import type { Meta, StoryObj } from "@storybook/react-vite";
import React, { useState } from "react";
import { SlideButton } from "./SlideButton";

const meta: Meta<typeof SlideButton> = {
  title: "Sistema de Diseño/SlideButton",
  component: SlideButton,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
**Gestures**

- **Drag** ≥ \`threshold\` (default 0.72) → \`onConfirm\` fires, success state holds for \`confirmedHoldMs\`, then auto-resets.
- **Drag** below threshold → snap-back via \`springs.snappy\`.
- **Tap** (no meaningful drag) → nudge: bouncy kick to the right + spring back. Hints at slide-ability without committing.

**Haptics**

- \`select\` on touchdown (earlier than drag-start, feels instant).
- \`drag\` on snap-back (failed drag).
- \`complete\` on successful slide.

**Figma:** node [997-3096](https://www.figma.com/design/oRDLRL9OUNcTQ0k6G5MBPS/Losa-Flotante?node-id=997-3096).
        `.trim(),
      },
    },
  },
  args: {
    label: "Pedir",
    confirmedLabel: "Confirmado",
    onConfirm: () => console.log("confirmed"),
  },
};

export default meta;
type Story = StoryObj<typeof SlideButton>;

export const Default: Story = {};

export const Disabled: Story = {
  args: { disabled: true, disabledLabel: "No disponible" },
};

/**
 * Tap the knob without dragging — the knob springs to the right and back
 * to hint at slide-ability. Useful for first-time users.
 */
export const TapForNudge: Story = {
  name: "Tap → nudge",
  render: () => {
    const [count, setCount] = useState(0);
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
        <SlideButton label="Pedir" onConfirm={() => setCount((c) => c + 1)} />
        <p style={{ margin: 0, fontSize: 12, color: "#5d636c" }}>
          Tap the knob (don&apos;t drag) — it kicks right and returns. Confirmed {count}×.
        </p>
      </div>
    );
  },
};

export const AllStates: Story = {
  name: "SlideButton / All states",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 32, padding: 24 }}>
      <div>
        <p style={{ margin: "0 0 8px", fontSize: 12, color: "#5d636c" }}>Standard</p>
        <SlideButton label="Pedir" onConfirm={() => console.log("confirmed")} />
      </div>
      <div>
        <p style={{ margin: "0 0 8px", fontSize: 12, color: "#5d636c" }}>Disabled</p>
        <SlideButton label="Pedir" onConfirm={() => {}} disabled />
      </div>
    </div>
  ),
};
