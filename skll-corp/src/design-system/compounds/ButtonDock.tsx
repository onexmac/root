import { motion } from 'framer-motion'
import { springs } from '../motion/presets'

interface ButtonDockProps {
  children: React.ReactNode
  gradient?: boolean
  className?: string
}

export default function ButtonDock({ children, gradient = true, className = '' }: ButtonDockProps) {
  return (
    <motion.div
      className={`sticky bottom-0 z-30 px-4 pb-4 pt-2 ${className}`}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={springs.smooth}
    >
      {gradient && (
        <div className="absolute inset-x-0 -top-6 h-6 bg-gradient-to-t from-ds-bg to-transparent pointer-events-none" />
      )}
      <div className="flex flex-col gap-2">{children}</div>
    </motion.div>
  )
}
