import { forwardRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { springs } from '../motion/presets'

type InputSize = 'sm' | 'md' | 'lg'
type InputVariant = 'default' | 'filled'

const sizeStyles: Record<InputSize, string> = {
  sm: 'h-9 px-3 text-ds-sm',
  md: 'h-11 px-4 text-ds-base',
  lg: 'h-13 px-5 text-ds-lg',
}

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string
  helper?: string
  error?: string
  size?: InputSize
  variant?: InputVariant
  leadingIcon?: React.ReactNode
  trailingIcon?: React.ReactNode
  clearable?: boolean
  onClear?: () => void
}

const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  helper,
  error,
  size = 'md',
  variant = 'default',
  leadingIcon,
  trailingIcon,
  clearable,
  onClear,
  className = '',
  value,
  onChange,
  ...props
}, ref) => {
  const [focused, setFocused] = useState(false)

  const borderClass = error
    ? 'border-ds-danger'
    : focused
    ? 'border-ds-text-primary'
    : 'border-ds-border'

  const bgClass = variant === 'filled' ? 'bg-ds-surface-elevated' : 'bg-ds-surface'

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label className="text-ds-sm font-semibold text-ds-text-primary tracking-[0.4px]">
          {label}
        </label>
      )}
      <motion.div
        className={`flex items-center gap-2 rounded-ds-lg border transition-colors ${bgClass} ${borderClass} ${sizeStyles[size]}`}
        animate={{ borderColor: error ? 'var(--ds-danger)' : focused ? 'var(--ds-text-primary)' : 'var(--ds-border)' }}
        transition={springs.snappy}
      >
        {leadingIcon && <span className="text-ds-text-muted flex-shrink-0">{leadingIcon}</span>}
        <input
          ref={ref}
          className="flex-1 bg-transparent outline-none text-ds-text-primary placeholder:text-ds-text-muted font-normal tracking-[0.25px] w-full"
          value={value}
          onChange={onChange}
          onFocus={(e) => { setFocused(true); props.onFocus?.(e) }}
          onBlur={(e) => { setFocused(false); props.onBlur?.(e) }}
          {...props}
        />
        {clearable && value && (
          <motion.button
            className="text-ds-text-muted hover:text-ds-text-primary cursor-pointer flex-shrink-0"
            onClick={onClear}
            whileTap={{ scale: 0.8 }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
            </svg>
          </motion.button>
        )}
        {trailingIcon && <span className="text-ds-text-muted flex-shrink-0">{trailingIcon}</span>}
      </motion.div>
      <AnimatePresence>
        {(error || helper) && (
          <motion.span
            className={`text-ds-xs tracking-[0.25px] ${error ? 'text-ds-danger' : 'text-ds-text-muted'}`}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
          >
            {error || helper}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  )
})

Input.displayName = 'Input'
export default Input
