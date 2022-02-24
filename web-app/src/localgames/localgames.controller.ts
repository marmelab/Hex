import { Body, Controller, Post, Put } from '@nestjs/common';
import { GameState, initNewGameState, updateGameState } from '../common/gameState';
import { Coordinates } from '../common/utils';

@Controller('api/localgames/games')
export class LocalGamesModuleController {

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
