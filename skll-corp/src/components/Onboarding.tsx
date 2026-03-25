import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SkllAssistant from './SkllAssistant';
import type { SkllEmotion } from '../game/types';

interface OnboardingProps {
  onComplete: () => void;
}

interface OnboardingStep {
  title: string;
  emotion: SkllEmotion;
  lines: string[];
  buttonText: string;
}

const steps: OnboardingStep[] = [
  {
    title: 'WELCOME TO SKLL.CORP',
    emotion: 'greeting',
    lines: [
      'I am SKLL, your Workforce Optimization Assistant.',
      'You have been assigned to the Data Processing Division.',
    ],
    buttonText: 'PROCEED >',
  },
  {
    title: 'YOUR RESPONSIBILITIES',
    emotion: 'idle',
    lines: [
      'Your task is to process data packets by identifying and linking matching resource nodes.',
      'Drag across adjacent matching icons to form processing chains.',
      'Longer chains yield exponentially higher throughput.',
    ],
    buttonText: 'PROCEED >',
  },
  {
    title: 'PERFORMANCE METRICS',
    emotion: 'alert',
    lines: [
      'Each work cycle has production quotas.',
      'Meet all quotas to advance to the next cycle.',
      'Failure to maintain productivity will result in a Performance Review.',
    ],
    buttonText: 'PROCEED >',
  },
  {
    title: 'BEGIN WORK SESSION',
    emotion: 'approving',
    lines: [
      'Your orientation is complete. Report to your workstation.',
    ],
    buttonText: 'CLOCK IN',
  },
];

const slideVariants = {
  enter: { x: 80, opacity: 0 },
  center: { x: 0, opacity: 1 },
  exit: { x: -80, opacity: 0 },
};

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const step = steps[stepIndex];

  const handleNext = () => {
    if (stepIndex < steps.length - 1) {
      setStepIndex(stepIndex + 1);
    } else {
      onComplete();
    }
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center h-full w-full bg-corp-bg p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="w-full max-w-md bg-corp-surface border border-corp-border rounded-lg p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={stepIndex}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            className="flex gap-5"
          >
            {/* SKLL on the left */}
            <div className="flex-shrink-0 pt-1">
              <SkllAssistant emotion={step.emotion} size={64} speaking />
            </div>

            {/* Text on the right */}
            <div className="flex-1 min-w-0 space-y-4">
              <h2 className="font-mono text-sm font-bold uppercase tracking-widest text-corp-accent">
                {step.title}
              </h2>
              <div className="space-y-2">
                {step.lines.map((line, i) => (
                  <p
                    key={i}
                    className="text-sm leading-relaxed text-corp-text"
                  >
                    {line}
                  </p>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Step indicator + button */}
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-corp-border">
          <div className="flex gap-1.5">
            {steps.map((_, i) => (
              <span
                key={i}
                className={`block w-1.5 h-1.5 rounded-full transition-colors ${
                  i <= stepIndex ? 'bg-corp-accent' : 'bg-corp-border'
                }`}
              />
            ))}
          </div>
          <button
            onClick={handleNext}
            className="font-mono text-xs font-bold uppercase tracking-widest px-4 py-2 rounded border border-corp-accent/50 text-corp-accent hover:bg-corp-accent/10 hover:border-corp-accent transition-colors"
          >
            {step.buttonText}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
