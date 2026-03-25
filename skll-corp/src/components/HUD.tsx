import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore } from '../store/gameStore'
import QuotaBar from './QuotaBar'

export default function HUD() {
  const {
    cycleNumber,
    score,
    quotas,
    movesLeft,
    maxMoves,
    lives,
    comboLabel,
    resetComboLabel,
  } = useGameStore()

  useEffect(() => {
    if (!comboLabel) return
    const timer = setTimeout(resetComboLabel, 1200)
    return () => clearTimeout(timer)
  }, [comboLabel, resetComboLabel])

  return (
    <div className="relative w-full bg-corp-surface/80 backdrop-blur-md border-b border-corp-border px-4 py-2 space-y-2">
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs font-bold uppercase tracking-wider text-corp-text">
          CYCLE {cycleNumber}
        </span>
        <span className="font-mono text-xs font-bold uppercase tracking-wider text-corp-text">
          SCORE: {score}
        </span>
      </div>

      {/* Quotas */}
      {quotas.length > 0 && (
        <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3 lg:flex lg:gap-2">
          {quotas.map((quota, i) => (
            <QuotaBar key={i} quota={quota} />
          ))}
        </div>
      )}

      {/* Stats row */}
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-wider text-corp-muted">
          MOVES: {movesLeft}/{maxMoves}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-wider text-corp-muted">
          CLEARANCE:{' '}
          <span className="text-corp-accent">
            {'●'.repeat(lives)}
          </span>
          <span className="text-corp-border">
            {'○'.repeat(Math.max(0, 3 - lives))}
          </span>
        </span>
      </div>

      {/* Combo label */}
      <AnimatePresence>
        {comboLabel && (
          <motion.div
            className="absolute inset-x-0 top-1/2 flex items-center justify-center pointer-events-none"
            initial={{ scale: 0.5, opacity: 0, y: '-50%' }}
            animate={{ scale: 1, opacity: 1, y: '-50%' }}
            exit={{ scale: 1.2, opacity: 0, y: '-50%' }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          >
            <span className="font-mono text-sm font-bold uppercase tracking-widest text-corp-accent drop-shadow-[0_0_8px_var(--corp-accent)]">
              {comboLabel}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
