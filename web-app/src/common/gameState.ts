import { getWinningPathIfExist } from './pathfinding';
import { getMinimaxPlayPredictions, PlayPrediction } from './prediction';
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
  suggestedNextMoves?: PlayPrediction[];
}

export const BLACK_NODE_START = 'black-start';
export const BLACK_NODE_END = 'black-end';
export const WHITE_NODE_START = 'white-start';
export const WHITE_NODE_END = 'white-end';

export function getWinner(board: Board): {
  winner: StoneColor;
  winningPath: Coordinates[];
} {
  const blackPlayerResult = playerHasWon(board, 'black');
  if (blackPlayerResult.hasWon) {
    return { winner: 'black', winningPath: blackPlayerResult.winningPath };
  }
  const whitePlayerResult = playerHasWon(board, 'white');
  if (whitePlayerResult.hasWon) {
    return { winner: 'white', winningPath: whitePlayerResult.winningPath };
  }
  return { winner: null, winningPath: null };
}

export function playerHasWon(
  board: Board,
  stoneColor: StoneColor,
): { hasWon: boolean; winningPath: Coordinates[] } {
  return getWinningPathIfExist(board, stoneColor);
}

export function doesCellExistAndHaveStone(
  board: Board,
  cell: Coordinates,
  stoneColor: StoneColor,
): boolean {
  return doesCellExist(board, cell) && cellHasStone(board, cell, stoneColor);
}

export function doesCellExist(board: Board, cell: Coordinates): boolean {
  if (cell.y < 0 || cell.y >= board.length) {
    return false;
  }
  if (cell.x < 0 || cell.x >= board[cell.y].length) {
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
  board: Board,
  cell: Coordinates,
  stoneColor?: StoneColor,
): boolean {
  if (stoneColor) {
    return board[cell.y][cell.x].value == stoneColor;
  } else {
    return board[cell.y][cell.x].value !== 'empty';
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
  if (!doesCellExist(previousState.board, nextMove)) {
    throw new Error('Given coordinates are outside the scope of the board.');
  }
  if (cellHasStone(previousState.board, nextMove)) {
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
  const getWinnerDataIfExist = getWinner(newGameState.board);
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
  let winningMoves = getWinningMoves(state.board, player);
  if (winningMoves && winningMoves.length) {
    return {
      closenessToGameEnd: 'ONE_MOVE_TO_WIN',
      suggestedNextMoves: winningMoves,
    };
  }
  // Else, try if the opponent can win by playing one stone
  const opponent: StoneColor = player === 'black' ? 'white' : 'black';
  winningMoves = getWinningMoves(state.board, opponent);
  if (winningMoves && winningMoves.length) {
    return {
      closenessToGameEnd: 'ONE_MOVE_TO_LOOSE',
      suggestedNextMoves: winningMoves,
    };
  }
  // Otherwise, return undefined and get a advice for the next play
  return {
    closenessToGameEnd: 'UNDETERMINED',
    suggestedNextMoves: getMinimaxPlayPredictions(state.board, player, 2),
  };
}

function getWinningMoves(board: Board, player: StoneColor): PlayPrediction[] {
  const winningMoves: Coordinates[] = [];
  for (const [y, row] of board.entries()) {
    for (const [x, cell] of row.entries()) {
      if (cell.value === 'empty') {
        const attemptedBoard = deepCloneObject(board) as Board;
        attemptedBoard[y][x].value = player;
        if (playerHasWon(attemptedBoard, player).hasWon) {
          winningMoves.push({ x, y });
        }
      }
    }
  }
  return winningMoves.map((move) => {
    return {
      coordinates: move,
      opponentRemainingMovesToWin: undefined,
      playerRemainingMovesToWin: 1,
      score: 0,
    };
  });
}
