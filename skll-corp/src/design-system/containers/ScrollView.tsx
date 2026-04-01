import { useRef, useState, useEffect } from 'react'

interface ScrollViewProps {
  children: React.ReactNode
  fadeEdges?: boolean
  maxHeight?: string
  className?: string
}

export default function ScrollView({ children, fadeEdges = true, maxHeight = '400px', className = '' }: ScrollViewProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [atTop, setAtTop] = useState(true)
  const [atBottom, setAtBottom] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onScroll = () => {
      setAtTop(el.scrollTop <= 1)
      setAtBottom(el.scrollTop + el.clientHeight >= el.scrollHeight - 1)
    }
    onScroll()
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className={`relative ${className}`}>
      {fadeEdges && !atTop && (
        <div className="absolute top-0 left-0 right-0 h-6 bg-gradient-to-b from-ds-bg to-transparent z-10 pointer-events-none" />
      )}
      <div
        ref={ref}
        className="overflow-y-auto"
        style={{ maxHeight }}
      >
        {children}
      </div>
      {fadeEdges && !atBottom && (
        <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-ds-bg to-transparent z-10 pointer-events-none" />
      )}
    </div>
  )
}
