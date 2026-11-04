"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { BottomBar, type EstadoFilter } from "@/components/movil/bottom-bar";
import { NuevoUsuarioSheet } from "@/components/movil/nuevo-usuario-sheet";
import { UserCardMobile } from "@/components/movil/user-card-mobile";
import { springs } from "@/lib/springs";
import { haptic } from "@/lib/haptic";
import { mockUsers, type User } from "@/lib/mock-users";

/**
 * /movil — USUARIOS, mobile. Same architecture as the desktop screen, rotated
 * for the thumb: the list scrolls under a title, and every control lives in the
 * bottom bar + the morphing FAB.
 *
 * Interaction map
 *   tap a card            → expands (single-open accordion); the status badge
 *                           flies from the right circle into the Activo pill
 *   bottom filter         → sliding pill, list re-flows with a layout animation
 *   green FAB             → morphs into the Nuevo usuario bottom sheet
 *   sheet handle          → drag down (with momentum) or tap to dismiss
 *   slide to confirm      → green cascade over the sheet, then the new user
 *                           lands at the top of the list
 */
export default function MovilUsuariosPage() {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [filter, setFilter] = useState<EstadoFilter>("todos");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [justAdded, setJustAdded] = useState<string | null>(null);

  const visible = useMemo(
    () =>
      filter === "todos" ? users : users.filter((u) => u.estado === filter),
    [users, filter],
  );

  const addUser = () => {
    const id = `new-${users.length + 1}`;
    setUsers((prev) => [
      {
        id,
        nombre: "Nuevo Usuario",
        area: "Producción",
        cedula: "1-0000-0000",
        contacto: "0000-0000",
        rol: "Peón",
        estado: "activo",
      },
      ...prev,
    ]);
    setFilter("todos");
    setJustAdded(id);
    setExpandedId(id);
    haptic.complete();
    window.setTimeout(() => setJustAdded(null), 1600);
  };

  return (
    <main
      className="relative mx-auto min-h-[100dvh] w-full max-w-[402px] bg-background"
      style={{ overscrollBehaviorY: "none" }}
    >
      <div className="px-4 pb-[200px] pt-8">
        <header className="px-1 pb-5">
          <h1 className="text-[28px] font-semibold tracking-[0.4px] text-black">
            USUARIOS
          </h1>
        </header>

        {/* `layout` on the list + cards means filtering re-flows instead of
            cutting: rows that stay visible slide to their new slot. */}
        <motion.div layout className="flex flex-col gap-3">
          <AnimatePresence initial={false} mode="popLayout">
            {visible.map((user) => (
              <motion.div
                key={user.id}
                layout
                initial={{ opacity: 0, y: 12, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97, transition: { duration: 0.14 } }}
                transition={springs.morphing}
              >
                <div className="relative">
                  <UserCardMobile
                    user={user}
                    expanded={expandedId === user.id}
                    onToggle={() =>
                      setExpandedId((cur) => (cur === user.id ? null : user.id))
                    }
                  />
                  {/* Brief green ring on the row that just landed, so the new
                      record is findable after the sheet closes. */}
                  <motion.span
                    aria-hidden
                    initial={false}
                    animate={{ opacity: justAdded === user.id ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="pointer-events-none absolute inset-0 rounded-[24px]"
                    style={{ boxShadow: "0 0 0 2px #ADD010" }}
                  />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {visible.length === 0 ? (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={springs.expanding}
            className="px-1 pt-6 text-[15px] text-gray-400"
          >
            No hay usuarios {filter === "activo" ? "activos" : "inactivos"}.
          </motion.p>
        ) : null}
      </div>

      <BottomBar
        value={filter}
        // Collapse on filter change: a card must never exit the list while its
        // status badge is mid-morph. Nested AnimatePresence inside an exiting
        // subtree can block the parent's exit and strand a ghost row — the bug
        // that cost us hours on the desktop panel (MOTION_GOTCHAS.md #5).
        // It's better UX too: filtering shouldn't preserve a stale expansion.
        onChange={(v) => {
          setExpandedId(null);
          setFilter(v);
        }}
        hidden={sheetOpen}
        count={visible.length}
      />

      <NuevoUsuarioSheet
        open={sheetOpen}
        onOpen={() => setSheetOpen(true)}
        onDismiss={() => setSheetOpen(false)}
        onCreated={addUser}
      />
    </main>
  );
}
