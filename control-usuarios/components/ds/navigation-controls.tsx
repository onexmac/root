"use client";

import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { motion } from "motion/react";
import { springs } from "@/lib/springs";
import { haptic } from "@/lib/haptic";
import { cn } from "@/lib/cn";

export function NavCircleButton({
  direction,
  onClick,
  disabled,
  className,
}: {
  direction: "back" | "forward";
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}) {
  const Icon = direction === "back" ? CaretLeft : CaretRight;
  return (
    <motion.button
      type="button"
      onClick={() => {
        if (disabled) return;
        haptic.select();
        onClick?.();
      }}
      whileTap={{ scale: disabled ? 1 : 0.92 }}
      transition={springs.snappy}
      disabled={disabled}
      aria-label={direction === "back" ? "Atrás" : "Siguiente"}
      className={cn(
        "flex h-12 w-12 items-center justify-center rounded-full ring-1",
        disabled
          ? "cursor-not-allowed text-gray-300 ring-gray-100"
          : "bg-white text-black ring-gray-200",
        className,
      )}
    >
      <Icon size={18} weight="bold" />
    </motion.button>
  );
}
