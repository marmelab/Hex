import { GameState, Cell } from "./gameState";

const SPACE_CHARACTER = " ";
const LINE_SEPARATOR_CHARACTER = "\n";
const RENDERED_BLACK_STONE = "⬢";
const RENDERED_WHITE_STONE = "W";
const RENDERED_NO_STONE = "⬡";

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
    .map((cell) => {
      switch (cell.value) {
        case "black":
          return RENDERED_BLACK_STONE;
        case "white":
          return RENDERED_WHITE_STONE;
        default:
          return RENDERED_NO_STONE;
      }
    })
    .reduce(
      (previousValue, currentValue) =>
        previousValue + SPACE_CHARACTER + currentValue,
      ""
    );
}
