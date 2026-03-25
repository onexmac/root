import { motion } from 'framer-motion';
import type { SkllEmotion } from '../game/types';

interface SkllAssistantProps {
  emotion: SkllEmotion;
  size?: number;
  speaking?: boolean;
}

function SkllFace({ emotion, size = 64 }: { emotion: SkllEmotion; size: number }) {
  // Pixel skull character — square head with jaw notches
  const s = size;
  const u = s / 16; // pixel unit for grid-based design
  const headX = u * 2;
  const headY = u * 1;
  const headW = u * 12;
  const headH = u * 10;
  const jawY = headY + headH;
  const jawH = u * 4;
  const notchW = u * 2;

  // Eye positions (centered in upper half of head)
  const eyeY = headY + headH * 0.38;
  const leftEyeX = headX + headW * 0.28;
  const rightEyeX = headX + headW * 0.72;
  const eyeR = u * 1.1;

  // Mouth position
  const mouthY = jawY - u * 1.5;
  const mouthX = s / 2;

  const renderEyes = () => {
    const ew = u * 1.4;
    switch (emotion) {
      case 'greeting':
        // >< squinting happy eyes
        return (
          <>
            <line x1={leftEyeX - ew} y1={eyeY - ew} x2={leftEyeX} y2={eyeY} stroke="currentColor" strokeWidth={u * 0.6} strokeLinecap="round" />
            <line x1={leftEyeX} y1={eyeY} x2={leftEyeX - ew} y2={eyeY + ew} stroke="currentColor" strokeWidth={u * 0.6} strokeLinecap="round" />
            <line x1={rightEyeX + ew} y1={eyeY - ew} x2={rightEyeX} y2={eyeY} stroke="currentColor" strokeWidth={u * 0.6} strokeLinecap="round" />
            <line x1={rightEyeX} y1={eyeY} x2={rightEyeX + ew} y2={eyeY + ew} stroke="currentColor" strokeWidth={u * 0.6} strokeLinecap="round" />
          </>
        );
      case 'approving':
        // Narrow horizontal line eyes
        return (
          <>
            <line x1={leftEyeX - ew} y1={eyeY} x2={leftEyeX + ew} y2={eyeY} stroke="currentColor" strokeWidth={u * 0.6} strokeLinecap="round" />
            <line x1={rightEyeX - ew} y1={eyeY} x2={rightEyeX + ew} y2={eyeY} stroke="currentColor" strokeWidth={u * 0.6} strokeLinecap="round" />
          </>
        );
      case 'impressed':
        // Big round eyes
        return (
          <>
            <circle cx={leftEyeX} cy={eyeY} r={eyeR * 1.5} fill="currentColor" />
            <circle cx={rightEyeX} cy={eyeY} r={eyeR * 1.5} fill="currentColor" />
          </>
        );
      case 'disappointed':
        // X X dead eyes
        return (
          <>
            <line x1={leftEyeX - ew} y1={eyeY - ew} x2={leftEyeX + ew} y2={eyeY + ew} stroke="currentColor" strokeWidth={u * 0.6} strokeLinecap="round" />
            <line x1={leftEyeX + ew} y1={eyeY - ew} x2={leftEyeX - ew} y2={eyeY + ew} stroke="currentColor" strokeWidth={u * 0.6} strokeLinecap="round" />
            <line x1={rightEyeX - ew} y1={eyeY - ew} x2={rightEyeX + ew} y2={eyeY + ew} stroke="currentColor" strokeWidth={u * 0.6} strokeLinecap="round" />
            <line x1={rightEyeX + ew} y1={eyeY - ew} x2={rightEyeX - ew} y2={eyeY + ew} stroke="currentColor" strokeWidth={u * 0.6} strokeLinecap="round" />
          </>
        );
      case 'alert':
        // Wide open eyes (tall rects)
        return (
          <>
            <rect x={leftEyeX - ew * 0.6} y={eyeY - ew * 1.2} width={ew * 1.2} height={ew * 2.4} fill="currentColor" />
            <rect x={rightEyeX - ew * 0.6} y={eyeY - ew * 1.2} width={ew * 1.2} height={ew * 2.4} fill="currentColor" />
          </>
        );
      default: // idle — dot eyes like the reference image
        return (
          <>
            <circle cx={leftEyeX} cy={eyeY} r={eyeR} fill="currentColor" />
            <circle cx={rightEyeX} cy={eyeY} r={eyeR} fill="currentColor" />
          </>
        );
    }
  };

  const renderMouth = () => {
    const mw = u * 2;
    switch (emotion) {
      case 'greeting':
        // Wide smile
        return (
          <path
            d={`M ${mouthX - mw * 1.5} ${mouthY - mw * 0.3} Q ${mouthX} ${mouthY + mw * 1.2} ${mouthX + mw * 1.5} ${mouthY - mw * 0.3}`}
            stroke="currentColor" strokeWidth={u * 0.5} fill="none" strokeLinecap="round"
          />
        );
      case 'impressed':
        // Open mouth (small square)
        return (
          <rect
            x={mouthX - mw * 0.6} y={mouthY - mw * 0.4}
            width={mw * 1.2} height={mw * 0.9}
            fill="currentColor"
          />
        );
      case 'disappointed':
        // Frown
        return (
          <path
            d={`M ${mouthX - mw} ${mouthY + mw * 0.2} Q ${mouthX} ${mouthY - mw * 0.8} ${mouthX + mw} ${mouthY + mw * 0.2}`}
            stroke="currentColor" strokeWidth={u * 0.5} fill="none" strokeLinecap="round"
          />
        );
      case 'alert':
        // Small O
        return (
          <circle cx={mouthX} cy={mouthY} r={mw * 0.4} fill="currentColor" />
        );
      default: // idle, approving — straight line
        return (
          <line
            x1={mouthX - mw} y1={mouthY}
            x2={mouthX + mw} y2={mouthY}
            stroke="currentColor" strokeWidth={u * 0.5} strokeLinecap="round"
          />
        );
    }
  };

  return (
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} fill="none">
      {/* Skull head — square top */}
      <rect
        x={headX} y={headY}
        width={headW} height={headH}
        fill="currentColor"
      />

      {/* Jaw with notches — 3 teeth-like sections */}
      <rect x={headX} y={jawY} width={notchW * 1.5} height={jawH} fill="currentColor" />
      <rect x={headX + notchW * 2.5} y={jawY} width={notchW * 3.5} height={jawH} fill="currentColor" />
      <rect x={headX + headW - notchW * 1.5} y={jawY} width={notchW * 1.5} height={jawH} fill="currentColor" />

      {/* Face cutout (dark inset for eyes & mouth area) */}
      <rect
        x={headX + u * 1.5} y={headY + u * 1.5}
        width={headW - u * 3} height={headH - u * 1.5 + jawH - u * 1}
        fill="var(--corp-bg, #0a0a0f)"
      />

      {/* Eyes */}
      {renderEyes()}

      {/* Mouth */}
      {renderMouth()}
    </svg>
  );
}

export default function SkllAssistant({ emotion, size = 64, speaking = false }: SkllAssistantProps) {
  return (
    <motion.div
      className="inline-flex items-center justify-center text-corp-accent"
      animate={
        speaking
          ? {
              boxShadow: [
                '0 0 0px var(--corp-accent)',
                '0 0 12px var(--corp-accent)',
                '0 0 0px var(--corp-accent)',
              ],
            }
          : {}
      }
      transition={speaking ? { duration: 1.2, repeat: Infinity } : {}}
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.15,
        border: speaking ? '1px solid var(--corp-accent)' : '1px solid transparent',
      }}
    >
      <SkllFace key={emotion} emotion={emotion} size={size} />
    </motion.div>
  );
}
