"use client";

import { User } from "@phosphor-icons/react";
import { cn } from "@/lib/cn";

export function Avatar({
  size = 36,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <div
      style={{ width: size, height: size }}
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-400",
        className,
      )}
    >
      <User size={size * 0.6} weight="regular" />
    </div>
  );
}
