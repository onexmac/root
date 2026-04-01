import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { springs, transitions } from '../motion/presets'

interface SideNavItem {
  id: string
  label: string
  icon?: React.ReactNode
  badge?: number
  children?: SideNavItem[]
}

interface SideNavProps {
  items: SideNavItem[]
  activeId?: string
  onSelect?: (id: string) => void
  collapsed?: boolean
  className?: string
}

function NavItem({
  item,
  activeId,
  onSelect,
  collapsed,
  depth = 0,
}: {
  item: SideNavItem
  activeId?: string
  onSelect?: (id: string) => void
  collapsed?: boolean
  depth?: number
}) {
  const [expanded, setExpanded] = useState(false)
  const isActive = activeId === item.id
  const hasChildren = item.children && item.children.length > 0

  return (
    <div>
      <motion.button
        className={`w-full flex items-center gap-2.5 rounded-ds-lg cursor-pointer transition-colors ${
          collapsed ? 'justify-center p-2.5' : 'px-3 py-2'
        } ${
          isActive
            ? 'bg-ds-surface-elevated text-ds-text-primary font-medium'
            : 'text-ds-text-secondary hover:text-ds-text-primary hover:bg-ds-surface'
        }`}
        style={{ paddingLeft: collapsed ? undefined : `${12 + depth * 16}px` }}
        onClick={() => {
          if (hasChildren) setExpanded(!expanded)
          onSelect?.(item.id)
        }}
        whileTap={{ scale: 0.98 }}
        transition={springs.snappy}
      >
        {item.icon && <span className="w-5 h-5 flex-shrink-0">{item.icon}</span>}
        {!collapsed && (
          <>
            <span className="flex-1 text-left text-ds-sm tracking-[0.25px] truncate">{item.label}</span>
            {item.badge !== undefined && (
              <span className="min-w-[20px] h-5 flex items-center justify-center rounded-ds-full bg-ds-accent text-ds-black text-[10px] font-bold px-1">
                {item.badge}
              </span>
            )}
            {hasChildren && (
              <motion.svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="flex-shrink-0 text-ds-text-muted"
                animate={{ rotate: expanded ? 180 : 0 }}
                transition={springs.snappy}
              >
                <polyline points="6 9 12 15 18 9" />
              </motion.svg>
            )}
          </>
        )}
      </motion.button>
      {hasChildren && !collapsed && (
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={springs.smooth}
              className="overflow-hidden"
            >
              {item.children!.map((child) => (
                <NavItem
                  key={child.id}
                  item={child}
                  activeId={activeId}
                  onSelect={onSelect}
                  collapsed={collapsed}
                  depth={depth + 1}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  )
}

export default function SideNav({ items, activeId, onSelect, collapsed = false, className = '' }: SideNavProps) {
  return (
    <nav className={`flex flex-col gap-0.5 ${collapsed ? 'w-14' : 'w-56'} transition-all ${className}`}>
      {items.map((item) => (
        <NavItem key={item.id} item={item} activeId={activeId} onSelect={onSelect} collapsed={collapsed} />
      ))}
    </nav>
  )
}
