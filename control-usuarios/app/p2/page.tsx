"use client";

import { useState } from "react";
import { List } from "@phosphor-icons/react";
import { motion } from "motion/react";
import { WorkerCard } from "@/components/p2/worker-card";
import { MobileMorphSheet } from "@/components/p2/mobile-morph-sheet";
import { mockWorkers } from "@/lib/mock-workers";
import { springs } from "@/lib/springs";
import { haptic } from "@/lib/haptic";

export default function P2Page() {
  const [expandedId, setExpandedId] = useState<string | null>("2");

  return (
    <div className="relative mx-auto flex min-h-screen w-full max-w-[402px] flex-col bg-background pb-32">
      <div className="flex flex-col gap-4 px-5 pt-6">
        {mockWorkers.map((w) => (
          <WorkerCard
            key={w.id}
            worker={w}
            expanded={expandedId === w.id}
            onToggle={() => setExpandedId((curr) => (curr === w.id ? null : w.id))}
          />
        ))}
      </div>

      {/* Bottom nav — burger (left) + add (right, handled by MobileMorphSheet) */}
      <motion.button
        type="button"
        whileTap={{ scale: 0.92 }}
        transition={springs.snappy}
        onClick={() => haptic.select()}
        aria-label="Menú"
        className="fixed bottom-8 left-4 z-10 flex h-20 w-20 items-center justify-center rounded-lg bg-charcoal text-white"
      >
        <List size={28} weight="bold" />
      </motion.button>

      <MobileMorphSheet />
    </div>
  );
}
