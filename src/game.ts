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
      console.log(`Board coordinates : ${boardCoordinates}`);
    } catch (error) {
      console.log(error.message);
    }
  }
  readline.close();
  // 4. Update the game state from the input
  // currentState = updateGame(currentState, userAction)
  // 2.Render the game state to screen
  // displayGameState(currentState);
}

function askCellCoordinatesToUser(): Promise<string> {
  return new Promise((resolve) => {
    readline.question(
      "Where would you like to put you stone ?",
      (cellCoordinates) => resolve(cellCoordinates)
    );
  });
}

function getBoardCoordinatesFromUserCoordinates(
  userCoordinates: string
): [number, number] {
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
    return [x, y];
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
