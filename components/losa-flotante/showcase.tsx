"use client";

/**
 * Showcase primitives — used by every section in the Losa Flotante storybook
 * page. Keeps the layout consistent and the section files small.
 */

import type { ReactNode } from "react";

export function Section({
  id,
  title,
  figmaNode,
  status,
  description,
  children,
}: {
  id: string;
  title: string;
  figmaNode?: string;
  status: "linked" | "flat" | "foundation";
  description?: string;
  children: ReactNode;
}) {
  const badge = {
    linked: { label: "Linked to prototype", bg: "#ADD010", color: "#000" },
    flat: { label: "Flat — gaps flagged", bg: "rgba(0,0,0,0.08)", color: "#5D636C" },
    foundation: { label: "Foundation", bg: "#000", color: "#FFFFFF" },
  }[status];

  return (
    <section id={id} className="scroll-mt-24 border-t border-black/10 py-12">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-[28px] font-bold leading-tight">{title}</h2>
          {description && (
            <p className="mt-2 max-w-[640px] text-[14px] text-[#5D636C]">
              {description}
            </p>
          )}
        </div>
        <div className="flex flex-col items-end gap-1 text-right">
          <span
            className="inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold tracking-wider"
            style={{ background: badge.bg, color: badge.color }}
          >
            {badge.label}
          </span>
          {figmaNode && (
            <span className="text-[11px] text-[#AAAFB6]">
              Figma node {figmaNode}
            </span>
          )}
        </div>
      </div>
      {children}
    </section>
  );
}

export function Variants({
  label,
  children,
  background = "#FFFFFF",
}: {
  label?: string;
  children: ReactNode;
  background?: string;
}) {
  return (
    <div className="mt-4">
      {label && (
        <div className="mb-3 text-[12px] font-semibold uppercase tracking-wider text-[#5D636C]">
          {label}
        </div>
      )}
      <div
        className="flex flex-wrap items-center gap-6 rounded-2xl p-6"
        style={{ background }}
      >
        {children}
      </div>
    </div>
  );
}

export function Note({ children }: { children: ReactNode }) {
  return (
    <div
      className="mt-4 rounded-xl border-l-4 px-4 py-3 text-[13px] leading-relaxed"
      style={{
        borderColor: "#F0C802",
        background: "rgba(240, 200, 2, 0.08)",
        color: "#5D636C",
      }}
    >
      <span className="font-semibold text-black">TODO — </span>
      {children}
    </div>
  );
}

export function Code({ children }: { children: string }) {
  return (
    <pre
      className="mt-3 overflow-x-auto rounded-lg p-3 text-[12px] leading-relaxed"
      style={{
        background: "#1C1C1C",
        color: "#EBEBEB",
        fontFamily:
          "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
      }}
    >
      <code>{children}</code>
    </pre>
  );
}
