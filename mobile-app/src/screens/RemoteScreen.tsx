import * as React from 'react';
import { View, ScrollView, Text } from 'react-native';
import Board from '../components/Board/Board';
import {
  Coordinates,
  Game,
  GameAndStatus,
  GameState,
  StoneColor,
} from '../../utils';
import type { RemoteScreenProps } from './navigationTypes';
import { getGame, initNewGame, updateGame } from '../services/hexApiService';
import { mapStoneColorToPlayerName } from '../components/Board/boardService';

const REFRESH_TIMER = 1000;

export function RemoteScreen({ navigation, route }: RemoteScreenProps) {
  const [gameState, setGameState] = React.useState<GameAndStatus | null>(null);

  React.useEffect(() => {
    getGame(route.params.gameId).then(setGameState);
    const interval = setInterval(
      () => getGame(route.params.gameId).then(setGameState),
      REFRESH_TIMER,
    );
    return () => {
      clearInterval(interval);
    };
  }, []);

  const onCellPress = (coordinates: Coordinates) => {
    return gameState.currentPlayerTurnToPlay
      ? updateGame(gameState.game, coordinates).then(setGameState)
      : () => {};
  };

  const getPlayersTurnElt = (state: GameState): JSX.Element => {
    if (gameState.currentPlayerTurnToPlay) {
      return (
        <Text style={{ fontSize: 32 }}>
          {mapStoneColorToPlayerName(state.turn)}, it's your turn !
        </Text>
      );
    } else {
      return <Text style={{ fontSize: 24 }}>Wait for opponent's move...</Text>;
    }
  };

  const getWinMsgElt = (state: GameState): JSX.Element => {
    if (!gameState.currentPlayerTurnToPlay) {
      return <Text style={{ fontSize: 32 }}>Congratulations, you won!</Text>;
    } else {
      return (
        <React.Fragment>
          <Text style={{ fontSize: 24 }}>You lost this game.</Text>
          <Text style={{ fontSize: 24 }}>Better luck next time!</Text>
        </React.Fragment>
      );
    }
  };

  return gameState ? (
    gameState.readyToPlay ? (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ScrollView horizontal>
          <Board
            gameState={gameState.game.state}
            onCellPress={onCellPress}
            getPlayersTurnElt={getPlayersTurnElt}
            getWinMsgElt={getWinMsgElt}
          />
        </ScrollView>
      </View>
    ) : (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 24 }}> Waiting for an opponent..</Text>
        <Text style={{ fontSize: 18 }}>
          Use this join code : {route.params.gameId}
        </Text>
      </View>
    )
  ) : (
    <View />
  );
}
