"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { PressScale } from "@/components/PressScale";
import { springs } from "@/lib/springs";
import type { Topic } from "@/data/topics";

function BrandPills() {
  return (
    <div className="flex flex-col gap-1.5 pt-2" aria-hidden>
      {[0, 1, 2, 3].map((i) => (
        <span
          key={i}
          style={{
            width: 9,
            height: i === 0 ? 30 : 18,
            borderRadius: 5,
            background: i === 0 ? "#fff" : "rgba(255,255,255,0.32)",
          }}
        />
      ))}
    </div>
  );
}

export function IndexScreen({ topics }: { topics: Topic[] }) {
  const router = useRouter();
  const [closingTo, setClosingTo] = useState<string | null>(null);

  return (
    <div className="min-h-dvh bg-black">
      <motion.div
        data-app
        className="min-h-dvh mx-auto max-w-[1180px] text-white"
        style={{
          paddingTop: "calc(var(--sat) + 32px)",
          paddingBottom: "calc(var(--sab) + 32px)",
        }}
        initial={{ opacity: 0, scale: 0.97 }}
        animate={closingTo ? { opacity: 0, scale: 1.03 } : { opacity: 1, scale: 1 }}
        transition={closingTo ? springs.snappy : springs.expanding}
        onAnimationComplete={() => {
          if (closingTo) router.push(closingTo);
        }}
      >
        <div
          className="grid grid-cols-1 gap-x-8 gap-y-9 px-6 md:grid-cols-2 md:gap-y-12 md:px-10"
          style={{ touchAction: "pan-y", overscrollBehaviorY: "contain" }}
        >
          <div className="flex flex-col md:justify-center md:pb-6">
            <div className="flex items-start gap-4">
              <h1 className="text-5xl md:text-6xl font-medium leading-none">Histok</h1>
              <BrandPills />
            </div>
            <p className="mt-4 text-xl md:text-2xl leading-snug text-white/60">
              Más Historia,
              <br />
              menos Tik Tok
            </p>
          </div>

          {topics.map((topic) => (
            <PressScale
              key={topic.slug}
              onActivate={() => setClosingTo(`/tema/${topic.slug}`)}
              ariaLabel={topic.label}
              className="text-left"
              downScale={0.96}
            >
              <span className="block text-2xl mb-3">{topic.label}</span>
              <span className="relative block w-full aspect-[16/8] rounded-[20px] overflow-hidden">
                <Image
                  src={topic.thumbnail}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 560px"
                  className="object-cover"
                />
                {topic.comingSoon && (
                  <span className="absolute inset-0 bg-black/50 flex items-center justify-center text-sm tracking-wide uppercase">
                    Próximamente
                  </span>
                )}
              </span>
            </PressScale>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
