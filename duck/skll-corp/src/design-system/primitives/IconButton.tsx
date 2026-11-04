import { forwardRef } from 'react'
import { motion, type HTMLMotionProps } from 'framer-motion'
import { springs } from '../motion/presets'

type IconButtonVariant = 'primary' | 'secondary' | 'ghost' | 'destructive'
type IconButtonSize = 'sm' | 'md' | 'lg'

const variantStyles: Record<IconButtonVariant, string> = {
  primary: 'bg-ds-accent text-ds-black hover:bg-ds-accent-hover shadow-ds-sm',
  secondary: 'bg-ds-black text-ds-white dark:bg-ds-white dark:text-ds-black shadow-ds-sm',
  ghost: 'bg-transparent text-ds-text-primary hover:bg-ds-surface-elevated',
  destructive: 'bg-ds-destructive text-white shadow-ds-sm hover:bg-ds-destructive-pressed',
}

const sizeStyles: Record<IconButtonSize, string> = {
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-12 h-12',
}

interface IconButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: IconButtonVariant
  size?: IconButtonSize
  icon: React.ReactNode
  label: string
  disabled?: boolean
}

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(({
  variant = 'ghost',
  size = 'md',
  icon,
  label,
  disabled,
  className = '',
  ...props
}, ref) => {
  return (
    <motion.button
      ref={ref}
      className={`inline-flex items-center justify-center rounded-ds-full cursor-pointer select-none disabled:opacity-40 disabled:cursor-not-allowed transition-colors ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      disabled={disabled}
      aria-label={label}
      whileHover={disabled ? undefined : { scale: 1.08 }}
      whileTap={disabled ? undefined : { scale: 0.92 }}
      transition={springs.snappy}
      {...props}
    >
      {icon}
    </motion.button>
  )
})

IconButton.displayName = 'IconButton'
export default IconButton
