"use client";

import { Avatar } from "@/components/ds/avatar";
import { Tag } from "@/components/ds/tag";
import type { User } from "@/lib/mock-users";

const columns = [
  { key: "trabajador", label: "Trabajador" },
  { key: "area", label: "Área" },
  { key: "contacto", label: "Contacto" },
  { key: "rol", label: "Rol" },
  { key: "estado", label: "Estado" },
] as const;

export function UsersTable({ users }: { users: User[] }) {
  return (
    // Concentric corners: the header pill's radius (~23) + the p-4 gap (16)
    // ≈ 40, so the container's corner follows the header's curve instead of
    // cutting across it.
    <div className="flex w-full flex-col rounded-[40px] bg-white p-4 shadow-card">
      {/* Header row */}
      <div className="grid grid-cols-5 items-center rounded-full bg-charcoal px-6 py-3 text-[14px] font-medium text-white">
        {columns.map((c) => (
          <div key={c.key} className={c.key === "trabajador" ? "text-left" : "text-center"}>
            {c.label}
          </div>
        ))}
      </div>

      {/* Rows */}
      <div className="flex flex-col">
        {users.map((u) => (
          <div
            key={u.id}
            className="relative grid grid-cols-5 items-center px-6 py-4 text-[14px]"
          >
            <div className="flex items-center gap-3">
              <Avatar size={36} />
              <span className="font-semibold text-black">{u.nombre}</span>
            </div>

            <div className="text-center text-gray-500">{u.area}</div>
            <div className="text-center text-gray-500">{u.contacto}</div>
            <div className="flex justify-center">
              <Tag variant="inactive">{u.rol}</Tag>
            </div>
            <div className="flex justify-center">
              <Tag
                variant={u.estado === "activo" ? "active" : "inactive"}
                withCheck
              >
                {u.estado === "activo" ? "Activo" : "Inactivo"}
              </Tag>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
