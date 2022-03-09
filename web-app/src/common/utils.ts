import { Board, Cell, GameState, getWinner, StoneColor } from './gameState';
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

export function arrayBoardToBinaryBoard(board: Board): BinaryBoard {
  const boardSize = board.length;
  return {
    whiteBoard: arrayBoardToBinaryBoardByColor(board, boardSize, 'white'),
    blackBoard: arrayBoardToBinaryBoardByColor(board, boardSize, 'black'),
    boardSize,
  };
}

function arrayBoardToBinaryBoardByColor(
  board: Board,
  boardSize: number,
  color: StoneColor,
): number {
  let currentBit = 1 << (boardSize * boardSize);
  return board.reduce(
    (prevRow, row) =>
      prevRow |
      row.reduce((prev, cell) => {
        currentBit = currentBit >> 1;
        return cell.value === color ? prev | currentBit : prev;
      }, 0),
    0,
  );
}

export function binaryBoardToArrayBoard(board: BinaryBoard): Board {
  const result: Board = [];
  let currentBit = 1 << (board.boardSize * board.boardSize);
  for (let y = 0; y < board.boardSize; y++) {
    result[y] = [];
    for (let x = 0; x < board.boardSize; x++) {
      currentBit = currentBit >> 1;
      if (board.whiteBoard & currentBit) result[y][x] = { value: 'white' };
      else if (board.blackBoard & currentBit) result[y][x] = { value: 'black' };
      else result[y][x] = { value: 'empty' };
    }
  }
  return result;
}

export function areCoordinatesEquals(
  coord1: Coordinates,
  coord2: Coordinates,
): boolean {
  return coord1.x === coord2.x && coord1.y === coord2.y;
}

export function areExpectedCoordinatesInList(
  expectedCoords: Coordinates,
  listPotentialCoords: Coordinates[],
): boolean {
  return listPotentialCoords.some((potentialCoords) =>
    areCoordinatesEquals(potentialCoords, expectedCoords),
  );
}
