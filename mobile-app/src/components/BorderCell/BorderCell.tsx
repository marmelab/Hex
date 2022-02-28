import * as React from 'react';
import { Polygon } from 'react-native-svg';
import { RenderedCellType } from '../../../utils';
import { getBorderColor } from './borderCellService';

interface BorderCellProps {
  svgPoints: string;
  strokeColor: string;
  playerBorder: RenderedCellType;
}

export default function BorderCell({
  svgPoints,
  strokeColor,
  playerBorder,
}: BorderCellProps) {
  return (
    <Polygon
      points={svgPoints}
      stroke={strokeColor}
      fill={getBorderColor(playerBorder)}
    />
  );
}
