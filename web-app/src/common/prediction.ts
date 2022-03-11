import { Board, StoneColor } from './gameState';
import { Coordinates, deepCloneObject } from './utils';
import { getNbMovesNeededToWin } from './pathfinding';

export interface PlayPrediction {
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
  minimaxLogs = '';
  log(
    `Minimax algo initialized with a max depth of ${maxDepth} for player ${stoneColor}`,
  );
  const nextPlaySuggestions = getMinimaxPlayPredictions(
    board,
    stoneColor,
    maxDepth,
  );
  log(getStringBoard(board, nextPlaySuggestions));
  const bestPlay = getBestPossiblePlay(nextPlaySuggestions);
  log(
    `Result : ${stoneColor} suggested move is ${bestPlay.coordinates.x},${bestPlay.coordinates.y} with a score of ${bestPlay.score}`,
  );
  console.log(minimaxLogs);
  return bestPlay.coordinates;
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
  let score = 0;
  if (playerRemainingMovesToWin === 0) {
    score = -100;
  } else if (opponentRemainingMovesToWin === 0) {
    score = 100;
  } else {
    score = playerRemainingMovesToWin - opponentRemainingMovesToWin;
  }
  return {
    coordinates,
    playerRemainingMovesToWin,
    opponentRemainingMovesToWin,
    score,
  };
}

export function getBestPossiblePlay(
  potentialPlays: PlayPrediction[],
): PlayPrediction {
  return potentialPlays.reduce(function (prev, curr) {
    return prev.score <= curr.score ? prev : curr;
  });
}

export function getBestPossiblePlays(
  potentialPlays: PlayPrediction[],
): PlayPrediction[] {
  const minScore = getBestPossiblePlay(potentialPlays).score;
  return potentialPlays.filter((play) => play.score === minScore);
}

function getWorstPossiblePlay(
  potentialPlays: PlayPrediction[],
): PlayPrediction {
  return potentialPlays.reduce(function (prev, curr) {
    return prev.score >= curr.score ? prev : curr;
  });
}

export function getMinimaxPlayPredictions(
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
      log(getStringBoard(board, nextPlaySuggestions));
      const selectedPrediction = isCurrentPlayerTurnToPlay
        ? getWorstPossiblePlay(nextPlaySuggestions)
        : getBestPossiblePlay(nextPlaySuggestions);
      selectedPrediction.coordinates = coordinates;
      log(
        `${
          isCurrentPlayerTurnToPlay ? opponentColor : stoneColor
        } choose to play on ${selectedPrediction.coordinates.x},${
          selectedPrediction.coordinates.y
        } with a score of ${selectedPrediction.score} at depth ${
          currentDepth + 1
        }`,
      );
      return selectedPrediction;
    });
  }
}

function getStringBoard(board: Board, predictions: PlayPrediction[]) {
  let stringifiedBoard = '';
  for (let y = 0; y < board.length; y++) {
    stringifiedBoard += '\n';
    for (let x = 0; x < board[y].length; x++) {
      stringifiedBoard += '|';
      const cellVal = board[y][x].value;
      if (cellVal === 'empty') {
        const cellScoreIfExist = predictions.filter(
          (predict) =>
            predict.coordinates.x === x && predict.coordinates.y === y,
        )[0];
        stringifiedBoard += cellScoreIfExist ? cellScoreIfExist.score : 'x';
      } else {
        stringifiedBoard += cellVal[0];
      }
    }
  }
  return stringifiedBoard;
}

let minimaxLogs = '';
function log(logToAdd) {
  minimaxLogs += '\n' + logToAdd;
}
