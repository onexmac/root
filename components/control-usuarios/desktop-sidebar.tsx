"use client";

import { IdentificationCard, User, UsersThree } from "@phosphor-icons/react";
import { haptic } from "@/lib/haptic";
import { PressableButton, halo } from "@/components/ui/pressable-button";
import { cn } from "@/lib/utils";

type Item = { key: string; Icon: typeof User; label: string };

const items: Item[] = [
  { key: "perfil", Icon: IdentificationCard, label: "Perfil" },
  { key: "usuarios", Icon: User, label: "Usuarios" },
  { key: "equipos", Icon: UsersThree, label: "Equipos" },
];

export function DesktopSidebar({ active = "usuarios" }: { active?: string }) {
  return (
    <nav
      className="sticky top-0 flex min-h-screen w-[102px] shrink-0 flex-col items-center gap-6 self-stretch py-8"
      style={{ backgroundColor: "#1c1c1c" }}
    >
      {items.map(({ key, Icon, label }) => {
        const isActive = key === active;
        return (
          <PressableButton
            key={key}
            haloColor={halo.white}
            cornerRadius={26}
            onClick={() => haptic.select()}
            style={{
              width: 52,
              height: 52,
              borderRadius: 26,
              backgroundColor: isActive ? "rgba(255,255,255,0.18)" : "transparent",
            }}
            className={cn(
              "flex items-center justify-center text-white transition-colors",
              !isActive && "hover:bg-white/10",
            )}
            aria-label={label}
          >
            <Icon size={24} weight="regular" />
          </PressableButton>
        );
      })}
    </nav>
  );
}
