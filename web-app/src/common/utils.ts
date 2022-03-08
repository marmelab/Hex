import { Cell, GameState, getWinner, StoneColor } from './gameState';
export interface Coordinates {
  x: number;
  y: number;
}

export interface BinaryBoard {
  whiteBoard: number;
  blackBoard: number;
}

export const UTF16_CODE_OF_LETTER_A = 65;

export function deepCloneObject(objectToClone) {
  return JSON.parse(JSON.stringify(objectToClone));
}

export function encodeObjectForQueryString(objectToEncode): string {
  return encodeURI(JSON.stringify(objectToEncode));
}

export function parseObjectFromEncodedQuerystring(stringToParse): Object {
  return JSON.parse(decodeURI(stringToParse));
}

export function parseGameStateFromMultilineString(
  gameState: string,
): GameState {
  const parsedGameState = {
    turn: 'white',
    winner: null,
    board: gameState
      .split(/\r?\n/)
      .filter((line) => line.replace(/ /g, '').length > 0)
      .map((line) =>
        line
          .replace(/ /g, '')
          .split('')
          .map((cell) => {
            switch (cell) {
              case '⬢':
                return { value: 'black' };
              case 'W':
                return { value: 'white' };
              default:
                return { value: 'empty' };
            }
          }),
      ),
  } as GameState;
  const getWinnerDataIfExist = getWinner(parsedGameState);
  parsedGameState.winner = getWinnerDataIfExist.winner;
  parsedGameState.winningPath = getWinnerDataIfExist.winningPath;
  return parsedGameState;
}

export function arrayBoardToBinaryBoard(
  board: Array<Array<Cell>>,
): BinaryBoard {
  return {
    whiteBoard: arrayBoardToBinaryBoardByColor(board, 'white'),
    blackBoard: arrayBoardToBinaryBoardByColor(board, 'black'),
  };
}

function arrayBoardToBinaryBoardByColor(
  board: Array<Array<Cell>>,
  color: StoneColor,
): number {
  const totalBoardSize = board.length * board[0].length;
  return board.reduce(
    (prev_row, row, y) =>
      prev_row +
      row.reduce(
        (prev, cell, x) =>
          prev +
          (cell.value === color
            ? Math.pow(2, totalBoardSize - 1 - (y * row.length + x))
            : 0),
        0,
      ),
    0,
  );
}
