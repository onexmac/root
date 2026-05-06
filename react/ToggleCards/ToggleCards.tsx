import React from "react";

export type ToggleCardsState = "standard" | "pressed";
export type ToggleCardsMode = "normal" | "disabled";
export type ToggleCardsVisibility = "open" | "hidden";

export interface ToggleCardsProps {
  state?: ToggleCardsState;
  mode?: ToggleCardsMode;
  visibility?: ToggleCardsVisibility;
  onClick?: () => void;
}

export function ToggleCards({
  state = "standard",
  mode = "normal",
  visibility = "open",
  onClick,
}: ToggleCardsProps) {
  return (
    <button
      className={`toggle-cards toggle-cards--${state} toggle-cards--${mode} toggle-cards--${visibility}`}
      disabled={mode === "disabled"}
      onClick={onClick}
      aria-label="Toggle cards"
    >
      {visibility === "open" ? "^" : "v"}
    </button>
  );
}
