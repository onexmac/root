"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CaretUpDown } from "@phosphor-icons/react";
import { springs } from "@/lib/springs";
import { haptic } from "@/lib/haptic";
import { cn } from "@/lib/cn";

export function SelectionDropdown({
  label,
  value,
  options,
  onChange,
  placeholder = "Label",
  className,
}: {
  label: string;
  value: string | null;
  options: string[];
  onChange: (v: string) => void;
  placeholder?: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className={cn("relative flex flex-col gap-1.5", className)}>
      <span className="text-[14px] font-medium text-gray-500">{label}</span>

      <button
        type="button"
        onClick={() => {
          haptic.select();
          setOpen((o) => !o);
        }}
        className="flex h-12 items-center justify-between rounded-md bg-white pl-4 pr-1.5 text-[16px] ring-1 ring-gray-200 focus:outline-none focus:ring-2 focus:ring-black"
      >
        <span className={cn(value ? "text-black" : "text-gray-300")}>
          {value ?? placeholder}
        </span>
        {/* White with a dark-grey stroke and a grey glyph. Solid black here
            out-shouted the field's own value — the caret is an affordance, not
            the point of the row. */}
        <span className="flex h-9 w-9 items-center justify-center rounded-[8px] bg-white text-gray-400 ring-1 ring-gray-300">
          <CaretUpDown size={18} weight="bold" />
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={springs.expanding}
            className="absolute left-0 right-0 top-full z-20 mt-1 overflow-hidden rounded-md bg-white shadow-big ring-1 ring-gray-100"
          >
            {options.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => {
                  haptic.select();
                  onChange(opt);
                  setOpen(false);
                }}
                className="block w-full px-4 py-3 text-left text-[14px] hover:bg-gray-100"
              >
                {opt}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
