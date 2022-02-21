import { program } from 'commander';
import { parseGameStateFromFile } from '../common/parseConfigFile';
import { initScreen } from '../common/gui';
import { renderBoard } from '../common/gui';
import { initNewGameState, DEFAULT_BOARD_SIZE } from '../common/gameState';
import { exit } from 'process';

program
  .option(
    '-f, --file <filePath>',
    'define the config file to use as default board',
  )
  .option('-s, --size <Size>', 'define the size of the board(square)');

program.parse();

const params = program.opts();
const filePath = params.file || undefined;
const boardSize = params.size || undefined;

if (filePath && boardSize) {
  console.error(
    "You can't defined a board size AND a config at the same time. Please restart the game with only one of those.",
  );
  exit();
}

let gameState;
if (filePath) {
  console.debug(`Using config file: ${filePath}`);
  gameState = parseGameStateFromFile(filePath);
} else {
  console.log('No config file was provided. Initializing board from scratch..');
  const userBoardSizeOrDefault = isNaN(boardSize)
    ? DEFAULT_BOARD_SIZE
    : parseInt(boardSize);
  if (userBoardSizeOrDefault < 6) {
    console.error('Board size need to be >= 6. Please restart the game.');
    exit();
  }
  gameState = initNewGameState(userBoardSizeOrDefault);
}

const screen = initScreen();
renderBoard(gameState, screen);
