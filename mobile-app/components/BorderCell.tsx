import * as React from 'react';
import { Polygon } from 'react-native-svg';
import { PLAYER_1_CELL_COLOR, PLAYER_2_CELL_COLOR, DEFAULT_CELL_COLOR } from '../utils';


interface BorderCellData {
  svgPoints: string;
  strokeColor: string;
  playerBorderColor: string;
}


export default function BorderCell(props: BorderCellData) {
  return (
    <Polygon points={props.svgPoints} stroke={props.strokeColor} fill={props.playerBorderColor} />
  )
}