import * as React from 'react';
import { View, ScrollView, Text } from 'react-native';
import Board from '../components/Board/Board';
import { Coordinates, Game, GameAndStatus, GameState } from "../../utils";
import type { RemoteScreenProps } from './navigationTypes';
import { getGame, initNewGame, updateGame } from '../services/hexApiService';

export function RemoteScreen({ navigation, route }: RemoteScreenProps) {
  const [gameState, setGameState] = React.useState<GameAndStatus | null>(null);

  React.useEffect(() => {
    getGame(route.params.gameId).then(setGameState);
  }, []);

  const onCellPress = (coordinates: Coordinates) => {
    updateGame(gameState.game, coordinates).then(setGameState);
  }

  return (

    gameState && (
      <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <Text>Ready to play: {String(gameState.readyToPlay)}</Text>
        <Text>Current player turn: {String(gameState.currentPlayerTurnToPlay)}</Text>
        <ScrollView horizontal>
          <Board gameState={gameState.game.state} onCellPress={onCellPress} />
        </ScrollView>
      </View>
    )

  );
}
