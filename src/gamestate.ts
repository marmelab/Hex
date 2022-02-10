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
  return doesCellExist(gameState, cell) && doesCellHaveStone(gameState, cell, stoneColor);
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
  stoneColor: "black"
): boolean {
  return gameState.board[cell.y][cell.x].value == stoneColor;
}