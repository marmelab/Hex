import { HEX_API_URL } from "@env"
import { Coordinates, Game, GameAndStatus } from "../../utils";
import { getJwt } from "./deviceStorageService";

export async function callAPI(endpoint: string, method: string, body?: any, auth?: boolean): Promise<any> {
  const requestBody = JSON.stringify(body);
  const headers: HeadersInit = {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  };
  if (auth) {
    headers.Authorization = `Bearer ${await getJwt()}`;
  }
  const reqParams: RequestInit = {
    method,
    headers,
    body: requestBody
  };
  if (body) {
    reqParams.body = requestBody;
  }
  const response = await fetch(`${HEX_API_URL}${endpoint}`, reqParams);
  const responseBody = await response.json();
  if (responseBody.statusCode && responseBody.message) {
    console.error(`Call to ${method} ${endpoint} - Recieved ERROR from Hex API: ${responseBody.message}`);
    throw Error(responseBody.message);
  }
  return responseBody;
}

export async function loginAndGetJwt(login: string, password: string): Promise<string> {
  const response = await callAPI("/auth/login", "POST", {
    username: login,
    password
  });
  return response.access_token;
}

export async function initNewGame(size: number): Promise<Game> {
  return await callAPI("/games", "POST", {
    size
  }, true);
}

export async function updateGame(game: Game, coordinates: Coordinates): Promise<GameAndStatus> {
  return await callAPI(`/games/${game.id}`, "PUT", {
    nextMove: coordinates
  }, true);
}

export async function getGame(gameId: number): Promise<GameAndStatus> {
  return await callAPI(`/games/${gameId}`, "GET", undefined, true);
}

export async function joinGame(gameId: number) {
  await callAPI(`/games/${gameId}/join`, "GET", undefined, true);
}
