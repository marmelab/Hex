import * as React from 'react';
import Svg from 'react-native-svg';
import Cell from './Cell';

const DEFAULT_HEXA_COLOR = "black";
const PLAYER_1_HEXA_COLOR = "blue";
const PLAYER_2_HEXA_COLOR = "red";
const HEXA_STROKE_COLOR = "white";
const HEXA_SIZE = 20;

interface BoardData {
  boardSize: number;
}

export default function Board(props: BoardData) {
  return (
    <Svg width="100%" height="100%">
      {
        generateBoard(props.boardSize).map((hexaToDraw) => (
          <Cell svgPoints={hexaToDraw.points} strokeColor={HEXA_STROKE_COLOR} fillColor={hexaToDraw.color} />
        ))
      }
    </Svg >
  );
}

function generateBoard(size: number): { points: string, color: string }[] {
  const hexaToDraw = [];
  const sizeWithBorder = size + 2;
  const offset = (Math.sqrt(3) * HEXA_SIZE) / 2;
  for (let col = 0; col < sizeWithBorder; col += 1) {
    for (let row = 0; row < sizeWithBorder; row += 1) {
      if (!isHexaFromTopLeftOrBottomRight(col, row, sizeWithBorder)) {
        const x = offset * (1 + col) * 2 + offset * row;
        const y = offset * (1 + row) * Math.sqrt(3);
        hexaToDraw.push({ points: getSvgPoints(x, y), color: getColor(col, row, sizeWithBorder) });
      }
    }
  }
  return hexaToDraw;
}

function getSvgPoints(x: any, y: any): string {
  const points = [];
  for (let theta = 0; theta < Math.PI * 2; theta += Math.PI / 3) {
    let pointX = x + HEXA_SIZE * Math.sin(theta);
    let pointY = y + HEXA_SIZE * Math.cos(theta);
    points.push(pointX + ',' + pointY);
  }
  return points.join(' ');
}

function isHexaFromTopLeftOrBottomRight(col: number, row: number, boardSizeWithBorder: number) {
  return (col == 0 && row == 0 || col == boardSizeWithBorder - 1 && row == boardSizeWithBorder - 1);
}

function getColor(col: number, row: number, boardSizeWithBorder: number) {
  return row == 0 || row == boardSizeWithBorder - 1 ?
    PLAYER_2_HEXA_COLOR :
    col == 0 && row != boardSizeWithBorder - 1 || col == boardSizeWithBorder - 1 && row != 0 ?
      PLAYER_1_HEXA_COLOR :
      DEFAULT_HEXA_COLOR;
}
