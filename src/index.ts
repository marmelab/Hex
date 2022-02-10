import { parseGameStateFromFile } from "./parseConfigFile";
import { generateNewBoard } from "./gameState";
import { initScreen } from "./gui";
import { renderBoardAndLoop } from "./gui";

// Config vars
let filePath: string;

// Parse cmd line args
process.argv.forEach((arg, i) => {
  if (i > 1) {
    // Ignore first two args
    if (arg.startsWith("-f=")) {
      filePath = arg.substring(3);
      console.debug(`Using config file: ${filePath}`);
    }
  }
});

let gameState;
if (filePath) {
  gameState = parseGameStateFromFile(filePath);
} else {
  console.log("No config file was provided. Initializing board from scratch..");
  gameState = generateNewBoard();
}

const screen = initScreen();
renderBoardAndLoop(gameState, screen);


