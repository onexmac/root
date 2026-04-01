import { motion } from 'framer-motion'
import { springs, gestures } from '../motion/presets'

interface NavPillProps {
  icon?: React.ReactNode
  label: string
  count?: number
  active?: boolean
  onClick?: () => void
  className?: string
}

export default function NavPill({
  icon,
  label,
  count,
  active = false,
  onClick,
  className = '',
}: NavPillProps) {
  return (
    <motion.button
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-ds-full text-ds-sm font-medium tracking-[0.25px] cursor-pointer transition-colors ${
        active
          ? 'bg-ds-black dark:bg-ds-white text-ds-white dark:text-ds-black'
          : 'bg-ds-surface text-ds-text-secondary hover:text-ds-text-primary hover:bg-ds-surface-elevated'
      } ${className}`}
      onClick={onClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.95 }}
      transition={springs.snappy}
    >
      {icon && <span className="w-4 h-4 flex-shrink-0">{icon}</span>}
      {label}
      {count !== undefined && (
        <motion.span
          className={`min-w-[20px] h-5 flex items-center justify-center rounded-ds-full text-[11px] font-bold px-1.5 ${
            active
              ? 'bg-ds-white/20 dark:bg-ds-black/20'
              : 'bg-ds-border'
          }`}
          key={count}
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={springs.bouncy}
        >
          {count}
        </motion.span>
      )}
    </motion.button>
  )
}
