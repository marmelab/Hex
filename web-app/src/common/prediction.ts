import { GameState, StoneColor } from './gameState';
import { Coordinates, deepCloneObject } from './utils';
import { getWinnablePathCost } from './pathfinding';

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
    return { playPosition, currentPlayerWinCost: getWinnablePathCost(potentialGameState, stoneColor), opponentWinCost: getWinnablePathCost(potentialGameState, opponentColor) }
  });

  return winCostForPotentialPlays.reduce(function (prev, curr) {
    return (prev.currentPlayerWinCost - prev.opponentWinCost) < (curr.currentPlayerWinCost - prev.opponentWinCost) ? prev : curr;
  }).playPosition;
}
