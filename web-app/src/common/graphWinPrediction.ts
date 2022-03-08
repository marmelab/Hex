import * as jkstra from 'jkstra';
import {
  doesCellExist, doesCellExistAndHaveStone, GameState, StoneColor,
  BLACK_NODE_START, BLACK_NODE_END, WHITE_NODE_START, WHITE_NODE_END
} from './gameState';
import { Coordinates } from './utils';

export const UNDEFINED_EDGE_COST = -1;
export const LOW_EDGE_COST = 1;
export const HIGH_EDGE_COST = 100;

export interface HexBoardWinPredictionGraph {
  winPrediction: jkstra.Graph;
  vertexMap: Map<string, jkstra.Vertex>;
}

/**
 * Create a graph to represent the winnable paths of a given board.
 * It doesn't add vertex/edges for the cells of the opposite color because it's not needed for this calculation.
 */
export function createWinPredictionGraph(
  gameState: GameState,
  stoneColor: StoneColor,
): HexBoardWinPredictionGraph {
  const hexBoardWinPredictionGraph: HexBoardWinPredictionGraph = {
    winPrediction: new jkstra.Graph(),
    vertexMap: new Map<string, jkstra.Vertex>(),
  };
  createVertices(gameState, hexBoardWinPredictionGraph, stoneColor);
  createStartEndEdges(gameState, hexBoardWinPredictionGraph, stoneColor);
  createPlayableCellEdges(gameState, hexBoardWinPredictionGraph, stoneColor);
  return hexBoardWinPredictionGraph;
}

function createVertices(
  gameState: GameState,
  hexBoardWinPredictionGraph: HexBoardWinPredictionGraph,
  stoneColor: StoneColor
) {
  if (stoneColor === "black") {
    addVertex(hexBoardWinPredictionGraph, BLACK_NODE_START);
    addVertex(hexBoardWinPredictionGraph, BLACK_NODE_END);
  }
  else {
    addVertex(hexBoardWinPredictionGraph, WHITE_NODE_START);
    addVertex(hexBoardWinPredictionGraph, WHITE_NODE_END);
  }

  // Add vertex for each cell on the board that's are not of the opposite color
  gameState.board.forEach((row, y) => {
    row.forEach((_cell, x) => {
      if (_cell.value === stoneColor || _cell.value === "empty") {
        addVertex(hexBoardWinPredictionGraph, `${y}-${x}`);
      }
    });
  });
}

function addVertex(hexBoardWinPredictionGraph: HexBoardWinPredictionGraph, id: string) {
  hexBoardWinPredictionGraph.vertexMap.set(id, hexBoardWinPredictionGraph.winPrediction.addVertex(id));
}

function createPlayableCellEdges(
  gameState: GameState,
  hexBoardWinPredictionGraph: HexBoardWinPredictionGraph,
  stoneColor: StoneColor,
) {
  gameState.board.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell.value == stoneColor || cell.value == "empty") {
        const currentCell: Coordinates = { y: y, x: x };
        const directNeighborCells = [
          { y: y, x: x - 1 }, { y: y, x: x + 1 },
          { y: y - 1, x: x }, { y: y + 1, x: x },
          { y: y - 1, x: x - 1 }, { y: y + 1, x: x + 1 },
        ];
        directNeighborCells.forEach(neighbor => {
          if (!doesCellExist(gameState, neighbor) || doesCellExistAndHaveStone(gameState, neighbor, stoneColor === "black" ? "white" : "black")) return;
          const cost = doesCellExistAndHaveStone(gameState, neighbor, stoneColor) ? LOW_EDGE_COST : HIGH_EDGE_COST;
          addEdgeWithCost(hexBoardWinPredictionGraph, `${currentCell.y}-${currentCell.x}`, `${neighbor.y}-${neighbor.x}`, cost);
        })
      }
    })
  });
}

/**
 * Create edges for start and end nodes of the given color.
 * White color borders are top-bottom and black color border are left-right.
 */
function createStartEndEdges(
  gameState: GameState,
  hexBoardWinPredictionGraph: HexBoardWinPredictionGraph,
  stoneColor: StoneColor,
) {
  gameState.board.forEach((_, i) => {
    if (stoneColor === "black") {
      const currentFirstColumnCellValue = gameState.board[i][0].value;
      if (currentFirstColumnCellValue !== "white") {
        addEdgeWithCost(hexBoardWinPredictionGraph, BLACK_NODE_START, `${i}-0`, currentFirstColumnCellValue === "black" ? LOW_EDGE_COST : HIGH_EDGE_COST);
      }
      const currentLastColumnCellValue = gameState.board[i][gameState.board.length - 1].value;
      if (currentLastColumnCellValue !== "white") {
        addEdgeWithCost(hexBoardWinPredictionGraph, `${i}-${gameState.board.length - 1}`, BLACK_NODE_END, UNDEFINED_EDGE_COST);
      }
    }
    else {
      const currentFirstRowCellValue = gameState.board[0][i].value;
      if (currentFirstRowCellValue !== "black") {
        addEdgeWithCost(hexBoardWinPredictionGraph, WHITE_NODE_START, `0-${i}`, currentFirstRowCellValue === "white" ? LOW_EDGE_COST : HIGH_EDGE_COST);
      }
      const currentLastRowCellValue = gameState.board[gameState.board.length - 1][i].value;
      if (currentLastRowCellValue !== "black") {
        addEdgeWithCost(hexBoardWinPredictionGraph, `${gameState.board.length - 1}-${i}`, WHITE_NODE_END, UNDEFINED_EDGE_COST);
      }
    }
  });
}

function addEdgeWithCost(
  hexBoardWinPredictionGraph: HexBoardWinPredictionGraph,
  vertex1: string,
  vertex2: string,
  cost: number,
) {
  hexBoardWinPredictionGraph.winPrediction.addEdge(
    hexBoardWinPredictionGraph.vertexMap.get(vertex1),
    hexBoardWinPredictionGraph.vertexMap.get(vertex2),
    cost,
  );
}
