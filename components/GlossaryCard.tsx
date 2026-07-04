"use client";

import { motion, AnimatePresence, type PanInfo } from "motion/react";
import { springs } from "@/lib/springs";
import { haptic } from "@/lib/haptic";

export function GlossaryCard({
  term,
  definition,
  onClose,
}: {
  term: string | null;
  definition: string;
  onClose: () => void;
}) {
  const open = term !== null;

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="scrim"
            className="absolute inset-0 z-40 bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.24 }}
            onClick={onClose}
          />
          <motion.div
            key="card"
            className="absolute inset-x-5 z-50 mx-auto max-w-[440px] rounded-[28px] bg-white px-6 pt-8 pb-7 text-black"
            style={{ bottom: "calc(var(--sab) + 20px)", touchAction: "none", willChange: "transform" }}
            initial={{ y: "115%" }}
            animate={{ y: 0, transition: springs.expanding }}
            exit={{ y: "115%", transition: springs.snappy }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.6 }}
            dragSnapToOrigin
            onDragStart={() => haptic.drag()}
            onDragEnd={(_, info: PanInfo) => {
              if (info.offset.y > 100 || info.velocity.y > 500) {
                haptic.select();
                onClose();
              }
            }}
          >
            <h3 className="text-2xl font-semibold mb-4">{term}</h3>
            <p className="text-lg leading-relaxed text-black/80">{definition}</p>
            <div className="flex justify-center mt-6">
              <button
                type="button"
                aria-label="Cerrar"
                onClick={onClose}
                className="w-12 h-12 rounded-full bg-black/10 flex items-center justify-center"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M4 7l6 6 6-6"
                    stroke="var(--accent)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
