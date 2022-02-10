import { program } from "commander";
import { parseGameStateFromFile } from "./parseConfigFile";
import { playerHasWon, generateNewBoard } from "./gameState";
import { runGameLoop } from "./game";

program.option(
  "-f, --file <filePath>",
  "define the config file to use as default board"
);

program.parse();

const params = program.opts();
const filePath = params.file || undefined;

let gameState;
if (filePath) {
  console.debug(`Using config file: ${filePath}`);
  gameState = parseGameStateFromFile(filePath);
} else {
  console.log("No config file was provided. Initializing board from scratch..");
  gameState = generateNewBoard();
}

runGameLoop(gameState);
