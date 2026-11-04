import { motion } from 'framer-motion'
import { springs } from '../motion/presets'

interface BottomBarProps {
  children: React.ReactNode
  className?: string
}

export default function BottomBar({ children, className = '' }: BottomBarProps) {
  return (
    <motion.div
      className={`fixed bottom-0 left-0 right-0 z-40 bg-ds-surface/90 backdrop-blur-md border-t border-ds-border px-4 py-3 safe-area-bottom ${className}`}
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={springs.smooth}
    >
      {children}
    </motion.div>
  )
}
