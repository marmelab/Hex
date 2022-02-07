import { GameState, CellValue } from "./gamestate";

export function displayGameState(gameState: GameState) {
  const renderedGameState = getRenderedGameState(gameState);
  console.log(renderedGameState);
}

export function getRenderedGameState(gameState: GameState): string {
  const spaceCharacter = " ";
  const lineSeparatorCharacter = "\n";

  let result = "";
  gameState.board.forEach((row, index) => {
    const initialSpace = spaceCharacter.repeat(index);
    let renderedRow = initialSpace;
    row.forEach((cell) => {
      const renderedCell = cell.value == CellValue.Black ? "⬢" : "⬡";
      renderedRow += renderedCell;
    });
    result += renderedRow;
    result += lineSeparatorCharacter;
  });
  return result;
}
