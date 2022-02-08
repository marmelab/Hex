import { GameState, CellValue, Cell } from "./gamestate";

const spaceCharacter = " ";
const lineSeparatorCharacter = "\n";
const renderedBlackPawn = "⬢";
const renderedNoPawn = "⬡";

export function displayGameState(gameState: GameState) {
  const renderedGameState = getRenderedGameState(gameState);
  console.log(renderedGameState);
}

export function getRenderedGameState(gameState: GameState): string {
  let result = "";
  gameState.board.forEach((row, index) => {
    const initialSpace = spaceCharacter.repeat(index);
    let renderedRow = initialSpace + getRenderedRow(row);
    result += renderedRow;
    result += lineSeparatorCharacter;
  });
  return result;
}

function getRenderedRow(row: Cell[]): string {
  let result = "";
  row.forEach((cell) => {
    const renderedCell =
      cell.value == CellValue.Black ? renderedBlackPawn : renderedNoPawn;
    result += renderedCell;
  });
  return result;
}
