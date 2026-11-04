import { motion } from 'framer-motion'
import { transitions } from '../motion/presets'

interface EmptyStateProps {
  icon?: React.ReactNode
  title: string
  description?: string
  action?: React.ReactNode
  className?: string
}

export default function EmptyState({ icon, title, description, action, className = '' }: EmptyStateProps) {
  return (
    <motion.div
      className={`flex flex-col items-center justify-center text-center py-16 px-8 ${className}`}
      {...transitions.fadeIn}
    >
      {icon && (
        <motion.div
          className="mb-4 text-ds-text-muted"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, type: 'spring', stiffness: 300, damping: 25 }}
        >
          {icon}
        </motion.div>
      )}
      <h3 className="text-ds-lg font-semibold text-ds-text-primary tracking-[0.4px] mb-1">{title}</h3>
      {description && (
        <p className="text-ds-sm text-ds-text-secondary tracking-[0.25px] max-w-xs">{description}</p>
      )}
      {action && <div className="mt-6">{action}</div>}
    </motion.div>
  )
}
