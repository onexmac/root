import { motion } from 'framer-motion'

interface SkeletonProps {
  variant?: 'text' | 'circle' | 'rect'
  width?: string | number
  height?: string | number
  className?: string
}

export default function Skeleton({
  variant = 'text',
  width,
  height,
  className = '',
}: SkeletonProps) {
  const baseClasses = 'bg-ds-border overflow-hidden relative'

  const shapeClasses = {
    text: 'h-4 w-full rounded-ds-sm',
    circle: 'w-10 h-10 rounded-full',
    rect: 'w-full h-20 rounded-ds-lg',
  }

  return (
    <div
      className={`${baseClasses} ${shapeClasses[variant]} ${className}`}
      style={{ width, height }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-ds-surface-elevated/60 to-transparent"
        animate={{ x: ['-100%', '100%'] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}
