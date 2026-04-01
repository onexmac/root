import { motion } from 'framer-motion'
import { springs, gestures } from '../motion/presets'

interface NumpadProps {
  onKey?: (key: string) => void
  onDelete?: () => void
  onSubmit?: () => void
  className?: string
}

const keys = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
  ['.', '0', 'del'],
]

export default function Numpad({ onKey, onDelete, onSubmit, className = '' }: NumpadProps) {
  const handlePress = (key: string) => {
    if (key === 'del') {
      onDelete?.()
    } else {
      onKey?.(key)
    }
  }

  return (
    <div className={`grid grid-cols-3 gap-2 ${className}`}>
      {keys.flat().map((key) => (
        <motion.button
          key={key}
          className={`h-14 rounded-ds-lg text-ds-lg font-medium flex items-center justify-center cursor-pointer transition-colors ${
            key === 'del'
              ? 'bg-ds-surface-elevated text-ds-text-secondary'
              : 'bg-ds-surface hover:bg-ds-surface-elevated text-ds-text-primary'
          }`}
          onClick={() => handlePress(key)}
          whileTap={{ scale: 0.92 }}
          whileHover={{ scale: 1.02 }}
          transition={springs.snappy}
        >
          {key === 'del' ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 4H8l-7 8 7 8h13a2 2 0 002-2V6a2 2 0 00-2-2z" />
              <line x1="18" y1="9" x2="12" y2="15" />
              <line x1="12" y1="9" x2="18" y2="15" />
            </svg>
          ) : (
            key
          )}
        </motion.button>
      ))}
    </div>
  )
}
