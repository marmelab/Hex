import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Board from './components/Board';

const DEFAULT_BOARD_SIZE = 9;

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Board boardSize={DEFAULT_BOARD_SIZE} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
