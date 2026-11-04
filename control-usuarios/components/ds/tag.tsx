"use client";

import { CheckCircle } from "@phosphor-icons/react";
import { cn } from "@/lib/cn";

type Variant = "active" | "inactive" | "rolePicked" | "roleIdle";

export function Tag({
  children,
  variant = "roleIdle",
  withCheck = false,
  onClick,
  className,
}: {
  children: React.ReactNode;
  variant?: Variant;
  withCheck?: boolean;
  onClick?: () => void;
  className?: string;
}) {
  const styles: Record<Variant, string> = {
    active: "bg-black text-white",
    inactive: "bg-gray-200 text-gray-400",
    rolePicked: "bg-black text-white",
    roleIdle: "bg-transparent text-gray-300 ring-1 ring-gray-200",
  };

  const Component: React.ElementType = onClick ? "button" : "span";

  return (
    <Component
      type={onClick ? "button" : undefined}
      onClick={onClick}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full px-4 py-1.5 text-[14px] font-medium leading-none transition-colors",
        styles[variant],
        onClick && "cursor-pointer",
        className,
      )}
    >
      <span>{children}</span>
      {withCheck && <CheckCircle size={16} weight="fill" />}
    </Component>
  );
}
