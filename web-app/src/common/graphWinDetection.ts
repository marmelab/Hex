import * as jkstra from 'jkstra';
import {
  doesCellExistAndHaveStone, GameState, StoneColor,
  BLACK_NODE_START, BLACK_NODE_END, WHITE_NODE_START, WHITE_NODE_END
} from './gameState';
import { Coordinates } from './utils';

export interface HexBoardWinDetectionGraph {
  winDetectionGraph: jkstra.Graph;
  vertexMap: Map<string, jkstra.Vertex>;
}

export function createWinDetectionGraph(
  gameState: GameState,
  stoneColor: StoneColor,
): HexBoardWinDetectionGraph {
  const hexBoardWinDetectionGraph: HexBoardWinDetectionGraph = {
    winDetectionGraph: new jkstra.Graph(),
    vertexMap: new Map<string, jkstra.Vertex>(),
  };

  createVerticesFromBoard(gameState, hexBoardWinDetectionGraph);
  createEdgesFromGameState(gameState, hexBoardWinDetectionGraph, stoneColor);

  return hexBoardWinDetectionGraph;
}

function createVerticesFromBoard(
  gameState: GameState,
  hexBoardWinDetectionGraph: HexBoardWinDetectionGraph,
) {
  // Add start and end nodes
  addVertex(hexBoardWinDetectionGraph, BLACK_NODE_START);
  addVertex(hexBoardWinDetectionGraph, BLACK_NODE_END);
  addVertex(hexBoardWinDetectionGraph, WHITE_NODE_START);
  addVertex(hexBoardWinDetectionGraph, WHITE_NODE_END);

  // Add node for each cell on the board
  gameState.board.forEach((row, y) => {
    row.forEach((_cell, x) => {
      addVertex(hexBoardWinDetectionGraph, `${y}-${x}`);
    });
  });
}

function createEdgesFromGameState(
  gameState: GameState,
  hexBoardWinDetectionGraph: HexBoardWinDetectionGraph,
  stoneColor: StoneColor,
) {
  // Add edge pair for all nodes with one of its 3 possible neighbors
  // if the stone color matches
  gameState.board.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell.value == stoneColor) {
        const currentCell: Coordinates = { y: y, x: x };
        const directNeighborCells = [{ y: y, x: x + 1 }, { y: y + 1, x: x }, { y: y + 1, x: x - 1 }];
        directNeighborCells.forEach(neighbor => createEdgePairForNeighbor(
          gameState,
          hexBoardWinDetectionGraph,
          stoneColor,
          currentCell,
          neighbor,
        ));
      }
    });
  });

  // Add edges for start and end nodes
  gameState.board.forEach((_, i) => {
    addEdge(hexBoardWinDetectionGraph, BLACK_NODE_START, `${i}-0`);
    addEdge(hexBoardWinDetectionGraph, `${i}-${gameState.board.length - 1}`, BLACK_NODE_END);
    addEdge(hexBoardWinDetectionGraph, WHITE_NODE_START, `0-${i}`);
    addEdge(hexBoardWinDetectionGraph, `${gameState.board.length - 1}-${i}`, WHITE_NODE_END);
  });
}

function createEdgePairForNeighbor(
  gameState: GameState,
  hexBoardWinDetectionGraph: HexBoardWinDetectionGraph,
  stoneColor: StoneColor,
  currentCell: Coordinates,
  neighbor: Coordinates,
) {
  if (doesCellExistAndHaveStone(gameState, neighbor, stoneColor)) {
    addBidirectionalEdge(
      hexBoardWinDetectionGraph,
      `${currentCell.y}-${currentCell.x}`,
      `${neighbor.y}-${neighbor.x}`,
    );
  }
}

function addVertex(hexBoardWinDetectionGraph: HexBoardWinDetectionGraph, id: string) {
  hexBoardWinDetectionGraph.vertexMap.set(id, hexBoardWinDetectionGraph.winDetectionGraph.addVertex(id));
}

function addEdge(
  hexBoardWinDetectionGraph: HexBoardWinDetectionGraph,
  vertex1: string,
  vertex2: string,
) {
  hexBoardWinDetectionGraph.winDetectionGraph.addEdge(
    hexBoardWinDetectionGraph.vertexMap.get(vertex1),
    hexBoardWinDetectionGraph.vertexMap.get(vertex2),
    1,
  );
}

function addBidirectionalEdge(
  hexBoardWinDetectionGraph: HexBoardWinDetectionGraph,
  vertex1: string,
  vertex2: string,
) {
  hexBoardWinDetectionGraph.winDetectionGraph.addEdgePair(
    hexBoardWinDetectionGraph.vertexMap.get(vertex1),
    hexBoardWinDetectionGraph.vertexMap.get(vertex2),
    1,
  );
}
