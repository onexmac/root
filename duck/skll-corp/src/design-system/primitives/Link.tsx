import { motion, type HTMLMotionProps } from 'framer-motion'
import { springs } from '../motion/presets'

interface LinkProps extends HTMLMotionProps<'a'> {
  variant?: 'default' | 'subtle'
  icon?: React.ReactNode
  children: React.ReactNode
}

export default function Link({
  variant = 'default',
  icon,
  children,
  className = '',
  ...props
}: LinkProps) {
  const colorClass = variant === 'default'
    ? 'text-ds-text-primary underline decoration-ds-border hover:decoration-ds-text-primary'
    : 'text-ds-text-secondary hover:text-ds-text-primary'

  return (
    <motion.a
      className={`inline-flex items-center gap-1.5 font-medium tracking-[0.25px] cursor-pointer transition-colors ${colorClass} ${className}`}
      whileHover={{ x: 2 }}
      transition={springs.snappy}
      {...props}
    >
      {icon}
      {children}
    </motion.a>
  )
}
