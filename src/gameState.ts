import { createGraphFromGameState, HexBoardGraph } from "./graph";
import { doesPathExist } from "./pathfinding";
import { Coordinates } from "./utils";

export interface GameState {
  board: Array<Array<Cell>>;
  turn: StoneColor;
}

export interface Cell {
  value: "empty" | "black" | "white";
}

export type StoneColor = "black" | "white";

export function whoHasWon(
  gameState: GameState
): StoneColor {
  let stoneColor: StoneColor = "black";
  if (playerHasWon(gameState, stoneColor)) {
    return stoneColor;
  }
  stoneColor = "white";
  if (playerHasWon(gameState, stoneColor)) {
    return stoneColor;
  }
  return null;
}

export function someoneWon(
  gameState: GameState
): boolean {
  return !!whoHasWon(gameState);
}

export function playerHasWon(
  gameState: GameState,
  stoneColor: StoneColor
): boolean {
  const hexBoardGraph = createGraphFromGameState(gameState, stoneColor);
  return doesPathExistForPlayer(hexBoardGraph, stoneColor);
}

function doesPathExistForPlayer(
  hexBoardGraph: HexBoardGraph,
  stoneColor: StoneColor
): boolean {
  if (stoneColor == "black") {
    return doesPathExist(hexBoardGraph, "black-start", "black-end");
  } else {
    return doesPathExist(hexBoardGraph, "white-start", "white-end");
  }
}

export function doesCellExistAndHaveStone(
  gameState: GameState,
  cell: Coordinates,
  stoneColor: StoneColor
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
  stoneColor?: StoneColor
): boolean {
  if (stoneColor) {
    return gameState.board[cell.y][cell.x].value == stoneColor;
  } else {
    return gameState.board[cell.y][cell.x].value !== "empty";
  }
}

export function generateNewBoard(): GameState {
  return {
    turn: "white",
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
  const newTurn: StoneColor = previousState.turn == "white" ? "black" : "white";
  const newGameState = { board: previousState.board, turn: newTurn };
  newGameState.board[nextMove.y][nextMove.x].value = previousState.turn;
  return newGameState;
}
