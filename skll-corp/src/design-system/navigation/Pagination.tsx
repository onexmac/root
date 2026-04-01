import { motion } from 'framer-motion'
import { springs, gestures } from '../motion/presets'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange?: (page: number) => void
  variant?: 'simple' | 'numbered'
  className?: string
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  variant = 'numbered',
  className = '',
}: PaginationProps) {
  const getPages = () => {
    const pages: (number | '...')[] = []
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i)
    } else {
      pages.push(1)
      if (currentPage > 3) pages.push('...')
      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
        pages.push(i)
      }
      if (currentPage < totalPages - 2) pages.push('...')
      pages.push(totalPages)
    }
    return pages
  }

  const ArrowLeft = (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  )

  const ArrowRight = (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="9 6 15 12 9 18" />
    </svg>
  )

  if (variant === 'simple') {
    return (
      <div className={`flex items-center gap-4 ${className}`}>
        <motion.button
          className="flex items-center gap-1 text-ds-sm font-medium text-ds-text-secondary hover:text-ds-text-primary disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer tracking-[0.25px]"
          disabled={currentPage <= 1}
          onClick={() => onPageChange?.(currentPage - 1)}
          {...gestures.subtle}
        >
          {ArrowLeft} Previous
        </motion.button>
        <span className="text-ds-sm text-ds-text-muted tracking-[0.25px]">
          {currentPage} of {totalPages}
        </span>
        <motion.button
          className="flex items-center gap-1 text-ds-sm font-medium text-ds-text-secondary hover:text-ds-text-primary disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer tracking-[0.25px]"
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange?.(currentPage + 1)}
          {...gestures.subtle}
        >
          Next {ArrowRight}
        </motion.button>
      </div>
    )
  }

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <motion.button
        className="w-8 h-8 flex items-center justify-center rounded-ds-md text-ds-text-secondary hover:bg-ds-surface disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
        disabled={currentPage <= 1}
        onClick={() => onPageChange?.(currentPage - 1)}
        {...gestures.subtle}
      >
        {ArrowLeft}
      </motion.button>
      {getPages().map((page, i) =>
        page === '...' ? (
          <span key={`ellipsis-${i}`} className="w-8 h-8 flex items-center justify-center text-ds-text-muted text-ds-sm">
            ...
          </span>
        ) : (
          <motion.button
            key={page}
            className={`relative w-8 h-8 flex items-center justify-center rounded-ds-md text-ds-sm font-medium cursor-pointer tracking-[0.25px] ${
              currentPage === page
                ? 'text-ds-text-inverse'
                : 'text-ds-text-secondary hover:bg-ds-surface'
            }`}
            onClick={() => onPageChange?.(page)}
            {...gestures.subtle}
          >
            {currentPage === page && (
              <motion.div
                className="absolute inset-0 bg-ds-black dark:bg-ds-white rounded-ds-md -z-10"
                layoutId="pagination-active"
                transition={springs.snappy}
              />
            )}
            {page}
          </motion.button>
        )
      )}
      <motion.button
        className="w-8 h-8 flex items-center justify-center rounded-ds-md text-ds-text-secondary hover:bg-ds-surface disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange?.(currentPage + 1)}
        {...gestures.subtle}
      >
        {ArrowRight}
      </motion.button>
    </div>
  )
}
