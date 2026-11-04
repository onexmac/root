import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { springs } from '../motion/presets'

interface DrawerProps {
  open: boolean
  onClose: () => void
  children: React.ReactNode
  placement?: 'left' | 'right'
  overlay?: boolean
  className?: string
}

export default function Drawer({
  open,
  onClose,
  children,
  placement = 'right',
  overlay = true,
  className = '',
}: DrawerProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
      return () => { document.body.style.overflow = '' }
    }
  }, [open])

  const slideFrom = placement === 'left' ? '-100%' : '100%'
  const posClass = placement === 'left' ? 'left-0' : 'right-0'

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {overlay && (
            <motion.div
              className="absolute inset-0 bg-ds-black/40 backdrop-blur-sm"
              onClick={onClose}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
          )}
          <motion.div
            className={`absolute top-0 ${posClass} h-full w-80 bg-ds-surface shadow-ds-lg overflow-y-auto ${className}`}
            initial={{ x: slideFrom }}
            animate={{ x: 0 }}
            exit={{ x: slideFrom }}
            transition={springs.smooth}
          >
            <div className="p-4 flex justify-end">
              <button
                className="w-8 h-8 flex items-center justify-center rounded-ds-full hover:bg-ds-surface-elevated cursor-pointer text-ds-text-muted"
                onClick={onClose}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <div className="px-6 pb-6">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
