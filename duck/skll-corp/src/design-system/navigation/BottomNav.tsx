import { motion } from 'framer-motion'
import { springs, gestures } from '../motion/presets'

interface BottomNavItem {
  id: string
  icon: React.ReactNode
  label: string
  badge?: number
}

interface BottomNavProps {
  items: BottomNavItem[]
  activeId: string
  onChange?: (id: string) => void
  className?: string
}

export default function BottomNav({ items, activeId, onChange, className = '' }: BottomNavProps) {
  return (
    <nav
      className={`fixed bottom-0 left-0 right-0 z-40 flex items-stretch justify-around bg-ds-surface/90 backdrop-blur-md border-t border-ds-border safe-area-bottom ${className}`}
    >
      {items.map((item) => {
        const isActive = activeId === item.id
        return (
          <motion.button
            key={item.id}
            className={`relative flex flex-col items-center justify-center gap-0.5 flex-1 pt-2 pb-1 cursor-pointer transition-colors ${
              isActive ? 'text-ds-text-primary' : 'text-ds-text-muted'
            }`}
            onClick={() => onChange?.(item.id)}
            whileTap={{ scale: 0.9 }}
            transition={springs.snappy}
          >
            <div className="relative w-6 h-6">
              {item.icon}
              {item.badge !== undefined && item.badge > 0 && (
                <motion.span
                  className="absolute -top-1.5 -right-2 min-w-[16px] h-4 flex items-center justify-center rounded-ds-full bg-ds-destructive text-ds-white text-[9px] font-bold px-1"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={springs.bouncy}
                >
                  {item.badge}
                </motion.span>
              )}
            </div>
            <span className="text-[10px] font-medium tracking-[0.4px]">{item.label}</span>
            {isActive && (
              <motion.div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-ds-text-primary rounded-full"
                layoutId="bottomnav-indicator"
                transition={springs.snappy}
              />
            )}
          </motion.button>
        )
      })}
    </nav>
  )
}
