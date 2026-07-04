"use client";

import { motion, useTransform, type MotionValue } from "motion/react";

const PILL_W = 8;
const PILL_H = 26;
const GAP = 6;

export function VerticalPills({
  count,
  page,
  y,
  pageH,
  visible,
}: {
  count: number;
  page: number;
  y: MotionValue<number>;
  pageH: number;
  visible: boolean;
}) {
  const signedProgress = useTransform(y, (latest) => {
    if (!pageH) return 0;
    const translation = latest - -page * pageH;
    return Math.max(-1, Math.min(1, -translation / pageH));
  });

  return (
    <div
      className="absolute right-4 z-30 flex flex-col"
      style={{
        top: "50%",
        transform: "translateY(-50%)",
        gap: GAP,
        opacity: visible ? 1 : 0,
        transition: "opacity 220ms ease-out",
      }}
    >
      {Array.from({ length: count }).map((_, i) => (
        <Pill key={i} index={i} page={page} progress={signedProgress} />
      ))}
    </div>
  );
}

function Pill({
  index,
  page,
  progress,
}: {
  index: number;
  page: number;
  progress: MotionValue<number>;
}) {
  const fill = useTransform(progress, (p) => {
    if (index === page) return Math.max(0, Math.min(1, p));
    if (index === page - 1 && p < 0) return Math.max(0, Math.min(1, 1 + p));
    return index < page ? 1 : 0;
  });
  const fillHeight = useTransform(fill, (f) => `${f * 100}%`);

  return (
    <div
      style={{
        width: PILL_W,
        height: PILL_H,
        borderRadius: PILL_W / 2,
        background: "rgba(255,255,255,0.28)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: fillHeight,
          background: "#fff",
          borderRadius: PILL_W / 2,
        }}
      />
    </div>
  );
}
