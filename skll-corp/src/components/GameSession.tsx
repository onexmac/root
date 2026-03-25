import { motion } from 'framer-motion';
import { useGameStore } from '../store/gameStore';
import HUD from './HUD';
import GameGrid from './GameGrid';

export default function GameSession() {
  const forceQuit = useGameStore((s) => s.forceQuit);

  const handleForceQuit = () => {
    if (
      window.confirm(
        'TERMINATE WORK SESSION?\n\nThis will trigger an immediate Performance Review.'
      )
    ) {
      forceQuit();
    }
  };

  return (
    <motion.div
      className="flex flex-col h-full w-full"
      style={{ background: 'var(--corp-bg)' }}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 28 }}
    >
      {/* Top: HUD */}
      <HUD />

      {/* Middle: Game Grid */}
      <div className="flex-1 flex items-center justify-center overflow-hidden px-1">
        <GameGrid />
      </div>

      {/* Bottom bar */}
      <div
        className="flex items-center justify-between border-t px-4 py-2.5"
        style={{
          background: 'var(--corp-surface)',
          borderColor: 'var(--corp-border)',
        }}
      >
        <div className="flex items-center gap-2">
          <span className="inline-block w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: 'var(--corp-accent)' }} />
          <span className="font-mono text-[9px] uppercase tracking-widest text-corp-muted">
            SESSION ACTIVE
          </span>
        </div>
        <button
          onClick={handleForceQuit}
          className="font-mono text-[9px] uppercase tracking-widest px-2.5 py-1 rounded border transition-colors"
          style={{
            borderColor: 'var(--corp-danger)',
            color: 'var(--corp-danger)',
          }}
        >
          QUIT
        </button>
      </div>
    </motion.div>
  );
}
