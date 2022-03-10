import { Injectable } from '@nestjs/common';
import { parseGameStateFromFile } from '../common/parseConfigFile';
import { join } from 'path';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Game } from './game.entity';
import {
  GameState,
  updateGameState,
  initNewGameState,
  DEFAULT_BOARD_SIZE,
  StoneColor,
  getNextMoveHint,
  NextMoveHint,
} from '../common/gameState';
import { Coordinates, deepCloneObject } from '../common/utils';
import { UsersService } from '../users/users.service';

export interface GameAndDisplayStatus {
  game: Game;
  readyToPlay: boolean;
  currentPlayerTurnToPlay: boolean;
}

const configPathFromDistDir = '../../gameStateFile.json';

@Injectable()
export class GamesService {
  constructor(
    @InjectRepository(Game)
    private gamesRepository: Repository<Game>,
    private usersService: UsersService,
  ) {}

  getBoardStateFromFile(): GameState {
    const gameState = parseGameStateFromFile(
      join(__dirname, configPathFromDistDir),
    );
    return gameState;
  }

  async handlePlayerMove(game: Game, coordinates: Coordinates): Promise<Game> {
    console.log(`handle player1's move`);
    const updatedGame = await this.updateGameState(game, coordinates);
    if (!updatedGame.state.winner && updatedGame.soloMode) {
      this.handleBotMove(updatedGame);
    }
    return updatedGame;
  }

  private handleBotMove(updatedGame: Game) {
    console.log(`handle bot's move`);
    getNextMoveHint(updatedGame.state, 'black').then((nextMove) => {
      console.log(
        `finished computing bot's move: ${JSON.stringify(
          nextMove.suggestedNextMove,
        )}`,
      );
      this.updateGameState(updatedGame, nextMove.suggestedNextMove);
    });
  }

  async updateGameState(game: Game, coordinates: Coordinates): Promise<Game> {
    const updatedGame: Game = deepCloneObject(game);
    updatedGame.state = updateGameState(game.state, coordinates);
    updatedGame.status = this.computeStatusFromGame(updatedGame);
    return this.gamesRepository.save(updatedGame);
  }

  initNewGameState(): GameState {
    return initNewGameState(DEFAULT_BOARD_SIZE);
  }

  findGameById(id: number): Promise<Game> {
    return this.gamesRepository.findOne(id);
  }

  async createNewGame(
    size: number,
    player1Username: string,
    soloMode: boolean,
  ): Promise<Game> {
    if (!size) {
      size = DEFAULT_BOARD_SIZE;
    } else {
      size = +size;
    }
    const player1 = await this.usersService.getOrCreate(player1Username);
    const game = this.gamesRepository.create({
      state: initNewGameState(size),
      player1,
      status: 'INITIALIZED',
      soloMode,
    });
    return this.gamesRepository.save(game);
  }

  async createNewGameFromFile(
    player1Username: string,
    soloMode: boolean,
  ): Promise<Game> {
    const player1 = await this.usersService.getOrCreate(player1Username);
    const game = this.gamesRepository.create({
      state: this.getBoardStateFromFile(),
      player1,
      status: 'INITIALIZED',
      soloMode,
    });
    return this.gamesRepository.save(game);
  }

  async joinGame(gameId: number, player2Username: string): Promise<Game> {
    const game = await this.gamesRepository.findOne(gameId);
    if (game.soloMode) {
      throw Error(
        `Game ${gameId} is a solo game. A second player cannot join in.`,
      );
    }
    if (!game.player2) {
      if (player2Username !== game.player1.username) {
        game.player2 = await this.usersService.getOrCreate(player2Username);
        game.status = this.computeStatusFromGame(game);
        return this.gamesRepository.save(game);
      } else {
        throw Error(`Player2 cannot be the same user than player1`);
      }
    } else {
      throw Error(
        `Game ${gameId} already has a player2 (username: ${game.player2.username})`,
      );
    }
  }

  haveTwoPlayersJoinedIn(game: Game): boolean {
    return !!(game.player1 && game.player2);
  }

  getGameAndDisplayStatus(
    game: Game,
    playerName: string,
  ): GameAndDisplayStatus {
    const gameAndStatus: GameAndDisplayStatus = {
      game: game,
      readyToPlay: this.haveTwoPlayersJoinedIn(game) || game.soloMode,
      currentPlayerTurnToPlay: this.isCurrentPlayerTurnToPlay(game, playerName),
    };
    return gameAndStatus;
  }

  private isCurrentPlayerTurnToPlay(game: Game, playerName: string): boolean {
    return !!(
      (game.state.turn === 'white' && playerName === game.player1.username) ||
      (game.state.turn === 'black' &&
        game.player2 &&
        playerName === game.player2.username)
    );
  }

  computeStatusFromGame(game: Game): 'INITIALIZED' | 'RUNNING' | 'ENDED' {
    return game.state.winner
      ? 'ENDED'
      : this.haveTwoPlayersJoinedIn(game) || game.soloMode
      ? 'RUNNING'
      : 'INITIALIZED';
  }

  async getNextMoveHint(game: Game, playerName: string): Promise<NextMoveHint> {
    const player: StoneColor =
      playerName === game.player1.username ? 'white' : 'black';
    return getNextMoveHint(game.state, player);
  }
}
