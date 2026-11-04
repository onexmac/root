import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { springs } from '../motion/presets'

type Placement = 'top' | 'right' | 'bottom' | 'left'

const placementStyles: Record<Placement, string> = {
  top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
  left: 'right-full top-1/2 -translate-y-1/2 mr-2',
  right: 'left-full top-1/2 -translate-y-1/2 ml-2',
}

const arrowStyles: Record<Placement, string> = {
  top: 'top-full left-1/2 -translate-x-1/2 border-t-ds-black dark:border-t-ds-white border-x-transparent border-b-transparent',
  bottom: 'bottom-full left-1/2 -translate-x-1/2 border-b-ds-black dark:border-b-ds-white border-x-transparent border-t-transparent',
  left: 'left-full top-1/2 -translate-y-1/2 border-l-ds-black dark:border-l-ds-white border-y-transparent border-r-transparent',
  right: 'right-full top-1/2 -translate-y-1/2 border-r-ds-black dark:border-r-ds-white border-y-transparent border-l-transparent',
}

interface TooltipProps {
  content: string
  placement?: Placement
  children: React.ReactNode
  className?: string
}

export default function Tooltip({ content, placement = 'top', children, className = '' }: TooltipProps) {
  const [visible, setVisible] = useState(false)

  return (
    <div
      className={`relative inline-flex ${className}`}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
    >
      {children}
      <AnimatePresence>
        {visible && (
          <motion.div
            className={`absolute z-50 pointer-events-none ${placementStyles[placement]}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={springs.snappy}
          >
            <div className="bg-ds-black dark:bg-ds-white text-ds-white dark:text-ds-black text-ds-xs px-2.5 py-1.5 rounded-ds-md whitespace-nowrap font-medium tracking-[0.25px]">
              {content}
            </div>
            <div className={`absolute w-0 h-0 border-4 ${arrowStyles[placement]}`} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
