import { motion } from 'framer-motion'
import { springs } from '../motion/presets'

interface CheckboxProps {
  checked?: boolean
  indeterminate?: boolean
  onChange?: (checked: boolean) => void
  label?: string
  size?: 'sm' | 'md'
  disabled?: boolean
  className?: string
}

export default function Checkbox({
  checked = false,
  indeterminate = false,
  onChange,
  label,
  size = 'md',
  disabled,
  className = '',
}: CheckboxProps) {
  const dim = size === 'sm' ? 'w-4 h-4' : 'w-5 h-5'
  const iconSize = size === 'sm' ? 12 : 14

  return (
    <label className={`inline-flex items-center gap-2.5 cursor-pointer select-none ${disabled ? 'opacity-40 cursor-not-allowed' : ''} ${className}`}>
      <motion.button
        type="button"
        role="checkbox"
        aria-checked={indeterminate ? 'mixed' : checked}
        disabled={disabled}
        onClick={() => onChange?.(!checked)}
        className={`${dim} rounded-ds-sm border-2 flex items-center justify-center transition-colors cursor-pointer ${
          checked || indeterminate
            ? 'bg-ds-black border-ds-black dark:bg-ds-white dark:border-ds-white'
            : 'bg-transparent border-ds-border hover:border-ds-text-secondary'
        }`}
        whileTap={disabled ? undefined : { scale: 0.85 }}
        transition={springs.snappy}
      >
        {checked && (
          <motion.svg
            width={iconSize}
            height={iconSize}
            viewBox="0 0 14 14"
            fill="none"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={springs.bouncy}
          >
            <path d="M3 7l3 3 5-6" stroke="var(--ds-surface)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </motion.svg>
        )}
        {indeterminate && !checked && (
          <motion.div
            className="w-2/3 h-0.5 bg-ds-surface rounded-full"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={springs.bouncy}
          />
        )}
      </motion.button>
      {label && <span className="text-ds-sm text-ds-text-primary tracking-[0.25px]">{label}</span>}
    </label>
  )
}
