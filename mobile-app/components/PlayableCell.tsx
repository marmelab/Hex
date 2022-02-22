import * as React from 'react';
import { Polygon } from 'react-native-svg';

interface PlayableCellData {
  svgPoints: string;
  strokeColor: string;
  cellColor: string;
  onCellPress: () => void;
}

export default function PlayableCell(props: PlayableCellData) {
  return (
    <Polygon
      points={props.svgPoints}
      stroke={props.strokeColor}
      fill={props.cellColor}
      onClick={() => props.onCellPress()}
    />)
}