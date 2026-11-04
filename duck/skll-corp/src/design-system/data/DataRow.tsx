import { motion } from 'framer-motion'
import { springs } from '../motion/presets'

interface DataRowProps {
  label: string
  value: string | number
  trend?: 'up' | 'down' | 'neutral'
  trendValue?: string
  className?: string
}

export default function DataRow({ label, value, trend, trendValue, className = '' }: DataRowProps) {
  const trendColors = {
    up: 'text-ds-success',
    down: 'text-ds-destructive',
    neutral: 'text-ds-text-muted',
  }

  const trendIcons = {
    up: '↑',
    down: '↓',
    neutral: '→',
  }

  return (
    <div className={`flex items-center gap-3 py-2 ${className}`}>
      <span className="flex-1 text-ds-sm text-ds-text-secondary tracking-[0.25px]">{label}</span>
      <motion.span
        className="text-ds-sm font-semibold text-ds-text-primary tracking-[0.25px] tabular-nums"
        key={String(value)}
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={springs.snappy}
      >
        {value}
      </motion.span>
      {trend && (
        <span className={`text-ds-xs font-medium ${trendColors[trend]} flex items-center gap-0.5`}>
          {trendIcons[trend]}
          {trendValue}
        </span>
      )}
    </div>
  )
}
