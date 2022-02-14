import { GameState } from './gameState';
export interface Coordinates {
  x: number;
  y: number;
}

export const UTF16_CODE_OF_LETTER_A = 65;

export function deepCloneObject(objectToClone) {
  return JSON.parse(JSON.stringify(objectToClone));
}

export function parseGameStateFromMultilineString(
  gameState: string,
): GameState {
  return {
    turn: 'white',
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
  };
}
