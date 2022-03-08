import { Cell, GameState, getWinner, StoneColor } from './gameState';
export interface Coordinates {
  x: number;
  y: number;
}

export interface BinaryBoard {
  whiteBoard: number;
  blackBoard: number;
  boardSize: number;
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
  const boardSize = board.length * board[0].length;
  return {
    whiteBoard: arrayBoardToBinaryBoardByColor(board, boardSize, 'white'),
    blackBoard: arrayBoardToBinaryBoardByColor(board, boardSize, 'black'),
    boardSize,
  };
}

function arrayBoardToBinaryBoardByColor(
  board: Array<Array<Cell>>,
  boardSize: number,
  color: StoneColor,
): number {
  return board.reduce(
    (prevRow, row, y) =>
      prevRow +
      row.reduce(
        (prev, cell, x) =>
          prev +
          (cell.value === color
            ? Math.pow(2, boardSize - 1 - (y * row.length + x))
            : 0),
        0,
      ),
    0,
  );
}

export function binaryBoardToArrayBoard(
  board: BinaryBoard,
): Array<Array<Cell>> {
  const rowLength = Math.sqrt(board.boardSize);
  const result: Array<Array<Cell>> = [];
  for (let y = 0; y < rowLength; y++) {
    result[y] = [];
    for (let x = 0; x < rowLength; x++) {
      const filter: number = Math.pow(
        2,
        board.boardSize - 1 - (y * rowLength + x),
      );
      if (board.whiteBoard & filter) result[y][x] = { value: 'white' };
      else if (board.blackBoard & filter) result[y][x] = { value: 'black' };
      else result[y][x] = { value: 'empty' };
    }
  }
  return result;
}
