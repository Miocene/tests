import { i18n } from '../config';

/**
 * Mark a label as translatable.
 *
 * @param {string} key Translation key to be leveraged by the consumer to provide a generic translation at configuration time.
 * @param {string} defaultValue A fallback value to be relied on if the consumer doesn't have translation capabilities.
 * @returns {string} The translated label.
 */
const translate = (key, defaultValue) => {
  var _i18n$key;
  return (_i18n$key = i18n[key]) !== null && _i18n$key !== void 0 ? _i18n$key : defaultValue;
};

export { translate };
