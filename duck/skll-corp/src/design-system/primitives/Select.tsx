import { forwardRef, useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { springs } from '../motion/presets'

interface SelectOption {
  value: string
  label: string
}

interface SelectProps {
  options: SelectOption[]
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  label?: string
  error?: string
  helper?: string
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  className?: string
}

const sizeStyles = {
  sm: 'h-9 px-3 text-ds-sm',
  md: 'h-11 px-4 text-ds-base',
  lg: 'h-13 px-5 text-ds-lg',
}

const Select = forwardRef<HTMLDivElement, SelectProps>(({
  options,
  value,
  onChange,
  placeholder = 'Select...',
  label,
  error,
  helper,
  size = 'md',
  disabled,
  className = '',
}, ref) => {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const selected = options.find(o => o.value === value)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div ref={ref} className={`flex flex-col gap-1.5 ${className}`}>
      {label && <label className="text-ds-sm font-semibold text-ds-text-primary tracking-[0.4px]">{label}</label>}
      <div ref={containerRef} className="relative">
        <motion.button
          type="button"
          disabled={disabled}
          onClick={() => setOpen(!open)}
          className={`w-full flex items-center justify-between rounded-ds-lg border bg-ds-surface transition-colors cursor-pointer ${
            error ? 'border-ds-danger' : open ? 'border-ds-text-primary' : 'border-ds-border'
          } ${sizeStyles[size]} ${disabled ? 'opacity-40 cursor-not-allowed' : ''}`}
          whileTap={disabled ? undefined : { scale: 0.99 }}
        >
          <span className={selected ? 'text-ds-text-primary' : 'text-ds-text-muted'}>
            {selected?.label || placeholder}
          </span>
          <motion.svg
            width="16" height="16" viewBox="0 0 16 16" fill="none"
            animate={{ rotate: open ? 180 : 0 }}
            transition={springs.snappy}
          >
            <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </motion.svg>
        </motion.button>

        <AnimatePresence>
          {open && (
            <motion.div
              className="absolute z-50 top-full left-0 right-0 mt-1 bg-ds-surface border border-ds-border rounded-ds-lg shadow-ds-md overflow-hidden"
              initial={{ opacity: 0, y: -8, scaleY: 0.95 }}
              animate={{ opacity: 1, y: 0, scaleY: 1 }}
              exit={{ opacity: 0, y: -8, scaleY: 0.95 }}
              transition={springs.snappy}
              style={{ transformOrigin: 'top' }}
            >
              {options.map((option) => (
                <motion.button
                  key={option.value}
                  type="button"
                  className={`w-full text-left px-4 py-2.5 text-ds-sm transition-colors cursor-pointer ${
                    option.value === value
                      ? 'bg-ds-surface-elevated text-ds-text-primary font-semibold'
                      : 'text-ds-text-secondary hover:bg-ds-surface-elevated'
                  }`}
                  onClick={() => {
                    onChange?.(option.value)
                    setOpen(false)
                  }}
                  whileHover={{ x: 2 }}
                >
                  {option.label}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {(error || helper) && (
        <span className={`text-ds-xs tracking-[0.25px] ${error ? 'text-ds-danger' : 'text-ds-text-muted'}`}>
          {error || helper}
        </span>
      )}
    </div>
  )
})

Select.displayName = 'Select'
export default Select
