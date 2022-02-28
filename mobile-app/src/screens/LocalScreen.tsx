import * as React from 'react';
import { View, ScrollView, Text } from 'react-native';
import Board from '../components/Board/Board';
import { Coordinates, GameState } from '../../utils';
import type { LocalScreenProps } from './navigationTypes';
import {
  initNewGameState,
  updateGameState,
} from '../services/localplayService';
import { mapStoneColorToPlayerName } from '../components/Board/boardService';

export function LocalScreen({ navigation }: LocalScreenProps) {
  const [gameState, setGameState] = React.useState<GameState | null>(null);

  React.useEffect(() => {
    initNewGameState(9).then(setGameState);
  }, []);

  const onCellPress = (coordinates: Coordinates) => {
    updateGameState(gameState, coordinates).then(setGameState);
  };

  const getPlayersTurnElt = (gameState: GameState): JSX.Element => {
    return (
      <Text style={{ fontSize: 32 }}>
        {mapStoneColorToPlayerName(gameState.turn)}, it's your turn !
      </Text>
    );
  };

  const getWinMsgElt = (gameState: GameState): JSX.Element => {
    return (
      <Text style={{ fontSize: 32 }}>
        Player {mapStoneColorToPlayerName(gameState.winner)} has won !
      </Text>
    );
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ScrollView horizontal>
        {gameState && (
          <Board
            gameState={gameState}
            onCellPress={onCellPress}
            getPlayersTurnElt={getPlayersTurnElt}
            getWinMsgElt={getWinMsgElt}
          />
        )}
      </ScrollView>
    </View>
  );
}
