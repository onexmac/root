'use client';

/**
 * /slider — standalone, chromeless page showing only the SliderButton
 * matching Figma node 997:3096.
 */

import { useState } from 'react';
import { SliderButton } from '@/components/ui/slider-button';

export default function SliderPage() {
  const [count, setCount] = useState(0);

  return (
    <main
      data-prototype
      className="relative flex min-h-[100dvh] w-full items-center justify-center bg-[rgb(243,243,243)] dark:bg-neutral-950"
    >
      <div className="flex flex-col items-center gap-10 px-6">
        <SliderButton onConfirm={() => setCount((c) => c + 1)} />

        <div className="text-sm text-neutral-500 dark:text-neutral-400 tabular-nums">
          Confirmed {count} {count === 1 ? 'time' : 'times'}
        </div>
      </div>
    </main>
  );
}
