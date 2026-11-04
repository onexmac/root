"use client";

import { SidebarNav } from "@/components/ds/sidebar-nav";
import { UsersTable } from "@/components/users-table";
import { MorphingSurface } from "@/components/morphing-surface";
import { mockUsers } from "@/lib/mock-users";

export default function UsuariosPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <SidebarNav active="usuarios" />

      <main className="relative flex-1 p-8">
        <div className="flex items-center justify-between pb-6">
          <h1 className="text-[24px] font-semibold tracking-[0.4px]">USUARIOS</h1>
          {/* Reserves space for the morphing surface that lives in <MorphingSurface /> as fixed */}
          <div className="h-20 w-20" aria-hidden />
        </div>

        <UsersTable users={mockUsers} />
      </main>

      <MorphingSurface />
    </div>
  );
}
