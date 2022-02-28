import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: { logout: () => void };
  Local: undefined;
  Remote: { gameId: number };
};

export type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

export type LocalScreenProps = NativeStackScreenProps<RootStackParamList, 'Local'>;

export type RemoteScreenProps = NativeStackScreenProps<RootStackParamList, 'Remote'>;

