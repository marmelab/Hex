import * as React from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import { loginAndGetJwt } from '../../services/hexApiService';

interface LoginProps {
  saveAndSetAuthState: (jwt: string) => void;
}

interface LoginState {
  username: string;
  password: string;
  error: string;
}

export default function Login({ saveAndSetAuthState }: LoginProps) {

  const [loginState, setLoginState] = React.useState<LoginState>({
    username: '',
    password: '',
    error: null
  });

  const onLogin = async () => {
    try {
      const jwt = await loginAndGetJwt(loginState.username, loginState.password);
      console.log(`Login - Got JWT Token: ${jwt}`);
      saveAndSetAuthState(jwt);
      setLoginState({
        ...loginState,
        error: null
      });
    } catch (e) {
      setLoginState({
        ...loginState,
        error: String(e)
      });
    }
  }

  const onChangeUsername = (username: string) => {
    setLoginState({
      ...loginState,
      username
    });
  }

  const onChangePassword = (password: string) => {
    setLoginState({
      ...loginState,
      password
    });
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 32 }}>Login</Text>

      {loginState.error && <Text style={{ color: 'red' }}>{loginState.error}</Text>}

      <Text>Username</Text>
      <TextInput
        style={{
          height: 40,
          margin: 12,
          borderWidth: 1,
          padding: 10,
        }}
        placeholder="username"
        onChangeText={newText => onChangeUsername(newText)}>
      </TextInput>

      <Text>Password</Text>
      <TextInput
        style={{
          height: 40,
          margin: 12,
          borderWidth: 1,
          padding: 10,
        }}
        placeholder="password"
        textContentType="password"
        onChangeText={newText => onChangePassword(newText)}>
      </TextInput>

      <Button title='Login' onPress={onLogin}>
      </Button>
    </View >
  );
}
