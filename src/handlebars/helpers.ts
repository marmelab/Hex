import { handlebars } from 'hbs';
import { encodeObjectForQueryString } from '../common/utils';

export function registerHandlebarsHelpers() {
  handlebars.registerHelper(
    'encodeObjectAsQueryString',
    function (objectToEncode: Object): string {
      return encodeObjectForQueryString(objectToEncode);
    },
  );
  handlebars.registerHelper('areEqual', function (value1, value2, options) {
    if (typeof options.fn === "undefined") {
      return value1 === value2;
    }
    if (value1 === value2) {
      return options.fn(this);
    }
    return options.inverse(this);
  });
  handlebars.registerHelper('cellCanBePlayed', function (cellValue, readyToPlay, currentPlayerTurnToPlay, options) {
    console.debug(`helper 'cellCanBePlayed': cellValue=${cellValue}, readyToPlay=${readyToPlay}, currentPlayerTurnToPlay=${currentPlayerTurnToPlay}`);
    if (cellValue === "empty" && readyToPlay && currentPlayerTurnToPlay) {
      return options.fn(this);
    }
    return options.inverse(this);
  });
}

export function unregisterHandlebarsHelpers() {
  handlebars.unregisterHelper('encodeObjectAsQueryString');
  handlebars.unregisterHelper('areEqual');
  handlebars.unregisterHelper('cellCanBePlayed');
}
