import compose from 'lodash/fp/compose';
import fill from 'lodash/fp/fill';
import filter from 'lodash/fp/filter';
import { insert, intersperse } from '../../../utils/data_utils';
import __vue_normalize__ from 'vue-runtime-helpers/dist/normalize-component.js';

//
const containsWhitespaceOnly = vNode => vNode.text.trim() === '';
const isTag = vNode => typeof vNode.tag === 'string';
const filterWhitespaceNodes = filter(vNode => isTag(vNode) || !containsWhitespaceOnly(vNode));
const insertAfterSecondLastItem = insert(-1);
const replaceSecondLastItem = fill(-2, -1);

// handles the addition of the lastSeparator in these two cases:
// item1, item2, item3 => item1, item2, and item3
// item1, item2 => item1 and item2
const addLastSeparator = lastSeparator => items => {
  if (!lastSeparator) {
    return items;
  }
  return items.length > 3 ? insertAfterSecondLastItem(lastSeparator, items) : replaceSecondLastItem(lastSeparator, items);
};
var script = {
  name: 'GlIntersperse',
  functional: true,
  props: {
    separator: {
      type: String,
      default: ', ',
      required: false
    },
    lastSeparator: {
      type: String,
      default: '',
      required: false
    }
  },
  render(createElement, context) {
    const {
      props: {
        separator,
        lastSeparator
      },
      slots,
      data
    } = context;
    const filterAndSeparate = compose(addLastSeparator(lastSeparator), intersperse(separator), filterWhitespaceNodes);
    return createElement('span', data, filterAndSeparate(slots().default));
  }
};

/* script */
const __vue_script__ = script;

/* template */

  /* style */
  const __vue_inject_styles__ = undefined;
  /* scoped */
  const __vue_scope_id__ = undefined;
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = undefined;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__ = __vue_normalize__(
    {},
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    undefined,
    undefined,
    undefined
  );

export default __vue_component__;
