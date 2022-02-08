export interface GameState {
  board: Array<Array<Cell>>;
}

export interface Cell {
  value: "empty" | "black";
}
