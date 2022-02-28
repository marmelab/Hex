import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LocalScreen } from './src/screens/LocalScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import type { RootStackParamList } from './src/screens/navigationTypes';
import { AuthState } from './src/services/authService';
import Login from './src/components/Login/Login';
import {
  deleteJwt,
  getJwt,
  saveJwt,
} from './src/services/deviceStorageService';
import { RemoteScreen } from './src/screens/RemoteScreen';

const RootStack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [authState, setAuthState] = React.useState<AuthState>({ jwt: null });

  React.useEffect(() => {
    getJwt().then((jwt) => {
      setAuthState({ jwt });
    });
  }, []);

  const saveAndSetAuthState = (jwt: string) => {
    saveJwt(jwt);
    setAuthState({ jwt });
  };

  const logout = () => {
    deleteJwt();
    setAuthState({ jwt: null });
  };

  return !authState.jwt ? (
    <Login saveAndSetAuthState={saveAndSetAuthState} />
  ) : (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="Home">
        <RootStack.Screen
          name="Home"
          component={HomeScreen}
          initialParams={{ logout: logout }}
        />
        <RootStack.Screen name="Local" component={LocalScreen} />
        <RootStack.Screen name="Remote" component={RemoteScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
