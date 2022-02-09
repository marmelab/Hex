import { createInterface } from "readline";
import { GameState } from "./gamestate";
import { UTF16_CODE_OF_LETTER_A, Coordinates } from "./utils";

export function getBoardCoordinatesFromUserInput(
  userInput: string
): Coordinates {
  const regexValidationUserInput = /^(A)([0-9]*)$/;
  if (!regexValidationUserInput.test(userInput)) {
    throw new Error(
      `Given coordinates aren't valid. Must be something like "H4"`
    );
  } else {
    const x = userInput[0].charCodeAt(0) - UTF16_CODE_OF_LETTER_A;
    const y = parseInt(userInput.slice(1, userInput.length));
    return { x, y };
  }
}

export function areCoordinatesValid(
  gameState: GameState,
  coordinates: Coordinates
): boolean {
  return (
    coordinates.y < gameState.board.length &&
    coordinates.x < gameState.board[coordinates.y].length
  );
}

export function askCellCoordinatesToUser(): Promise<string> {
  const readline = createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) => {
    readline.question(
      "Where would you like to put you stone ?",
      (cellCoordinates) => {
        readline.close();
        resolve(cellCoordinates);
      }
    );
  });
}
