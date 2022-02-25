import * as React from 'react';
import { Polygon } from 'react-native-svg';
import { Coordinates, Cell } from '../../../utils';
import { getStoneColor } from './playableCellService';

interface PlayableCellProps {
  svgPoints: string;
  strokeColor: string;
  cellValue: Cell;
  onCellPress: () => void;
  isWinningCell: boolean;
}

export default function PlayableCell({ svgPoints, strokeColor, cellValue, onCellPress, isWinningCell }: PlayableCellProps) {
  return (
    cellValue.value === "empty" ?
      <Polygon
        points={svgPoints}
        stroke={strokeColor}
        fill={getStoneColor(cellValue)}
        onClick={onCellPress}
        onPress={onCellPress}
      />
      :
      <Polygon
        points={svgPoints}
        stroke={strokeColor}
        fill={getStoneColor(cellValue, isWinningCell)}
      />
  )
}
