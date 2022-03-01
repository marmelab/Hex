import React from 'react';
import renderer from 'react-test-renderer';
import { Coordinates, GameState } from '../../../utils';
import Board from './Board';
import { Text } from 'react-native';

describe('Board', () => {
  it('Does not throw any error', () => {
    const gamestate: GameState = {
      turn: 'white',
      winner: null,
      winningPath: null,
      board: [
        [
          { value: 'empty' },
          { value: 'empty' },
          { value: 'empty' },
          { value: 'empty' },
          { value: 'empty' },
          { value: 'empty' },
          { value: 'empty' },
          { value: 'empty' },
          { value: 'empty' },
        ],
        [
          { value: 'empty' },
          { value: 'empty' },
          { value: 'white' },
          { value: 'empty' },
          { value: 'empty' },
          { value: 'empty' },
          { value: 'empty' },
          { value: 'empty' },
          { value: 'empty' },
        ],
        [
          { value: 'empty' },
          { value: 'empty' },
          { value: 'empty' },
          { value: 'empty' },
          { value: 'black' },
          { value: 'empty' },
          { value: 'empty' },
          { value: 'empty' },
          { value: 'empty' },
        ],
        [
          { value: 'empty' },
          { value: 'empty' },
          { value: 'empty' },
          { value: 'empty' },
          { value: 'empty' },
          { value: 'empty' },
          { value: 'empty' },
          { value: 'empty' },
          { value: 'empty' },
        ],
        [
          { value: 'empty' },
          { value: 'empty' },
          { value: 'empty' },
          { value: 'empty' },
          { value: 'empty' },
          { value: 'empty' },
          { value: 'empty' },
          { value: 'empty' },
          { value: 'empty' },
        ],
        [
          { value: 'empty' },
          { value: 'empty' },
          { value: 'empty' },
          { value: 'empty' },
          { value: 'black' },
          { value: 'empty' },
          { value: 'empty' },
          { value: 'empty' },
          { value: 'empty' },
        ],
        [
          { value: 'empty' },
          { value: 'empty' },
          { value: 'empty' },
          { value: 'empty' },
          { value: 'empty' },
          { value: 'empty' },
          { value: 'empty' },
          { value: 'empty' },
          { value: 'empty' },
        ],
        [
          { value: 'empty' },
          { value: 'empty' },
          { value: 'empty' },
          { value: 'empty' },
          { value: 'empty' },
          { value: 'empty' },
          { value: 'white' },
          { value: 'empty' },
          { value: 'empty' },
        ],
        [
          { value: 'empty' },
          { value: 'empty' },
          { value: 'empty' },
          { value: 'empty' },
          { value: 'empty' },
          { value: 'empty' },
          { value: 'empty' },
          { value: 'empty' },
          { value: 'empty' },
        ],
      ],
    };
    const onCellPress = (coordinates: Coordinates) => {};
    const getPlayersTurnElt = (gameState: GameState): JSX.Element => {
      return <Text>Dummy Player's Turn Element</Text>;
    };
    const getWinMsgElt = (gameState: GameState): JSX.Element => {
      return <Text>Dummy Win Message Element</Text>;
    };
    expect(() =>
      renderer.create(
        <Board
          gameState={gamestate}
          onCellPress={onCellPress}
          getPlayersTurnElt={getPlayersTurnElt}
          getWinMsgElt={getWinMsgElt}
        />,
      ),
    ).not.toThrowError();
  });

  it('Render a board with the correct nb of cells', () => {
    const gamestate: GameState = {
      turn: 'white',
      winner: null,
      winningPath: null,
      board: [
        [
          { value: 'empty' },
          { value: 'empty' },
          { value: 'empty' },
          { value: 'empty' },
        ],
        [
          { value: 'empty' },
          { value: 'empty' },
          { value: 'white' },
          { value: 'empty' },
        ],
        [
          { value: 'empty' },
          { value: 'empty' },
          { value: 'empty' },
          { value: 'empty' },
        ],
      ],
    };
    const onCellPress = (coordinates: Coordinates) => {};
    const getPlayersTurnElt = (gameState: GameState): JSX.Element => {
      return <Text>Dummy Player's Turn Element</Text>;
    };
    const getWinMsgElt = (gameState: GameState): JSX.Element => {
      return <Text>Dummy Win Message Element</Text>;
    };

    const board = renderer
      .create(
        <Board
          gameState={gamestate}
          onCellPress={onCellPress}
          getPlayersTurnElt={getPlayersTurnElt}
          getWinMsgElt={getWinMsgElt}
        />,
      )
      .toJSON();

    expect(board.children[1].children[0].children.length).toBe(23);
  });
});
