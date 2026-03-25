import { motion } from 'framer-motion';
import type { Tile } from '../game/types';
import { TILE_ICONS, TILE_COLORS } from '../game/icons';

interface GameTileProps {
  tile: Tile;
  isSelected: boolean;
  isInPath: boolean;
  pathIndex: number;
  onTileEnter: (tile: Tile) => void;
  onTileDown: (tile: Tile) => void;
}

const springTransition = { type: 'spring' as const, stiffness: 400, damping: 25 };

export default function GameTile({
  tile,
  isSelected,
  isInPath,
  pathIndex,
  onTileEnter,
  onTileDown,
}: GameTileProps) {
  const Icon = TILE_ICONS[tile.type];
  const color = TILE_COLORS[tile.type];
  const active = isSelected || isInPath;

  return (
    <motion.div
      layout
      transition={springTransition}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{
        opacity: tile.matched ? 0 : 1,
        scale: tile.matched ? 0 : active ? 1.08 : 1,
      }}
      exit={{ opacity: 0, scale: 0.4 }}
      onPointerDown={(e) => {
        e.preventDefault();
        onTileDown(tile);
      }}
      onPointerEnter={() => onTileEnter(tile)}
      className="relative aspect-square w-full rounded-lg border select-none cursor-pointer"
      style={{
        backgroundColor: active ? `${color}30` : `${color}12`,
        borderColor: active ? `${color}90` : `${color}25`,
        boxShadow: active
          ? `0 0 12px ${color}50, inset 0 0 8px ${color}15`
          : 'none',
        backdropFilter: active ? 'blur(8px)' : 'none',
        WebkitBackdropFilter: active ? 'blur(8px)' : 'none',
        touchAction: 'none',
      }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          style={{
            color,
            filter: active ? `drop-shadow(0 0 6px ${color})` : 'none',
          }}
        >
          <Icon size={28} />
        </div>
      </div>

      {/* Path index badge */}
      {isInPath && pathIndex >= 0 && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={springTransition}
          className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-mono font-bold"
          style={{
            backgroundColor: color,
            color: '#0a0a0f',
          }}
        >
          {pathIndex + 1}
        </motion.div>
      )}
    </motion.div>
  );
}
