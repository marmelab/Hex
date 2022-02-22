import * as React from 'react';
import { Polygon } from 'react-native-svg';
import type { Cell } from '../../web-app/src/common/gameState';
import { DEFAULT_CELL_COLOR, PLAYER_1_CELL_COLOR, PLAYER_2_CELL_COLOR } from "../utils";

interface PlayableCellData {
  svgPoints: string;
  strokeColor: string;
  cellValue: Cell;
  onCellPress: () => void;
}

export default function PlayableCell(props: PlayableCellData) {
  return (
    <Polygon
      points={props.svgPoints}
      stroke={props.strokeColor}
      fill={getPawnColor(props.cellValue)}
      onClick={() => props.onCellPress()}
      onPress={() => props.onCellPress()}
    />)
}

function getPawnColor(cellValue: Cell) {
  return cellValue.value == "white" ? PLAYER_1_CELL_COLOR : cellValue.value == "black" ? PLAYER_2_CELL_COLOR : DEFAULT_CELL_COLOR;
}
