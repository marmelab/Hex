export const DEFAULT_CELL_COLOR = "black";
export const PLAYER_1_CELL_COLOR = "#0AB2FF";
export const PLAYER_2_CELL_COLOR = "#FF1734";

export type RenderedCellType = "player1Border" | "player2Border" | "playable";

export interface Coordinates {
  x: number;
  y: number;
}

export interface GameState {
  board: Array<Array<Cell>>;
  turn: StoneColor;
  winner: StoneColor | null;
  winningPath: Coordinates[] | null;
}

export interface Cell {
  value: 'empty' | 'black' | 'white';
}

export type StoneColor = 'black' | 'white';

export interface Game {
  id: number;
  player1: User;
  player2: User;
  state: GameState;
}

export interface User {
  id: number;
  username: string;
}
