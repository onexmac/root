import { motion } from 'framer-motion'
import { springs } from '../motion/presets'

interface SwitchProps {
  checked?: boolean
  onChange?: (checked: boolean) => void
  label?: string
  size?: 'sm' | 'md'
  disabled?: boolean
  loading?: boolean
  className?: string
}

export default function Switch({
  checked = false,
  onChange,
  label,
  size = 'md',
  disabled,
  loading,
  className = '',
}: SwitchProps) {
  const trackW = size === 'sm' ? 'w-8' : 'w-11'
  const trackH = size === 'sm' ? 'h-4' : 'h-6'
  const thumbDim = size === 'sm' ? 12 : 20
  const travel = size === 'sm' ? 16 : 20

  return (
    <label className={`inline-flex items-center gap-2.5 cursor-pointer select-none ${disabled ? 'opacity-40 cursor-not-allowed' : ''} ${className}`}>
      <motion.button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled || loading}
        onClick={() => onChange?.(!checked)}
        className={`relative ${trackW} ${trackH} rounded-full cursor-pointer transition-colors ${
          checked ? 'bg-ds-accent' : 'bg-ds-border'
        }`}
        whileTap={disabled ? undefined : { scale: 0.95 }}
      >
        <motion.div
          className="absolute top-1/2 rounded-full bg-white shadow-ds-sm"
          style={{ width: thumbDim, height: thumbDim, y: '-50%' }}
          animate={{ x: checked ? travel : 2 }}
          transition={springs.snappy}
        >
          {loading && (
            <motion.div
              className="w-full h-full rounded-full border-2 border-ds-text-muted border-t-transparent"
              animate={{ rotate: 360 }}
              transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
            />
          )}
        </motion.div>
      </motion.button>
      {label && <span className="text-ds-sm text-ds-text-primary tracking-[0.25px]">{label}</span>}
    </label>
  )
}
