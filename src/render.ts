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
  return gameState.board
    .map((row, index) => {
      return SPACE_CHARACTER.repeat(index) + getRenderedRow(row);
    })
    .reduce(
      (previousValue, currentValue) =>
        previousValue + currentValue + LINE_SEPARATOR_CHARACTER,
      ""
    );
}

function getRenderedRow(row: Cell[]): string {
  return row
    .map((cell) =>
      cell.value == CellValue.Black ? RENDERED_BLACK_PAWN : RENDERED_NO_PAWN
    )
    .reduce((previousValue, currentValue) => previousValue + currentValue, "");
}
