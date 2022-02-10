import { GameState, updateGameState, playerHasWon } from "./gameState";
import {
  askCellCoordinatesToUser,
  getBoardCoordinatesFromUserInput,
} from "./user";
import { displayGameState } from "./render";
import { Coordinates } from "./utils";
import * as blessed from "blessed";
import { renderBoardAndLoop } from "./gui";

export interface GameEvent {
  type: "click";
  coords: Coordinates;
}

export async function runGameLoop(initialGameState: GameState) {
  displayGameState(initialGameState);
  let currentState = initialGameState;
  while (!playerHasWon(currentState)) {
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
  console.log("Player has won the game!");
}

export function handleGameEvent(previousState: GameState, event: GameEvent) {
  switch (event.type) {
    case "click":
      updateGameState(previousState, event.coords);
      break;
    default:
      throw Error(`Invlid event recieved: ${event}`);
  }
}

export function startGameLoop(initialGameState: GameState, screen: blessed.Widgets.Screen) {
  renderBoardAndLoop(initialGameState, screen, handleGameEvent, playerHasWon);
}

