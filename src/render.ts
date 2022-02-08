import { GameState, CellValue } from "./gamestate";

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
    let renderedRow = initialSpace;
    row.forEach((cell) => {
      const renderedCell =
        cell.value == CellValue.Black ? renderedBlackPawn : renderedNoPawn;
      renderedRow += renderedCell;
    });
    result += renderedRow;
    result += lineSeparatorCharacter;
  });
  return result;
}
