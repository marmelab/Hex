import * as React from 'react';
import { View, ScrollView } from 'react-native';
import Board from '../components/Board/Board';
import { GameState } from "../../utils";
import type { LocalScreenProps } from './navigationTypes';
import { initNewGameState } from '../services/localplayService';

export function LocalScreen({ navigation }: LocalScreenProps) {
  const [gameState, setGameState] = React.useState<GameState | null>(null);

  React.useEffect(() => {
    initNewGameState(9).then(setGameState);
  }, []);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ScrollView horizontal>
        {gameState && (<Board gameState={gameState} setGameState={setGameState} />)}
      </ScrollView>
    </View>
  );
}
