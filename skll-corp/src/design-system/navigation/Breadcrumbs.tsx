import { motion } from 'framer-motion'
import { staggerContainer, staggerItem } from '../motion/presets'

interface BreadcrumbItem {
  label: string
  href?: string
  onClick?: () => void
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  separator?: 'slash' | 'chevron'
  maxItems?: number
  className?: string
}

const separatorIcons = {
  slash: <span className="text-ds-text-muted">/</span>,
  chevron: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-ds-text-muted">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  ),
}

export default function Breadcrumbs({
  items,
  separator = 'chevron',
  maxItems,
  className = '',
}: BreadcrumbsProps) {
  let displayItems = items
  let collapsed = false

  if (maxItems && items.length > maxItems) {
    const first = items[0]
    const last = items.slice(-(maxItems - 1))
    displayItems = [first, { label: '...' }, ...last]
    collapsed = true
  }

  return (
    <motion.nav
      className={`flex items-center gap-1.5 text-ds-sm ${className}`}
      variants={staggerContainer}
      initial="hidden"
      animate="show"
      aria-label="Breadcrumb"
    >
      {displayItems.map((item, i) => (
        <motion.span key={i} className="flex items-center gap-1.5" variants={staggerItem}>
          {i > 0 && separatorIcons[separator]}
          {item.href || item.onClick ? (
            <button
              className="text-ds-text-secondary hover:text-ds-text-primary transition-colors cursor-pointer tracking-[0.25px]"
              onClick={item.onClick}
            >
              {item.label}
            </button>
          ) : i === displayItems.length - 1 ? (
            <span className="text-ds-text-primary font-medium tracking-[0.25px]">{item.label}</span>
          ) : (
            <span className="text-ds-text-muted tracking-[0.25px]">{item.label}</span>
          )}
        </motion.span>
      ))}
    </motion.nav>
  )
}
