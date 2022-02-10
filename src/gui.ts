import * as blessed from "blessed";
import { Cell, GameState } from "./gamestate";

const CELL_WIDTH = 2;
const CELL_HEIGHT = 1;
const PADDING_WIDTH = 3;
const PADDING_HEIGHT = 2;

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

export function renderBoard(gameState: GameState, screen: blessed.Widgets.Screen) {

  const boardLayout = blessed.box({
    top: 'center',
    left: 'center',
    width: CELL_WIDTH * gameState.board.length * 1.5 + PADDING_WIDTH,
    height: CELL_HEIGHT * gameState.board.length + PADDING_HEIGHT,
    tags: true,
    border: {
      type: 'line',
    },
    style: {
      border: {
        fg: 'white',
      },
    },
  });

  gameState.board.forEach((line, y) => {
    line.forEach((_, x) => {
      boardLayout.append(createBoxForCell(gameState, screen, x, y));
    })
  })

  screen.append(boardLayout);

  screen.render();
}

function createBoxForCell(gameState: GameState, screen: blessed.Widgets.Screen, x: number, y: number): blessed.Widgets.BoxElement {
  const cellBox = blessed.box({
    top: y * CELL_HEIGHT,
    left: x * CELL_WIDTH + y * CELL_WIDTH / 2,
    width: CELL_WIDTH,
    height: CELL_HEIGHT,
    content: getCellDisplayContent(gameState.board[y][x]),
    tags: true,
    style: {
      fg: 'white'
    }
  });
  cellBox.on('click', () => {
    handleClick(gameState, x, y);
    renderBoard(gameState, screen);
  });
  return cellBox;
}

function getCellDisplayContent(cell: Cell): string {
  return cell.value == "black" ? ' ⬢' : ' ⬡';
}

function handleClick(gameState: GameState, x: number, y: number) {
  gameState.board[y][x].value = "black";
}