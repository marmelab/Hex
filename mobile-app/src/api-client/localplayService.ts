import { GameState, Coordinates } from "../../utils";
import { HEX_API_URL } from "@env"

const LOCALPLAY_GAMES_ENDPOINT = "/localplay/games";

export async function initNewGameState(size?: number): Promise<GameState> {
  const response = await fetch(`${HEX_API_URL}${LOCALPLAY_GAMES_ENDPOINT}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      size,
    })
  });
  return await response.json();
}

export async function updateGameState(
  previousGameState: GameState,
  nextMove: Coordinates): Promise<GameState> {
  const response = await fetch(`${HEX_API_URL}${LOCALPLAY_GAMES_ENDPOINT}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      previousGameState,
      nextMove
    })
  });
  return await response.json();
}

