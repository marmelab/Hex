interface GameState {
  board: Array<Array<Cell>>;
}

interface Cell {
  value: CellValue;
}

enum CellValue {
  Empty,
  Black,
}
