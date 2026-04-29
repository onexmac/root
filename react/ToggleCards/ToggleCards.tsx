import React from "react";

export type ToggleCardsState = "standard" | "pressed" | "disabled";
export type ToggleCardsVisibility = "open" | "hidden";

export interface ToggleCardsProps {
  state?: ToggleCardsState;
  visibility?: ToggleCardsVisibility;
  onClick?: () => void;
}

export function ToggleCards({
  state = "standard",
  visibility = "open",
  onClick,
}: ToggleCardsProps) {
  return (
    <button
      className={`toggle-cards toggle-cards--${state} toggle-cards--${visibility}`}
      disabled={state === "disabled"}
      onClick={onClick}
      aria-label="Toggle cards"
    >
      {visibility === "open" ? "^" : "v"}
    </button>
  );
}
