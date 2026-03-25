import { motion } from 'framer-motion'
import { useThemeStore } from '../store/themeStore'

interface SettingsProps {
  onBack?: () => void
  isOpen?: boolean
}

function SettingsContent({ onBack }: { onBack?: () => void }) {
  const { theme, toggleTheme } = useThemeStore()
  const isDark = theme === 'dark'

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-corp-muted">
          System Preferences
        </h2>
        {onBack && (
          <button
            onClick={onBack}
            className="font-mono text-xs text-corp-muted hover:text-corp-accent transition-colors uppercase tracking-wider"
          >
            &larr; Back
          </button>
        )}
      </div>

      {/* Theme Toggle */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs uppercase tracking-wider text-corp-text">
            Interface: {isDark ? 'Dark' : 'Light'}
          </span>
          <button
            onClick={toggleTheme}
            className={`relative w-12 h-6 rounded-full transition-colors ${
              isDark ? 'bg-corp-accent' : 'bg-corp-border'
            }`}
          >
            <motion.div
              className="absolute top-1 left-1 w-4 h-4 rounded-full bg-white"
              animate={{ x: isDark ? 24 : 0 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          </button>
        </div>

        {/* About */}
        <div className="space-y-3 pt-6 border-t border-corp-border">
          <h3 className="font-mono text-[10px] uppercase tracking-widest text-corp-muted">
            About
          </h3>
          <div className="space-y-1.5">
            <p className="font-mono text-sm text-corp-text font-bold">
              SKLL.CORP v0.1.0
            </p>
            <p className="font-mono text-xs text-corp-muted">
              Enterprise Resource Processing Platform
            </p>
            <p className="font-mono text-xs text-corp-muted">
              &copy; 2026 SKLL Industries
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Settings({ onBack, isOpen = true }: SettingsProps) {
  if (!isOpen) return null
  return <SettingsContent onBack={onBack} />
}
