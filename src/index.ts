import { parseGameStateFromFile } from "./parseConfigFile";
import { playerHasWon } from "./gamestate";
import { runGameLoop, generateNewBoard } from "./game";

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
  if (playerHasWon(gameState)) {
    console.log("Player has won the game!");
  }
} else {
  console.log("No config file was provided. Initializing board from scratch..");
  gameState = generateNewBoard();
}

runGameLoop(gameState);
