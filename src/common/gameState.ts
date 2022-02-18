import { createGraphFromGameState, HexBoardGraph } from './graph';
import { doesPathExist } from './pathfinding';
import { Coordinates, deepCloneObject } from './utils';

export const DEFAULT_BOARD_SIZE = 19;
const DEFAULT_CELL_VALUE: Cell = { value: 'empty' };
const NEW_GAME_STARTING_STONE_COLOR = 'white';

export interface GameState {
  board: Array<Array<Cell>>;
  turn: StoneColor;
  winner: StoneColor | null;
}

export interface Cell {
  value: 'empty' | 'black' | 'white';
}

export type StoneColor = 'black' | 'white';

const BLACK_NODE_START = 'black-start';
const BLACK_NODE_END = 'black-end';
const WHITE_NODE_START = 'white-start';
const WHITE_NODE_END = 'white-end';

export function getWinner(gameState: GameState): StoneColor {
  let stoneColor: StoneColor = 'black';
  if (playerHasWon(gameState, stoneColor)) {
    return stoneColor;
  }
  stoneColor = 'white';
  if (playerHasWon(gameState, stoneColor)) {
    return stoneColor;
  }
  return null;
}

export function playerHasWon(
  gameState: GameState,
  stoneColor: StoneColor,
): boolean {
  const hexBoardGraph = createGraphFromGameState(gameState, stoneColor);
  return stoneColor == 'black'
    ? doesPathExist(hexBoardGraph, BLACK_NODE_START, BLACK_NODE_END).hasWon
    : doesPathExist(hexBoardGraph, WHITE_NODE_START, WHITE_NODE_END).hasWon;
}

export function doesCellExistAndHaveStone(
  gameState: GameState,
  cell: Coordinates,
  stoneColor: StoneColor,
): boolean {
  return (
    doesCellExist(gameState, cell) && cellHasStone(gameState, cell, stoneColor)
  );
}

export function doesCellExist(
  gameState: GameState,
  cell: Coordinates,
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
export function cellHasStone(
  gameState: GameState,
  cell: Coordinates,
  stoneColor?: StoneColor,
): boolean {
  if (stoneColor) {
    return gameState.board[cell.y][cell.x].value == stoneColor;
  } else {
    return gameState.board[cell.y][cell.x].value !== 'empty';
  }
}

export function initNewGameState(size: number): GameState {
  const newBoard = Array(size)
    .fill({})
    .map(() =>
      Array(size)
        .fill({})
        .map(() => deepCloneObject(DEFAULT_CELL_VALUE)),
    );

  return {
    turn: NEW_GAME_STARTING_STONE_COLOR,
    board: newBoard,
    winner: null,
  };
}

export function updateGameState(
  previousState: GameState,
  nextMove: Coordinates,
): GameState {
  if (!doesCellExist(previousState, nextMove)) {
    throw new Error('Given coordinates are outside the scope of the board.');
  }
  if (cellHasStone(previousState, nextMove)) {
    throw new Error('A stone is already set in the selected cell.');
  }
  const newTurn: StoneColor = previousState.turn == 'white' ? 'black' : 'white';
  const newGameState = {
    board: deepCloneObject(previousState.board),
    turn: newTurn,
    winner: null,
  };
  newGameState.board[nextMove.y][nextMove.x].value = previousState.turn;
  newGameState.winner = getWinner(newGameState);
  return newGameState;
}
