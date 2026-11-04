import { motion } from 'framer-motion'
import { springs, transitions, gestures } from '../motion/presets'

interface PageHeaderProps {
  title: string
  subtitle?: string
  backAction?: () => void
  actions?: React.ReactNode
  className?: string
}

export default function PageHeader({
  title,
  subtitle,
  backAction,
  actions,
  className = '',
}: PageHeaderProps) {
  return (
    <motion.header
      className={`flex items-start gap-3 py-4 ${className}`}
      {...transitions.fadeIn}
    >
      {backAction && (
        <motion.button
          className="mt-0.5 w-8 h-8 flex items-center justify-center rounded-ds-full hover:bg-ds-surface cursor-pointer text-ds-text-primary"
          onClick={backAction}
          {...gestures.tap}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </motion.button>
      )}
      <div className="flex-1 min-w-0">
        <motion.h1
          className="text-ds-xl font-bold text-ds-text-primary tracking-[0.4px] truncate"
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={springs.smooth}
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            className="text-ds-sm text-ds-text-secondary tracking-[0.25px] mt-0.5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            {subtitle}
          </motion.p>
        )}
      </div>
      {actions && (
        <motion.div
          className="flex items-center gap-2 flex-shrink-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
        >
          {actions}
        </motion.div>
      )}
    </motion.header>
  )
}
