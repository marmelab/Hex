import * as React from 'react';
import { View, ScrollView } from 'react-native';
import Board from '../components/Board/Board';
import { Game, GameState } from "../../utils";
import type { RemoteScreenProps } from './navigationTypes';
import { initNewGame } from '../services/hexApiService';

export function RemoteScreen({ navigation }: RemoteScreenProps) {
  const [gameState, setGameState] = React.useState<Game | null>(null);

  React.useEffect(() => {
    initNewGame(9).then(setGameState);
  }, []);

  const updateGameState = (gameState: GameState) => {
    console.log("called setGameState!");
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ScrollView horizontal>
        {gameState && (<Board gameState={gameState.state} setGameState={updateGameState} />)}
      </ScrollView>
    </View>
  );
}
