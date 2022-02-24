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
} from '../common/gameState';
import { Coordinates, deepCloneObject } from '../common/utils';
import { UsersService } from '../users/users.service';

export interface GameAndStatus {
    game: Game,
    readyToPlay: boolean,
    currentPlayerTurnToPlay: boolean
}

const configPathFromDistDir = '../../gameStateFile.json';

@Injectable()
export class GamesService {

    constructor(
        @InjectRepository(Game)
        private gamesRepository: Repository<Game>,
        private usersService: UsersService,
    ) { }

    getBoardStateFromFile(): GameState {
        const gameState = parseGameStateFromFile(
            join(__dirname, configPathFromDistDir),
        );
        return gameState;
    }

    async updateGameState(game: Game, coordinates: Coordinates): Promise<Game> {
        const updatedGame: Game = deepCloneObject(game);
        updatedGame.state = updateGameState(game.state, coordinates);
        return this.gamesRepository.save(updatedGame);
    }

    initNewGameState(): GameState {
        return initNewGameState(DEFAULT_BOARD_SIZE);
    }

    findGameById(id: number): Promise<Game> {
        return this.gamesRepository.findOne(id);
    }

    async createNewGame(size: number, player1Username: string): Promise<Game> {
        if (!size) {
            size = DEFAULT_BOARD_SIZE;
        } else {
            size = +size;
        }
        const player1 = await this.usersService.getOrCreate(player1Username);
        const game = this.gamesRepository.create({
            state: initNewGameState(size),
            player1: player1,
        });
        return this.gamesRepository.save(game);
    }

    async createNewGameFromFile(player1Username: string): Promise<Game> {
        const player1 = await this.usersService.getOrCreate(player1Username);
        const game = this.gamesRepository.create({
            state: this.getBoardStateFromFile(),
            player1: player1,
        });
        return this.gamesRepository.save(game);
    }

    async joinGame(gameId: number, player2Username: string): Promise<Game> {
        const game = await this.gamesRepository.findOne(gameId);
        if (!game.player2) {
            if (player2Username !== game.player1.username) {
                const player2 = await this.usersService.getOrCreate(player2Username);
                game.player2 = player2;
                return this.gamesRepository.save(game);
            } else {
                throw Error(`Player2 cannot be the same user than player1`);
            }
        } else {
            throw Error(`Game ${gameId} already has a player2 (username: ${game.player2.username})`);
        }
    }

    getGameAndStatus(game: Game, playerName: string): GameAndStatus {
        const gameAndStatus: GameAndStatus = {
            game: game,
            readyToPlay: !!(game.player1 && game.player2),
            currentPlayerTurnToPlay:
                (game.state.turn === "white" && playerName === game.player1.username) ||
                (game.state.turn === "black" && playerName === game.player2.username)
        };
        return gameAndStatus;
    }

}
