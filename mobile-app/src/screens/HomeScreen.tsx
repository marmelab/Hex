import * as React from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import { HomeScreenProps } from './navigationTypes';

export function HomeScreen({ navigation }: HomeScreenProps) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 32 }}>Hex Game</Text>
      <Button title='Create local game' onPress={() => navigation.navigate('Local')}>
      </Button>
      <Text>Or</Text>
      <Button title='Create online game' onPress={() => navigation.navigate('Remote')}>
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
        keyboardType="numeric">
      </TextInput>
      <Button title='Join game' onPress={() => { }}>
      </Button>
    </View >
  );
}
