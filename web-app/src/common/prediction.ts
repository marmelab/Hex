import { Board, StoneColor } from './gameState';
import { Coordinates, deepCloneObject } from './utils';
import { getNbMovesNeededToWin } from './pathfinding';

interface PlayPrediction {
  coordinates: Coordinates;
  playerRemainingMovesToWin: number;
  opponentRemainingMovesToWin: number;
  score: number;
}

export function getNextPlaySuggestion(
  board: Board,
  stoneColor: StoneColor,
): Coordinates {
  const playableCells = getPlayableCells(board);
  if (playableCells.length === 0)
    throw new Error('There is no playable cell in the given board.');
  const playPredictions = playableCells.map((coordinates) =>
    getPlayPrediction(board, coordinates, stoneColor, stoneColor),
  );
  return getBestPossiblePlay(playPredictions).coordinates;
}

export function getMinimaxNextPlaySuggestion(
  board: Board,
  stoneColor: StoneColor,
  maxDepth: number,
): Coordinates {
  return getBestPossiblePlay(
    getMinimaxPlayPredictions(board, stoneColor, maxDepth),
  ).coordinates;
}

function getPlayableCells(board: Board): Coordinates[] {
  const playableCells = [];
  board.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell.value === 'empty') playableCells.push({ x, y });
    });
  });
  return playableCells;
}

function getPlayPrediction(
  board: Board,
  coordinates: Coordinates,
  stoneColor: StoneColor,
  playAsColor: StoneColor,
): PlayPrediction {
  const potentialBoard = deepCloneObject(board) as Board;
  potentialBoard[coordinates.y][coordinates.x].value = playAsColor;
  const playerRemainingMovesToWin = getNbMovesNeededToWin(
    potentialBoard,
    stoneColor,
  );
  const opponentColor = stoneColor === 'black' ? 'white' : 'black';
  const opponentRemainingMovesToWin = getNbMovesNeededToWin(
    potentialBoard,
    opponentColor,
  );
  return {
    coordinates,
    playerRemainingMovesToWin,
    opponentRemainingMovesToWin,
    score: playerRemainingMovesToWin - opponentRemainingMovesToWin,
  };
}

function getBestPossiblePlay(potentialPlays: PlayPrediction[]): PlayPrediction {
  const winningPlays = potentialPlays.filter(
    (play) => play.playerRemainingMovesToWin === 0,
  );
  if (winningPlays.length > 0) return winningPlays[0];
  return potentialPlays.reduce(function (prev, curr) {
    return prev.score <= curr.score ? prev : curr;
  });
}

function getWorstPossiblePlay(
  potentialPlays: PlayPrediction[],
): PlayPrediction {
  const loosingPlays = potentialPlays.filter(
    (play) => play.opponentRemainingMovesToWin === 0,
  );
  if (loosingPlays.length > 0) return loosingPlays[0];
  return potentialPlays.reduce(function (prev, curr) {
    return prev.score >= curr.score ? prev : curr;
  });
}

function getMinimaxPlayPredictions(
  board: Board,
  stoneColor: StoneColor,
  maxDepth: number,
  currentDepth = 1,
): PlayPrediction[] {
  const isCurrentPlayerTurnToPlay = currentDepth % 2 === 1;
  const opponentColor = stoneColor === 'black' ? 'white' : 'black';
  if (currentDepth === maxDepth) {
    return getPlayableCells(board).map((coordinates) =>
      getPlayPrediction(
        board,
        coordinates,
        stoneColor,
        isCurrentPlayerTurnToPlay ? stoneColor : opponentColor,
      ),
    );
  } else {
    return getPlayableCells(board).map((coordinates) => {
      const potentialBoard = deepCloneObject(board) as Board;
      potentialBoard[coordinates.y][coordinates.x].value =
        isCurrentPlayerTurnToPlay ? stoneColor : opponentColor;
      const nextPlaySuggestions = getMinimaxPlayPredictions(
        potentialBoard,
        stoneColor,
        maxDepth,
        currentDepth + 1,
      );
      const selectedPrediction = isCurrentPlayerTurnToPlay
        ? getWorstPossiblePlay(nextPlaySuggestions)
        : getBestPossiblePlay(nextPlaySuggestions);
      return selectedPrediction;
    });
  }
}
