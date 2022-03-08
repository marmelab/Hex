import { GameState, StoneColor } from './gameState';
import { Coordinates, deepCloneObject } from './utils';
import { getWinnablePathCost } from './pathfinding';

export function getNextPlayAdvice(gameState: GameState, stoneColor: StoneColor): Coordinates {
  const allPotentialPlays = [];
  gameState.board.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell.value === "empty")
        allPotentialPlays.push({ x, y })
    })
  });

  const winCostForPotentialPlays = allPotentialPlays.map(playPosition => {
    const potentialGameState = deepCloneObject(gameState) as GameState;
    potentialGameState.board[playPosition.y][playPosition.x].value = stoneColor;
    return { playPosition, cost: getWinnablePathCost(potentialGameState, stoneColor) }
  });

  return winCostForPotentialPlays.reduce(function (prev, curr) {
    return prev.cost < curr.cost ? prev : curr;
  }).playPosition;
}
