import * as blessed from "blessed";
import { Cell, doesCellHaveStone, GameState, playerHasWon, someoneWon, updateGameState, whoHasWon } from "./gameState";
import { UTF16_CODE_OF_LETTER_A } from "./utils";

const CELL_WIDTH = 2;
const CELL_HEIGHT = 1;
const PADDING_WIDTH = 3;
const PADDING_HEIGHT = 2;
const RENDERED_STONE = "⬢";
const RENDERED_NO_STONE = "⬡";
const RENDERED_SPACE = " ";
const TEXT_LEFT_OFFSET = -30;

export function initScreen(): blessed.Widgets.Screen {
  const screen = blessed.screen({
    smartCSR: true
  });
  // Quit on Escape, q, or Control-C.
  screen.key(['escape', 'q', 'C-c'], function (ch, key) {
    return process.exit(0);
  });
  return screen;
}

export function renderBoardAndLoop(
  gameState: GameState,
  screen: blessed.Widgets.Screen
) {

  const boardLayout = blessed.box({
    top: 'center',
    left: 'center',
    width: CELL_WIDTH * (gameState.board.length + 1) * 1.5 + PADDING_WIDTH,
    height: CELL_HEIGHT * (gameState.board.length + 1) + PADDING_HEIGHT,
    tags: true,
    border: {
      type: 'line',
    },
    style: {
      border: {
        fg: 'white',
      },
      bg: 'gray'
    },
  });

  // Create col header labels
  gameState.board[0].forEach((_, x) => {
    boardLayout.append(blessed.text({
      top: 0,
      left: (x + 1) * CELL_WIDTH,
      content: getColNameDisplayContent(x),
      tags: true,
      style: {
        fg: 'black',
        bg: 'gray'
      }
    }));
  });

  gameState.board.forEach((line, y) => {
    // Create line header label
    boardLayout.append(blessed.text({
      top: (y + 1) * CELL_HEIGHT,
      left: y * CELL_WIDTH / 2,
      content: getRowNameDisplayContent(y),
      tags: true,
      style: {
        fg: 'black',
        bg: 'gray'
      }
    }));
    // Create line cells
    line.forEach((_, x) => {
      boardLayout.append(createBoxForCell(gameState, screen, x, y));
    })
  });

  const text = blessed.text({
    top: 0,
    left: TEXT_LEFT_OFFSET,
    content: "The Game of Hex",
    tags: true,
  });
  boardLayout.append(text);

  // Add player turn label
  boardLayout.append(createBoxForPlayerTurn(gameState));

  // Add msg to tell if so has won
  if (someoneWon(gameState)) {
    boardLayout.append(createWinMsg(gameState));
    boardLayout.append(createHelpMsg(gameState));
  }

  screen.append(boardLayout);

  screen.render();
}

function createBoxForPlayerTurn(gameState: GameState): blessed.Widgets.TextElement {
  return blessed.text({
    top: 'center',
    left: TEXT_LEFT_OFFSET,
    content: `{bold}${gameState.turn}{/bold} turn to play`,
    tags: true,
  });
}

function createWinMsg(gameState: GameState): blessed.Widgets.TextElement {
  const winner = whoHasWon(gameState);
  return blessed.text({
    top: CELL_HEIGHT * (gameState.board.length - 1),
    left: TEXT_LEFT_OFFSET,
    content: `Player {bold}${winner}{/bold} has won!`,
    tags: true,
  });
}
function createHelpMsg(gameState: GameState): blessed.Widgets.TextElement {
  return blessed.text({
    top: CELL_HEIGHT * gameState.board.length,
    left: TEXT_LEFT_OFFSET,
    content: "Press q to exit",
    tags: true,
    style: {
      fg: "gray"
    }
  });
}

function createBoxForCell(gameState: GameState,
  screen: blessed.Widgets.Screen,
  x: number,
  y: number
): blessed.Widgets.TextElement {
  const cellBox = blessed.text({
    top: (y + 1) * CELL_HEIGHT,
    left: (x + 1) * CELL_WIDTH + y * CELL_WIDTH / 2,
    content: getCellDisplayContent(gameState.board[y][x]),
    tags: true,
    style: {
      fg: getCellDisplayColor(gameState.board[y][x]),
      bg: 'gray'
    }
  });
  if (!doesCellHaveStone(gameState, { x, y }) && !someoneWon(gameState)) {
    cellBox.on('click', () => {
      gameState = updateGameState(gameState, { x, y });
      renderBoardAndLoop(gameState, screen);
    });
  }
  return cellBox;
}

function getCellDisplayContent(cell: Cell): string {
  return RENDERED_SPACE + (cell.value == "empty" ? RENDERED_NO_STONE : RENDERED_STONE);
}

function getCellDisplayColor(cell: Cell): string {
  return cell.value == "black" ? "black" : "white";
}

function getRowNameDisplayContent(rowNumber: number): string {
  return RENDERED_SPACE + String(rowNumber + 1);
}

function getColNameDisplayContent(colNumber: number): string {
  return RENDERED_SPACE + String.fromCharCode(colNumber + UTF16_CODE_OF_LETTER_A);
}