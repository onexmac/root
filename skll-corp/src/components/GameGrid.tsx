import { useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../store/gameStore';
import { GRID_ROWS, GRID_COLS } from '../game/engine';
import { TILE_COLORS } from '../game/icons';
import GameTile from './GameTile';

export default function GameGrid() {
  const grid = useGameStore((s) => s.grid);
  const selectedPath = useGameStore((s) => s.selectedPath);
  const selectTile = useGameStore((s) => s.selectTile);
  const confirmMatch = useGameStore((s) => s.confirmMatch);
  const clearSelection = useGameStore((s) => s.clearSelection);

  const gridRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  // Build a set of selected tile IDs for quick lookup
  const selectedIds = useMemo(() => {
    const set = new Set<string>();
    selectedPath.forEach((t) => set.add(t.id));
    return set;
  }, [selectedPath]);

  // Map tile id -> path index
  const pathIndexMap = useMemo(() => {
    const map = new Map<string, number>();
    selectedPath.forEach((t, i) => map.set(t.id, i));
    return map;
  }, [selectedPath]);

  const handleTileDown = useCallback(
    (tile: typeof grid[0][0]) => {
      isDragging.current = true;
      selectTile(tile);
    },
    [selectTile]
  );

  const handleTileEnter = useCallback(
    (tile: typeof grid[0][0]) => {
      if (!isDragging.current) return;
      selectTile(tile);
    },
    [selectTile]
  );

  const handlePointerUp = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;
    if (selectedPath.length >= 2) {
      confirmMatch();
    } else {
      clearSelection();
    }
  }, [confirmMatch, clearSelection, selectedPath.length]);

  // Calculate SVG path line connecting selected tile centers
  const pathLine = useMemo(() => {
    if (selectedPath.length < 2 || !gridRef.current) return null;

    const gridEl = gridRef.current;
    const gridRect = gridEl.getBoundingClientRect();
    const gap = 6; // gap-1.5 = 6px
    const cellWidth = (gridRect.width - gap * (GRID_COLS - 1)) / GRID_COLS;
    const cellHeight = (gridRect.height - gap * (GRID_ROWS - 1)) / GRID_ROWS;

    const points = selectedPath.map((tile) => ({
      x: tile.col * (cellWidth + gap) + cellWidth / 2,
      y: tile.row * (cellHeight + gap) + cellHeight / 2,
    }));

    const d = points
      .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`)
      .join(' ');

    return {
      d,
      color: TILE_COLORS[selectedPath[0].type],
    };
  }, [selectedPath]);

  // Flatten grid for rendering
  const tiles = useMemo(() => {
    const flat: typeof grid[0][0][] = [];
    for (let r = 0; r < grid.length; r++) {
      for (let c = 0; c < (grid[r]?.length ?? 0); c++) {
        if (grid[r][c]) flat.push(grid[r][c]);
      }
    }
    return flat;
  }, [grid]);

  return (
    <div
      className="relative w-full max-w-sm mx-auto"
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      onPointerCancel={handlePointerUp}
      style={{ touchAction: 'none' }}
    >
      {/* SVG overlay for path line */}
      {pathLine && (
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-10"
          style={{ overflow: 'visible', padding: '8px' }}
        >
          <motion.path
            d={pathLine.d}
            stroke={pathLine.color}
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            style={{
              filter: `drop-shadow(0 0 6px ${pathLine.color})`,
            }}
          />
        </svg>
      )}

      {/* Grid */}
      <div
        ref={gridRef}
        className="grid gap-1.5 p-2"
        style={{
          gridTemplateColumns: `repeat(${GRID_COLS}, 1fr)`,
          gridTemplateRows: `repeat(${GRID_ROWS}, 1fr)`,
        }}
        onContextMenu={(e) => e.preventDefault()}
      >
        <AnimatePresence mode="popLayout">
          {tiles.map((tile) => (
            <motion.div
              key={tile.id}
              layout
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
            >
              <GameTile
                tile={tile}
                isSelected={selectedIds.has(tile.id)}
                isInPath={selectedIds.has(tile.id)}
                pathIndex={pathIndexMap.get(tile.id) ?? -1}
                onTileDown={handleTileDown}
                onTileEnter={handleTileEnter}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
