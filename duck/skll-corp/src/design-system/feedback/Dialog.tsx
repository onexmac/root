import { motion, AnimatePresence } from 'framer-motion'
import { springs } from '../motion/presets'

interface DialogProps {
  open: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  actions?: React.ReactNode
  variant?: 'alert' | 'confirm'
  className?: string
}

export default function Dialog({
  open,
  onClose,
  title,
  children,
  actions,
  className = '',
}: DialogProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-ds-black/40 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            className={`relative bg-ds-surface rounded-ds-xl shadow-ds-lg w-full max-w-sm p-6 ${className}`}
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={springs.smooth}
          >
            <h2 className="text-ds-lg font-semibold text-ds-text-primary tracking-[0.4px] mb-3">{title}</h2>
            <div className="text-ds-sm text-ds-text-secondary tracking-[0.25px] mb-6">{children}</div>
            {actions && <div className="flex gap-3 justify-end">{actions}</div>}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
