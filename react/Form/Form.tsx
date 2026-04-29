import React from "react";

export type InputType = "text" | "email" | "password" | "number";
export type InputState = "default" | "error" | "success" | "disabled";

export interface FormFieldProps {
  label: string;
  placeholder?: string;
  type?: InputType;
  state?: InputState;
  helperText?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function FormField({
  label,
  placeholder,
  type = "text",
  state = "default",
  helperText,
  value,
  onChange,
}: FormFieldProps) {
  return (
    <div className={`form-field form-field--${state}`}>
      <label className="form-field__label">{label}</label>
      <input
        className="form-field__input"
        type={type}
        placeholder={placeholder}
        disabled={state === "disabled"}
        value={value}
        onChange={onChange}
      />
      {helperText && (
        <span className="form-field__helper">{helperText}</span>
      )}
    </div>
  );
}
