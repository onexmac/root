import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { springs } from '../motion/presets'

type Placement = 'top' | 'bottom' | 'left' | 'right'

const placementStyles: Record<Placement, string> = {
  top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
  left: 'right-full top-1/2 -translate-y-1/2 mr-2',
  right: 'left-full top-1/2 -translate-y-1/2 ml-2',
}

interface PopoverProps {
  trigger: React.ReactNode
  children: React.ReactNode
  placement?: Placement
  triggerOn?: 'click' | 'hover'
  className?: string
}

export default function Popover({
  trigger,
  children,
  placement = 'bottom',
  triggerOn = 'click',
  className = '',
}: PopoverProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (triggerOn !== 'click' || !open) return
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [open, triggerOn])

  return (
    <div
      ref={ref}
      className={`relative inline-flex ${className}`}
      {...(triggerOn === 'hover'
        ? { onMouseEnter: () => setOpen(true), onMouseLeave: () => setOpen(false) }
        : {})}
    >
      <div
        onClick={triggerOn === 'click' ? () => setOpen(!open) : undefined}
        className="cursor-pointer"
      >
        {trigger}
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            className={`absolute z-50 ${placementStyles[placement]}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={springs.snappy}
          >
            <div className="bg-ds-surface rounded-ds-lg shadow-ds-lg border border-ds-border p-3 min-w-[180px]">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
