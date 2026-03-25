export type TileType = 'email' | 'chart' | 'briefcase' | 'clock' | 'folder' | 'gear';

export interface Tile {
  id: string;
  type: TileType;
  row: number;
  col: number;
  value: number;
  selected: boolean;
  matched: boolean;
}

export interface Quota {
  type: TileType;
  required: number;
  current: number;
  completed: boolean;
}

export type GameState = 'idle' | 'onboarding' | 'active' | 'paused' | 'review';

export interface SessionStats {
  packetsProcessed: number;
  quotasMet: number;
  syncBonuses: number;
  efficiency: number;
  cycleNumber: number;
}

export type SkllEmotion = 'idle' | 'greeting' | 'approving' | 'impressed' | 'disappointed' | 'alert';
