import { getWinningPathIfExist } from './pathfinding';
import { getNextPlaySuggestion } from './prediction';
import { Coordinates, deepCloneObject } from './utils';

export const DEFAULT_BOARD_SIZE = 19;
const DEFAULT_CELL_VALUE: Cell = { value: 'empty' };
const NEW_GAME_STARTING_STONE_COLOR = 'white';

export type Board = Array<Array<Cell>>;

export interface GameState {
  board: Board;
  turn: StoneColor;
  winner: StoneColor | null;
  winningPath: Coordinates[] | null;
}

export interface Cell {
  value: 'empty' | 'black' | 'white';
}

export type StoneColor = 'black' | 'white';

export type ClosenessToGameEnd =
  | 'WON'
  | 'LOST'
  | 'ONE_MOVE_TO_WIN'
  | 'ONE_MOVE_TO_LOOSE'
  | 'UNDETERMINED';

export interface NextMoveHint {
  closenessToGameEnd: ClosenessToGameEnd;
  suggestedNextMove?: Coordinates;
}

export const BLACK_NODE_START = 'black-start';
export const BLACK_NODE_END = 'black-end';
export const WHITE_NODE_START = 'white-start';
export const WHITE_NODE_END = 'white-end';

export function getWinner(gameState: GameState): {
  winner: StoneColor;
  winningPath: Coordinates[];
} {
  const blackPlayerResult = playerHasWon(gameState, 'black');
  if (blackPlayerResult.hasWon) {
    return { winner: 'black', winningPath: blackPlayerResult.winningPath };
  }
  const whitePlayerResult = playerHasWon(gameState, 'white');
  if (whitePlayerResult.hasWon) {
    return { winner: 'white', winningPath: whitePlayerResult.winningPath };
  }
  return { winner: null, winningPath: null };
}

export function playerHasWon(
  gameState: GameState,
  stoneColor: StoneColor,
): { hasWon: boolean; winningPath: Coordinates[] } {
  return getWinningPathIfExist(gameState, stoneColor);
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
    winningPath: null,
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
    winningPath: null,
  };
  newGameState.board[nextMove.y][nextMove.x].value = previousState.turn;
  const getWinnerDataIfExist = getWinner(newGameState);
  newGameState.winner = getWinnerDataIfExist.winner;
  newGameState.winningPath = getWinnerDataIfExist.winningPath;
  return newGameState;
}

export function getNextMoveHint(
  state: GameState,
  player: StoneColor,
): NextMoveHint {
  // First, determine if game is already won
  if (state.winner) {
    return {
      closenessToGameEnd: player === state.winner ? 'WON' : 'LOST',
    };
  }
  // Else, try if the current player can win by playing one stone
  let winningMove = getWinningMoveIfAny(state, player);
  if (winningMove) {
    return {
      closenessToGameEnd: 'ONE_MOVE_TO_WIN',
      suggestedNextMove: winningMove,
    };
  }
  // Else, try if the opponent can win by playing one stone
  const opponent: StoneColor = player === 'black' ? 'white' : 'black';
  winningMove = getWinningMoveIfAny(state, opponent);
  if (winningMove) {
    return {
      closenessToGameEnd: 'ONE_MOVE_TO_LOOSE',
      suggestedNextMove: winningMove,
    };
  }
  // Otherwise, return undefined and get a advice for the next play
  return {
    closenessToGameEnd: 'UNDETERMINED',
    suggestedNextMove: getNextPlaySuggestion(state, player)
  };
}

function getWinningMoveIfAny(
  state: GameState,
  player: StoneColor,
): Coordinates {
  for (const [y, row] of state.board.entries()) {
    for (const [x, cell] of row.entries()) {
      if (cell.value === 'empty') {
        const attemptedGameState = deepCloneObject(state);
        attemptedGameState.board[y][x].value = player;
        if (playerHasWon(attemptedGameState, player).hasWon) {
          return { x, y };
        }
      }
    }
  }
  return null;
}
