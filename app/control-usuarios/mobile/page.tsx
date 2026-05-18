"use client";

/**
 * P2 mobile screen — Control de Usuarios.
 * Mirrors P2_SPEC.md §7 (state machine for the whole screen).
 *
 * Layout per P2_SPEC.md §2:
 *   Frame width   max-w-[402px]
 *   Card margin   14 px from frame edge (px-[14px])
 *   Card spacing  16 px between cards (gap-4)
 *   Scroll pad-b  160 px (room for the fixed bottom bar + halo)
 *
 * State machine (P2_SPEC.md §7):
 *   variant = !isOpen ? "collapsed" : isFullScreen ? "fullScreen" : "sheet"
 *
 * The Burger button slides left by 100 px when the surface widens.
 * The dim overlay (50% black) is visible only when variant === "sheet"
 * (not in fullScreen — sheet covers the whole viewport there).
 */

import { useState } from "react";
import { motion } from "motion/react";
import { List } from "@phosphor-icons/react";
import { PressableButton, halo } from "@/components/ui/pressable-button";
import { haptic } from "@/lib/haptic";
import { springs } from "@/lib/springs";
import { WorkerCard } from "@/components/control-usuarios/worker-card";
import { NuevoUsuarioSheet } from "@/components/control-usuarios/nuevo-usuario-sheet";
import { sampleUsers } from "@/components/control-usuarios/mock-data";

export default function MobilePage() {
  const [users, setUsers] = useState(sampleUsers);
  const [isOpen, setIsOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const variant: "collapsed" | "sheet" | "fullScreen" = !isOpen
    ? "collapsed"
    : isFullScreen
      ? "fullScreen"
      : "sheet";

  const close = () => {
    setIsOpen(false);
    setIsFullScreen(false);
  };

  return (
    <main
      data-prototype
      className="relative isolate mx-auto min-h-screen w-full max-w-[402px]"
    >
      {/* Card feed — 14px card margin, 16px between cards, 160px bottom for the bar */}
      <div className="flex flex-col gap-4 px-[14px] pt-6 pb-[160px]">
        {users.map((user) => (
          <WorkerCard
            key={user.id}
            worker={user}
            expanded={user.isExpanded}
            onToggle={() =>
              setUsers((curr) =>
                curr.map((u) =>
                  u.id === user.id ? { ...u, isExpanded: !u.isExpanded } : u,
                ),
              )
            }
          />
        ))}
      </div>

      {/* Dim overlay — visible only in "sheet" state (not fullScreen). Tap to dismiss. */}
      <motion.button
        type="button"
        aria-label="Cerrar"
        initial={false}
        animate={{ opacity: variant === "sheet" ? 0.5 : 0 }}
        transition={{ duration: 0.28 }}
        onClick={() => {
          if (variant === "sheet") close();
        }}
        style={{
          pointerEvents: variant === "sheet" ? "auto" : "none",
          background: "#000",
        }}
        className="fixed inset-0 z-30 cursor-default border-0 outline-none"
      />

      {/* Burger button — slides left as the morphing surface widens.
          Lives outside the sheet's morph layer because it doesn't morph;
          it just translates out of frame. */}
      <motion.div
        animate={{ x: variant === "collapsed" ? 0 : -120 }}
        transition={variant === "collapsed" ? springs.expanding : springs.shrinking}
        style={{
          position: "fixed",
          left: 16,
          bottom: 24,
          zIndex: 35,
        }}
      >
        <PressableButton
          haloColor={halo.black}
          cornerRadius={24}
          onPressStart={() => haptic.select()}
          onClick={() => haptic.select()}
          style={{
            width: 84,
            height: 80,
            borderRadius: 24,
            background: "#1C1C1C",
          }}
          className="text-white"
          aria-label="Menú"
        >
          <List size={24} weight="bold" />
        </PressableButton>
      </motion.div>

      {/* Morphing surface — FAB → bar → sheet → fullScreen */}
      <NuevoUsuarioSheet
        variant={variant}
        onOpen={() => setIsOpen(true)}
        onClose={close}
        isFullScreen={isFullScreen}
        setIsFullScreen={setIsFullScreen}
      />
    </main>
  );
}
