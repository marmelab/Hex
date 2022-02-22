import * as React from 'react';
import Svg from 'react-native-svg';
import PlayableCell from './PlayableCell';
import BorderCell from './BorderCell';

const CELL_STROKE_COLOR = "white";
const CELL_SIZE = 20;
const DISTANCE_BETWEEN_HEXAGONE_PARALLEL_SIDES = Math.sqrt(3);
const DEFAULT_CELL_COLOR = "black";
const PLAYER_1_CELL_COLOR = "blue";
const PLAYER_2_CELL_COLOR = "red";

type CellType = "player1Border" | "player2Border" | "playable";

interface BoardData {
  boardSize: number;
}

export default function Board(props: BoardData) {
  return (
    <Svg width="100%" height="100%">
      {
        generateBoardCells(props.boardSize).map((cell) => (
          cell.typeCell == "playable" ?
            <PlayableCell
              svgPoints={cell.svgPointsToDraw}
              strokeColor={CELL_STROKE_COLOR}
              cellColor={DEFAULT_CELL_COLOR}
              onCellPress={() => onCellPress(cell.withoutBorderCoordinates)}
            />
            :
            <BorderCell
              svgPoints={cell.svgPointsToDraw}
              strokeColor={CELL_STROKE_COLOR}
              playerBorderColor={cell.typeCell == "player1Border" ? PLAYER_1_CELL_COLOR : PLAYER_2_CELL_COLOR}
            />
        ))
      }
    </Svg >
  );
}

function onCellPress(coordinates: { x: number, y: number }) {
  alert(`x:${coordinates.x} y:${coordinates.y}`)
}

function generateBoardCells(size: number): { withoutBorderCoordinates: { x: number, y: number }, svgPointsToDraw: string, typeCell: CellType }[] {
  const cells = [];
  const sizeWithBorder = size + 2;
  const offset = (DISTANCE_BETWEEN_HEXAGONE_PARALLEL_SIDES * CELL_SIZE) / 2;
  for (let col = 0; col < sizeWithBorder; col += 1) {
    for (let row = 0; row < sizeWithBorder; row += 1) {
      if (!isCellAtTopLeftOrBottomRight(col, row, sizeWithBorder)) {
        const rowShifter = offset * row;
        const svgX = offset * (1 + col) * 2 + rowShifter;
        const svgY = offset * (1 + row) * DISTANCE_BETWEEN_HEXAGONE_PARALLEL_SIDES;
        cells.push({
          withoutBorderCoordinates: { x: col - 1, y: row - 1 },
          svgPointsToDraw: getSvgPoints(svgX, svgY),
          typeCell: getCellType(col, row, sizeWithBorder)
        });
      }
    }
  }
  return cells;
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

function isCellAtTopLeftOrBottomRight(col: number, row: number, boardSizeWithBorder: number) {
  return (col == 0 && row == 0 || col == boardSizeWithBorder - 1 && row == boardSizeWithBorder - 1);
}

function getCellType(col: number, row: number, boardSizeWithBorder: number): CellType {
  return row == 0 || row == boardSizeWithBorder - 1 ?
    "player2Border" :
    col == 0 && row != boardSizeWithBorder - 1 || col == boardSizeWithBorder - 1 && row != 0 ?
      "player1Border" :
      "playable";
}