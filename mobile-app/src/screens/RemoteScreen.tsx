import * as React from 'react';
import { View, ScrollView, Text } from 'react-native';
import Board from '../components/Board/Board';
import { Coordinates, Game, GameAndStatus, GameState } from '../../utils';
import type { RemoteScreenProps } from './navigationTypes';
import { getGame, initNewGame, updateGame } from '../services/hexApiService';

const REFRESH_TIMER = 1000;

export function RemoteScreen({ navigation, route }: RemoteScreenProps) {
  const [gameState, setGameState] = React.useState<GameAndStatus | null>(null);

  React.useEffect(() => {
    getGame(route.params.gameId).then(setGameState);
    const interval = setInterval(
      () => getGame(route.params.gameId).then(setGameState),
      REFRESH_TIMER,
    );
    return () => {
      clearInterval(interval);
    };
  }, []);

  const onCellPress = (coordinates: Coordinates) => {
    return gameState.currentPlayerTurnToPlay
      ? updateGame(gameState.game, coordinates).then(setGameState)
      : () => {};
  };

  return gameState ? (
    gameState.readyToPlay ? (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ScrollView horizontal>
          <Board gameState={gameState.game.state} onCellPress={onCellPress} />
        </ScrollView>
      </View>
    ) : (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 24 }}> Waiting for an opponent..</Text>
        <Text style={{ fontSize: 18 }}>
          Use this join code : {route.params.gameId}
        </Text>
      </View>
    )
  ) : (
    <View />
  );
}
