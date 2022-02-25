import * as React from 'react';
import Svg from 'react-native-svg';
import PlayableCell from '../PlayableCell/PlayableCell';
import BorderCell from '../BorderCell/BorderCell';
import { GameState, Coordinates } from "../../../utils";
import { getApproximateSvgSize, generateBoardCells, CELL_STROKE_COLOR } from "./boardService";
import { updateGameState } from '../../services/localplayService';

interface BoardProps {
  gameState: GameState;
  onCellPress: (coordinates: Coordinates) => void;
}

export default function Board({ gameState, onCellPress }: BoardProps) {


  const svgSize = getApproximateSvgSize(gameState.board.length);
  return (
    gameState.winner ?
      <Svg width={svgSize} height={svgSize}>
        {
          generateBoardCells(gameState).map(({ withoutBorderCoordinates, svgPointsToDraw, type }, index) => (
            type === "playable" ?
              <PlayableCell
                key={index}
                svgPoints={svgPointsToDraw}
                strokeColor={CELL_STROKE_COLOR}
                cellValue={gameState.board[withoutBorderCoordinates.y][withoutBorderCoordinates.x]}
                onCellPress={() => { }}
                isWinningCell={gameState.winningPath && gameState.winningPath.some((cell) => cell.x == withoutBorderCoordinates.x && cell.y == withoutBorderCoordinates.y)}
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
      :
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
                isWinningCell={false}
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
