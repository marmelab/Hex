import { HEX_API_URL } from "@env"

export async function callAPIWithBody(endpoint: string, method: string, body: any): Promise<any> {
  const requestBody = JSON.stringify(body);
  console.log(`Call to ${method} ${endpoint} - Request: ${requestBody}`);
  const response = await fetch(`${HEX_API_URL}${endpoint}`, {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: requestBody
  });
  const responseBody = await response.json();
  console.log(`Call to ${method} ${endpoint} - Response: ${JSON.stringify(responseBody)}`);
  if (responseBody.statusCode && String(responseBody.statusCode).match(/5[0-9]{2}/) && responseBody.message) {
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

