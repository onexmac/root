import { forwardRef, useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { springs } from '../motion/presets'

interface TextareaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange'> {
  label?: string
  helper?: string
  error?: string
  maxLength?: number
  autoResize?: boolean
  onChange?: (value: string) => void
  value?: string
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({
  label,
  helper,
  error,
  maxLength,
  autoResize = false,
  onChange,
  value = '',
  className = '',
  ...props
}, ref) => {
  const [focused, setFocused] = useState(false)
  const innerRef = useRef<HTMLTextAreaElement>(null)
  const textareaRef = (ref as React.RefObject<HTMLTextAreaElement>) || innerRef

  useEffect(() => {
    if (autoResize && textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px'
    }
  }, [value, autoResize])

  const borderClass = error ? 'border-ds-danger' : focused ? 'border-ds-text-primary' : 'border-ds-border'

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && <label className="text-ds-sm font-semibold text-ds-text-primary tracking-[0.4px]">{label}</label>}
      <motion.div
        className={`rounded-ds-lg border bg-ds-surface transition-colors ${borderClass}`}
        animate={{ borderColor: error ? 'var(--ds-danger)' : focused ? 'var(--ds-text-primary)' : 'var(--ds-border)' }}
        transition={springs.snappy}
      >
        <textarea
          ref={textareaRef}
          className="w-full bg-transparent outline-none text-ds-text-primary placeholder:text-ds-text-muted text-ds-base tracking-[0.25px] p-4 resize-none min-h-[100px]"
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          maxLength={maxLength}
          {...props}
        />
      </motion.div>
      <div className="flex justify-between">
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
        {maxLength && (
          <span className="text-ds-xs text-ds-text-muted ml-auto">
            {value.length}/{maxLength}
          </span>
        )}
      </div>
    </div>
  )
})

Textarea.displayName = 'Textarea'
export default Textarea
