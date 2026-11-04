import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { springs } from '../motion/presets'

interface SnackbarProps {
  message: string
  action?: { label: string; onClick: () => void }
  onDismiss?: () => void
  duration?: number
  className?: string
}

export default function Snackbar({
  message,
  action,
  onDismiss,
  duration = 3000,
  className = '',
}: SnackbarProps) {
  useEffect(() => {
    if (duration && onDismiss) {
      const timer = setTimeout(onDismiss, duration)
      return () => clearTimeout(timer)
    }
  }, [duration, onDismiss])

  return (
    <motion.div
      className={`fixed bottom-6 left-1/2 z-50 flex items-center gap-3 px-5 py-3 rounded-ds-full bg-ds-black dark:bg-ds-white text-ds-white dark:text-ds-black shadow-ds-lg ${className}`}
      initial={{ opacity: 0, y: 40, x: '-50%' }}
      animate={{ opacity: 1, y: 0, x: '-50%' }}
      exit={{ opacity: 0, y: 40, x: '-50%' }}
      transition={springs.smooth}
    >
      <span className="text-ds-sm tracking-[0.25px]">{message}</span>
      {action && (
        <button
          className="text-ds-sm font-semibold text-ds-accent cursor-pointer"
          onClick={action.onClick}
        >
          {action.label}
        </button>
      )}
    </motion.div>
  )
}
