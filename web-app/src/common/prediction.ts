import { GameState, StoneColor } from './gameState';
import { Coordinates, deepCloneObject } from './utils';
import { getNbMovesNeededToWin } from './pathfinding';

interface PlayPrediction {
  coordinates: Coordinates;
  playerRemainingMovesToWin: number;
  opponentRemainingMovesToWin: number;
  score: number;
}

export function getNextPlaySuggestion(gameState: GameState, stoneColor: StoneColor): Coordinates {
  const playableCells = getPlayableCells(gameState);
  if (playableCells.length === 0) throw new Error("There is no playable cell in the given board.")
  const playPredictions = playableCells.map(coordinates =>
    getPlayPrediction(gameState, coordinates, stoneColor)
  );
  return getBestPossiblePlay(playPredictions).coordinates;
}

function getPlayableCells(gameState: GameState): Coordinates[] {
  const playableCells = [];
  gameState.board.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell.value === "empty")
        playableCells.push({ x, y })
    })
  });
  return playableCells;
}

function getPlayPrediction(gameState: GameState, coordinates: Coordinates, stoneColor: StoneColor): PlayPrediction {
  const potentialGameState = deepCloneObject(gameState) as GameState;
  potentialGameState.board[coordinates.y][coordinates.x].value = stoneColor;
  const playerRemainingMovesToWin = getNbMovesNeededToWin(potentialGameState, stoneColor);
  const opponentColor = stoneColor === "black" ? "white" : "black";
  const opponentRemainingMovesToWin = getNbMovesNeededToWin(potentialGameState, opponentColor);
  return { coordinates, playerRemainingMovesToWin, opponentRemainingMovesToWin, score: playerRemainingMovesToWin - opponentRemainingMovesToWin }
}

function getBestPossiblePlay(potentialPlays: PlayPrediction[]): PlayPrediction {
  const winningPlays = potentialPlays.filter(play => play.playerRemainingMovesToWin === 0);
  if (winningPlays.length > 0) return winningPlays[0];
  return potentialPlays.reduce(function (prev, curr) {
    return prev.score <= curr.score ? prev : curr;
  });
}
