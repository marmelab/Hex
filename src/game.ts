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
