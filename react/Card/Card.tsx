import React from "react";

export interface CardProps {
  title: string;
  description?: string;
  variant?: "default" | "outlined" | "filled";
  children?: React.ReactNode;
}

export function Card({
  title,
  description,
  variant = "default",
  children,
}: CardProps) {
  return (
    <div className={`card card--${variant}`}>
      <div className="card__header">
        <h3 className="card__title">{title}</h3>
        {description && <p className="card__description">{description}</p>}
      </div>
      {children && <div className="card__body">{children}</div>}
    </div>
  );
}
