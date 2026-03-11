export interface GuestbookEntry {
  id: string;
  name: string;
  message: string;
  created_at: string;
  liked: boolean;
}

export interface VibeVote {
  id: string;
  vibe_type: string;
  count: number;
  updated_at: string;
}

export interface PortfolioStats {
  id: string;
  likes: number;
  updated_at: string;
}

export interface SprayWall {
  id: string;
  canvas_data: string;
  created_at: string;
}
