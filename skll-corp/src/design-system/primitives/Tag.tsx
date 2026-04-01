import { motion } from 'framer-motion'
import { springs } from '../motion/presets'

type TagColor = 'neutral' | 'accent' | 'success' | 'warning' | 'danger'
type TagVariant = 'solid' | 'outline'

const solidStyles: Record<TagColor, string> = {
  neutral: 'bg-ds-surface-elevated text-ds-text-primary border-ds-border',
  accent: 'bg-ds-accent/15 text-ds-accent border-ds-accent/30',
  success: 'bg-ds-success/15 text-ds-success border-ds-success/30',
  warning: 'bg-ds-warning/15 text-ds-warning border-ds-warning/30',
  danger: 'bg-ds-danger/15 text-ds-danger border-ds-danger/30',
}

const outlineStyles: Record<TagColor, string> = {
  neutral: 'bg-transparent text-ds-text-secondary border-ds-border',
  accent: 'bg-transparent text-ds-accent border-ds-accent/50',
  success: 'bg-transparent text-ds-success border-ds-success/50',
  warning: 'bg-transparent text-ds-warning border-ds-warning/50',
  danger: 'bg-transparent text-ds-danger border-ds-danger/50',
}

interface TagProps {
  children: React.ReactNode
  color?: TagColor
  variant?: TagVariant
  icon?: React.ReactNode
  onDismiss?: () => void
  className?: string
}

export default function Tag({
  children,
  color = 'neutral',
  variant = 'solid',
  icon,
  onDismiss,
  className = '',
}: TagProps) {
  const styles = variant === 'solid' ? solidStyles[color] : outlineStyles[color]

  return (
    <motion.span
      className={`inline-flex items-center gap-1.5 h-7 px-2.5 rounded-ds-full border text-ds-sm font-medium tracking-[0.25px] select-none ${styles} ${className}`}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      transition={springs.snappy}
      layout
    >
      {icon}
      {children}
      {onDismiss && (
        <motion.button
          className="ml-0.5 w-4 h-4 rounded-full flex items-center justify-center hover:bg-black/10 dark:hover:bg-white/10 cursor-pointer"
          onClick={onDismiss}
          whileTap={{ scale: 0.8 }}
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
            <path d="M8 2L2 8M2 2l6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          </svg>
        </motion.button>
      )}
    </motion.span>
  )
}
