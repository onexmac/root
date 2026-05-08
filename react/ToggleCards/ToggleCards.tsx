import React from "react";
import { Icon } from "../Icon/Icon";

export type ToggleCardsState = "standard" | "pressed";
export type ToggleCardsMode = "normal" | "disabled";
export type ToggleCardsVisibility = "open" | "close";
export type ToggleCardsSize = "big" | "small";

export interface ToggleCardsProps {
  state?: ToggleCardsState;
  mode?: ToggleCardsMode;
  /** open = chevron up (expanded), close = chevron down (collapsed) */
  visibility?: ToggleCardsVisibility;
  /** big = taller button (112px), small = 74px */
  size?: ToggleCardsSize;
  onClick?: () => void;
}

export function ToggleCards({
  state = "standard",
  mode = "normal",
  visibility = "open",
  size = "small",
  onClick,
}: ToggleCardsProps) {
  const isDisabled = mode === "disabled";

  return (
    <button
      className={[
        "ds-toggle-cards",
        `ds-toggle-cards--${state}`,
        `ds-toggle-cards--${mode}`,
        `ds-toggle-cards--${visibility}`,
        `ds-toggle-cards--${size}`,
      ].join(" ")}
      disabled={isDisabled}
      onClick={!isDisabled ? onClick : undefined}
      type="button"
      aria-label={visibility === "open" ? "Colapsar" : "Expandir"}
      aria-expanded={visibility === "open"}
    >
      <Icon
        name={visibility === "open" ? "chevron-up" : "chevron-down"}
        size="lg"
        color="var(--ds-color-white)"
      />
    </button>
  );
}
