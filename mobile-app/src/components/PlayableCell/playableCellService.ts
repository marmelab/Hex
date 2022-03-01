import {
  DEFAULT_CELL_COLOR,
  PLAYER_1_CELL_COLOR,
  PLAYER_2_CELL_COLOR,
  Cell,
  Coordinates,
} from '../../../utils';
import { CELL_SIZE } from '../Board/boardService';

export const WINNING_CIRCLE_SIZE = CELL_SIZE / 2;

export function getStoneColor(cellValue: Cell) {
  return cellValue.value === 'white'
    ? PLAYER_1_CELL_COLOR
    : cellValue.value === 'black'
    ? PLAYER_2_CELL_COLOR
    : DEFAULT_CELL_COLOR;
}

export function getCenterOfPoints(svgPoints: string): Coordinates {
  const stringCoords = svgPoints.split(' ');
  const stringCoordsWithoutDuplicateStartEnd = stringCoords.slice(
    0,
    stringCoords.length - 1,
  );
  const coordinates = stringCoordsWithoutDuplicateStartEnd.map((coord) => ({
    x: parseFloat(coord.split(',')[0]),
    y: parseFloat(coord.split(',')[1]),
  }));
  const sumCoordinates = coordinates.reduce((previous, current) => ({
    x: previous.x + current.x,
    y: previous.y + current.y,
  }));
  return {
    x: sumCoordinates.x / stringCoordsWithoutDuplicateStartEnd.length,
    y: sumCoordinates.y / stringCoordsWithoutDuplicateStartEnd.length,
  };
}
