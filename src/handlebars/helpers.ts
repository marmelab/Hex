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
    if (value1 === value2) {
      return options.fn(this);
    }
    return options.inverse(this);
  });
}

export function unregisterHandlebarsHelpers() {
  handlebars.unregisterHelper('encodeObjectAsQueryString');
  handlebars.unregisterHelper('areEqual');
}
