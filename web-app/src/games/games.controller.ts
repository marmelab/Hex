import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Put,
    Redirect,
    Render,
    Req,
} from '@nestjs/common';
import { GamesService, GameAndStatus } from './games.service';
import { Request } from 'express';
import { Game } from './game.entity';

@Controller('games')
export class GamesController {

    constructor(private readonly gameService: GamesService) { }

    @Post('')
    @Redirect('/')
    async createNewGame(@Body() gameParams: { size?: number, fromFile?: boolean }, @Req() req: Request) {
        let newGame: Game;
        if (gameParams.fromFile) {
            newGame = await this.gameService.createNewGameFromFile(req.sessionID);
        } else {
            newGame = await this.gameService.createNewGame(gameParams.size, req.sessionID);
        }
        return { url: `/games/${newGame.id}` };
    }

    @Get(':id/join')
    @Redirect('/')
    async joinGame(@Param('id') id: number, @Req() req: Request) {
        await this.gameService.joinGame(id, req.sessionID);
        return { url: `/games/${id}` };
    }

    @Get(':id')
    @Render('game')
    async getGame(@Param('id') id: number, @Req() req: Request): Promise<GameAndStatus> {
        const game = await this.gameService.findGameById(id);
        return this.gameService.getGameAndStatus(game, req.sessionID);
    }

    @Post(':id')
    @Render('game')
    async postGame(
        @Param('id') id: number,
        @Body() gameParams: { x?: number; y?: number },
        @Req() req: Request
    ): Promise<GameAndStatus> {
        let game = await this.gameService.findGameById(id);
        if (gameParams.x && gameParams.y) {
            game = await this.gameService.updateGameState(game, {
                x: gameParams.x,
                y: gameParams.y,
            });
        }
        return this.gameService.getGameAndStatus(game, req.sessionID);
    }

}
