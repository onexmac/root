import { motion } from 'framer-motion'
import { springs, gestures, transitions } from '../motion/presets'

interface CardProps {
  children: React.ReactNode
  variant?: 'elevated' | 'outlined' | 'filled'
  pressable?: boolean
  onClick?: () => void
  className?: string
}

const variantStyles = {
  elevated: 'bg-ds-surface shadow-ds-md',
  outlined: 'bg-ds-surface border border-ds-border',
  filled: 'bg-ds-surface-elevated',
}

export default function Card({
  children,
  variant = 'elevated',
  pressable = false,
  onClick,
  className = '',
}: CardProps) {
  return (
    <motion.div
      className={`rounded-ds-xl overflow-hidden ${variantStyles[variant]} ${
        pressable ? 'cursor-pointer' : ''
      } ${className}`}
      onClick={onClick}
      {...transitions.fadeIn}
      {...(pressable ? gestures.subtle : {})}
    >
      {children}
    </motion.div>
  )
}
