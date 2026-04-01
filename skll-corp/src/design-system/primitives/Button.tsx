import { forwardRef } from 'react'
import { motion, type HTMLMotionProps } from 'framer-motion'
import { springs } from '../motion/presets'

type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'destructive'
type ButtonSize = 'xs' | 'sm' | 'md' | 'lg'
type ButtonLayout = 'label' | 'icon-left' | 'icon-right' | 'icon-only'

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-ds-accent text-ds-black hover:bg-ds-accent-hover shadow-ds-sm',
  secondary: 'bg-ds-black text-ds-white dark:bg-ds-white dark:text-ds-black shadow-ds-sm',
  tertiary: 'bg-ds-surface text-ds-text-primary border border-ds-border hover:bg-ds-surface-elevated',
  ghost: 'bg-transparent text-ds-text-primary hover:bg-ds-surface-elevated',
  destructive: 'bg-ds-destructive text-white shadow-ds-sm hover:bg-ds-destructive-pressed',
}

const sizeStyles: Record<ButtonSize, string> = {
  xs: 'h-8 px-3 text-ds-xs gap-1.5',
  sm: 'h-10 px-4 text-ds-sm gap-2',
  md: 'h-12 px-5 text-ds-base gap-2',
  lg: 'h-14 px-6 text-ds-lg gap-3',
}

const iconOnlySize: Record<ButtonSize, string> = {
  xs: 'h-8 w-8',
  sm: 'h-10 w-10',
  md: 'h-12 w-12',
  lg: 'h-14 w-14',
}

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children' | 'layout'> {
  variant?: ButtonVariant
  size?: ButtonSize
  layout?: ButtonLayout
  icon?: React.ReactNode
  loading?: boolean
  disabled?: boolean
  children?: React.ReactNode
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  variant = 'primary',
  size = 'md',
  layout = 'label',
  icon,
  loading,
  disabled,
  children,
  className = '',
  ...props
}, ref) => {
  const isIconOnly = layout === 'icon-only'

  const baseClasses = [
    'inline-flex items-center justify-center font-semibold tracking-[0.4px]',
    'rounded-ds-lg select-none cursor-pointer',
    'disabled:opacity-40 disabled:cursor-not-allowed',
    'transition-colors duration-150',
    variantStyles[variant],
    isIconOnly ? iconOnlySize[size] : sizeStyles[size],
    isIconOnly ? 'rounded-ds-full' : '',
    className,
  ].join(' ')

  return (
    <motion.button
      ref={ref}
      className={baseClasses}
      disabled={disabled || loading}
      whileHover={disabled ? undefined : { scale: 1.03 }}
      whileTap={disabled ? undefined : { scale: 0.95 }}
      transition={springs.snappy}
      {...props}
    >
      {loading && (
        <motion.span
          className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
        />
      )}
      {!loading && layout === 'icon-left' && icon}
      {!loading && layout === 'icon-only' && icon}
      {!isIconOnly && !loading && <span>{children}</span>}
      {!loading && layout === 'icon-right' && icon}
    </motion.button>
  )
})

Button.displayName = 'Button'
export default Button
