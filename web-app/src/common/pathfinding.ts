import * as jkstra from 'jkstra';
import { BLACK_NODE_END, BLACK_NODE_START, GameState, StoneColor, WHITE_NODE_END, WHITE_NODE_START } from './gameState';
import { createWinDetectionGraph } from './graphWinDetection';
import { HexBoardWinDetectionGraph } from './graphWinDetection';
import { HexBoardGraph } from './graph';
import { Coordinates } from './utils';

export function getWinningPathIfExist(
  gameState: GameState,
  stoneColor: StoneColor,
): { hasWon: boolean; winningPath: Coordinates[] } {
  const hexBoardWinDetectionGraph = createWinDetectionGraph(gameState, stoneColor);
  const dijkstra = new jkstra.algos.Dijkstra(hexBoardWinDetectionGraph.winDetectionGraph);
  const winningPath = dijkstra.shortestPath(
    hexBoardWinDetectionGraph.vertexMap.get(stoneColor === "black" ? BLACK_NODE_START : WHITE_NODE_START),
    hexBoardWinDetectionGraph.vertexMap.get(stoneColor === "black" ? BLACK_NODE_END : WHITE_NODE_END)
  );
  if (winningPath) {
    const shortestPathWithoutStartNode = winningPath.slice(1);
    return {
      hasWon: true,
      winningPath: shortestPathWithoutStartNode.map((node) => {
        return {
          x: parseInt(node.from.data.split('-')[1]),
          y: parseInt(node.from.data.split('-')[0]),
        };
      }),
    };
  }
  return { hasWon: false, winningPath: null };
}
