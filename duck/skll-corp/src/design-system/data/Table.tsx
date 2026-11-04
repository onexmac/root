import { useState } from 'react'
import { motion } from 'framer-motion'
import { springs } from '../motion/presets'

interface Column<T> {
  key: string
  label: string
  sortable?: boolean
  render?: (row: T) => React.ReactNode
}

interface TableProps<T> {
  columns: Column<T>[]
  data: T[]
  selectable?: boolean
  onRowClick?: (row: T) => void
  className?: string
}

export default function Table<T extends Record<string, unknown>>({
  columns,
  data,
  selectable = false,
  onRowClick,
  className = '',
}: TableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null)
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc')
  const [selected, setSelected] = useState<Set<number>>(new Set())

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc')
    } else {
      setSortKey(key)
      setSortDir('asc')
    }
  }

  const sorted = sortKey
    ? [...data].sort((a, b) => {
        const aVal = a[sortKey]
        const bVal = b[sortKey]
        const cmp = String(aVal).localeCompare(String(bVal))
        return sortDir === 'asc' ? cmp : -cmp
      })
    : data

  const toggleSelect = (i: number) => {
    setSelected((prev) => {
      const next = new Set(prev)
      next.has(i) ? next.delete(i) : next.add(i)
      return next
    })
  }

  return (
    <div className={`overflow-x-auto rounded-ds-lg border border-ds-border ${className}`}>
      <table className="w-full text-left">
        <thead>
          <tr className="bg-ds-surface">
            {selectable && (
              <th className="w-10 px-3 py-2.5">
                <input
                  type="checkbox"
                  className="accent-ds-accent"
                  checked={selected.size === data.length && data.length > 0}
                  onChange={() =>
                    setSelected(selected.size === data.length ? new Set() : new Set(data.map((_, i) => i)))
                  }
                />
              </th>
            )}
            {columns.map((col) => (
              <th
                key={col.key}
                className={`px-4 py-2.5 text-ds-xs font-semibold text-ds-text-muted uppercase tracking-[1px] ${
                  col.sortable ? 'cursor-pointer select-none hover:text-ds-text-primary' : ''
                }`}
                onClick={col.sortable ? () => handleSort(col.key) : undefined}
              >
                <span className="flex items-center gap-1">
                  {col.label}
                  {col.sortable && sortKey === col.key && (
                    <motion.svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      animate={{ rotate: sortDir === 'desc' ? 180 : 0 }}
                      transition={springs.snappy}
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </motion.svg>
                  )}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-ds-border">
          {sorted.map((row, i) => (
            <tr
              key={i}
              className={`transition-colors ${
                onRowClick ? 'cursor-pointer hover:bg-ds-surface' : ''
              } ${selected.has(i) ? 'bg-ds-accent/5' : ''}`}
              onClick={() => onRowClick?.(row)}
            >
              {selectable && (
                <td className="px-3 py-2.5" onClick={(e) => e.stopPropagation()}>
                  <input
                    type="checkbox"
                    className="accent-ds-accent"
                    checked={selected.has(i)}
                    onChange={() => toggleSelect(i)}
                  />
                </td>
              )}
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-2.5 text-ds-sm text-ds-text-primary tracking-[0.25px]">
                  {col.render ? col.render(row) : String(row[col.key] ?? '')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
