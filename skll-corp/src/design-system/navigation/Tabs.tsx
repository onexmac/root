import { useState } from 'react'
import { motion } from 'framer-motion'
import { springs, gestures } from '../motion/presets'

interface TabItem {
  id: string
  label: string
  icon?: React.ReactNode
  badge?: number
}

interface TabsProps {
  items: TabItem[]
  activeId?: string
  onChange?: (id: string) => void
  variant?: 'line' | 'pill' | 'enclosed'
  size?: 'sm' | 'md'
  className?: string
}

export default function Tabs({
  items,
  activeId,
  onChange,
  variant = 'line',
  size = 'md',
  className = '',
}: TabsProps) {
  const [internalActive, setInternalActive] = useState(items[0]?.id)
  const active = activeId ?? internalActive

  const handleChange = (id: string) => {
    setInternalActive(id)
    onChange?.(id)
  }

  const sizeStyles = {
    sm: 'text-ds-xs px-3 py-1.5',
    md: 'text-ds-sm px-4 py-2',
  }

  const containerStyles = {
    line: 'border-b border-ds-border',
    pill: 'bg-ds-surface rounded-ds-full p-1 gap-1',
    enclosed: 'bg-ds-surface rounded-ds-lg p-1 gap-0.5',
  }

  return (
    <div className={`flex ${containerStyles[variant]} ${className}`} role="tablist">
      {items.map((item) => {
        const isActive = active === item.id
        return (
          <button
            key={item.id}
            role="tab"
            aria-selected={isActive}
            className={`relative flex items-center justify-center gap-1.5 font-medium tracking-[0.25px] cursor-pointer transition-colors ${sizeStyles[size]} ${
              variant === 'line'
                ? `pb-3 ${isActive ? 'text-ds-text-primary' : 'text-ds-text-muted hover:text-ds-text-secondary'}`
                : variant === 'pill'
                ? `rounded-ds-full ${isActive ? 'text-ds-text-inverse' : 'text-ds-text-secondary hover:text-ds-text-primary'}`
                : `rounded-ds-md ${isActive ? 'text-ds-text-primary' : 'text-ds-text-muted hover:text-ds-text-secondary'}`
            }`}
            onClick={() => handleChange(item.id)}
          >
            {item.icon && <span className="w-4 h-4">{item.icon}</span>}
            {item.label}
            {item.badge !== undefined && (
              <span className="ml-1 min-w-[18px] h-[18px] flex items-center justify-center rounded-ds-full bg-ds-accent text-ds-black text-[10px] font-bold px-1">
                {item.badge}
              </span>
            )}
            {isActive && variant === 'line' && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-ds-text-primary rounded-full"
                layoutId="tab-indicator-line"
                transition={springs.snappy}
              />
            )}
            {isActive && variant === 'pill' && (
              <motion.div
                className="absolute inset-0 bg-ds-black dark:bg-ds-white rounded-ds-full -z-10"
                layoutId="tab-indicator-pill"
                transition={springs.snappy}
              />
            )}
            {isActive && variant === 'enclosed' && (
              <motion.div
                className="absolute inset-0 bg-ds-bg shadow-ds-sm rounded-ds-md -z-10"
                layoutId="tab-indicator-enclosed"
                transition={springs.snappy}
              />
            )}
          </button>
        )
      })}
    </div>
  )
}
