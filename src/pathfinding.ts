import * as jkstra from "jkstra";
import { HexBoardGraph } from "./graph";

export function doesPathExist(
  hexBoardGraph: HexBoardGraph,
  startNodeId: string,
  endNodeId: string
): boolean {
  const dijkstra = new jkstra.algos.Dijkstra(hexBoardGraph.graph);
  return dijkstra.shortestPath(
    hexBoardGraph.vertexMap.get(startNodeId),
    hexBoardGraph.vertexMap.get(endNodeId)
  );
}
