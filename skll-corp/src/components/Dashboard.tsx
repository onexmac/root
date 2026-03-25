import { useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useGameStore } from '../store/gameStore'
import Menu from './Menu'
import SkllAssistant from './SkllAssistant'
import GlitchText from './GlitchText'

export default function Dashboard() {
  const {
    menuActive,
    toggleMenu,
    startSession,
    score,
    stats,
    cycleNumber,
  } = useGameStore()

  const lastTapRef = useRef<number>(0)

  const handleTap = useCallback(() => {
    const now = Date.now()
    if (now - lastTapRef.current < 300) {
      toggleMenu()
      lastTapRef.current = 0
    } else {
      lastTapRef.current = now
    }
  }, [toggleMenu])

  const hasPlayed = (score ?? 0) > 0 || (stats?.packetsProcessed ?? 0) > 0

  return (
    <div
      className="relative min-h-screen overflow-hidden"
      style={{ background: 'var(--corp-bg)' }}
      onClick={handleTap}
      onTouchEnd={handleTap}
    >
      {/* Main Content */}
      <motion.div
        className="min-h-screen flex flex-col items-center justify-between px-6 pt-safe-top pb-safe-bottom"
        animate={{
          scale: menuActive ? 0.92 : 1,
          opacity: menuActive ? 0.4 : 1,
        }}
        transition={{ type: 'spring', stiffness: 260, damping: 26 }}
      >
        {/* Top Section */}
        <div className="flex flex-col items-center pt-16">
          <motion.h1
            className="font-mono text-4xl font-bold uppercase tracking-[0.3em]"
            style={{ color: 'var(--corp-text)' }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 22 }}
          >
            <GlitchText text="SKLL.CORP" />
          </motion.h1>

          <motion.span
            className="font-mono text-[10px] uppercase tracking-widest mt-2"
            style={{ color: 'var(--corp-muted)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            v0.1.0
          </motion.span>

          {/* Status Card */}
          <motion.div
            className="mt-8 flex items-center gap-3 px-5 py-3 rounded-sm border"
            style={{
              borderColor: 'var(--corp-border)',
              background: 'var(--corp-surface)',
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 240, damping: 24, delay: 0.2 }}
          >
            <motion.div
              className="w-2 h-2 rounded-full"
              style={{ background: 'var(--corp-accent)' }}
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
            <span className="font-mono text-xs uppercase tracking-widest" style={{ color: 'var(--corp-muted)' }}>
              Employee Status: Active
            </span>
          </motion.div>

          {/* Last Session Stats */}
          {hasPlayed && (
            <motion.div
              className="mt-6 w-full max-w-xs px-5 py-4 rounded-sm border"
              style={{
                borderColor: 'var(--corp-border)',
                background: 'var(--corp-surface)',
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 220, damping: 24, delay: 0.35 }}
            >
              <p className="font-mono text-[10px] uppercase tracking-widest mb-3" style={{ color: 'var(--corp-muted)' }}>
                Last Session Summary
              </p>
              <div className="space-y-2">
                <div className="flex justify-between font-mono text-xs">
                  <span style={{ color: 'var(--corp-muted)' }} className="uppercase tracking-wider">Score</span>
                  <span style={{ color: 'var(--corp-accent)' }}>{score ?? 0}</span>
                </div>
                <div className="flex justify-between font-mono text-xs">
                  <span style={{ color: 'var(--corp-muted)' }} className="uppercase tracking-wider">Packets</span>
                  <span style={{ color: 'var(--corp-text)' }}>{stats?.packetsProcessed ?? 0}</span>
                </div>
                <div className="flex justify-between font-mono text-xs">
                  <span style={{ color: 'var(--corp-muted)' }} className="uppercase tracking-wider">Cycle</span>
                  <span style={{ color: 'var(--corp-text)' }}>{cycleNumber ?? 0}</span>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Center: Clock In Button */}
        <motion.div
          className="flex-1 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 22, delay: 0.4 }}
        >
          <motion.button
            onClick={(e) => {
              e.stopPropagation()
              startSession()
            }}
            className="relative px-12 py-5 rounded-sm font-mono text-sm uppercase tracking-[0.25em] font-bold cursor-pointer select-none"
            style={{
              background: 'var(--corp-accent)',
              color: 'var(--corp-bg)',
              boxShadow: '0 0 30px color-mix(in srgb, var(--corp-accent) 25%, transparent)',
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          >
            Clock In
          </motion.button>
        </motion.div>

        {/* Bottom: SKLL Assistant */}
        <motion.div
          className="pb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 22, delay: 0.5 }}
        >
          <SkllAssistant emotion="idle" size={48} />
        </motion.div>

        <motion.p
          className="absolute bottom-4 left-0 right-0 text-center font-mono text-[9px] uppercase tracking-widest"
          style={{ color: 'var(--corp-muted)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          Double-tap anywhere to open menu
        </motion.p>
      </motion.div>

      <Menu />
    </div>
  )
}
