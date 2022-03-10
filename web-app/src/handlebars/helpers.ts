import { handlebars } from 'hbs';
import { StoneColor } from 'src/common/gameState';
import { encodeObjectForQueryString, Coordinates } from '../common/utils';

export function registerHandlebarsHelpers() {
  handlebars.registerHelper(
    'encodeObjectAsQueryString',
    function (objectToEncode: Record<string, unknown>): string {
      return encodeObjectForQueryString(objectToEncode);
    },
  );
  handlebars.registerHelper('areEqual', function (value1, value2, options) {
    if (value1 === value2) {
      return options.fn(this);
    }
    return options.inverse(this);
  });
  handlebars.registerHelper(
    'cellCanBePlayed',
    /**
     * Determines if user is authorized to click on a cell to place a stone
     * @param cellValue current cell value
     * @param readyToPlay boolean to know if the game is ready to be started
     * @param currentPlayerTurnToPlay boolean to know if it's the current user's turn to play
     * @param winner data of the current winner (if any), to know if we can still place stones
     * @param options options object provided by hbs
     */
    function (
      cellValue: 'empty' | 'black' | 'white',
      readyToPlay: boolean,
      currentPlayerTurnToPlay: boolean,
      winner: StoneColor | null,
      options,
    ) {
      if (
        cellValue === 'empty' &&
        readyToPlay &&
        currentPlayerTurnToPlay &&
        winner == null
      ) {
        return options.fn(this);
      }
      return options.inverse(this);
    },
  );
  handlebars.registerHelper(
    'needToWaitForOpponent',
    /**
     * Determines whether we need to wait for the opponent and hence refresh the page
     * @param readyToPlay  boolean to know if the game is ready to be started
     * @param currentPlayerTurnToPlay boolean to know if it's the current user's turn to play
     * @param options options object provided by hbs
     */
    function (readyToPlay: boolean, currentPlayerTurnToPlay: boolean, options) {
      if (!readyToPlay || !currentPlayerTurnToPlay) {
        return options.fn(this);
      }
      return options.inverse(this);
    },
  );
  handlebars.registerHelper(
    'isCellInWinningPath',
    function (
      winningPath: Coordinates[],
      cellXCoord: number,
      cellYCoord: number,
    ) {
      return (
        winningPath &&
        winningPath.some((cell) => cell.x == cellXCoord && cell.y == cellYCoord)
      );
    },
  );
  handlebars.registerHelper(
    'isCellSuggested',
    function (
      suggestedCell: Coordinates,
      cellXCoord: number,
      cellYCoord: number,
      turn: StoneColor,
    ) {
      return (
        suggestedCell &&
        suggestedCell.x == cellXCoord &&
        suggestedCell.y == cellYCoord &&
        turn
      );
    },
  );
}

export function unregisterHandlebarsHelpers() {
  handlebars.unregisterHelper('encodeObjectAsQueryString');
  handlebars.unregisterHelper('areEqual');
  handlebars.unregisterHelper('cellCanBePlayed');
  handlebars.unregisterHelper('needToWaitForOpponent');
  handlebars.unregisterHelper('isCellInWinningPath');
  handlebars.unregisterHelper('isCellSuggested');
}
