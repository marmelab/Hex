import { handlebars } from 'hbs';
import { encodeObjectForQueryString } from '../common/utils';

export function registerHandlebarsHelpers() {
  handlebars.registerHelper(
    'encodeObjectAsQueryString',
    function (objectToEncode: Object): string {
      return encodeObjectForQueryString(objectToEncode);
    },
  );
}

export function unregisterHandlebarsHelpers() {
  handlebars.unregisterHelper('encodeObjectAsQueryString');
}
