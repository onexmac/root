import { motion } from 'framer-motion'
import { springs } from '../motion/presets'

type CircleSize = 'sm' | 'md' | 'lg'

const sizeMap: Record<CircleSize, { size: number; stroke: number }> = {
  sm: { size: 24, stroke: 3 },
  md: { size: 40, stroke: 4 },
  lg: { size: 64, stroke: 5 },
}

interface ProgressCircleProps {
  value?: number
  max?: number
  size?: CircleSize
  indeterminate?: boolean
  label?: string
  className?: string
}

export default function ProgressCircle({
  value = 0,
  max = 100,
  size = 'md',
  indeterminate,
  label,
  className = '',
}: ProgressCircleProps) {
  const { size: dim, stroke } = sizeMap[size]
  const radius = (dim - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const percent = Math.min(100, Math.max(0, (value / max) * 100))
  const offset = circumference - (percent / 100) * circumference

  return (
    <div className={`inline-flex flex-col items-center gap-1 ${className}`}>
      <svg width={dim} height={dim} viewBox={`0 0 ${dim} ${dim}`} className="-rotate-90">
        <circle
          cx={dim / 2} cy={dim / 2} r={radius}
          stroke="var(--ds-border)" strokeWidth={stroke} fill="none"
        />
        {indeterminate ? (
          <motion.circle
            cx={dim / 2} cy={dim / 2} r={radius}
            stroke="var(--ds-accent)" strokeWidth={stroke} fill="none"
            strokeLinecap="round"
            strokeDasharray={`${circumference * 0.3} ${circumference * 0.7}`}
            animate={{ rotate: 360 }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
            style={{ transformOrigin: 'center' }}
          />
        ) : (
          <motion.circle
            cx={dim / 2} cy={dim / 2} r={radius}
            stroke="var(--ds-black)" strokeWidth={stroke} fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={springs.smooth}
            className="dark:stroke-ds-white"
          />
        )}
      </svg>
      {label && <span className="text-ds-xs text-ds-text-muted">{label}</span>}
    </div>
  )
}
