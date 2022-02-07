export interface GameState {
  board: Array<Array<Cell>>;
}

export interface Cell {
  value: CellValue;
}

export enum CellValue {
  Empty,
  Black,
}
