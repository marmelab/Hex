import { createGraphFromGameState, HexBoardGraph } from "./graph";
import { doesPathExist } from "./pathfinding";
import { Coordinates } from "./utils";

export interface GameState {
  board: Array<Array<Cell>>;
}

export interface Cell {
  value: "empty" | "black";
}

export function playerHasWon(gameState: GameState): boolean {
  const hexBoardGraph = createGraphFromGameState(gameState);
  return doesPathExistForPlayer(hexBoardGraph);
}

function doesPathExistForPlayer(hexBoardGraph: HexBoardGraph): boolean {
  const pathBlack = doesPathExist(hexBoardGraph, "black-start", "black-end");
  const pathWhite = doesPathExist(hexBoardGraph, "white-start", "white-end");

  return !!(pathBlack || pathWhite);
}

export function doesCellExistAndHaveStone(
  gameState: GameState,
  cell: Coordinates,
  stoneColor: "black"
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

/**
 * Returns true if a given cell has a stone placed on it.
 * If a `stoneColor` is defined, this function will return true only if the cell
 * has a stone on it and this stone is of the given color.
 */
export function doesCellHaveStone(
  gameState: GameState,
  cell: Coordinates,
  stoneColor?: "black"
): boolean {
  if (stoneColor) {
    return gameState.board[cell.y][cell.x].value == stoneColor;
  } else {
    return gameState.board[cell.y][cell.x].value !== "empty";
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
  nextMove: Coordinates
): GameState {
  if (!doesCellExist(previousState, nextMove)) {
    throw new Error("Given coordinates are outside the scope of the board.");
  }
  if (doesCellHaveStone(previousState, nextMove)) {
    throw new Error("A stone is already set in the selected cell.");
  }
  const newGameState = { board: previousState.board };
  newGameState.board[nextMove.y][nextMove.x].value = "black";
  return newGameState;
}
