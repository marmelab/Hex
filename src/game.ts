import { GameState, updateGameState } from "./gamestate";
import {
  askCellCoordinatesToUser,
  getBoardCoordinatesFromUserInput,
} from "./user";
import { displayGameState } from "./render";

export async function runGameLoop(initialGameState: GameState) {
  displayGameState(initialGameState);
  let currentState = initialGameState;
  let continueGame = true;
  while (continueGame) {
    let areUserCoordinatesValid = false;
    while (!areUserCoordinatesValid) {
      try {
        const userInput = await askCellCoordinatesToUser();
        const boardCoordinates = getBoardCoordinatesFromUserInput(userInput);
        currentState = updateGameState(currentState, boardCoordinates);
        areUserCoordinatesValid = true;
      } catch (error) {
        console.error(`${error.message} Please try again.`);
      }
    }
    displayGameState(currentState);
  }
}
