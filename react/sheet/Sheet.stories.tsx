import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Sheet } from "./Sheet";
import { FormField } from "../forms/Form";
import { SlideButton } from "../SlideButton/SlideButton";

const meta: Meta<typeof Sheet> = {
  title: "Cards/Sheet",
  component: Sheet,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Sheet — generic FAB → bottom-sheet morph. Same physics as the " +
          "LosaFlotante M2 sheet, extracted as a reusable DS primitive. " +
          "Manages 3-state machine (closed/open/fullScreen), two-phase morph " +
          "(width first, height +180 ms), drag-to-dismiss (offset > 120 OR " +
          "velocity > 600), scroll-to-fullscreen with 12/2 hysteresis, scrim, " +
          "and the cascade entrance. Body / Header / Footer slots. Behavior " +
          "contract: SHEET_MORPH.md on the maintainer's Desktop.",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Sheet>;

/** Demo wrapper that controls open state — Sheet itself is stateless about
 * `open`, the parent owns it. Mirrors how LosaFlotante consumes it. */
function SheetDemo({ withForm = false }: { withForm?: boolean }) {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: 402,
        minHeight: "100vh",
        margin: "0 auto",
        background: "var(--ds-color-surface)",
        padding: 24,
        color: "var(--ds-color-gray-500)",
      }}
    >
      <p style={{ paddingTop: 80 }}>
        Tap the FAB at the bottom-right →
      </p>

      <Sheet
        open={open}
        onOpen={() => setOpen(true)}
        onDismiss={() => setOpen(false)}
        fab={{
          background: "var(--ds-color-green-100)",
          color: "var(--ds-color-black)",
          iconName: "plus",
          ariaLabel: "Crear",
        }}
      >
        <Sheet.Header iconName="user" title="Nuevo registro" />
        <Sheet.Body>
          {withForm ? (
            <>
              <FormField
                label="Nombre"
                placeholder="Placeholder"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <FormField label="Apellido" placeholder="Placeholder" />
              <FormField label="DNI" placeholder="Placeholder" />
              <FormField label="Teléfono" placeholder="Placeholder" />
              <FormField label="Correo" placeholder="Placeholder" />
            </>
          ) : (
            <p style={{ color: "var(--ds-color-gray-500)" }}>
              Body slot — anything you want here. Scroll the content past
              ~12 px to watch the sheet rise to fullscreen, then scroll back
              to ~0 to drop back.
            </p>
          )}
        </Sheet.Body>
        <Sheet.Footer>
          <SlideButton
            label="Crear"
            onConfirm={() => setOpen(false)}
          />
        </Sheet.Footer>
      </Sheet>
    </div>
  );
}

export const Default: Story = {
  render: () => <SheetDemo />,
};

export const WithForm: Story = {
  name: "With form + SlideArm footer",
  render: () => <SheetDemo withForm />,
};
