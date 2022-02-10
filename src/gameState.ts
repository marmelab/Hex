import { createGraphFromGameState, HexBoardGraph } from "./graph";
import { doesPathExist } from "./pathfinding";
import { Coordinates } from "./utils";

export interface GameState {
  board: Array<Array<Cell>>;
}

export interface Cell {
  value: "empty" | "black" | "white";
}

export type stoneColor = "black" | "white";

export function playerHasWon(
  gameState: GameState,
  stoneColor: stoneColor
): boolean {
  const hexBoardGraph = createGraphFromGameState(gameState, stoneColor);
  return doesPathExistForPlayer(hexBoardGraph, stoneColor);
}

function doesPathExistForPlayer(
  hexBoardGraph: HexBoardGraph,
  stoneColor: stoneColor
): boolean {
  if (stoneColor == "black") {
    return !!doesPathExist(hexBoardGraph, "black-start", "black-end");
  } else {
    return !!doesPathExist(hexBoardGraph, "white-start", "white-end");
  }
}

export function doesCellExistAndHaveStone(
  gameState: GameState,
  cell: Coordinates,
  stoneColor: stoneColor
): boolean {
  return (
    doesCellExist(gameState, cell) &&
    doesCellHaveStone(gameState, cell, stoneColor)
  );
}

export function doesCellExist(
  gameState: GameState,
  cell: Coordinates
): boolean {
  if (cell.y < 0 || cell.y >= gameState.board.length) {
    return false;
  }
  if (cell.x < 0 || cell.x >= gameState.board[cell.y].length) {
    return false;
  }
  return true;
}

export function doesCellHaveStone(
  gameState: GameState,
  cell: Coordinates,
  stoneColor: stoneColor
): boolean {
  return gameState.board[cell.y][cell.x].value == stoneColor;
}
export function generateNewBoard(): GameState {
  return {
    board: [
      [
        { value: "empty" },
        { value: "empty" },
        { value: "empty" },
        { value: "empty" },
        { value: "empty" },
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
        { value: "empty" },
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
        { value: "empty" },
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
        { value: "empty" },
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
        { value: "empty" },
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
        { value: "empty" },
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
        { value: "empty" },
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
        { value: "empty" },
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
        { value: "empty" },
        { value: "empty" },
        { value: "empty" },
        { value: "empty" },
        { value: "empty" },
      ],
    ],
  };
}

export function updateGameState(
  previousState: GameState,
  nextMove: { coordinates: Coordinates; stoneColor: stoneColor }
): GameState {
  if (!doesCellExist(previousState, nextMove.coordinates)) {
    throw new Error("Given coordinates are outside the scope of the board.");
  }
  if (
    doesCellHaveStone(previousState, nextMove.coordinates, "black") ||
    doesCellHaveStone(previousState, nextMove.coordinates, "white")
  ) {
    throw new Error("A stone is already set in the selected cell.");
  }
  const newGameState = { board: previousState.board };
  newGameState.board[nextMove.coordinates.y][nextMove.coordinates.x].value =
    nextMove.stoneColor;
  return newGameState;
}
