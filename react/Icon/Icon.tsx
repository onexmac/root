import React from "react";

export type IconSize = "sm" | "md" | "lg";

export interface IconProps {
  name: string;
  size?: IconSize;
  color?: string;
}

export function Icon({ name, size = "md", color = "currentColor" }: IconProps) {
  return (
    <span
      className={`icon icon--${name} icon--${size}`}
      style={{ color }}
      aria-label={name}
    />
  );
}
