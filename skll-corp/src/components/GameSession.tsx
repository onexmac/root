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
      className="flex flex-col h-full w-full bg-corp-bg"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 28 }}
    >
      {/* Top: HUD */}
      <HUD />

      {/* Middle: Game Grid */}
      <div className="flex-1 flex items-center justify-center overflow-hidden px-2">
        <GameGrid />
      </div>

      {/* Bottom: Session info bar */}
      <div className="flex items-center justify-between bg-corp-surface/80 backdrop-blur-md border-t border-corp-border px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="font-mono text-[10px] uppercase tracking-widest text-corp-muted">
            SESSION ACTIVE
          </span>
        </div>
        <button
          onClick={handleForceQuit}
          className="font-mono text-[10px] uppercase tracking-widest px-3 py-1.5 rounded border border-red-500/40 text-red-400 hover:bg-red-500/10 hover:border-red-500/70 active:bg-red-500/20 transition-colors"
        >
          FORCE QUIT
        </button>
      </div>
    </motion.div>
  );
}
