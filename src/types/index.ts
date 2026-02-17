export type TileStatus = 'correct' | 'present' | 'absent' | 'empty' | 'active';

export interface GuessChar {
  char: string;
  status: TileStatus;
}

export interface GuessRow {
  chars: GuessChar[];
}

export interface UmaMusume {
  id: string;
  name: string;
}

export type GameStatus = 'playing' | 'won' | 'lost';

export interface GameState {
  answer: string;
  guesses: GuessRow[];
  status: GameStatus;
  maxGuesses: number;
}
