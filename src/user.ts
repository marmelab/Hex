import { createInterface } from "readline";
import { StoneColor } from "./gameState";
import { UTF16_CODE_OF_LETTER_A, Coordinates } from "./utils";

export function getBoardCoordinatesFromUserInput(
  userInput: string
): Coordinates {
  const regexValidationUserInput = /^([A-Z][0-9]*)$/;
  if (!regexValidationUserInput.test(userInput)) {
    throw new Error(
      `Given coordinates aren't valid. Must be something like "H4"`
    );
  } else {
    const x = userInput[0].charCodeAt(0) - UTF16_CODE_OF_LETTER_A;
    const y = parseInt(userInput.slice(1, userInput.length)) - 1;
    return { x, y };
  }
}

export function askCellCoordinatesToUser(
  stoneUser: StoneColor
): Promise<string> {
  const readline = createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) => {
    readline.question(
      `$Hey ${
        stoneUser == "black" ? "Black" : "White"
      } where would you like to put your stone ? `,
      (cellCoordinates) => {
        readline.close();
        resolve(cellCoordinates);
      }
    );
  });
}
