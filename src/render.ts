import { GameState, CellValue, Cell } from "./gamestate";

const SPACE_CHARACTER = " ";
const LINE_SEPARATOR_CHARACTER = "\n";
const RENDERED_BLACK_PAWN = "⬢";
const RENDERED_NO_PAWN = "⬡";

export function displayGameState(gameState: GameState) {
  const renderedGameState = getRenderedGameState(gameState);
  console.log(renderedGameState);
}

export function getRenderedGameState(gameState: GameState): string {
  let result = "";
  gameState.board.forEach((row, index) => {
    const initialSpace = SPACE_CHARACTER.repeat(index);
    let renderedRow = initialSpace + getRenderedRow(row);
    result += renderedRow;
    result += LINE_SEPARATOR_CHARACTER;
  });
  return result;
}

function getRenderedRow(row: Cell[]): string {
  let result = "";
  row.forEach((cell) => {
    const renderedCell =
      cell.value == CellValue.Black ? RENDERED_BLACK_PAWN : RENDERED_NO_PAWN;
    result += renderedCell;
  });
  return result;
}
