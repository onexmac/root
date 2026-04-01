import { motion } from 'framer-motion'
import { gestures } from '../motion/presets'

interface ListItemProps {
  title: string
  subtitle?: string
  leading?: React.ReactNode
  trailing?: React.ReactNode
  pressable?: boolean
  onClick?: () => void
  className?: string
}

export default function ListItem({
  title,
  subtitle,
  leading,
  trailing,
  pressable = false,
  onClick,
  className = '',
}: ListItemProps) {
  return (
    <motion.div
      className={`flex items-center gap-3 px-4 py-3 border-b border-ds-border last:border-b-0 ${
        pressable ? 'cursor-pointer hover:bg-ds-surface transition-colors' : ''
      } ${className}`}
      onClick={onClick}
      {...(pressable ? gestures.subtle : {})}
    >
      {leading && <div className="flex-shrink-0">{leading}</div>}
      <div className="flex-1 min-w-0">
        <p className="text-ds-sm font-medium text-ds-text-primary tracking-[0.25px] truncate">{title}</p>
        {subtitle && (
          <p className="text-ds-xs text-ds-text-secondary tracking-[0.25px] truncate mt-0.5">{subtitle}</p>
        )}
      </div>
      {trailing && <div className="flex-shrink-0">{trailing}</div>}
    </motion.div>
  )
}
