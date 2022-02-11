import { createGraphFromGameState, HexBoardGraph } from "./graph";
import { doesPathExist } from "./pathfinding";
import { Coordinates, deepCloneObject } from "./utils";

const DEFAULT_CELL_VALUE: Cell = { value: "empty" };

export interface GameState {
  board: Array<Array<Cell>>;
}

export interface Cell {
  value: "empty" | "black" | "white";
}

export type StoneColor = "black" | "white";

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

export function doesCellHaveStone(
  gameState: GameState,
  cell: Coordinates,
  stoneColor: StoneColor
): boolean {
  return gameState.board[cell.y][cell.x].value == stoneColor;
}

export function generateNewBoard(size: number): GameState {
  const newBoard = Array(size)
    .fill({})
    .map(() =>
      Array(size)
        .fill({})
        .map(() => deepCloneObject(DEFAULT_CELL_VALUE))
    );

  return { board: newBoard };
}

export function updateGameState(
  previousState: GameState,
  nextMove: { coordinates: Coordinates; stoneColor: StoneColor }
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
