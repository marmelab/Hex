import { parseGameStateFromFile } from "./parseConfigFile";
import { displayGameState } from "./render";

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

// Check mandatory parameters
if (!filePath) {
  console.error("No config file was provided");
  console.error("usage: yarn start -f=myconfigfile");
  throw Error("No config file was provided");
}

let gameState = parseGameStateFromFile(filePath);

displayGameState(gameState);
