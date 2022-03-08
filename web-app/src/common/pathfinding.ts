import * as jkstra from 'jkstra';
import { HexBoardWinDetectionGraph } from './graphWinDetection';
import { HexBoardGraph } from './graph';
import { Coordinates } from './utils';

export function getWinningPathIfExist(
  hexBoardWinDetectionGraph: HexBoardWinDetectionGraph,
  startNodeId: string,
  endNodeId: string,
): { hasWon: boolean; winningPath: Coordinates[] } {
  const dijkstra = new jkstra.algos.Dijkstra(hexBoardWinDetectionGraph.winDetectionGraph);
  const winningPath = dijkstra.winningPath(
    hexBoardWinDetectionGraph.vertexMap.get(startNodeId),
    hexBoardWinDetectionGraph.vertexMap.get(endNodeId),
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
