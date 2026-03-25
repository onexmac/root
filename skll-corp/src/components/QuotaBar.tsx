import { motion } from 'framer-motion'
import type { Quota } from '../game/types'
import { TILE_ICONS, TILE_COLORS } from '../game/icons'

interface QuotaBarProps {
  quota: Quota
}

export default function QuotaBar({ quota }: QuotaBarProps) {
  const progress = Math.min(quota.current / quota.required, 1)
  const isComplete = quota.current >= quota.required
  const color = TILE_COLORS[quota.type]
  const Icon = TILE_ICONS[quota.type]

  return (
    <div
      className={`flex items-center gap-2 h-9 px-2 rounded border border-corp-border bg-corp-surface/50 ${
        isComplete ? 'animate-pulse shadow-[0_0_8px_var(--corp-accent)]' : ''
      }`}
    >
      {/* Icon */}
      <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center text-sm">
        <Icon />
      </div>

      {/* Progress bar */}
      <div className="flex-1 h-2 rounded-full bg-corp-border/50 overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={{ width: `${progress * 100}%` }}
          transition={{ type: 'spring', stiffness: 200, damping: 25 }}
        />
      </div>

      {/* Count */}
      <span className="flex-shrink-0 font-mono text-xs text-corp-muted tabular-nums">
        {quota.current}/{quota.required}
      </span>
    </div>
  )
}
