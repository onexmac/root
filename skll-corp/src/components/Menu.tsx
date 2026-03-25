import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore } from '../store/gameStore'
import Settings from './Settings'

interface MenuItem {
  label: string
  action: string
  disabled: boolean
}

const menuItems: MenuItem[] = [
  { label: 'WORK SESSION', action: 'startSession', disabled: false },
  { label: 'PERFORMANCE LOG', action: 'performanceLog', disabled: true },
  { label: 'SYSTEM PREFERENCES', action: 'settings', disabled: false },
  { label: 'EMPLOYEE HANDBOOK', action: 'handbook', disabled: true },
]

const employeeId = String(Math.floor(100000 + Math.random() * 900000))

const itemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 24,
      delay: i * 0.08,
    },
  }),
  exit: {
    opacity: 0,
    y: 20,
    transition: { duration: 0.15 },
  },
}

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { type: 'spring', stiffness: 200, damping: 30 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
}

export default function Menu() {
  const { menuActive, toggleMenu, setScreen, startSession, cycleNumber } = useGameStore()
  const [showSettings, setShowSettings] = useState(false)

  const handleItemClick = useCallback(
    (item: MenuItem) => {
      if (item.disabled) return

      switch (item.action) {
        case 'startSession':
          toggleMenu()
          startSession()
          break
        case 'settings':
          setShowSettings(true)
          break
        default:
          break
      }
    },
    [toggleMenu, startSession]
  )

  const handleOverlayClick = useCallback(() => {
    if (showSettings) {
      setShowSettings(false)
      return
    }
    toggleMenu()
  }, [showSettings, toggleMenu])

  if (!menuActive) return null

  return (
    <AnimatePresence>
      {menuActive && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-xl"
            onClick={handleOverlayClick}
          />

          {/* Menu Content */}
          <motion.div
            className="relative z-10 w-full max-w-md px-8"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 25 }}
          >
            <AnimatePresence mode="wait">
              {showSettings ? (
                <motion.div
                  key="settings"
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                >
                  <Settings onBack={() => setShowSettings(false)} isOpen={true} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {/* Header */}
                  <motion.h2
                    className="font-mono text-xs uppercase tracking-[0.3em] text-neutral-500 mb-8"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  >
                    NAVIGATION TERMINAL
                  </motion.h2>

                  {/* Menu Items */}
                  <div className="flex flex-col gap-3">
                    {menuItems.map((item, i) => (
                      <motion.button
                        key={item.label}
                        custom={i}
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        onClick={() => handleItemClick(item)}
                        disabled={item.disabled}
                        className={`
                          group relative text-left font-mono text-sm uppercase tracking-widest
                          py-4 px-5 rounded-sm transition-colors
                          ${
                            item.disabled
                              ? 'opacity-30 cursor-not-allowed text-neutral-500'
                              : 'text-neutral-200 hover:text-white cursor-pointer'
                          }
                        `}
                        whileHover={
                          !item.disabled
                            ? { scale: 1.03, transition: { type: 'spring', stiffness: 400, damping: 20 } }
                            : undefined
                        }
                        whileTap={
                          !item.disabled
                            ? { scale: 0.97, transition: { type: 'spring', stiffness: 500, damping: 25 } }
                            : undefined
                        }
                      >
                        {/* Accent border on hover */}
                        <motion.div
                          className="absolute left-0 top-0 bottom-0 w-[3px] bg-accent rounded-full"
                          initial={{ scaleY: 0 }}
                          whileHover={!item.disabled ? { scaleY: 1 } : undefined}
                          transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                          style={{ originY: 0.5 }}
                        />
                        {item.label}
                        {item.disabled && (
                          <span className="ml-3 text-[10px] tracking-normal opacity-60">
                            [LOCKED]
                          </span>
                        )}
                      </motion.button>
                    ))}
                  </div>

                  {/* Status Line */}
                  <motion.div
                    className="mt-10 pt-4 border-t border-neutral-800 font-mono text-[10px] uppercase tracking-widest text-neutral-600"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, type: 'spring', stiffness: 200, damping: 25 }}
                  >
                    EMPLOYEE #{employeeId} | CLEARANCE: LEVEL {cycleNumber ?? 1}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
