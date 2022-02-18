import { handlebars } from 'hbs';
import { Cell } from 'src/common/gameState';
import { encodeObjectForQueryString } from '../common/utils';

export function registerHandlebarsHelpers() {
  handlebars.registerHelper(
    'encodeObjectAsQueryString',
    function (objectToEncode: Object): string {
      return encodeObjectForQueryString(objectToEncode);
    },
  );
  handlebars.registerHelper('areEqual', function (value1, value2, options) {
    if (value1 === value2) {
      return options.fn(this);
    }
    return options.inverse(this);
  });
  handlebars.registerHelper('cellCanBePlayed',
    /**
     * Determines if user is authorized to click on a cell to place a stone
     * @param cellValue current cell value
     * @param readyToPlay boolean to know if the game is ready to be started
     * @param currentPlayerTurnToPlay boolean to know if it's the current user's turn to play
     * @param options options object provided by hbs
     */
    function (cellValue: 'empty' | 'black' | 'white', readyToPlay: boolean, currentPlayerTurnToPlay: boolean, options) {
    if (cellValue === "empty" && readyToPlay && currentPlayerTurnToPlay) {
      return options.fn(this);
    }
    return options.inverse(this);
  });
  handlebars.registerHelper('needToWaitForOpponent',
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
  });
}

export function unregisterHandlebarsHelpers() {
  handlebars.unregisterHelper('encodeObjectAsQueryString');
  handlebars.unregisterHelper('areEqual');
  handlebars.unregisterHelper('cellCanBePlayed');
  handlebars.unregisterHelper('needToWaitForOpponent');
}
