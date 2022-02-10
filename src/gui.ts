import * as blessed from "blessed";
import { GameEvent } from "./game";
import { Cell, doesCellHaveStone, GameState } from "./gameState";

const CELL_WIDTH = 2;
const CELL_HEIGHT = 1;
const PADDING_WIDTH = 3;
const PADDING_HEIGHT = 2;
const RENDERED_STONE = "⬢";
const RENDERED_NO_STONE = "⬡";
const RENDERED_SPACE = " ";

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
  screen: blessed.Widgets.Screen,
  gameEventHandler: { (previousState: GameState, event: GameEvent): void },
  winDetectionHandler: { (gameState: GameState): boolean }
) {

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
      boardLayout.append(createBoxForCell(gameState, screen, x, y, gameEventHandler, winDetectionHandler));
    })
  })

  screen.append(boardLayout);

  if (winDetectionHandler(gameState)) {
    screen.destroy();
  } else {
    screen.render();
  }
}

function createBoxForCell(gameState: GameState,
  screen: blessed.Widgets.Screen,
  x: number,
  y: number,
  gameEventHandler: { (previousState: GameState, event: GameEvent): void },
  winDetectionHandler: { (gameState: GameState): boolean }
): blessed.Widgets.BoxElement {
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
  if (!doesCellHaveStone(gameState, { x, y })) {
    cellBox.on('click', () => {
      const event: GameEvent = {
        type: "click",
        coords: { x, y }
      };
      gameEventHandler(gameState, event);
      renderBoardAndLoop(gameState, screen, gameEventHandler, winDetectionHandler);
    });
  }
  return cellBox;
}

function getCellDisplayContent(cell: Cell): string {
  return RENDERED_SPACE + (cell.value == "black" ? RENDERED_STONE : RENDERED_NO_STONE);
}
