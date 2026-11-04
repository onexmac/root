"use client";

import { motion } from "motion/react";
import { springs } from "@/lib/springs";
import { haptic } from "@/lib/haptic";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "danger" | "green";
type Size = "sm" | "md" | "lg";

type Props = {
  variant?: Variant;
  size?: Size;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  "aria-label"?: string;
};

export function SetButton({
  variant = "primary",
  size = "md",
  icon,
  iconRight,
  children,
  className,
  onClick,
  disabled,
  ...rest
}: Props) {
  const variants: Record<Variant, string> = {
    primary: "bg-black text-white",
    secondary: "bg-white text-black ring-1 ring-gray-200",
    ghost: "bg-transparent text-gray-400 ring-1 ring-gray-200",
    danger: "bg-red-100 text-white",
    green: "bg-green-100 text-black",
  };

  const sizes: Record<Size, string> = {
    sm: "h-9 px-4 text-[14px] gap-2",
    md: "h-12 px-6 text-[16px] gap-2",
    lg: "h-16 px-8 text-[16px] gap-3",
  };

  return (
    <motion.button
      type="button"
      whileTap={{ scale: disabled ? 1 : 0.96 }}
      transition={springs.snappy}
      disabled={disabled}
      onClick={(e) => {
        if (disabled) return;
        haptic.select();
        onClick?.(e);
      }}
      className={cn(
        "inline-flex items-center justify-center rounded-full font-medium",
        variants[variant],
        sizes[size],
        disabled && "opacity-50",
        className,
      )}
      {...rest}
    >
      {icon}
      {children ? <span>{children}</span> : null}
      {iconRight}
    </motion.button>
  );
}
