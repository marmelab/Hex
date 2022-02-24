import * as React from 'react';
import { View, ScrollView } from 'react-native';
import Board from '../components/Board/Board';
import { GameState } from "../../utils";
import type { LocalScreenProps } from './navigationTypes';
import { initNewGameState } from '../api-client/LocalplayService';

const gameStateInitialValue: GameState = {
  board: [],
  turn: "white",
  winner: null, 
  winningPath: null
};

export function LocalScreen({ navigation }: LocalScreenProps) {
  const [gameState, setGameState] = React.useState<GameState>(gameStateInitialValue);

  React.useEffect(() => {
    initNewGameState(9).then((data) => setGameState(data));
  }, []);

  const setGameStateWrapper = (gameState: GameState) => {
    setGameState(gameState);
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ScrollView horizontal>
        <Board gameState={gameState} setGameState={setGameStateWrapper} />
      </ScrollView>
    </View>
  );
}
