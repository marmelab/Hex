import { GameState } from "./gamestate";

function runGameLoop() {
    // 1.Initialize the game state
    // initialState = load it from a file
    // 2.Render the game state to screen
    // displayGameState(initialState);
    // let currentState = initialState;
    let continueGame = true;
    while (continueGame) {
        // 3.Take input from the user
        // let userAction = parse user input
        // 4. Update the game state from the input
        // currentState = updateGame(currentState, userAction)
        // 2.Render the game state to screen
        // displayGameState(currentState);
    }
}

function updateGame(previousState: GameState, action: "string"): GameState {
    // userAction could be a valid position, not in board or position with already a pawn on it
    return null;
}
