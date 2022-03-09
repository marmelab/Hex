import * as blessed from 'blessed';
import { Cell, cellHasStone, GameState, updateGameState } from './gameState';
import { UTF16_CODE_OF_LETTER_A } from './utils';

const CELL_WIDTH = 2;
const CELL_HEIGHT = 1;
const PADDING_WIDTH = 3;
const PADDING_HEIGHT = 2;
const RENDERED_STONE = '⬢';
const RENDERED_NO_STONE = '⬡';
const RENDERED_SPACE = ' ';
const TEXT_LEFT_OFFSET = -30;
const HOVER_FG_COLOR = '#999999';

export function initScreen(): blessed.Widgets.Screen {
  const screen = blessed.screen({
    smartCSR: true,
  });
  // Quit on Escape, q, or Control-C.
  screen.key(['escape', 'q', 'C-c'], function (ch, key) {
    return process.exit(0);
  });
  return screen;
}

export function renderBoard(
  gameState: GameState,
  screen: blessed.Widgets.Screen,
) {
  const boardLayout = createBoardOuterLayout(gameState);

  // For each column
  gameState.board[0].forEach((_, x) => {
    createColumnHeaderLabel(boardLayout, x);
    createBoardTopEdge(boardLayout, x);
    createBoardBottomEdge(boardLayout, gameState, x);
  });

  // For each row
  gameState.board.forEach((row, y) => {
    createRowHeaderLabel(boardLayout, y);
    row.forEach((_, x) => {
      boardLayout.append(createCell(gameState, screen, x, y));
    });
    createBoardLeftEdge(boardLayout, y);
    createBoardRightEdge(boardLayout, y, gameState);
  });

  boardLayout.append(createGameTitleLabel());
  boardLayout.append(createCurrentPlayerMsg(gameState));

  // Add msg to tell if so has won
  if (gameState.winner) {
    boardLayout.append(createWinMsg(gameState));
    boardLayout.append(createHelpMsg(gameState));
  }

  screen.append(boardLayout);
  screen.render();
}

function createGameTitleLabel() {
  return blessed.text({
    top: 0,
    left: TEXT_LEFT_OFFSET,
    content: 'The Game of Hex',
    tags: true,
  });
}

function createBoardRightEdge(
  boardLayout: blessed.Widgets.BoxElement,
  y: number,
  gameState: GameState,
) {
  boardLayout.append(
    blessed.text({
      top: (y + 2) * CELL_HEIGHT,
      left:
        (2 + gameState.board.length) * CELL_WIDTH + ((y + 1) * CELL_WIDTH) / 2,
      content: ' \\',
      tags: true,
      style: {
        fg: 'black',
        bg: 'gray',
      },
    }),
  );
}

function createBoardLeftEdge(
  boardLayout: blessed.Widgets.BoxElement,
  y: number,
) {
  boardLayout.append(
    blessed.text({
      top: (y + 2) * CELL_HEIGHT,
      left: CELL_WIDTH + (y * CELL_WIDTH) / 2,
      content: ' \\',
      tags: true,
      style: {
        fg: 'black',
        bg: 'gray',
      },
    }),
  );
}

function createRowHeaderLabel(
  boardLayout: blessed.Widgets.BoxElement,
  y: number,
) {
  boardLayout.append(
    blessed.text({
      top: (y + 2) * CELL_HEIGHT,
      left: (y * CELL_WIDTH) / 2,
      content: getRowLabelDisplayContent(y),
      tags: true,
      style: {
        fg: 'black',
        bg: 'gray',
      },
    }),
  );
}

function createBoardBottomEdge(
  boardLayout: blessed.Widgets.BoxElement,
  gameState: GameState,
  x: number,
) {
  boardLayout.append(
    blessed.text({
      top: (gameState.board.length + 2) * CELL_HEIGHT,
      left:
        (x + 2) * CELL_WIDTH + ((gameState.board.length + 1) * CELL_WIDTH) / 2,
      content: ' -',
      tags: true,
      style: {
        fg: 'white',
        bg: 'gray',
      },
    }),
  );
}

function createBoardTopEdge(
  boardLayout: blessed.Widgets.BoxElement,
  x: number,
) {
  boardLayout.append(
    blessed.text({
      top: CELL_HEIGHT,
      left: (x + 2) * CELL_WIDTH,
      content: ' -',
      tags: true,
      style: {
        fg: 'white',
        bg: 'gray',
      },
    }),
  );
}

function createColumnHeaderLabel(
  boardLayout: blessed.Widgets.BoxElement,
  x: number,
) {
  boardLayout.append(
    blessed.text({
      top: 0,
      left: (x + 2) * CELL_WIDTH,
      content: getColLabelDisplayContent(x),
      tags: true,
      style: {
        fg: 'black',
        bg: 'gray',
      },
    }),
  );
}

function createBoardOuterLayout(gameState: GameState) {
  return blessed.box({
    top: 'center',
    left: 'center',
    width: CELL_WIDTH * (gameState.board.length + 3) * 1.5 + PADDING_WIDTH,
    height: CELL_HEIGHT * (gameState.board.length + 3) + PADDING_HEIGHT,
    tags: true,
    border: {
      type: 'line',
    },
    style: {
      border: {
        fg: 'white',
      },
      bg: 'gray',
    },
  });
}

function createCurrentPlayerMsg(
  gameState: GameState,
): blessed.Widgets.TextElement {
  return blessed.text({
    top: 'center',
    left: TEXT_LEFT_OFFSET,
    content: `{bold}${gameState.turn.toUpperCase()}{/bold} turn to play`,
    tags: true,
  });
}

function createWinMsg(gameState: GameState): blessed.Widgets.TextElement {
  const winner = gameState.winner;
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
    content: 'Press q to exit',
    tags: true,
    style: {
      fg: 'gray',
    },
  });
}

function createCell(
  gameState: GameState,
  screen: blessed.Widgets.Screen,
  x: number,
  y: number,
): blessed.Widgets.TextElement {
  // Create cell text element
  const cellBox = blessed.text({
    top: (y + 2) * CELL_HEIGHT,
    left: (x + 2) * CELL_WIDTH + (y * CELL_WIDTH) / 2,
    content: getCellDisplayContent(gameState.board[y][x]),
    tags: true,
    style: {
      fg: getCellDisplayColor(gameState.board[y][x]),
      bg: 'gray',
      hover: {
        // Add hover effect only if cell is playable
        fg:
          !cellHasStone(gameState.board, { x, y }) && !gameState.winner
            ? HOVER_FG_COLOR
            : getCellDisplayColor(gameState.board[y][x]),
      },
    },
  });
  // If cell is playable, add "on-click" event to it
  if (!cellHasStone(gameState.board, { x, y }) && !gameState.winner) {
    cellBox.on('click', () => {
      gameState = updateGameState(gameState, { x, y });
      renderBoard(gameState, screen);
    });
  }
  return cellBox;
}

function getCellDisplayContent(cell: Cell): string {
  return (
    RENDERED_SPACE +
    (cell.value == 'empty' ? RENDERED_NO_STONE : RENDERED_STONE)
  );
}

function getCellDisplayColor(cell: Cell): string {
  return cell.value == 'black' ? 'black' : 'white';
}

function getRowLabelDisplayContent(rowNumber: number): string {
  return RENDERED_SPACE + String(rowNumber + 1);
}

function getColLabelDisplayContent(colNumber: number): string {
  return (
    RENDERED_SPACE + String.fromCharCode(colNumber + UTF16_CODE_OF_LETTER_A)
  );
}
