import * as React from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LocalScreen } from './src/screens/LocalScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Local" component={LocalScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function HomeScreen(props: { navigation: any }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 32 }}>Hex Game</Text>
      <Button title='Create local game' onPress={() => props.navigation.navigate('Local')}>
      </Button>
      <Text>Or</Text>
      <Button title='Create online game' onPress={() => { }}>
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
