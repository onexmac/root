import { motion, AnimatePresence } from 'framer-motion'
import { springs } from '../motion/presets'

type BadgeVariant = 'default' | 'accent' | 'destructive' | 'success' | 'warning'
type BadgeSize = 'sm' | 'md'

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-ds-black text-ds-white dark:bg-ds-white dark:text-ds-black',
  accent: 'bg-ds-accent text-ds-black',
  destructive: 'bg-ds-destructive text-white',
  success: 'bg-ds-success text-white',
  warning: 'bg-ds-warning text-white',
}

const sizeStyles: Record<BadgeSize, string> = {
  sm: 'min-w-[20px] h-5 px-1.5 text-[11px]',
  md: 'min-w-[24px] h-6 px-2 text-ds-xs',
}

interface BadgeProps {
  value?: number | string
  variant?: BadgeVariant
  size?: BadgeSize
  dot?: boolean
  className?: string
}

export default function Badge({
  value,
  variant = 'default',
  size = 'sm',
  dot,
  className = '',
}: BadgeProps) {
  if (dot) {
    return (
      <motion.span
        className={`inline-block w-2.5 h-2.5 rounded-full ${variantStyles[variant]} ${className}`}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={springs.bouncy}
      />
    )
  }

  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={String(value)}
        className={`inline-flex items-center justify-center rounded-ds-full font-semibold leading-none ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.5, opacity: 0 }}
        transition={springs.bouncy}
      >
        {value}
      </motion.span>
    </AnimatePresence>
  )
}
