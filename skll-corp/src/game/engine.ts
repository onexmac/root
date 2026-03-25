import type { Tile, TileType, Quota } from './types';

export const GRID_ROWS = 8;
export const GRID_COLS = 6;
export const TILE_TYPES: TileType[] = ['email', 'chart', 'briefcase', 'clock', 'folder', 'gear'];

let tileIdCounter = 0;

function nextTileId(): string {
  tileIdCounter += 1;
  return `tile-${tileIdCounter}`;
}

function randomTileType(): TileType {
  return TILE_TYPES[Math.floor(Math.random() * TILE_TYPES.length)];
}

function createTile(row: number, col: number): Tile {
  return {
    id: nextTileId(),
    type: randomTileType(),
    row,
    col,
    value: 1,
    selected: false,
    matched: false,
  };
}

export function createGrid(): Tile[][] {
  const grid: Tile[][] = [];
  for (let r = 0; r < GRID_ROWS; r++) {
    const row: Tile[] = [];
    for (let c = 0; c < GRID_COLS; c++) {
      row.push(createTile(r, c));
    }
    grid.push(row);
  }
  return grid;
}

export function areAdjacent(a: Tile, b: Tile): boolean {
  const dr = Math.abs(a.row - b.row);
  const dc = Math.abs(a.col - b.col);
  // Allow diagonal adjacency for easier dragging
  return dr <= 1 && dc <= 1 && (dr + dc > 0);
}

export function isValidPath(path: Tile[]): boolean {
  if (path.length < 2) return false;

  const type = path[0].type;
  const seen = new Set<string>();

  for (let i = 0; i < path.length; i++) {
    const tile = path[i];

    // All tiles must be the same type
    if (tile.type !== type) return false;

    // No repeats
    const key = `${tile.row},${tile.col}`;
    if (seen.has(key)) return false;
    seen.add(key);

    // Each consecutive pair must be adjacent
    if (i > 0 && !areAdjacent(path[i - 1], tile)) return false;
  }

  return true;
}

export function calculateScore(path: Tile[]): number {
  // Value doubles per tile: 2 tiles = 4, 3 = 8, 4 = 16, etc.
  return Math.pow(2, path.length);
}

export function processMatch(grid: Tile[][], path: Tile[]): Tile[][] {
  // Deep clone the grid
  const newGrid: (Tile | null)[][] = grid.map((row) =>
    row.map((tile) => ({ ...tile }))
  );

  // Mark matched tiles as null
  for (const tile of path) {
    newGrid[tile.row][tile.col] = null;
  }

  // Apply gravity: for each column, drop tiles down
  for (let c = 0; c < GRID_COLS; c++) {
    // Collect non-null tiles from bottom to top
    const columnTiles: Tile[] = [];
    for (let r = GRID_ROWS - 1; r >= 0; r--) {
      if (newGrid[r][c] !== null) {
        columnTiles.push(newGrid[r][c]!);
      }
    }

    // Place tiles at the bottom of the column
    for (let r = GRID_ROWS - 1; r >= 0; r--) {
      const idx = GRID_ROWS - 1 - r;
      if (idx < columnTiles.length) {
        const tile = columnTiles[idx];
        tile.row = r;
        tile.col = c;
        tile.selected = false;
        tile.matched = false;
        newGrid[r][c] = tile;
      } else {
        // Fill empty spaces at the top with new tiles
        const fresh = createTile(r, c);
        newGrid[r][c] = fresh;
      }
    }
  }

  return newGrid as Tile[][];
}

export function generateQuotas(cycleNumber: number): Quota[] {
  const count = cycleNumber <= 2 ? 3 : 4;
  const shuffled = [...TILE_TYPES].sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, count);

  return selected.map((type) => ({
    type,
    required: 20 + cycleNumber * 15,
    current: 0,
    completed: false,
  }));
}

export function allQuotasMet(quotas: Quota[]): boolean {
  return quotas.length > 0 && quotas.every((q) => q.completed);
}

export function getComboLabel(chainLength: number): string | null {
  if (chainLength >= 6) return 'PARADIGM SHIFT';
  if (chainLength === 5) return 'OPTIMAL';
  if (chainLength === 4) return 'SYNERGY';
  if (chainLength === 3) return 'EFFICIENT';
  return null;
}

export function resetTileIdCounter(): void {
  tileIdCounter = 0;
}
