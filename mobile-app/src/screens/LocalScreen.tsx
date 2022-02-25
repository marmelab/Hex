import * as React from 'react';
import { View, ScrollView } from 'react-native';
import Board from '../components/Board/Board';
import { Coordinates, GameState } from "../../utils";
import type { LocalScreenProps } from './navigationTypes';
import { initNewGameState, updateGameState } from '../services/localplayService';

export function LocalScreen({ navigation }: LocalScreenProps) {
  const [gameState, setGameState] = React.useState<GameState | null>(null);

  React.useEffect(() => {
    initNewGameState(9).then(setGameState);
  }, []);

  const onCellPress = (coordinates: Coordinates) => {
    updateGameState(gameState, coordinates).then(setGameState);
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ScrollView horizontal>
        {gameState && (<Board gameState={gameState} onCellPress={onCellPress} />)}
      </ScrollView>
    </View>
  );
}
