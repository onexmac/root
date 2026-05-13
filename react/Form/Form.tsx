import React from "react";
import { Icon } from "../Icon/Icon";

// ─── FormField ────────────────────────────────────────────────────────────────

export type FormFieldState =
  | "standard"
  | "active"
  | "x"
  | "ayuda"
  | "advertencia"
  | "disabled";

export type InputType = "text" | "email" | "password" | "number" | "tel";

export interface FormFieldProps {
  label?: string;
  placeholder?: string;
  type?: InputType;
  state?: FormFieldState;
  helperText?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear?: () => void;
}

export function FormField({
  label = "Nombre",
  placeholder = "Escribir aquí",
  type = "text",
  state = "standard",
  helperText,
  value,
  onChange,
  onClear,
}: FormFieldProps) {
  const isDisabled = state === "disabled";

  const helperMap: Partial<Record<FormFieldState, string>> = {
    ayuda: helperText ?? "Texto de ayuda",
    advertencia: helperText ?? "Campo requerido",
  };

  const resolvedHelper = helperMap[state] ?? helperText;

  return (
    <div className={`ds-form-field ds-form-field--${state}`}>
      <label className="ds-form-field__label">{label}</label>
      <div className="ds-form-field__input-wrap">
        <input
          className="ds-form-field__input"
          type={type}
          placeholder={placeholder}
          disabled={isDisabled}
          value={value}
          onChange={onChange}
          aria-invalid={state === "advertencia"}
        />
        {state === "x" && !isDisabled && (
          <button
            className="ds-form-field__clear"
            onClick={onClear}
            aria-label="Limpiar"
            type="button"
          >
            <Icon name="close" size="sm" />
          </button>
        )}
        {state === "ayuda" && (
          <Icon name="info" size="sm" className="ds-form-field__icon" />
        )}
        {state === "advertencia" && (
          <Icon name="alert" size="sm" className="ds-form-field__icon ds-form-field__icon--warn" />
        )}
      </div>
      {resolvedHelper && (
        <span
          className={`ds-form-field__helper${state === "advertencia" ? " ds-form-field__helper--warn" : ""}`}
        >
          {resolvedHelper}
        </span>
      )}
    </div>
  );
}

// ─── CheckBox ────────────────────────────────────────────────────────────────

export type CheckBoxState = "add" | "remove" | "standard" | "disabled";

export interface CheckBoxProps {
  label?: string;
  state?: CheckBoxState;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

export function CheckBox({
  label = "Opción",
  state = "standard",
  checked = false,
  onChange,
}: CheckBoxProps) {
  const isDisabled = state === "disabled";

  const handleChange = () => {
    if (!isDisabled && onChange) onChange(!checked);
  };

  return (
    <label className={`ds-checkbox ds-checkbox--${state}`}>
      <span
        className={`ds-checkbox__box${checked || state === "add" ? " ds-checkbox__box--checked" : ""}`}
        onClick={handleChange}
        role="checkbox"
        aria-checked={checked}
        tabIndex={isDisabled ? -1 : 0}
        onKeyDown={(e) => e.key === " " && handleChange()}
      >
        {(checked || state === "add") && (
          <Icon name="check" size="sm" color="var(--ds-color-white)" />
        )}
        {state === "remove" && (
          <Icon name="minus" size="sm" color="var(--ds-color-white)" />
        )}
      </span>
      <span className="ds-checkbox__label">{label}</span>
    </label>
  );
}

// ─── Tag ──────────────────────────────────────────────────────────────────────

export type TagState = "active" | "standard";

export interface TagProps {
  label?: string;
  state?: TagState;
  onClick?: () => void;
}

export function Tag({ label = "Tag", state = "standard", onClick }: TagProps) {
  return (
    <button
      className={`ds-tag ds-tag--${state}`}
      onClick={onClick}
      type="button"
    >
      {label}
    </button>
  );
}

// ─── ProgressBar ─────────────────────────────────────────────────────────────

export type ProgressBarStep = 0 | 25 | 50 | 75 | 100;

export interface ProgressBarProps {
  /** Progress percentage */
  progress?: number;
  /** Optional label */
  label?: string;
}

export function ProgressBar({ progress = 0, label }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, progress));
  return (
    <div className="ds-progress">
      {label && <span className="ds-progress__label">{label}</span>}
      <div className="ds-progress__track">
        <div
          className="ds-progress__fill"
          style={{ width: `${clamped}%` }}
          role="progressbar"
          aria-valuenow={clamped}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
      <span className="ds-progress__pct">{clamped}%</span>
    </div>
  );
}

// ─── OptionLabel ─────────────────────────────────────────────────────────────

export type OptionLabelState = "active" | "standard" | "disabled";

export interface OptionLabelProps {
  label?: string;
  state?: OptionLabelState;
  onClick?: () => void;
}

export function OptionLabel({
  label = "Opción",
  state = "standard",
  onClick,
}: OptionLabelProps) {
  return (
    <button
      className={`ds-option-label ds-option-label--${state}`}
      disabled={state === "disabled"}
      onClick={onClick}
      type="button"
    >
      <span className="ds-option-label__dot" aria-hidden="true" />
      <span className="ds-option-label__text">{label}</span>
    </button>
  );
}
