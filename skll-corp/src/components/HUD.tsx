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

  const movePercent = (movesLeft / maxMoves) * 100

  return (
    <div className="relative w-full border-b border-corp-border px-3 py-2 space-y-1.5" style={{ background: 'var(--corp-surface)' }}>
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--corp-accent)' }}>
            CYC.{String(cycleNumber).padStart(2, '0')}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-wider text-corp-muted">|</span>
          <span className="font-mono text-[10px] uppercase tracking-wider text-corp-muted">
            CLEARANCE{' '}
            <span style={{ color: 'var(--corp-accent)' }}>
              {'■'.repeat(lives)}
            </span>
            <span className="text-corp-border">
              {'□'.repeat(Math.max(0, 3 - lives))}
            </span>
          </span>
        </div>
        <span className="font-mono text-sm font-bold tabular-nums" style={{ color: 'var(--corp-text)' }}>
          {score.toLocaleString()}
        </span>
      </div>

      {/* Moves bar */}
      <div className="relative h-1 w-full rounded-full overflow-hidden" style={{ background: 'var(--corp-border)' }}>
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{
            background: movePercent > 30 ? 'var(--corp-accent)' : movePercent > 15 ? 'var(--corp-warning)' : 'var(--corp-danger)',
          }}
          animate={{ width: `${movePercent}%` }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />
      </div>
      <div className="flex items-center justify-between">
        <span className="font-mono text-[9px] uppercase tracking-wider text-corp-muted">
          {movesLeft} moves
        </span>
      </div>

      {/* Quotas */}
      {quotas.length > 0 && (
        <div className="grid grid-cols-3 gap-1">
          {quotas.map((quota, i) => (
            <QuotaBar key={i} quota={quota} />
          ))}
        </div>
      )}

      {/* Combo label */}
      <AnimatePresence>
        {comboLabel && (
          <motion.div
            className="absolute inset-x-0 top-1/2 flex items-center justify-center pointer-events-none z-20"
            initial={{ scale: 0.5, opacity: 0, y: '-50%' }}
            animate={{ scale: 1, opacity: 1, y: '-50%' }}
            exit={{ scale: 1.2, opacity: 0, y: '-50%' }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          >
            <span
              className="font-mono text-xs font-bold uppercase tracking-[0.2em] px-3 py-1 rounded"
              style={{
                color: 'var(--corp-accent)',
                background: 'var(--corp-surface)',
                border: '1px solid var(--corp-accent)',
                textShadow: '0 0 8px var(--corp-accent)',
              }}
            >
              {comboLabel}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
