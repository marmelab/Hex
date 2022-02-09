import { createInterface } from "readline";
import { GameState } from "./gamestate";
import { UTF16_CODE_OF_LETTER_A, Coordinates } from "./utils";

export function getBoardCoordinatesFromUserInput(
  userCoordinates: string
): Coordinates {
  let x: number, y: number;
  if (userCoordinates.length < 2) {
    throw new Error(
      `Given coordinates is not compatible. Must be something like "H4"`
    );
  }
  if (/[A-Z]/.test(userCoordinates[0])) {
    x = userCoordinates[0].charCodeAt(0) - UTF16_CODE_OF_LETTER_A;
  } else {
    throw new Error(`Given character is not included in the range [A,Z]`);
  }
  y = parseInt(userCoordinates.slice(1, userCoordinates.length));
  if (y >= 0 && y <= 25) {
    return { x: x, y: y };
  } else {
    throw new Error(`Given number is not included in the range of [0,25]`);
  }
}

export function areCoordinatesValid(
  gameState: GameState,
  coordinates: Coordinates
): boolean {
  if (coordinates.y < 0 || coordinates.y >= gameState.board.length) {
    return false;
  }
  if (
    coordinates.x < 0 ||
    coordinates.x >= gameState.board[coordinates.y].length
  ) {
    return false;
  }
  return true;
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
