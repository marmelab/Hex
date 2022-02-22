import { Body, Controller, Post, Put } from '@nestjs/common';
import { GameState, initNewGameState, updateGameState } from 'src/common/gameState';
import { Coordinates } from 'src/common/utils';

@Controller('localplay/games')
export class GamesController {

    @Post('')
    initNewGameState(
        @Body() params: { size?: number }
    ): GameState {
        return initNewGameState(params.size);
    }

    @Put('')
    updateGameState(
        @Body() params: { previousGameState: GameState, nextMove: Coordinates }
    ): GameState {
        return updateGameState(params.previousGameState, params.nextMove);
    }

}
