import { Board, StoneColor } from './gameState';
import { Coordinates, deepCloneObject } from './utils';
import { getNbMovesNeededToWin } from './pathfinding';

interface PlayPrediction {
  coordinates: Coordinates;
  playerRemainingMovesToWin: number;
  opponentRemainingMovesToWin: number;
  score: number;
}

export function getNextPlaySuggestion(board: Board, stoneColor: StoneColor): Coordinates {
  const playableCells = getPlayableCells(board);
  if (playableCells.length === 0) throw new Error("There is no playable cell in the given board.")
  const playPredictions = playableCells.map(coordinates =>
    getPlayPrediction(board, coordinates, stoneColor)
  );
  return getBestPossiblePlay(playPredictions).coordinates;
}

function getPlayableCells(board: Board): Coordinates[] {
  const playableCells = [];
  board.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell.value === "empty")
        playableCells.push({ x, y })
    })
  });
  return playableCells;
}

function getPlayPrediction(board: Board, coordinates: Coordinates, stoneColor: StoneColor): PlayPrediction {
  const potentialBoard = deepCloneObject(board) as Board;
  potentialBoard[coordinates.y][coordinates.x].value = stoneColor;
  const playerRemainingMovesToWin = getNbMovesNeededToWin(potentialBoard, stoneColor);
  const opponentColor = stoneColor === "black" ? "white" : "black";
  const opponentRemainingMovesToWin = getNbMovesNeededToWin(potentialBoard, opponentColor);
  return { coordinates, playerRemainingMovesToWin, opponentRemainingMovesToWin, score: playerRemainingMovesToWin - opponentRemainingMovesToWin }
}

function getBestPossiblePlay(potentialPlays: PlayPrediction[]): PlayPrediction {
  const winningPlays = potentialPlays.filter(play => play.playerRemainingMovesToWin === 0);
  if (winningPlays.length > 0) return winningPlays[0];
  return potentialPlays.reduce(function (prev, curr) {
    return prev.score <= curr.score ? prev : curr;
  });
}
