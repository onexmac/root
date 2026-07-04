"use client";

import { motion } from "motion/react";
import { springs } from "@/lib/springs";

export function ProgressDots({
  count,
  active,
  visible,
}: {
  count: number;
  active: number;
  visible: boolean;
}) {
  return (
    <div
      className="flex gap-1.5"
      style={{
        opacity: visible ? 1 : 0,
        transition: "opacity 220ms ease-out",
      }}
    >
      {Array.from({ length: count }).map((_, i) => (
        <motion.span
          key={i}
          animate={{ width: i === active ? 44 : 24, opacity: i === active ? 1 : 0.4 }}
          transition={springs.snappy}
          style={{
            height: 10,
            borderRadius: 5,
            background: "#fff",
            display: "block",
          }}
        />
      ))}
    </div>
  );
}
