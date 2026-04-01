import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { springs } from '../motion/presets'

interface ModalProps {
  open: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  footer?: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'fullscreen'
  closable?: boolean
  className?: string
}

const sizeStyles = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  fullscreen: 'max-w-none m-0 rounded-none h-full',
}

export default function Modal({
  open,
  onClose,
  title,
  children,
  footer,
  size = 'md',
  closable = true,
  className = '',
}: ModalProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
      return () => { document.body.style.overflow = '' }
    }
  }, [open])

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && closable) onClose()
    }
    if (open) {
      window.addEventListener('keydown', handleEsc)
      return () => window.removeEventListener('keydown', handleEsc)
    }
  }, [open, closable, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-ds-black/50 backdrop-blur-sm"
            onClick={closable ? onClose : undefined}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            className={`relative bg-ds-surface rounded-ds-xl shadow-ds-lg w-full flex flex-col overflow-hidden ${sizeStyles[size]} ${
              size === 'fullscreen' ? '' : 'max-h-[85vh]'
            } ${className}`}
            initial={{ scale: 0.92, opacity: 0, y: 24 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 24 }}
            transition={springs.smooth}
          >
            {(title || closable) && (
              <div className="flex items-center gap-3 px-6 py-4 border-b border-ds-border flex-shrink-0">
                {title && (
                  <h2 className="flex-1 text-ds-lg font-semibold text-ds-text-primary tracking-[0.4px]">{title}</h2>
                )}
                {closable && (
                  <button
                    className="w-8 h-8 flex items-center justify-center rounded-ds-full hover:bg-ds-surface-elevated cursor-pointer text-ds-text-muted"
                    onClick={onClose}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                )}
              </div>
            )}
            <div className="flex-1 overflow-y-auto px-6 py-4">{children}</div>
            {footer && (
              <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-ds-border flex-shrink-0">
                {footer}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
