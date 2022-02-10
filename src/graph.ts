import * as jkstra from "jkstra";
import { doesCellExistAndHaveStone, GameState, StoneColor } from "./gameState";
import { Coordinates } from "./utils";

export interface HexBoardGraph {
  graph: jkstra.Graph;
  vertexMap: Map<string, jkstra.Vertex>;
}

export function createGraphFromGameState(
  gameState: GameState,
  stoneColor: StoneColor
): HexBoardGraph {
  const hexBoardGraph: HexBoardGraph = {
    graph: new jkstra.Graph(),
    vertexMap: new Map<string, jkstra.Vertex>(),
  };

  createVerticesFromBoard(gameState, hexBoardGraph);
  createEdgesFromGameState(gameState, hexBoardGraph, stoneColor);

  return hexBoardGraph;
}

function createVerticesFromBoard(
  gameState: GameState,
  hexBoardGraph: HexBoardGraph
) {
  // Add start and end nodes
  addVertex(hexBoardGraph, "black-start");
  addVertex(hexBoardGraph, "black-end");
  addVertex(hexBoardGraph, "white-start");
  addVertex(hexBoardGraph, "white-end");

  // Add node for each cell on the board
  gameState.board.forEach((row, y) => {
    row.forEach((_cell, x) => {
      addVertex(hexBoardGraph, `${y}-${x}`);
    });
  });
}

function createEdgesFromGameState(
  gameState: GameState,
  hexBoardGraph: HexBoardGraph,
  stoneColor: StoneColor
) {
  // Add edge pair for all nodes with one of its 3 possible neighbors
  // if the stone color matches
  gameState.board.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell.value == stoneColor) {
        const currentCell: Coordinates = { y: y, x: x };
        let neighbor: Coordinates;
        // 1st possible neighbor
        neighbor = { y: y, x: x + 1 };
        createEdgePairForNeighbor(
          gameState,
          hexBoardGraph,
          stoneColor,
          currentCell,
          neighbor
        );
        // 2nd possible neighbor
        neighbor = { y: y + 1, x: x };
        createEdgePairForNeighbor(
          gameState,
          hexBoardGraph,
          stoneColor,
          currentCell,
          neighbor
        );
        // 3rd possible neighbor
        neighbor = { y: y + 1, x: x - 1 };
        createEdgePairForNeighbor(
          gameState,
          hexBoardGraph,
          stoneColor,
          currentCell,
          neighbor
        );
      }
    });
  });

  // Add edges for start and end nodes
  gameState.board.forEach((_, i) => {
    addEdge(hexBoardGraph, "black-start", `${i}-0`);
    addEdge(hexBoardGraph, `${i}-${gameState.board.length - 1}`, "black-end");
    addEdge(hexBoardGraph, "white-start", `0-${i}`);
    addEdge(hexBoardGraph, `${gameState.board.length - 1}-${i}`, "white-end");
  });
}

function createEdgePairForNeighbor(
  gameState: GameState,
  hexBoardGraph: HexBoardGraph,
  stoneColor: StoneColor,
  currentCell: Coordinates,
  neighbor: Coordinates
) {
  if (doesCellExistAndHaveStone(gameState, neighbor, stoneColor)) {
    addBidirectionalEdge(
      hexBoardGraph,
      `${currentCell.y}-${currentCell.x}`,
      `${neighbor.y}-${neighbor.x}`
    );
  }
}

function addVertex(hexBoardGraph: HexBoardGraph, id: string) {
  hexBoardGraph.vertexMap.set(id, hexBoardGraph.graph.addVertex(id));
}

function addEdge(
  hexBoardGraph: HexBoardGraph,
  vertex1: string,
  vertex2: string
) {
  hexBoardGraph.graph.addEdge(
    hexBoardGraph.vertexMap.get(vertex1),
    hexBoardGraph.vertexMap.get(vertex2),
    1
  );
}

function addBidirectionalEdge(
  hexBoardGraph: HexBoardGraph,
  vertex1: string,
  vertex2: string
) {
  hexBoardGraph.graph.addEdgePair(
    hexBoardGraph.vertexMap.get(vertex1),
    hexBoardGraph.vertexMap.get(vertex2),
    1
  );
}
