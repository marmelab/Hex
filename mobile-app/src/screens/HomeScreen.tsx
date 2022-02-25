import * as React from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import { initNewGame, joinGame } from '../services/hexApiService';
import { HomeScreenProps } from './navigationTypes';

interface HomeScreenState {
  gameId: number;
}

export function HomeScreen({ navigation, route }: HomeScreenProps) {
  const [state, setState] = React.useState<HomeScreenState>({
    gameId: null
  });

  const onChangeGameId = (text: string) => {
    setState({
      ...state,
      gameId: parseInt(text)
    });
  }

  const onCreateOnlineGame = async () => {
    const game = await initNewGame(9);
    navigation.navigate('Remote', { gameId: game.id });
  }

  const onJoinOnlineGame = async () => {
    await joinGame(state.gameId);
    navigation.navigate('Remote', { gameId: state.gameId });
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 32 }}>Hex Game</Text>
      <Button title='Create local game' onPress={() => navigation.navigate('Local')}>
      </Button>
      <Text>Or</Text>
      <Button title='Create online game' onPress={onCreateOnlineGame}>
      </Button>
      <Text>Or</Text>
      <TextInput
        style={{
          height: 40,
          margin: 12,
          borderWidth: 1,
          padding: 10,
        }}
        placeholder="Game identifier"
        keyboardType="numeric"
        onChangeText={newText => onChangeGameId(newText)}>
      </TextInput>
      <Button title='Join game' onPress={onJoinOnlineGame}>
      </Button>
      <Text></Text>
      <Button title='Logout' color={'red'} onPress={route.params.logout}>
      </Button>
    </View >
  );
}
