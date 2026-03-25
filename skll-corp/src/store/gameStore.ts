import { create } from 'zustand';
import type { GameState, Tile, Quota, SessionStats, SkllEmotion } from '../game/types';
import {
  createGrid,
  areAdjacent,
  calculateScore,
  processMatch,
  generateQuotas,
  allQuotasMet,
  getComboLabel,
  resetTileIdCounter,
} from '../game/engine';

type Screen = 'loading' | 'dashboard' | 'session' | 'review';

interface GameStore {
  // State
  screen: Screen;
  gameState: GameState;
  grid: Tile[][];
  selectedPath: Tile[];
  quotas: Quota[];
  score: number;
  movesLeft: number;
  maxMoves: number;
  lives: number;
  cycleNumber: number;
  stats: SessionStats;
  comboLabel: string | null;
  skllEmotion: SkllEmotion;
  hasOnboarded: boolean;
  menuActive: boolean;

  // Actions
  setScreen: (screen: Screen) => void;
  startSession: () => void;
  selectTile: (tile: Tile) => void;
  confirmMatch: () => void;
  clearSelection: () => void;
  toggleMenu: () => void;
  completeOnboarding: () => void;
  forceQuit: () => void;
  resetComboLabel: () => void;
}

function getInitialOnboarded(): boolean {
  if (typeof localStorage !== 'undefined') {
    return localStorage.getItem('skll-onboarded') === 'true';
  }
  return false;
}

const initialStats: SessionStats = {
  packetsProcessed: 0,
  quotasMet: 0,
  syncBonuses: 0,
  efficiency: 0,
  cycleNumber: 1,
};

