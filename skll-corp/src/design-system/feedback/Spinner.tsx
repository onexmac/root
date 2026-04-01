import { motion } from 'framer-motion'

type SpinnerSize = 'sm' | 'md' | 'lg'

const sizeMap: Record<SpinnerSize, string> = {
  sm: 'w-4 h-4 border-2',
  md: 'w-6 h-6 border-2',
  lg: 'w-10 h-10 border-3',
}

interface SpinnerProps {
  size?: SpinnerSize
  overlay?: boolean
  className?: string
}

export default function Spinner({ size = 'md', overlay, className = '' }: SpinnerProps) {
  const spinner = (
    <motion.div
      className={`rounded-full border-ds-text-muted border-t-ds-text-primary ${sizeMap[size]} ${className}`}
      animate={{ rotate: 360 }}
      transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
    />
  )

  if (overlay) {
    return (
      <motion.div
        className="fixed inset-0 flex items-center justify-center bg-ds-bg/60 backdrop-blur-sm z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {spinner}
      </motion.div>
    )
  }

  return spinner
}
