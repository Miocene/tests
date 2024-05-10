import isNumber from 'lodash/isNumber';
import isString from 'lodash/isString';

const isOption = item => Boolean(item) && (isString(item.value) || isNumber(item.value));

// eslint-disable-next-line unicorn/no-array-callback-reference
const isGroup = function () {
  let {
    options
  } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return Array.isArray(options) && options.every(isOption);
};
const hasNoDuplicates = array => array.length === new Set(array).size;
const flattenedOptions = items => items.flatMap(item => isOption(item) ? item : item.options);

// eslint-disable-next-line unicorn/no-array-callback-reference
const isAllOptionsOrAllGroups = items => items.every(isOption) || items.every(isGroup);
const hasUniqueValues = items => hasNoDuplicates(flattenedOptions(items).map(_ref => {
  let {
    value
  } = _ref;
  return value;
}));

// eslint-disable-next-line unicorn/no-array-callback-reference
const hasUniqueGroups = items => hasNoDuplicates(items.filter(isGroup).map(_ref2 => {
  let {
    text
  } = _ref2;
  return text;
}));
const itemsValidator = items => isAllOptionsOrAllGroups(items) && hasUniqueValues(items) && hasUniqueGroups(items);

export { flattenedOptions, isOption, itemsValidator };
