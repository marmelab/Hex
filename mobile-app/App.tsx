import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LocalScreen } from './src/screens/LocalScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import type { RootStackParamList } from './src/screens/navigationTypes';

const RootStack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="Home">
        <RootStack.Screen name="Home" component={HomeScreen} />
        <RootStack.Screen name="Local" component={LocalScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
