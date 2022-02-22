import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import Board from './components/Board/Board';
import { GameState } from './utils';



const gamestate: GameState = {
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

const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Game" component={GameScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function HomeScreen(props: { navigation: any }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 32 }}>Hex Game</Text>
    </View>
  );
}

function GameScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ScrollView horizontal>
        <Board gameState={gamestate} />
      </ScrollView>
    </View>
  );
}