export const useGameStore = create<GameStore>((set, get) => ({
  screen: 'loading',
  gameState: 'idle',
  grid: [],
  selectedPath: [],
  quotas: [],
  score: 0,
  movesLeft: 20,
  maxMoves: 20,
  lives: 3,
  cycleNumber: 1,
  stats: { ...initialStats },
  comboLabel: null,
  skllEmotion: 'idle',
  hasOnboarded: getInitialOnboarded(),
  menuActive: false,

  setScreen: (screen) => set({ screen }),

  startSession: () => {
    resetTileIdCounter();
    const grid = createGrid();
    const quotas = generateQuotas(1);
    set({
      screen: 'session',
      gameState: 'active',
      grid,
      selectedPath: [],
      quotas,
      score: 0,
      movesLeft: 20,
      maxMoves: 20,
      lives: 3,
      cycleNumber: 1,
      stats: { ...initialStats },
      comboLabel: null,
      skllEmotion: 'greeting',
      menuActive: false,
    });
  },

  selectTile: (tile) => {
    const { selectedPath, grid } = get();

    // Get the actual tile from the grid to ensure we have current state
    const gridTile = grid[tile.row]?.[tile.col];
    if (!gridTile) return;

    if (selectedPath.length === 0) {
      // Start a new path
      set({
        selectedPath: [gridTile],
        grid: grid.map((row) =>
          row.map((t) =>
            t.id === gridTile.id ? { ...t, selected: true } : t
          )
        ),
      });
      return;
    }

    const lastTile = selectedPath[selectedPath.length - 1];

    // Check for backtracking: if tile is the second-to-last in path
    if (selectedPath.length >= 2) {
      const secondToLast = selectedPath[selectedPath.length - 2];
      if (gridTile.row === secondToLast.row && gridTile.col === secondToLast.col) {
        const newPath = selectedPath.slice(0, -1);
        set({
          selectedPath: newPath,
          grid: grid.map((row) =>
            row.map((t) =>
              t.id === lastTile.id ? { ...t, selected: false } : t
            )
          ),
        });
        return;
      }
    }

    // Must be same type as path
    if (gridTile.type !== selectedPath[0].type) return;

    // Must be adjacent to the last tile
    if (!areAdjacent(lastTile, gridTile)) return;

    // Must not already be in the path
    if (selectedPath.some((t) => t.id === gridTile.id)) return;

    set({
      selectedPath: [...selectedPath, gridTile],
      grid: grid.map((row) =>
        row.map((t) =>
          t.id === gridTile.id ? { ...t, selected: true } : t
        )
      ),
    });
  },

  confirmMatch: () => {
    const state = get();
    const { selectedPath, grid, quotas, score, movesLeft, lives, cycleNumber, stats } = state;

    if (selectedPath.length < 2) {
      // Clear selection if not enough tiles
      get().clearSelection();
      return;
    }

    const pathScore = calculateScore(selectedPath);
    const pathType = selectedPath[0].type;
    const chainLength = selectedPath.length;
    const combo = getComboLabel(chainLength);

    // Process the grid
    const newGrid = processMatch(grid, selectedPath);

    // Update quotas
    const newQuotas = quotas.map((q) => {
      if (q.type === pathType && !q.completed) {
        const newCurrent = q.current + pathScore;
        return {
          ...q,
          current: newCurrent,
          completed: newCurrent >= q.required,
        };
      }
      return q;
    });

    // Check if any quota just completed (for bonus moves)
    const justCompleted = newQuotas.some(
      (q, i) => q.completed && !quotas[i].completed
    );

    let newMovesLeft = movesLeft - 1;
    let newLives = lives;
    let newCycleNumber = cycleNumber;
    let newScore = score + pathScore;
    let newGameState: GameState = 'active';
    let newScreen: Screen = 'session';
    let emotion: SkllEmotion = 'idle';

    // Quota completion bonus: refill 5 moves
    if (justCompleted) {
      newMovesLeft += 5;
    }

    // Update stats
    const newStats: SessionStats = {
      ...stats,
      packetsProcessed: stats.packetsProcessed + 1,
      syncBonuses: combo ? stats.syncBonuses + 1 : stats.syncBonuses,
      cycleNumber: newCycleNumber,
    };

    // Check if all quotas are met -> next cycle
    if (allQuotasMet(newQuotas)) {
      newCycleNumber += 1;
      newLives += 1;
      newStats.quotasMet += 1;
      newStats.cycleNumber = newCycleNumber;
      // Generate new quotas for next cycle
      const nextQuotas = generateQuotas(newCycleNumber);
      set({
        grid: newGrid,
        selectedPath: [],
        quotas: nextQuotas,
        score: newScore,
        movesLeft: newMovesLeft,
        lives: newLives,
        cycleNumber: newCycleNumber,
        stats: newStats,
        comboLabel: combo,
        skllEmotion: 'impressed',
      });
      return;
    }

    // Check if moves ran out
    if (newMovesLeft <= 0) {
      newLives -= 1;
      if (newLives <= 0) {
        // Game over - performance review
        newGameState = 'review';
        newScreen = 'review';
        emotion = 'disappointed';
        newStats.efficiency =
          newStats.packetsProcessed > 0
            ? Math.round((newStats.quotasMet / newStats.packetsProcessed) * 100)
            : 0;
      } else {
        // Lose a life, refill moves
        newMovesLeft = 10;
        emotion = 'alert';
      }
    } else {
      // Set emotion based on combo
      if (chainLength >= 5) {
        emotion = 'impressed';
      } else if (chainLength >= 3) {
        emotion = 'approving';
      }
    }

    set({
      screen: newScreen,
      gameState: newGameState,
      grid: newGrid,
      selectedPath: [],
      quotas: newQuotas,
      score: newScore,
      movesLeft: newMovesLeft,
      lives: newLives,
      cycleNumber: newCycleNumber,
      stats: newStats,
      comboLabel: combo,
      skllEmotion: emotion,
    });
  },

  clearSelection: () => {
    const { grid } = get();
    set({
      selectedPath: [],
      grid: grid.map((row) =>
        row.map((t) => (t.selected ? { ...t, selected: false } : t))
      ),
    });
  },

  toggleMenu: () => set((s) => ({ menuActive: !s.menuActive })),

  completeOnboarding: () => {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('skll-onboarded', 'true');
    }
    set({ hasOnboarded: true, gameState: 'active' });
  },

  forceQuit: () => {
    const { stats } = get();
    const finalStats: SessionStats = {
      ...stats,
      efficiency:
        stats.packetsProcessed > 0
          ? Math.round((stats.quotasMet / stats.packetsProcessed) * 100)
          : 0,
    };
    set({
      screen: 'review',
      gameState: 'review',
      selectedPath: [],
      skllEmotion: 'disappointed',
      stats: finalStats,
      menuActive: false,
    });
  },

  resetComboLabel: () => set({ comboLabel: null }),
}));
