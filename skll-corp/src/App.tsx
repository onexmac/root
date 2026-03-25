import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useGameStore } from './store/gameStore'
import { useThemeStore } from './store/themeStore'
import NoiseOverlay from './components/NoiseOverlay'
import LoadingScreen from './components/LoadingScreen'
import Dashboard from './components/Dashboard'
import GameSession from './components/GameSession'
import ReviewScreen from './components/ReviewScreen'
import Onboarding from './components/Onboarding'

const screenTransition = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: {
    opacity: [1, 0.6, 0],
    y: -8,
    transition: {
      duration: 0.25,
      opacity: {
        times: [0, 0.15, 1],
        duration: 0.3,
      },
    },
  },
  transition: {
    type: 'spring',
    stiffness: 260,
    damping: 25,
  },
}

function ScreenWrapper({ children, screenKey }: { children: React.ReactNode; screenKey: string }) {
  return (
    <motion.div
      key={screenKey}
      initial={screenTransition.initial}
      animate={screenTransition.animate}
      exit={screenTransition.exit}
      transition={screenTransition.transition}
      className="w-full h-full"
    >
      {children}
    </motion.div>
  )
}

export default function App() {
  const { screen, hasOnboarded } = useGameStore()
  const theme = useThemeStore()
  const [loading, setLoading] = useState(true)

  // Initialize theme on mount
  useEffect(() => {
    document.documentElement.classList.add('dark')
  }, [])

  // Prevent context menu and double-tap zoom
  useEffect(() => {
    const preventContextMenu = (e: Event) => e.preventDefault()
    const preventDoubleTapZoom = (e: TouchEvent) => {
      if (e.touches.length > 1) {
        e.preventDefault()
      }
    }

    document.addEventListener('contextmenu', preventContextMenu)
    document.addEventListener('touchstart', preventDoubleTapZoom, { passive: false })

    // Prevent iOS bounce scroll
    document.body.style.overscrollBehavior = 'none'
    document.body.style.overflow = 'hidden'
    document.body.style.position = 'fixed'
    document.body.style.width = '100%'
    document.body.style.height = '100%'

    // Prevent double-tap zoom via touch-action CSS
    document.body.style.touchAction = 'manipulation'

    return () => {
      document.removeEventListener('contextmenu', preventContextMenu)
      document.removeEventListener('touchstart', preventDoubleTapZoom)
    }
  }, [])

  const handleLoadingComplete = () => {
    setLoading(false)
  }

  const renderScreen = () => {
    if (!hasOnboarded) {
      return (
        <ScreenWrapper screenKey="onboarding">
          <Onboarding onComplete={() => useGameStore.getState().completeOnboarding()} />
        </ScreenWrapper>
      )
    }

    switch (screen) {
      case 'session':
        return (
          <ScreenWrapper screenKey="session">
            <GameSession />
          </ScreenWrapper>
        )
      case 'review':
        return (
          <ScreenWrapper screenKey="review">
            <ReviewScreen />
          </ScreenWrapper>
        )
      case 'dashboard':
      default:
        return (
          <ScreenWrapper screenKey="dashboard">
            <Dashboard />
          </ScreenWrapper>
        )
    }
  }

  return (
    <div className="relative w-screen h-screen bg-neutral-950 text-neutral-100 overflow-hidden select-none">
      <AnimatePresence mode="wait">
        {loading ? (
          <ScreenWrapper screenKey="loading">
            <LoadingScreen onComplete={handleLoadingComplete} />
          </ScreenWrapper>
        ) : (
          renderScreen()
        )}
      </AnimatePresence>

      {/* Noise overlay always on top */}
      <NoiseOverlay />
    </div>
  )
}
