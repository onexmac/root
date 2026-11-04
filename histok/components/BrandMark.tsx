"use client";

export function BrandPills({
  w = 8,
  tall = 18,
  short = 10,
  gap = 5,
}: {
  w?: number;
  tall?: number;
  short?: number;
  gap?: number;
}) {
  return (
    <div className="flex flex-col" style={{ gap }} aria-hidden>
      {[0, 1, 2, 3].map((i) => (
        <span
          key={i}
          style={{
            width: w,
            height: i === 0 ? tall : short,
            borderRadius: w / 2,
            background: i === 0 ? "#fff" : "rgba(255,255,255,0.3)",
          }}
        />
      ))}
    </div>
  );
}

/** The "H" monogram + pills lockup — same scale as the header wordmark. Used as
 *  the index footer sign-off and the reel's end-of-story sign-off. */
export function BrandMonogram({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`} aria-label="Histok">
      <span className="text-6xl md:text-7xl font-medium leading-none tracking-tight select-none text-white">
        H
      </span>
      <BrandPills />
    </div>
  );
}
