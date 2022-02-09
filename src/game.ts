import { GameState } from "./gamestate";
import { displayGameState } from "./render";
import { createInterface } from "readline";

const UTF16_CODE_OF_LETTER_A = 65;

export interface Coordinates {
  x: number;
  y: number;
}

export async function runGameLoop(initialGameState: GameState) {
  displayGameState(initialGameState);
  let currentState = initialGameState;
  let continueGame = true;
  while (continueGame) {
    const userInput = await askCellCoordinatesToUser();
    let isUserCoordinatesAreValid = false;
    while (!isUserCoordinatesAreValid) {
      try {
        const boardCoordinates = getBoardCoordinatesFromUserInput(userInput);
        currentState = updateGameState(currentState, boardCoordinates);
        isUserCoordinatesAreValid = true;
      } catch (error) {
        console.error(error.message);
      }
    }
    displayGameState(currentState);
  }
}

function askCellCoordinatesToUser(): Promise<string> {
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

function getBoardCoordinatesFromUserInput(
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
  actionCoordinates: Coordinates
): GameState {
  if (!areCoordinatesValid(previousState, actionCoordinates)) {
    throw new Error("Given coordinates are outside the scope of the board.");
  }
  if (
    previousState.board[actionCoordinates.y][actionCoordinates.x].value !==
    "empty"
  ) {
    throw new Error("A pawn is already set in the selected cell.");
  }
  const newGameState = { board: previousState.board };
  newGameState.board[actionCoordinates.y][actionCoordinates.x].value = "black";
  return newGameState;
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

// runGameLoop();
// console.log(mapFromUserInputToBoardCoordinates("A1"));
// console.log(mapFromUserInputToBoardCoordinates("A2"));
// console.log(mapFromUserInputToBoardCoordinates("C2"));

// console.log(mapFromUserInputToBoardCoordinates("e2"));
// console.log(mapFromUserInputToBoardCoordinates("eee2"));
// console.log(mapFromUserInputToBoardCoordinates("E200"));

// console.log(isCoordinatesInBoard(generateNewBoard(), 1, 1));
// console.log(isCoordinatesInBoard(generateNewBoard(), 4, 1));
// console.log(isCoordinatesInBoard(generateNewBoard(), 0, 4));
// console.log(isCoordinatesInBoard(generateNewBoard(), 4, 0));
