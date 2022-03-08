import { GameState, StoneColor } from './gameState';
import { Coordinates, deepCloneObject } from './utils';
import { getNbMovesNeededToWin } from './pathfinding';

export function getNextPlaySuggestion(gameState: GameState, stoneColor: StoneColor): Coordinates {
  const allPotentialPlays = [];
  gameState.board.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell.value === "empty")
        allPotentialPlays.push({ x, y })
    })
  });

  if (allPotentialPlays.length === 0) throw new Error("There is no playable cell in the given board.")

  const winCostForPotentialPlays = allPotentialPlays.map(playPosition => {
    const potentialGameState = deepCloneObject(gameState) as GameState;
    potentialGameState.board[playPosition.y][playPosition.x].value = stoneColor;
    const opponentColor = stoneColor === "black" ? "white" : "black";
    return { playPosition, myWinCost: getNbMovesNeededToWin(potentialGameState, stoneColor), myAdvWinCost: getNbMovesNeededToWin(potentialGameState, opponentColor), winCost: getNbMovesNeededToWin(potentialGameState, stoneColor) - getNbMovesNeededToWin(potentialGameState, opponentColor) }
  });

  const winningPlays = winCostForPotentialPlays.filter(play => play.myWinCost === 0);
  return winningPlays.length > 0 ? winningPlays[0].playPosition : winCostForPotentialPlays.reduce(function (prev, curr) {
    return prev.winCost < curr.winCost ? prev : curr;
  }).playPosition;
}
