import {
  GameState,
  updateGameState,
  playerHasWon,
} from "./gameState";
import {
  askCellCoordinatesToUser,
  getBoardCoordinatesFromUserInput,
} from "./user";
import { displayGameState } from "./render";

export async function runGameLoop(initialGameState: GameState) {
  displayGameState(initialGameState);
  let currentState = initialGameState;
  let hasBlackWon = playerHasWon(currentState, "black");
  let hasWhiteWon = playerHasWon(currentState, "white");
  while (!hasBlackWon && !hasWhiteWon) {
    let areUserCoordinatesValid = false;
    while (!areUserCoordinatesValid) {
      try {
        const userInput = await askCellCoordinatesToUser(currentState.turn);
        const boardCoordinates = getBoardCoordinatesFromUserInput(userInput);
        currentState = updateGameState(currentState, boardCoordinates);
        areUserCoordinatesValid = true;
      } catch (error) {
        console.error(`${error.message} Please try again.`);
      }
    }
    displayGameState(currentState);
    hasBlackWon = playerHasWon(currentState, "black");
    hasWhiteWon = playerHasWon(currentState, "white");
  }
  console.log(`Player ${hasBlackWon ? "black" : "white"} has won the game!`);
}
