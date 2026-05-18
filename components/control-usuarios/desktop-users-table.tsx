"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowSquareOut, CheckCircle, PencilSimple, User } from "@phosphor-icons/react";
import { springs } from "@/lib/springs";
import { haptic } from "@/lib/haptic";
import { PressableButton, halo } from "@/components/ui/pressable-button";
import { desktopUsers } from "./mock-data";

const COLUMNS = [
  { key: "trabajador", label: "Trabajador" },
  { key: "area", label: "Área" },
  { key: "contacto", label: "Contacto" },
  { key: "rol", label: "Rol" },
  { key: "estado", label: "Estado" },
] as const;

export function DesktopUsersTable() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="flex w-full flex-col rounded-card bg-card p-4 shadow-[0_4px_8px_rgba(170,175,182,0.25)]">
      {/* Header */}
      <div
        className="grid grid-cols-5 items-center rounded-pill px-6 py-3 text-[14px] font-medium text-white"
        style={{ backgroundColor: "#1c1c1c" }}
      >
        {COLUMNS.map((c) => (
          <div
            key={c.key}
            className={c.key === "trabajador" ? "text-left" : "text-center"}
          >
            {c.label}
          </div>
        ))}
      </div>

      {/* Rows */}
      <div className="flex flex-col">
        {desktopUsers.map((u) => (
          <div
            key={u.id}
            onMouseEnter={() => setHovered(u.id)}
            onMouseLeave={() => setHovered(null)}
            className="relative grid grid-cols-5 items-center px-6 py-4 text-[14px]"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-foreground/10 text-muted-foreground">
                <User size={20} weight="regular" />
              </div>
              <span className="font-semibold">{u.nombre}</span>
            </div>
            <div className="text-center text-muted-foreground">{u.area}</div>
            <div className="text-center text-muted-foreground">{u.contacto}</div>
            <div className="flex justify-center">
              <span className="inline-flex items-center rounded-pill px-4 py-1.5 text-[13px] text-muted-foreground ring-1 ring-foreground/15">
                {u.rol}
              </span>
            </div>
            <div className="flex justify-center">
              <span
                className={
                  u.estado === "activo"
                    ? "inline-flex items-center gap-2 rounded-pill bg-black px-4 py-1.5 text-[13px] font-medium text-white"
                    : "inline-flex items-center gap-2 rounded-pill bg-foreground/15 px-4 py-1.5 text-[13px] font-medium text-muted-foreground"
                }
              >
                {u.estado === "activo" ? "Activo" : "Inactivo"}
                <CheckCircle size={14} weight="fill" />
              </span>
            </div>

            {/* Hover Editar pill */}
            <AnimatePresence>
              {hovered === u.id && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={springs.popping}
                  className="absolute left-[19%] top-1/2 z-10 -translate-y-1/2"
                >
                  <PressableButton
                    haloColor={halo.black}
                    cornerRadius={20}
                    onClick={() => haptic.select()}
                    style={{
                      height: 40,
                      borderRadius: 20,
                      backgroundColor: "black",
                      paddingLeft: 18,
                      paddingRight: 18,
                    }}
                    className="flex items-center gap-2 text-[14px] font-medium text-white"
                  >
                    <PencilSimple size={14} weight="bold" />
                    Editar
                    <ArrowSquareOut size={14} weight="bold" />
                  </PressableButton>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}
