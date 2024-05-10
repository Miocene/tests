import { intersperse } from '../../../utils/data_utils';
import { splitAfterSymbols } from '../../../utils/string_utils';
import __vue_normalize__ from 'vue-runtime-helpers/dist/normalize-component.js';

var script = {
  name: 'GlFriendlyWrap',
  functional: true,
  props: {
    /**
     * Text to be wrapped.
     */
    text: {
      type: String,
      required: true
    },
    /**
     * A list of strings representing the break-words.
     */
    symbols: {
      type: Array,
      required: false,
      default: () => ['/']
    }
  },
  render(createElement, _ref) {
    let {
      props
    } = _ref;
    const {
      symbols,
      text
    } = props;
    const textParts = splitAfterSymbols(symbols, text !== null && text !== void 0 ? text : '');
    const content = intersperse(() => createElement('wbr'), textParts);
    return createElement('span', {
      class: 'text-break'
    }, content);
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
