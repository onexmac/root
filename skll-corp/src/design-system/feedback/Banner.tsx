import { motion, AnimatePresence } from 'framer-motion'
import { springs } from '../motion/presets'

type BannerVariant = 'info' | 'success' | 'warning' | 'error'

const variantStyles: Record<BannerVariant, string> = {
  info: 'bg-ds-surface-elevated border-ds-border text-ds-text-primary',
  success: 'bg-ds-success/10 border-ds-success/30 text-ds-success',
  warning: 'bg-ds-warning/10 border-ds-warning/30 text-ds-warning',
  error: 'bg-ds-danger/10 border-ds-danger/30 text-ds-danger',
}

interface BannerProps {
  children: React.ReactNode
  variant?: BannerVariant
  action?: { label: string; onClick: () => void }
  dismissible?: boolean
  onDismiss?: () => void
  visible?: boolean
  className?: string
}

export default function Banner({
  children,
  variant = 'info',
  action,
  dismissible,
  onDismiss,
  visible = true,
  className = '',
}: BannerProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className={`flex items-start gap-3 px-4 py-3 rounded-ds-lg border ${variantStyles[variant]} ${className}`}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={springs.smooth}
        >
          <span className="text-ds-sm flex-1 tracking-[0.25px]">{children}</span>
          {action && (
            <button
              className="text-ds-sm font-semibold underline cursor-pointer flex-shrink-0"
              onClick={action.onClick}
            >
              {action.label}
            </button>
          )}
          {dismissible && onDismiss && (
            <motion.button
              className="opacity-60 hover:opacity-100 cursor-pointer flex-shrink-0 mt-0.5"
              onClick={onDismiss}
              whileTap={{ scale: 0.8 }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M10.5 3.5L3.5 10.5M3.5 3.5l7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </motion.button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
