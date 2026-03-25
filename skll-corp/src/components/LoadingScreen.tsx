import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface LoadingScreenProps {
  onComplete: () => void
}

const bootLines = [
  'Loading protocols...',
  'Establishing secure connection...',
  'Calibrating productivity metrics...',
  'System ready.',
]

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [dots, setDots] = useState('')
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const dotInterval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? '' : prev + '.'))
    }, 400)

    const completeTimer = setTimeout(() => {
      clearInterval(dotInterval)
      setVisible(false)
      setTimeout(onComplete, 400)
    }, 2500)

    return () => {
      clearInterval(dotInterval)
      clearTimeout(completeTimer)
    }
  }, [onComplete])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <motion.h1
            className="font-mono text-5xl font-bold tracking-widest text-corp-accent mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            SKLL.CORP
          </motion.h1>

          <motion.p
            className="font-mono text-xs text-corp-muted uppercase tracking-wider mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            INITIALIZING WORKFORCE MANAGEMENT SYSTEM{dots}
          </motion.p>

          <div className="w-80 space-y-1.5 font-mono text-xs">
            {bootLines.map((line, i) => (
              <motion.div
                key={i}
                className={`${
                  i === bootLines.length - 1
                    ? 'text-corp-accent font-bold'
                    : 'text-corp-muted'
                }`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: 0.6 + i * 0.45,
                  duration: 0.3,
                }}
              >
                <span className="text-corp-accent mr-2">&gt;</span>
                {line}
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
