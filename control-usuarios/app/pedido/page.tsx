"use client";

import { SidebarNav } from "@/components/ds/sidebar-nav";
import { UsersTable } from "@/components/users-table";
import { PedidoSurface } from "@/components/pedido/pedido-surface";
import { PedidoMovil } from "@/components/movil/pedido-movil";
import { useIsCompact } from "@/lib/use-breakpoint";
import { mockUsers } from "@/lib/mock-users";

/**
 * /pedido — one route, two layouts.
 *
 *   ≥ 1024 px   the full desktop screen: sidebar + table + the Nuevo Pedido
 *               side panel
 *   < 1024 px   the bottom-first mobile screen (PedidoMovil)
 *
 * The switch is a real render swap, not CSS hiding: both trees own
 * fixed-position surfaces and their own animation state, so mounting them
 * together would have two FABs and two scrims fighting for the same corner.
 */
export default function PedidoPage() {
  const isCompact = useIsCompact(1024);

  // One neutral frame while matchMedia resolves. Guessing desktop here would
  // flash the sidebar on a phone; rendering nothing at all shifts the layout.
  if (isCompact === null) {
    return <div className="min-h-screen bg-background" />;
  }

  if (isCompact) return <PedidoMovil />;

  return (
    <div className="flex min-h-screen bg-background">
      <SidebarNav active="pedidos" />

      <main className="relative flex-1 p-8">
        <div className="flex items-center justify-between pb-6">
          <h1 className="text-[24px] font-semibold tracking-[0.4px]">USUARIOS</h1>
          {/* Reserves space for the morphing surface (fixed) */}
          <div className="h-20 w-20" aria-hidden />
        </div>

        <UsersTable users={mockUsers} />
      </main>

      <PedidoSurface />
    </div>
  );
}
