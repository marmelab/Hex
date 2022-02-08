import { GameState } from "./gamestate";
import { displayGameState } from "./render";

const UTF16_CODE_OF_LETTER_A = 65;

const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

export async function runGameLoop(initialGameState: GameState) {
  displayGameState(initialGameState);
  let currentState = initialGameState;
  let continueGame = true;
  while (continueGame) {
    const userCoordinates = await askCellCoordinatesToUser();
    try {
      const boardCoordinates =
                getBoardCoordinatesFromUserCoordinates(userCoordinates);
      currentState = updateGameState(currentState, boardCoordinates);
      displayGameState(currentState);
    } catch (error) {
      console.error(error.message);
    }
  }
  readline.close();
}

function askCellCoordinatesToUser(): Promise<string> {
  return new Promise((resolve) => {
    readline.question(
      "Where would you like to put you stone ?",
      (cellCoordinates) => resolve(cellCoordinates)
    );
  });
}

function getBoardCoordinatesFromUserCoordinates(userCoordinates: string): {
  x: number;
  y: number;
} {
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

export function generateNewBoard(): GameState {
  return {
    board: [
      [
        { value: "empty" },
        { value: "empty" },
        { value: "empty" },
        { value: "empty" },
      ],
      [
        { value: "empty" },
        { value: "empty" },
        { value: "empty" },
        { value: "empty" },
      ],
      [
        { value: "empty" },
        { value: "empty" },
        { value: "empty" },
        { value: "empty" },
      ],
      [
        { value: "empty" },
        { value: "empty" },
        { value: "empty" },
        { value: "empty" },
      ],
    ],
  };
}

function updateGameState(
  previousState: GameState,
  actionCoordinates: { x: number; y: number }
): GameState {
  if (!areCoordinatesValid(previousState, actionCoordinates)) {
    throw new Error("Given coordinates are outside the scope of the board.");
  }
  if (
    previousState.board[actionCoordinates[1]][actionCoordinates[0]].value !==
    "empty"
  ) {
    throw new Error("A pawn is already set in the selected cell.");
  }
  const newGameState = { board: previousState.board };
  newGameState.board[actionCoordinates[1]][actionCoordinates[0]].value =
    "black";
  return newGameState;
}

export function areCoordinatesValid(
  gameState: GameState,
  coordinates: { x: number; y: number }
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

