import { motion } from 'framer-motion'
import { gestures, transitions } from '../motion/presets'

interface TileProps {
  icon?: React.ReactNode
  title: string
  description?: string
  pressable?: boolean
  onClick?: () => void
  className?: string
}

export default function Tile({ icon, title, description, pressable = false, onClick, className = '' }: TileProps) {
  return (
    <motion.div
      className={`flex flex-col items-center text-center p-5 rounded-ds-xl bg-ds-surface ${
        pressable ? 'cursor-pointer hover:bg-ds-surface-elevated transition-colors' : ''
      } ${className}`}
      onClick={onClick}
      {...transitions.fadeIn}
      {...(pressable ? gestures.subtle : {})}
    >
      {icon && <div className="mb-3 text-ds-text-muted">{icon}</div>}
      <h4 className="text-ds-sm font-semibold text-ds-text-primary tracking-[0.25px]">{title}</h4>
      {description && (
        <p className="text-ds-xs text-ds-text-secondary tracking-[0.25px] mt-1">{description}</p>
      )}
    </motion.div>
  )
}
