import { useState, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { springs } from '../motion/presets'

interface SliderProps {
  value?: number
  min?: number
  max?: number
  step?: number
  onChange?: (value: number) => void
  label?: string
  showValue?: boolean
  disabled?: boolean
  className?: string
}

export default function Slider({
  value = 0,
  min = 0,
  max = 100,
  step = 1,
  onChange,
  label,
  showValue = false,
  disabled,
  className = '',
}: SliderProps) {
  const [dragging, setDragging] = useState(false)
  const trackRef = useRef<HTMLDivElement>(null)

  const percent = ((value - min) / (max - min)) * 100

  const handlePointer = useCallback((e: React.PointerEvent | PointerEvent) => {
    if (!trackRef.current || disabled) return
    const rect = trackRef.current.getBoundingClientRect()
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
    const raw = min + x * (max - min)
    const stepped = Math.round(raw / step) * step
    onChange?.(Math.max(min, Math.min(max, stepped)))
  }, [min, max, step, onChange, disabled])

  const handlePointerDown = (e: React.PointerEvent) => {
    setDragging(true)
    handlePointer(e)
    const onMove = (ev: PointerEvent) => handlePointer(ev)
    const onUp = () => {
      setDragging(false)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
    }
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
  }

  return (
    <div className={`flex flex-col gap-2 ${disabled ? 'opacity-40' : ''} ${className}`}>
      {(label || showValue) && (
        <div className="flex justify-between items-center">
          {label && <span className="text-ds-sm font-semibold text-ds-text-primary tracking-[0.4px]">{label}</span>}
          {showValue && <span className="text-ds-sm text-ds-text-secondary font-mono">{value}</span>}
        </div>
      )}
      <div
        ref={trackRef}
        className="relative h-6 flex items-center cursor-pointer touch-none"
        onPointerDown={handlePointerDown}
      >
        <div className="absolute w-full h-1.5 bg-ds-border rounded-full overflow-hidden">
          <motion.div
            className="absolute h-full bg-ds-black dark:bg-ds-white rounded-full"
            style={{ width: `${percent}%` }}
            layout
            transition={springs.snappy}
          />
        </div>
        <motion.div
          className="absolute w-5 h-5 bg-ds-black dark:bg-ds-white rounded-full shadow-ds-sm cursor-grab active:cursor-grabbing"
          style={{ left: `calc(${percent}% - 10px)` }}
          animate={{ scale: dragging ? 1.2 : 1 }}
          transition={springs.snappy}
        />
      </div>
    </div>
  )
}
