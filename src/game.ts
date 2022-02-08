const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

export async function runGameLoop() {
  // 1.Initialize the game state
  // initialState = load it from a file
  // 2.Render the game state to screen
  // displayGameState(initialState);
  // let currentState = initialState;
  let continueGame = true;
  while (continueGame) {
    const userCoordinates = await askCellCoordinatesToUser();
    console.log(`Coordinates : ${userCoordinates}`);
    readline.close();
    continueGame = false;
    // 3.Take input from the user
    // prompt a msg to user and read user input
    // console.log
    // let userAction = parse user input
    // 4. Update the game state from the input
    // currentState = updateGame(currentState, userAction)
    // 2.Render the game state to screen
    // displayGameState(currentState);
  }
}

function askCellCoordinatesToUser(): Promise<string> {
  return new Promise((resolve) => {
    readline.question(
      "Where would you like to put you stone ?",
      (cellCoordinates) => resolve(cellCoordinates)
    );
  });
}

// function updateGame(previousState: GameState, action: "string"): GameState {
//     // userAction could be a valid position, not in board or position with already a pawn on it
//     return null;
// }

runGameLoop();
