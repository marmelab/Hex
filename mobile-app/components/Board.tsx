import * as React from 'react';
import Svg from 'react-native-svg';
import PlayableCell from './PlayableCell';
import BorderCell from './BorderCell';

const CELL_STROKE_COLOR = "white";
const CELL_SIZE = 20;
export const DEFAULT_CELL_COLOR = "black";
export const PLAYER_1_CELL_COLOR = "blue";
export const PLAYER_2_CELL_COLOR = "red";

type TypeCell = "player1Border" | "player2Border" | "playable";

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
              svgPoints={cell.svgPoints}
              strokeColor={CELL_STROKE_COLOR}
              cellColor={DEFAULT_CELL_COLOR}
              onCellPress={() => onCellPress(cell.coordinates)}
            />
            :
            <BorderCell
              svgPoints={cell.svgPoints}
              strokeColor={CELL_STROKE_COLOR}
              boardSize={props.boardSize}
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

function generateBoardCells(size: number): { coordinates: { x: number, y: number }, svgPoints: string, typeCell: TypeCell }[] {
  const cells = [];
  const sizeWithBorder = size + 2;
  const offset = (Math.sqrt(3) * CELL_SIZE) / 2;
  for (let col = 0; col < sizeWithBorder; col += 1) {
    for (let row = 0; row < sizeWithBorder; row += 1) {
      if (!isCellAtTopLeftOrBottomRight(col, row, sizeWithBorder)) {
        const x = offset * (1 + col) * 2 + offset * row;
        const y = offset * (1 + row) * Math.sqrt(3);
        cells.push({ coordinates: { x: col - 1, y: row - 1 }, svgPoints: getSvgPoints(x, y), typeCell: getTypeCell(col, row, sizeWithBorder) });
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

function getTypeCell(col: number, row: number, boardSizeWithBorder: number): TypeCell {
  return row == 0 || row == boardSizeWithBorder - 1 ?
    "player2Border" :
    col == 0 && row != boardSizeWithBorder - 1 || col == boardSizeWithBorder - 1 && row != 0 ?
      "player1Border" :
      "playable";
}