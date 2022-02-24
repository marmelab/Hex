import { GameState, Coordinates } from "../../utils";
import { HEX_API_URL } from "@env"

const LOCALPLAY_GAMES_ENDPOINT = "/localplay/games";

export async function initNewGameState(size?: number): Promise<GameState> {
  return await callAPIWithBody(LOCALPLAY_GAMES_ENDPOINT, 'POST', {
    size,
  });
}

export async function updateGameState(
  previousGameState: GameState,
  nextMove: Coordinates): Promise<GameState> {
  return await callAPIWithBody(LOCALPLAY_GAMES_ENDPOINT, 'PUT', {
    previousGameState,
    nextMove
  });
}

async function callAPIWithBody(endpoint: string, method: string, body: any): Promise<any> {
  const response = await fetch(`${HEX_API_URL}${endpoint}`, {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
  return response.json();
}
