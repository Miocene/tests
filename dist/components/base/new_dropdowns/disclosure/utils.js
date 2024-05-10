import Vue from 'vue';
import isFunction from 'lodash/isFunction';
import isString from 'lodash/isString';
import { DISCLOSURE_DROPDOWN_ITEM_NAME, DISCLOSURE_DROPDOWN_GROUP_NAME } from './constants';

const itemValidator = item => {
  var _item$text;
  return (item === null || item === void 0 ? void 0 : (_item$text = item.text) === null || _item$text === void 0 ? void 0 : _item$text.length) > 0 && !Array.isArray(item === null || item === void 0 ? void 0 : item.items);
};
const isItem = item => Boolean(item) && itemValidator(item);
const isGroup = group => Boolean(group) && Array.isArray(group.items) && Boolean(group.items.length) &&
// eslint-disable-next-line unicorn/no-array-callback-reference
group.items.every(isItem);

// eslint-disable-next-line unicorn/no-array-callback-reference
const itemsValidator = items => items.every(isItem) || items.every(isGroup);
const isListItem = tag => ['gl-disclosure-dropdown-group', 'gl-disclosure-dropdown-item', 'li'].includes(tag);
const isValidSlotTagVue2 = vNode => {
  var _vNode$componentOptio;
  return Boolean(vNode) && isListItem(((_vNode$componentOptio = vNode.componentOptions) === null || _vNode$componentOptio === void 0 ? void 0 : _vNode$componentOptio.tag) || vNode.tag);
};
const isValidSlotTagVue3 = vNode => {
  var _vNode$type;
  return [DISCLOSURE_DROPDOWN_ITEM_NAME, DISCLOSURE_DROPDOWN_GROUP_NAME].includes((_vNode$type = vNode.type) === null || _vNode$type === void 0 ? void 0 : _vNode$type.name) || vNode.type === 'li';
};
const hasOnlyListItemsVue2 = defaultSlot => {
  const nodes = defaultSlot();
  if (!Array.isArray(nodes)) {
    return false;
  }
  const tags = nodes.filter(vNode => vNode.tag);
  return tags.length && tags.every(tag => isValidSlotTagVue2(tag));
};
const hasOnlyListItemsVue3 = defaultSlot => {
  const nodes = defaultSlot();
  const fragment = nodes.find(node => Array.isArray(node.children) && node.children.length);
  const targetNodes = fragment ? fragment.children : nodes;
  return targetNodes
  // Remove empty text vNodes
  .filter(vNode => !isString(vNode.text) || vNode.text.trim().length > 0).every(vNode => isValidSlotTagVue3(vNode));
};
const hasOnlyListItems = defaultSlot => {
  if (!isFunction(defaultSlot)) {
    return false;
  }
  if (Vue.version.startsWith('3')) {
    return hasOnlyListItemsVue3(defaultSlot);
  }
  return hasOnlyListItemsVue2(defaultSlot);
};

export { hasOnlyListItems, isGroup, isItem, itemsValidator };
