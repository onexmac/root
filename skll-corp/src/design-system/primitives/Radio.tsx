import { motion } from 'framer-motion'
import { springs } from '../motion/presets'

interface RadioProps {
  checked?: boolean
  onChange?: (checked: boolean) => void
  label?: string
  size?: 'sm' | 'md'
  disabled?: boolean
  name?: string
  value?: string
  className?: string
}

export default function Radio({
  checked = false,
  onChange,
  label,
  size = 'md',
  disabled,
  className = '',
  ...props
}: RadioProps) {
  const dim = size === 'sm' ? 'w-4 h-4' : 'w-5 h-5'
  const dotSize = size === 'sm' ? 'w-2 h-2' : 'w-2.5 h-2.5'

  return (
    <label className={`inline-flex items-center gap-2.5 cursor-pointer select-none ${disabled ? 'opacity-40 cursor-not-allowed' : ''} ${className}`}>
      <motion.button
        type="button"
        role="radio"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange?.(!checked)}
        className={`${dim} rounded-full border-2 flex items-center justify-center transition-colors cursor-pointer ${
          checked
            ? 'border-ds-black dark:border-ds-white'
            : 'border-ds-border hover:border-ds-text-secondary'
        }`}
        whileTap={disabled ? undefined : { scale: 0.85 }}
        transition={springs.snappy}
      >
        {checked && (
          <motion.div
            className={`${dotSize} rounded-full bg-ds-black dark:bg-ds-white`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={springs.bouncy}
          />
        )}
      </motion.button>
      {label && <span className="text-ds-sm text-ds-text-primary tracking-[0.25px]">{label}</span>}
    </label>
  )
}
