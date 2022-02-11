import { program } from "commander";
import { parseGameStateFromFile } from "./parseConfigFile";
import { initScreen } from "./gui";
import { renderBoardAndLoop } from "./gui";
import { generateNewBoard } from "./gameState";
import { exit } from "process";

const DEFAULT_BOARD_SIZE = 19;

program
  .option(
    "-f, --file <filePath>",
    "define the config file to use as default board"
  )
  .option("-s, --size <Size>", "define the size of the board(square)");

program.parse();

const params = program.opts();
const filePath = params.file || undefined;
const boardSize = params.size || undefined;

if (filePath && boardSize) {
  console.error(
    "You can't defined a board size AND a config at the same time. Please restart the game with only one of those."
  );
  exit();
}

let gameState;
if (filePath) {
  console.debug(`Using config file: ${filePath}`);
  gameState = parseGameStateFromFile(filePath);
} else {
  console.log("No config file was provided. Initializing board from scratch..");
  const userBoardSizeOrDefault = isNaN(boardSize)
    ? DEFAULT_BOARD_SIZE
    : parseInt(boardSize);
  if (userBoardSizeOrDefault < 2) {
    console.error("Board size need to be >= 2. Please restart the game.");
    exit();
  }
  gameState = generateNewBoard(userBoardSizeOrDefault);
}

const screen = initScreen();
renderBoardAndLoop(gameState, screen);
