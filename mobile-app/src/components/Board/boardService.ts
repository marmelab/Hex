import {
  RenderedCellType,
  GameState,
  Coordinates,
  StoneColor,
} from '../../../utils';

export const CELL_STROKE_COLOR = 'grey';
export const CELL_SIZE = 20;
export const DISTANCE_BETWEEN_HEXAGON_PARALLEL_SIDES = Math.sqrt(3);
export const HEXAGON_OFFSET =
  (DISTANCE_BETWEEN_HEXAGON_PARALLEL_SIDES * CELL_SIZE) / 2;

export function getApproximateSvgSize(boardSize: number) {
  return boardSize * CELL_SIZE * 3;
}

export function generateBoardCells(
  gameState: GameState,
): {
  withoutBorderCoordinates: Coordinates;
  svgPointsToDraw: string;
  type: RenderedCellType;
}[] {
  const cells = [];
  const sizeWithBorder = gameState.board.length + 2;
  for (let col = 0; col < sizeWithBorder; col += 1) {
    for (let row = 0; row < sizeWithBorder; row += 1) {
      if (!isCellAtTopLeftOrBottomRight(col, row, sizeWithBorder)) {
        const rowShifter = HEXAGON_OFFSET * row;
        const svgX = HEXAGON_OFFSET * (1 + col) * 2 + rowShifter;
        const svgY =
          HEXAGON_OFFSET * (1 + row) * DISTANCE_BETWEEN_HEXAGON_PARALLEL_SIDES;
        cells.push({
          withoutBorderCoordinates: { x: col - 1, y: row - 1 },
          svgPointsToDraw: getSvgPoints(svgX, svgY),
          type: getCellType(col, row, sizeWithBorder),
        });
      }
    }
  }
  return cells;
}

export function mapStoneColorToPlayerName(stoneColor: StoneColor) {
  return stoneColor === 'white' ? 'Red' : 'Blue';
}

function getSvgPoints(x: any, y: any): string {
  const points = [];
  for (let theta = 0; theta < Math.PI * 2; theta += Math.PI / 3) {
    let pointX = x + CELL_SIZE * Math.sin(theta);
    let pointY = y + CELL_SIZE * Math.cos(theta);
    points.push(pointX + ',' + pointY);
  }
  return points.join(' ');
}

function isCellAtTopLeftOrBottomRight(
  col: number,
  row: number,
  boardSizeWithBorder: number,
) {
  return (
    (col === 0 && row === 0) ||
    (col === boardSizeWithBorder - 1 && row === boardSizeWithBorder - 1)
  );
}

function getCellType(
  col: number,
  row: number,
  boardSizeWithBorder: number,
): RenderedCellType {
  return row === 0 || row === boardSizeWithBorder - 1
    ? 'player1Border'
    : (col === 0 && row !== boardSizeWithBorder - 1) ||
      (col === boardSizeWithBorder - 1 && row !== 0)
    ? 'player2Border'
    : 'playable';
}
