import { GameState, Coordinates } from "../../utils";
import { callAPI } from "./hexApiService";

const LOCALPLAY_GAMES_ENDPOINT = "/localplay/games";

export async function initNewGameState(size?: number): Promise<GameState> {
  return await callAPI(LOCALPLAY_GAMES_ENDPOINT, 'POST', {
    size,
  });
}

export async function updateGameState(
  previousGameState: GameState,
  nextMove: Coordinates): Promise<GameState> {
  return await callAPI(LOCALPLAY_GAMES_ENDPOINT, 'PUT', {
    previousGameState,
    nextMove
  });
}

