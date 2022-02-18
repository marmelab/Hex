import * as jkstra from 'jkstra';
import { HexBoardGraph } from './graph';
import { Coordinates } from './utils';

export function doesPathExist(
  hexBoardGraph: HexBoardGraph,
  startNodeId: string,
  endNodeId: string,
): { hasWon: boolean; winningPath: Coordinates[] } {
  const dijkstra = new jkstra.algos.Dijkstra(hexBoardGraph.graph);
  const shortestPath = dijkstra.shortestPath(
    hexBoardGraph.vertexMap.get(startNodeId),
    hexBoardGraph.vertexMap.get(endNodeId),
  );
  if (shortestPath) {
    const shortestPathWithoutStartNode = shortestPath.slice(1);
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
