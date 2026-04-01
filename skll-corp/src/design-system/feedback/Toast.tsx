import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { springs } from '../motion/presets'

type ToastVariant = 'info' | 'success' | 'warning' | 'error'

const variantStyles: Record<ToastVariant, string> = {
  info: 'bg-ds-surface border-ds-border',
  success: 'bg-ds-surface border-ds-success',
  warning: 'bg-ds-surface border-ds-warning',
  error: 'bg-ds-surface border-ds-danger',
}

const variantIcons: Record<ToastVariant, string> = {
  info: 'text-ds-text-secondary',
  success: 'text-ds-success',
  warning: 'text-ds-warning',
  error: 'text-ds-danger',
}

interface ToastProps {
  message: string
  variant?: ToastVariant
  action?: { label: string; onClick: () => void }
  onDismiss?: () => void
  duration?: number
  className?: string
}

export default function Toast({
  message,
  variant = 'info',
  action,
  onDismiss,
  duration = 4000,
  className = '',
}: ToastProps) {
  useEffect(() => {
    if (duration && onDismiss) {
      const timer = setTimeout(onDismiss, duration)
      return () => clearTimeout(timer)
    }
  }, [duration, onDismiss])

  return (
    <motion.div
      className={`flex items-center gap-3 px-4 py-3 rounded-ds-lg border shadow-ds-md ${variantStyles[variant]} ${className}`}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={springs.snappy}
      layout
    >
      <span className={`w-2 h-2 rounded-full flex-shrink-0 ${variantIcons[variant]} bg-current`} />
      <span className="text-ds-sm text-ds-text-primary flex-1 tracking-[0.25px]">{message}</span>
      {action && (
        <button
          className="text-ds-sm font-semibold text-ds-accent hover:underline cursor-pointer flex-shrink-0"
          onClick={action.onClick}
        >
          {action.label}
        </button>
      )}
      {onDismiss && (
        <motion.button
          className="text-ds-text-muted hover:text-ds-text-primary cursor-pointer flex-shrink-0"
          onClick={onDismiss}
          whileTap={{ scale: 0.8 }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M10.5 3.5L3.5 10.5M3.5 3.5l7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </motion.button>
      )}
    </motion.div>
  )
}
