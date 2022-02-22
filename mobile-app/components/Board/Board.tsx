import * as React from 'react';
import Svg from 'react-native-svg';
import PlayableCell from '../PlayableCell/PlayableCell';
import BorderCell from '../BorderCell/BorderCell';
import { GameState, Coordinates } from "../../utils";
import { getApproximateSvgSize, generateBoardCells, CELL_STROKE_COLOR } from "./BoardService";

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

function onCellPress(coordinates: Coordinates) {
  alert(`x:${coordinates.x} y:${coordinates.y}`)
}
