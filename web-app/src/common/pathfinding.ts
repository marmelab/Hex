import * as jkstra from 'jkstra';
import { BLACK_NODE_END, BLACK_NODE_START, Board, StoneColor, WHITE_NODE_END, WHITE_NODE_START } from './gameState';
import { createWinDetectionGraph } from './graphWinDetection';
import { createWinPredictionGraph, HIGH_EDGE_COST, LOW_EDGE_COST, UNDEFINED_EDGE_COST } from './graphWinPrediction';
import { Coordinates } from './utils';

export function getWinningPathIfExist(
  board: Board,
  stoneColor: StoneColor,
): { hasWon: boolean; winningPath: Coordinates[] } {
  const hexBoardWinDetectionGraph = createWinDetectionGraph(board, stoneColor);
  const dijkstra = new jkstra.algos.Dijkstra(hexBoardWinDetectionGraph.winDetectionGraph);
  const winningPath = dijkstra.shortestPath(
    hexBoardWinDetectionGraph.vertexMap.get(stoneColor === "black" ? BLACK_NODE_START : WHITE_NODE_START),
    hexBoardWinDetectionGraph.vertexMap.get(stoneColor === "black" ? BLACK_NODE_END : WHITE_NODE_END)
  );
  if (winningPath) {
    const winningPathWithoutStartNode = winningPath.slice(1);
    return {
      hasWon: true,
      winningPath: winningPathWithoutStartNode.map((node) => {
        return {
          x: parseInt(node.from.data.split('-')[1]),
          y: parseInt(node.from.data.split('-')[0]),
        };
      }),
    };
  }
  return { hasWon: false, winningPath: null };
}

export function getNbMovesNeededToWin(
  board: Board,
  stoneColor: StoneColor,
): number {
  const hexBoardWinPredictionGraph = createWinPredictionGraph(board, stoneColor);
  const dijkstra = new jkstra.algos.Dijkstra(hexBoardWinPredictionGraph.winPrediction);
  const shortestPath = dijkstra.shortestPath(
    hexBoardWinPredictionGraph.vertexMap.get(stoneColor === "black" ? BLACK_NODE_START : WHITE_NODE_START),
    hexBoardWinPredictionGraph.vertexMap.get(stoneColor === "black" ? BLACK_NODE_END : WHITE_NODE_END),
    {
      edgeCost: function (edge) {
        return edge.data;
      }
    });
  if (!shortestPath) return -1;
  const cost = Object.keys(shortestPath).reduce(function (previous, key) {
    return previous + mapEdgeCostToNbMoves(shortestPath[key].data)
  }, 0);
  return cost;
}

function mapEdgeCostToNbMoves(edgeCost: number) {
  switch (edgeCost) {
    case LOW_EDGE_COST:
      return 0;
    case HIGH_EDGE_COST:
      return 1;
    default:
      return 0;
  }
}
