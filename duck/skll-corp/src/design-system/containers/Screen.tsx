import { motion } from 'framer-motion'
import { transitions } from '../motion/presets'

interface ScreenProps {
  children: React.ReactNode
  className?: string
}

export default function Screen({ children, className = '' }: ScreenProps) {
  return (
    <motion.div
      className={`min-h-screen bg-ds-bg text-ds-text-primary ${className}`}
      {...transitions.screenEnter}
    >
      {children}
    </motion.div>
  )
}
