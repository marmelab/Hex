import * as React from 'react';
import Svg from 'react-native-svg';
import PlayableCell from './PlayableCell';
import BorderCell from './BorderCell';
import { GameState } from '../../web-app/src/common/gameState';
import { CellType } from "../utils";

const CELL_STROKE_COLOR = "white";
const CELL_SIZE = 20;
const DISTANCE_BETWEEN_HEXAGONE_PARALLEL_SIDES = Math.sqrt(3);
const HEXAGONE_OFFSET = DISTANCE_BETWEEN_HEXAGONE_PARALLEL_SIDES * CELL_SIZE / 2;

interface BoardProps {
  gameState: GameState;
}

export default function Board({ gameState }: BoardProps) {
  const svgSize = getApproximateSvgSize(gameState.board.length);
  return (
    <Svg width={svgSize} height={svgSize}>
      {
        generateBoardCells(gameState).map(({ withoutBorderCoordinates, svgPointsToDraw, type }, index) => (
          type === "playable" ?
            <PlayableCell
              key={index}
              svgPoints={svgPointsToDraw}
              strokeColor={CELL_STROKE_COLOR}
              cellValue={gameState.board[withoutBorderCoordinates.y][withoutBorderCoordinates.x]}
              onCellPress={() => onCellPress(withoutBorderCoordinates)}
            />
            :
            <BorderCell
              key={index}
              svgPoints={svgPointsToDraw}
              strokeColor={CELL_STROKE_COLOR}
              playerBorder={type}
            />
        ))
      }
    </Svg >
  );
}

function getApproximateSvgSize(boardSize: number) {
  return boardSize * CELL_SIZE * 3;
}

function onCellPress(coordinates: { x: number, y: number }) {
  alert(`x:${coordinates.x} y:${coordinates.y}`)
}

function generateBoardCells(gameState: GameState): { withoutBorderCoordinates: { x: number, y: number }, svgPointsToDraw: string, type: CellType }[] {
  const cells = [];
  const sizeWithBorder = gameState.board.length + 2;
  for (let col = 0; col < sizeWithBorder; col += 1) {
    for (let row = 0; row < sizeWithBorder; row += 1) {
      if (!isCellAtTopLeftOrBottomRight(col, row, sizeWithBorder)) {
        const rowShifter = HEXAGONE_OFFSET * row;
        const svgX = HEXAGONE_OFFSET * (1 + col) * 2 + rowShifter;
        const svgY = HEXAGONE_OFFSET * (1 + row) * DISTANCE_BETWEEN_HEXAGONE_PARALLEL_SIDES;
        cells.push({
          withoutBorderCoordinates: { x: col - 1, y: row - 1 },
          svgPointsToDraw: getSvgPoints(svgX, svgY),
          type: getCellType(col, row, sizeWithBorder)
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
  return (col === 0 && row === 0 || col === boardSizeWithBorder - 1 && row === boardSizeWithBorder - 1);
}

function getCellType(col: number, row: number, boardSizeWithBorder: number): CellType {
  return row === 0 || row === boardSizeWithBorder - 1 ?
    "player2Border" :
    col === 0 && row != boardSizeWithBorder - 1 || col === boardSizeWithBorder - 1 && row != 0 ?
      "player1Border" :
      "playable";
}
