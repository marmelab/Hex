import { HEX_API_URL } from "@env"
import { Game } from "../../utils";
import { getJwt } from "./deviceStorageService";

export async function callAPIWithBody(endpoint: string, method: string, body: any, auth?: boolean): Promise<any> {
  const requestBody = JSON.stringify(body);
  console.log(`Call to ${method} ${endpoint} - Request: ${requestBody}`);
  const headers: HeadersInit = {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  };
  if (auth) {
    headers.Authorization = `Bearer ${await getJwt()}`;
  }
  const response = await fetch(`${HEX_API_URL}${endpoint}`, {
    method,
    headers,
    body: requestBody
  });
  const responseBody = await response.json();
  console.log(`Call to ${method} ${endpoint} - Response: ${JSON.stringify(responseBody)}`);
  if (responseBody.statusCode && responseBody.message) {
    // This is probably an error
    console.error(`Call to ${method} ${endpoint} - Recieved ERROR from Hex API: ${responseBody.message}`);
    throw Error(responseBody.message);
  }
  return responseBody;
}

export async function loginAndGetJwt(login: string, password: string): Promise<string> {
  const response = await callAPIWithBody("/auth/login", "POST", {
    username: login,
    password
  });
  return response.access_token;
}

export async function initNewGame(size: number): Promise<Game> {
  return await callAPIWithBody("/games", "POST", {
    size
  }, true);
}
