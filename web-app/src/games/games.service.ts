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
import { User } from '../users/user.entity';

export interface GameAndStatus {
    game: Game,
    readyToPlay: boolean,
    currentPlayerTurnToPlay: boolean
}

const configPathFromDistDir = '../../gameStateFile.json';

@Injectable()
export class GameService {

    constructor(
        @InjectRepository(Game)
        private gamesRepository: Repository<Game>,
        @InjectRepository(User)
        private usersRepository: Repository<User>,
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
        await this.gamesRepository.save(updatedGame);
        return updatedGame;
    }

    initNewGameState(): GameState {
        return initNewGameState(DEFAULT_BOARD_SIZE);
    }

    findGameById(id: number): Promise<Game> {
        return this.gamesRepository.findOne(id);
    }

    async createNewGame(size: number, player1SessionId: string): Promise<Game> {
        if (!size) {
            size = DEFAULT_BOARD_SIZE;
        } else {
            size = +size;
        }
        const player1 = this.usersRepository.create({
            lastSessionId: player1SessionId,
            username: player1SessionId
        });
        const game = this.gamesRepository.create({
            state: initNewGameState(size),
            player1: await this.usersRepository.save(player1),
        });
        return await this.gamesRepository.save(game);
    }

    async createNewGameFromFile(player1SessionId: string): Promise<Game> {
        const player1 = this.usersRepository.create({
            lastSessionId: player1SessionId,
            username: player1SessionId
        });
        const game = this.gamesRepository.create({
            state: this.getBoardStateFromFile(),
            player1: await this.usersRepository.save(player1),
        });
        return await this.gamesRepository.save(game);
    }

    async joinGame(gameId: number, player2SessionId: string): Promise<Game> {
        const game = await this.gamesRepository.findOne(gameId);
        if (!game.player2) {
            if (player2SessionId !== game.player1.lastSessionId) {
                const player2 = this.usersRepository.create({
                    lastSessionId: player2SessionId,
                    username: player2SessionId
                });
                game.player2 = await this.usersRepository.save(player2);
                return await this.gamesRepository.save(game);
            } else {
                throw Error(`Player2 (sessionId: ${player2SessionId}) cannot be the same as player1 (sessionId: ${game.player1.lastSessionId})`);
            }
        } else {
            throw Error(`Game ${gameId} already has a player2 (username: ${game.player2.username})`);
        }
    }

    getGameAndStatus(game: Game, playerSessionId: string): GameAndStatus {
        const gameAndStatus: GameAndStatus = {
            game: game,
            readyToPlay: !!(game.player1 && game.player2),
            currentPlayerTurnToPlay:
                (game.state.turn === "white" && playerSessionId === game.player1.lastSessionId) ||
                (game.state.turn === "black" && playerSessionId === game.player2.lastSessionId)
        };
        return gameAndStatus;
    }

}
