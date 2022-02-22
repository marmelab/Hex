import { Game } from 'src/game/game.entity';
import { GameState, getWinner } from './gameState';
export interface Coordinates {
  x: number;
  y: number;
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

export function createGameEntityFromGameState(gameState: GameState): Game {
  return {
    id: null,
    player1: null,
    player2: null,
    state: gameState,
  };
}

export function parseGameFromMultilineString(gameState: string): Game {
  return createGameEntityFromGameState(
    parseGameStateFromMultilineString(gameState),
  );
}
