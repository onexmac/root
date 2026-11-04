"use client";

import { cn } from "@/lib/cn";

export function FormField({
  label,
  value,
  onChange,
  placeholder,
  className,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  className?: string;
}) {
  return (
    <label className={cn("flex flex-col gap-1.5", className)}>
      <span className="text-[14px] font-medium text-gray-500">{label}</span>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="h-12 rounded-md bg-white px-4 text-[16px] text-black ring-1 ring-gray-200 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
      />
    </label>
  );
}
