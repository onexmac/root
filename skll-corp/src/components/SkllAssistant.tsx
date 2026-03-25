import { motion } from 'framer-motion';
import type { SkllEmotion } from '../game/types';

interface SkllAssistantProps {
  emotion: SkllEmotion;
  size?: number;
  speaking?: boolean;
}

function SkllFace({ emotion, size = 64 }: { emotion: SkllEmotion; size: number }) {
  const s = size;
  const pad = s * 0.1;
  const headW = s * 0.8;
  const headH = s * 0.7;
  const headX = (s - headW) / 2;
  const headY = s * 0.25;

  // Eye positions
  const eyeY = headY + headH * 0.35;
  const leftEyeX = headX + headW * 0.28;
  const rightEyeX = headX + headW * 0.72;

  // Mouth position
  const mouthY = headY + headH * 0.7;
  const mouthX = s / 2;

  const renderEyes = () => {
    const ew = headW * 0.16;
    switch (emotion) {
      case 'greeting':
        // Happy curved-up eyes (arcs)
        return (
          <>
            <path
              d={`M ${leftEyeX - ew} ${eyeY} Q ${leftEyeX} ${eyeY - ew * 1.2} ${leftEyeX + ew} ${eyeY}`}
              stroke="currentColor" strokeWidth={2} fill="none"
            />
            <path
              d={`M ${rightEyeX - ew} ${eyeY} Q ${rightEyeX} ${eyeY - ew * 1.2} ${rightEyeX + ew} ${eyeY}`}
              stroke="currentColor" strokeWidth={2} fill="none"
            />
          </>
        );
      case 'approving':
        // Narrow squint eyes
        return (
          <>
            <rect x={leftEyeX - ew} y={eyeY - 1} width={ew * 2} height={2.5} rx={1} fill="currentColor" />
            <rect x={rightEyeX - ew} y={eyeY - 1} width={ew * 2} height={2.5} rx={1} fill="currentColor" />
          </>
        );
      case 'impressed':
        // Wide tall eyes
        return (
          <>
            <rect x={leftEyeX - ew * 0.7} y={eyeY - ew * 1.2} width={ew * 1.4} height={ew * 2.4} rx={1} fill="currentColor" />
            <rect x={rightEyeX - ew * 0.7} y={eyeY - ew * 1.2} width={ew * 1.4} height={ew * 2.4} rx={1} fill="currentColor" />
          </>
        );
      case 'disappointed':
        // Angled-down eyes
        return (
          <>
            <line
              x1={leftEyeX - ew} y1={eyeY - ew * 0.4}
              x2={leftEyeX + ew} y2={eyeY + ew * 0.4}
              stroke="currentColor" strokeWidth={2.5} strokeLinecap="round"
            />
            <line
              x1={rightEyeX + ew} y1={eyeY - ew * 0.4}
              x2={rightEyeX - ew} y2={eyeY + ew * 0.4}
              stroke="currentColor" strokeWidth={2.5} strokeLinecap="round"
            />
          </>
        );
      case 'alert':
        // Exclamation mark eyes
        return (
          <>
            <rect x={leftEyeX - 1.5} y={eyeY - ew * 1.2} width={3} height={ew * 1.6} rx={1} fill="currentColor" />
            <circle cx={leftEyeX} cy={eyeY + ew * 0.8} r={1.5} fill="currentColor" />
            <rect x={rightEyeX - 1.5} y={eyeY - ew * 1.2} width={3} height={ew * 1.6} rx={1} fill="currentColor" />
            <circle cx={rightEyeX} cy={eyeY + ew * 0.8} r={1.5} fill="currentColor" />
          </>
        );
      default: // idle
        // Normal horizontal rectangles
        return (
          <>
            <rect x={leftEyeX - ew} y={eyeY - ew * 0.35} width={ew * 2} height={ew * 0.7} rx={1} fill="currentColor" />
            <rect x={rightEyeX - ew} y={eyeY - ew * 0.35} width={ew * 2} height={ew * 0.7} rx={1} fill="currentColor" />
          </>
        );
    }
  };

  const renderMouth = () => {
    const mw = headW * 0.2;
    switch (emotion) {
      case 'greeting':
        // Slight curve up
        return (
          <path
            d={`M ${mouthX - mw} ${mouthY} Q ${mouthX} ${mouthY + mw * 0.7} ${mouthX + mw} ${mouthY}`}
            stroke="currentColor" strokeWidth={2} fill="none" strokeLinecap="round"
          />
        );
      case 'impressed':
        // Open rectangle
        return (
          <rect
            x={mouthX - mw * 0.6} y={mouthY - mw * 0.3}
            width={mw * 1.2} height={mw * 0.8}
            rx={1} stroke="currentColor" strokeWidth={1.5} fill="none"
          />
        );
      case 'disappointed':
        // Curve down
        return (
          <path
            d={`M ${mouthX - mw} ${mouthY} Q ${mouthX} ${mouthY - mw * 0.7} ${mouthX + mw} ${mouthY}`}
            stroke="currentColor" strokeWidth={2} fill="none" strokeLinecap="round"
          />
        );
      case 'alert':
        // Small circle
        return (
          <circle cx={mouthX} cy={mouthY} r={mw * 0.35} stroke="currentColor" strokeWidth={1.5} fill="none" />
        );
      default: // idle, approving
        // Straight line
        return (
          <line
            x1={mouthX - mw} y1={mouthY}
            x2={mouthX + mw} y2={mouthY}
            stroke="currentColor" strokeWidth={2} strokeLinecap="round"
          />
        );
    }
  };

  return (
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} fill="none">
      {/* Antenna */}
      <line
        x1={s / 2} y1={headY - pad * 0.2}
        x2={s / 2} y2={headY - pad * 1.8}
        stroke="currentColor" strokeWidth={2} strokeLinecap="round"
      />
      <circle cx={s / 2} cy={headY - pad * 2} r={2.5} fill="currentColor" />

      {/* Head */}
      <rect
        x={headX} y={headY}
        width={headW} height={headH}
        rx={headW * 0.12}
        stroke="currentColor" strokeWidth={2} fill="none"
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
