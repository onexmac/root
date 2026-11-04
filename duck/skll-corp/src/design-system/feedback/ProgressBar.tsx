import { motion } from 'framer-motion'
import { springs } from '../motion/presets'

interface Segment {
  value: number
  color?: string
  label?: string
}

interface ProgressBarProps {
  value?: number
  segments?: Segment[]
  max?: number
  indeterminate?: boolean
  showLabel?: boolean
  labelLeft?: string
  labelRight?: string
  className?: string
}

export default function ProgressBar({
  value = 0,
  segments,
  max = 100,
  indeterminate,
  showLabel,
  labelLeft,
  labelRight,
  className = '',
}: ProgressBarProps) {
  if (indeterminate) {
    return (
      <div className={`w-full ${className}`}>
        <div className="w-full h-2 bg-ds-border rounded-full overflow-hidden">
          <motion.div
            className="h-full w-1/3 bg-ds-accent rounded-full"
            animate={{ x: ['-100%', '400%'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </div>
    )
  }

  if (segments) {
    const total = segments.reduce((s, seg) => s + seg.value, 0)
    return (
      <div className={`w-full ${className}`}>
        {(labelLeft || labelRight) && (
          <div className="flex justify-between mb-1.5">
            <span className="text-ds-xs text-ds-text-muted">{labelLeft}</span>
            <span className="text-ds-xs text-ds-text-muted">{labelRight}</span>
          </div>
        )}
        <div className="w-full h-2 bg-ds-border rounded-full overflow-hidden flex">
          {segments.map((seg, i) => (
            <motion.div
              key={i}
              className="h-full first:rounded-l-full last:rounded-r-full"
              style={{ backgroundColor: seg.color || (i === 0 ? 'var(--ds-black)' : i === 1 ? 'var(--ds-accent)' : 'var(--ds-text-muted)') }}
              initial={{ width: 0 }}
              animate={{ width: `${(seg.value / (max || total)) * 100}%` }}
              transition={springs.smooth}
            />
          ))}
        </div>
      </div>
    )
  }

  const percent = Math.min(100, Math.max(0, (value / max) * 100))
  return (
    <div className={`w-full ${className}`}>
      {(showLabel || labelLeft || labelRight) && (
        <div className="flex justify-between mb-1.5">
          <span className="text-ds-xs text-ds-text-muted">{labelLeft}</span>
          <span className="text-ds-xs text-ds-text-secondary font-mono">{showLabel ? `${Math.round(percent)}%` : labelRight}</span>
        </div>
      )}
      <div className="w-full h-2 bg-ds-border rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-ds-black dark:bg-ds-white rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={springs.smooth}
        />
      </div>
    </div>
  )
}
