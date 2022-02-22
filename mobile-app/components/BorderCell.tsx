import * as React from 'react';
import { Polygon } from 'react-native-svg';
import { PLAYER_1_CELL_COLOR, PLAYER_2_CELL_COLOR } from "../utils";
import { CellType } from "../utils";

interface BorderCellData {
  svgPoints: string;
  strokeColor: string;
  playerBorder: CellType;
}


export default function BorderCell({ svgPoints, strokeColor, playerBorder }: BorderCellData) {
  return (
    <Polygon points={svgPoints} stroke={strokeColor} fill={getBorderColor(playerBorder)} />
  )
}

function getBorderColor(cellType: CellType) {
  return cellType == "player1Border" ? PLAYER_1_CELL_COLOR : PLAYER_2_CELL_COLOR;
}
