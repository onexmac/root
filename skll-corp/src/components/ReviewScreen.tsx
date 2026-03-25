import { motion } from 'framer-motion'
import { useGameStore } from '../store/gameStore'
import GlitchText from './GlitchText'
import SkllAssistant from './SkllAssistant'

interface StatRow {
  label: string
  value: string | number
  accent?: boolean
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
}

const rowVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 25,
    },
  },
}

const buttonVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 25,
    },
  },
}

export default function ReviewScreen() {
  const { score, cycleNumber, stats, startSession, setScreen } = useGameStore()

  const statRows: StatRow[] = [
    { label: 'PACKETS PROCESSED', value: stats?.packetsProcessed ?? 0 },
    { label: 'QUOTAS FULFILLED', value: stats?.quotasMet ?? 0 },
    { label: 'SYNERGY BONUSES', value: stats?.syncBonuses ?? 0 },
    { label: 'PEAK EFFICIENCY', value: `${stats?.efficiency ?? 0}%` },
    { label: 'CYCLES COMPLETED', value: cycleNumber ?? 0 },
    { label: 'FINAL SCORE', value: score ?? 0, accent: true },
  ]

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
      {/* Header */}
      <motion.div
        className="mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 25 }}
      >
        <h1 className="font-mono text-2xl uppercase tracking-[0.25em] text-neutral-200">
          <GlitchText text="PERFORMANCE REVIEW" />
        </h1>
      </motion.div>

      {/* SKLL Assistant */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 240, damping: 22, delay: 0.15 }}
      >
        <SkllAssistant emotion="disappointed" size={80} />
        <p className="font-mono text-xs text-corp-muted uppercase tracking-wider mt-2">
          Your productivity metrics have been flagged for review.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        className="w-full max-w-sm space-y-1"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {statRows.map((row) => (
          <motion.div
            key={row.label}
            variants={rowVariants}
            className={`
              flex items-center justify-between py-3 px-4 rounded-sm
              font-mono text-xs uppercase tracking-widest
              ${row.accent
                ? 'bg-accent/10 border border-accent/30'
                : 'border-b border-neutral-800/50'
              }
            `}
          >
            <span className="text-neutral-500">{row.label}</span>
            <span
              className={`
                ${row.accent
                  ? 'text-accent text-lg font-bold tracking-wider'
                  : 'text-neutral-200'
                }
              `}
            >
              {row.value}
            </span>
          </motion.div>
        ))}
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        className="flex gap-4 mt-10 w-full max-w-sm"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.button
          variants={buttonVariants}
          onClick={() => startSession()}
          className="
            flex-1 py-4 px-6 rounded-sm
            bg-accent text-black font-mono text-xs uppercase tracking-widest font-bold
            transition-colors hover:bg-accent/90
            cursor-pointer
          "
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        >
          RE-APPLY
        </motion.button>

        <motion.button
          variants={buttonVariants}
          onClick={() => setScreen('dashboard')}
          className="
            flex-1 py-4 px-6 rounded-sm
            border border-neutral-700 text-neutral-400 font-mono text-xs uppercase tracking-widest
            hover:border-neutral-500 hover:text-neutral-300 transition-colors
            cursor-pointer
          "
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        >
          RESIGN
        </motion.button>
      </motion.div>
    </div>
  )
}
