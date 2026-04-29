import React from "react";

export type ButtonVariant = "primary" | "secondary" | "disabled";
export type ButtonState = "standard" | "pressed" | "disabled";

export interface ButtonProps {
  label: string;
  variant?: ButtonVariant;
  state?: ButtonState;
  onClick?: () => void;
}

export function Button({
  label,
  variant = "primary",
  state = "standard",
  onClick,
}: ButtonProps) {
  return (
    <button
      className={`btn btn--${variant} btn--${state}`}
      disabled={state === "disabled" || variant === "disabled"}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
