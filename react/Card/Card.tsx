import React from "react";
import { Icon } from "../Icon/Icon";
import { QuantityStepper, QuantityStepperState } from "../Button/QuantityStepper";

// ─── SummaryCard ──────────────────────────────────────────────────────────────

export type SummaryCardVisibility = "open" | "close";

export interface SummaryCardProps {
  /** Card title / solicitud number */
  title?: string;
  /** Subtitle / location */
  subtitle?: string;
  /** Status label */
  status?: string;
  /** open = expanded (shows chevron up), close = collapsed (shows chevron down) */
  visibility?: SummaryCardVisibility;
  onClick?: () => void;
  children?: React.ReactNode;
}

export function SummaryCard({
  title = "Solicitud #001",
  subtitle = "Bodega A",
  status = "Pendiente",
  visibility = "open",
  onClick,
  children,
}: SummaryCardProps) {
  return (
    <div
      className={`ds-summary-card ds-summary-card--${visibility}`}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <div className="ds-summary-card__header">
        <div className="ds-summary-card__info">
          <span className="ds-summary-card__title">{title}</span>
          <span className="ds-summary-card__subtitle">{subtitle}</span>
        </div>
        <div className="ds-summary-card__right">
          <span className="ds-summary-card__status">{status}</span>
          <Icon
            name={visibility === "open" ? "chevron-up" : "chevron-down"}
            size="md"
          />
        </div>
      </div>
      {visibility === "open" && children && (
        <div className="ds-summary-card__body">{children}</div>
      )}
    </div>
  );
}

// ─── MaterialList ─────────────────────────────────────────────────────────────

export interface MaterialListProps {
  /** Material description */
  description: string;
  /** Quantity selector state */
  qtyState?: QuantityStepperState;
  /** Quantity value */
  qty?: number;
  onQtyChange?: (qty: number) => void;
}

export function MaterialList({
  description = "CONECTOR ADAPTADOR HEMBRA EAGLE 110V",
  qtyState = "pendiente",
  qty = 1,
  onQtyChange,
}: MaterialListProps) {
  return (
    <div className="ds-material-list">
      <p className="ds-material-list__desc">{description}</p>
      <QuantityStepper
        state={qtyState}
        qty={qty}
        onQtyChange={onQtyChange}
      />
    </div>
  );
}

// ─── DetailCard ───────────────────────────────────────────────────────────────

export interface DetailCardProps {
  title?: string;
  subtitle?: string;
  status?: string;
  materials?: MaterialListProps[];
}

export function DetailCard({
  title = "Solicitud #001",
  subtitle = "Bodega A",
  status = "Pendiente",
  materials = [],
}: DetailCardProps) {
  return (
    <div className="ds-detail-card">
      <SummaryCard
        title={title}
        subtitle={subtitle}
        status={status}
        visibility="open"
      />
      <div className="ds-detail-card__materials">
        {materials.map((m, i) => (
          <MaterialList key={i} {...m} />
        ))}
      </div>
    </div>
  );
}

// ─── Legacy Card ─────────────────────────────────────────────────────────────

export interface CardProps {
  title: string;
  description?: string;
  variant?: "default" | "outlined" | "filled";
  children?: React.ReactNode;
}

/** @deprecated Use SummaryCard, MaterialList, or DetailCard */
export function Card({
  title,
  description,
  variant = "default",
  children,
}: CardProps) {
  return (
    <div className={`ds-card ds-card--${variant}`}>
      <div className="ds-card__header">
        <h3 className="ds-card__title">{title}</h3>
        {description && <p className="ds-card__description">{description}</p>}
      </div>
      {children && <div className="ds-card__body">{children}</div>}
    </div>
  );
}
