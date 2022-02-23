import * as React from 'react';
import { View, ScrollView } from 'react-native';
import Board from '../components/Board/Board';
import { GameState } from "../../utils";

const gameState: GameState = {
  turn: 'white',
  winner: null,
  winningPath: null,
  board: [
    [{ value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }],
    [{ value: 'empty' }, { value: 'empty' }, { value: 'white' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }],
    [{ value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'black' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }],
    [{ value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }],
    [{ value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }],
    [{ value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'black' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }],
    [{ value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }],
    [{ value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'white' }, { value: 'empty' }, { value: 'empty' }],
    [{ value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }, { value: 'empty' }],
  ],
}

export function LocalScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ScrollView horizontal>
        <Board gameState={gameState} />
      </ScrollView>
    </View>
  );
}
