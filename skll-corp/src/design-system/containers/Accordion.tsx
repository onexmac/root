import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { springs } from '../motion/presets'

interface AccordionItem {
  id: string
  title: string
  content: React.ReactNode
  icon?: React.ReactNode
}

interface AccordionProps {
  items: AccordionItem[]
  multiple?: boolean
  defaultOpen?: string[]
  className?: string
}

export default function Accordion({ items, multiple = false, defaultOpen = [], className = '' }: AccordionProps) {
  const [openIds, setOpenIds] = useState<Set<string>>(new Set(defaultOpen))

  const toggle = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(multiple ? prev : [])
      if (prev.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  return (
    <div className={`divide-y divide-ds-border rounded-ds-xl overflow-hidden border border-ds-border ${className}`}>
      {items.map((item) => {
        const isOpen = openIds.has(item.id)
        return (
          <div key={item.id}>
            <button
              className="w-full flex items-center gap-3 px-4 py-3.5 text-left cursor-pointer hover:bg-ds-surface transition-colors"
              onClick={() => toggle(item.id)}
            >
              {item.icon && <span className="w-5 h-5 flex-shrink-0 text-ds-text-muted">{item.icon}</span>}
              <span className="flex-1 text-ds-sm font-medium text-ds-text-primary tracking-[0.25px]">
                {item.title}
              </span>
              <motion.svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="flex-shrink-0 text-ds-text-muted"
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={springs.snappy}
              >
                <polyline points="6 9 12 15 18 9" />
              </motion.svg>
            </button>
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={springs.smooth}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-4 text-ds-sm text-ds-text-secondary tracking-[0.25px]">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
