import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: { logout: () => void };
  Local: undefined;
  Remote: undefined;
};

export type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

export type LocalScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

export type RemoteScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

