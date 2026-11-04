"use client";

import { DesktopSidebar } from "@/components/control-usuarios/desktop-sidebar";
import { DesktopUsersTable } from "@/components/control-usuarios/desktop-users-table";
import { DesktopMorphSurface } from "@/components/control-usuarios/desktop-morph-surface";

export default function DesktopPage() {
  return (
    <div data-prototype className="flex min-h-screen w-full bg-background">
      <DesktopSidebar active="usuarios" />

      <main className="relative flex-1 p-8">
        <div className="flex items-center justify-between pb-6">
          <h1 className="text-[24px] font-semibold tracking-[0.4px]">USUARIOS</h1>
          {/* Space placeholder — the actual FAB lives in DesktopMorphSurface (fixed) */}
          <div className="h-20 w-20" aria-hidden />
        </div>

        <DesktopUsersTable />
      </main>

      <DesktopMorphSurface />
    </div>
  );
}
