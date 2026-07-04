"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { PressScale } from "@/components/PressScale";
import { springs } from "@/lib/springs";
import { FRAME_MAX_WIDTH } from "@/components/ReelScreen";
import type { Topic } from "@/data/topics";

export function IndexScreen({ topics }: { topics: Topic[] }) {
  const router = useRouter();
  const [closingTo, setClosingTo] = useState<string | null>(null);

  return (
    <div className="min-h-dvh bg-black">
      <motion.div
        data-app
        className="min-h-dvh mx-auto text-white"
        style={{
          maxWidth: FRAME_MAX_WIDTH,
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
        <h1 className="px-6 text-3xl font-medium mb-8">Repaso</h1>
        <div
          className="flex flex-col gap-8 px-6 overflow-y-auto"
          style={{ touchAction: "pan-y", overscrollBehaviorY: "contain" }}
        >
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
                  sizes="100vw"
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
