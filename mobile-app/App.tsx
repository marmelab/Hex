import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Svg, { Polygon } from 'react-native-svg';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <BoardGame />
    </View>
  );
}


const DEFAULT_HEXA_COLOR = "black";
const PLAYER_1_HEXA_COLOR = "blue";
const PLAYER_2_HEXA_COLOR = "red";
const HEXA_STROKE_COLOR = "white";
const DEFAULT_BOARD_SIZE = 9;
const HEXA_SIZE = 20;

const BoardGame = () => {
  return (
    <Svg width="100%" height="100%">
      {generateBoard(DEFAULT_BOARD_SIZE).map((hexaToDraw) => (
        <Polygon points={hexaToDraw.points} stroke={HEXA_STROKE_COLOR} fill={hexaToDraw.color} />
      ))}
    </Svg>
  );
}

function generateBoard(size: number): { points: string, color: string }[] {
  const sizeWithBorder = size + 2;
  const hexaToDraw = [];
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
  if (col == 0 && row != boardSizeWithBorder - 1 || col == boardSizeWithBorder - 1 && row != 0) {
    return PLAYER_1_HEXA_COLOR;
  }
  if (row == 0 || row == boardSizeWithBorder - 1) {
    return PLAYER_2_HEXA_COLOR;
  }
  return DEFAULT_HEXA_COLOR;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
