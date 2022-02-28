import * as React from 'react';
import { Circle, Polygon } from 'react-native-svg';
import { Cell, WINNING_CIRCLE_COLOR } from '../../../utils';
import {
  getStoneColor,
  getCenterOfPoints,
  WINNING_CIRCLE_SIZE,
} from './playableCellService';

interface PlayableCellProps {
  svgPoints: string;
  strokeColor: string;
  cellValue: Cell;
  onCellPress: () => void;
  isWinningCell: boolean;
}

export default function PlayableCell({
  svgPoints,
  strokeColor,
  cellValue,
  onCellPress,
  isWinningCell,
}: PlayableCellProps) {
  if (isWinningCell) {
    const hexaCenter = getCenterOfPoints(svgPoints);
    return (
      <>
        <Polygon
          points={svgPoints}
          stroke={strokeColor}
          fill={getStoneColor(cellValue)}
        />
        <Circle
          cx={hexaCenter.x}
          cy={hexaCenter.y}
          r={WINNING_CIRCLE_SIZE}
          fill={WINNING_CIRCLE_COLOR}
        />
      </>
    );
  } else if (cellValue.value == 'empty') {
    return (
      <Polygon
        points={svgPoints}
        stroke={strokeColor}
        fill={getStoneColor(cellValue)}
        onClick={onCellPress}
        onPress={onCellPress}
      />
    );
  } else {
    return (
      <Polygon
        points={svgPoints}
        stroke={strokeColor}
        fill={getStoneColor(cellValue)}
      />
    );
  }
}
