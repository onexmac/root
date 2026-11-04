import { motion } from 'framer-motion'
import { springs, gestures, transitions } from '../motion/presets'

interface ConfirmBarProps {
  onCancel?: () => void
  onConfirm?: () => void
  onDelete?: () => void
  cancelLabel?: string
  confirmLabel?: string
  deleteLabel?: string
  className?: string
}

export default function ConfirmBar({
  onCancel,
  onConfirm,
  onDelete,
  cancelLabel = 'Cancel',
  confirmLabel = 'Confirm',
  deleteLabel = 'Delete',
  className = '',
}: ConfirmBarProps) {
  return (
    <motion.div
      className={`flex items-center gap-3 p-4 ${className}`}
      {...transitions.slideUp}
    >
      {onCancel && (
        <motion.button
          className="flex-1 py-3 rounded-ds-full border border-ds-border text-ds-sm font-semibold text-ds-text-secondary hover:bg-ds-surface cursor-pointer tracking-[0.25px]"
          onClick={onCancel}
          {...gestures.tap}
        >
          {cancelLabel}
        </motion.button>
      )}
      {onDelete && (
        <motion.button
          className="flex-1 py-3 rounded-ds-full bg-ds-destructive text-ds-white text-ds-sm font-semibold cursor-pointer tracking-[0.25px]"
          onClick={onDelete}
          whileTap={{ scale: 0.95 }}
          whileHover={{ backgroundColor: 'var(--ds-destructive-pressed)' }}
          transition={springs.snappy}
        >
          {deleteLabel}
        </motion.button>
      )}
      {onConfirm && (
        <motion.button
          className="flex-1 py-3 rounded-ds-full bg-ds-black dark:bg-ds-white text-ds-white dark:text-ds-black text-ds-sm font-semibold cursor-pointer tracking-[0.25px]"
          onClick={onConfirm}
          {...gestures.tap}
        >
          {confirmLabel}
        </motion.button>
      )}
    </motion.div>
  )
}
