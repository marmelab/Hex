import * as React from 'react';
import { Polygon } from 'react-native-svg';

interface CellData {
  svgPoints: string;
  strokeColor: string;
  fillColor: string;
}

export default function Cell(props: CellData) {
  return (
    <Polygon points={props.svgPoints} stroke={props.strokeColor} fill={props.fillColor} />
  )
}