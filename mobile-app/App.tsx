import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { initNewGameState } from './api-client/LocalplayService';
import Board from './components/Board/Board';
import { GameState } from './utils';

const gameStateInitialValue: GameState = {
  board: [],
  turn: "white",
  winner: null, 
  winningPath: null
};

export default function App() {
  const [gameState, setGameState] = useState<GameState>(gameStateInitialValue);

  React.useEffect(() => {
    initNewGameState(9).then((data) => setGameState(data));
  }, []);

  const setGameStateWrapper = (gameState: GameState) => {
    setGameState(gameState);
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Board gameState={gameState} setGameState={setGameStateWrapper} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A000A',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
