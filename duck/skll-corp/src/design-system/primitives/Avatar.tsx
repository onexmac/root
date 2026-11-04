import { motion } from 'framer-motion'
import { springs } from '../motion/presets'

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
type AvatarShape = 'circle' | 'square'

const sizeMap: Record<AvatarSize, { container: string; text: string; dot: string }> = {
  xs: { container: 'w-6 h-6', text: 'text-[9px]', dot: 'w-2 h-2 -right-0.5 -bottom-0.5' },
  sm: { container: 'w-8 h-8', text: 'text-[11px]', dot: 'w-2.5 h-2.5 -right-0.5 -bottom-0.5' },
  md: { container: 'w-10 h-10', text: 'text-ds-sm', dot: 'w-3 h-3 right-0 bottom-0' },
  lg: { container: 'w-12 h-12', text: 'text-ds-base', dot: 'w-3 h-3 right-0 bottom-0' },
  xl: { container: 'w-16 h-16', text: 'text-ds-lg', dot: 'w-3.5 h-3.5 right-0.5 bottom-0.5' },
}

interface AvatarProps {
  src?: string
  alt?: string
  initials?: string
  size?: AvatarSize
  shape?: AvatarShape
  status?: 'online' | 'offline' | 'busy'
  className?: string
}

const statusColors = {
  online: 'bg-ds-success',
  offline: 'bg-ds-text-muted',
  busy: 'bg-ds-danger',
}

export default function Avatar({
  src,
  alt = '',
  initials,
  size = 'md',
  shape = 'circle',
  status,
  className = '',
}: AvatarProps) {
  const s = sizeMap[size]
  const roundedClass = shape === 'circle' ? 'rounded-full' : 'rounded-ds-md'

  return (
    <motion.div
      className={`relative inline-flex items-center justify-center ${s.container} ${roundedClass} bg-ds-surface-elevated overflow-hidden select-none ${className}`}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={springs.gentle}
    >
      {src ? (
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      ) : (
        <span className={`font-semibold text-ds-text-secondary ${s.text}`}>
          {initials || '?'}
        </span>
      )}
      {status && (
        <span className={`absolute ${s.dot} ${statusColors[status]} rounded-full border-2 border-ds-surface`} />
      )}
    </motion.div>
  )
}
