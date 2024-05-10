import last from 'lodash/last';
import { Portal } from 'portal-vue';
import { LEFT_MOUSE_BUTTON } from '../../../utils/constants';
import GlFilteredSearchSuggestion from './filtered_search_suggestion';
import GlFilteredSearchSuggestionList from './filtered_search_suggestion_list';
import { TERM_TOKEN_TYPE, splitOnQuotes, match, wrapTokenInQuotes } from './filtered_search_utils';
import __vue_normalize__ from 'vue-runtime-helpers/dist/normalize-component.js';

// We need some helpers to ensure @vue/compat compatibility
// @vue/compat will render comment nodes for v-if and comments in HTML
// Also it makes use of fragments - both comments and nodes are Symbols.
// In Vue3 all of them (Comment, Fragment) are exposed as named exports on vue module
// However we want to maintain compatibility with Vue2, so taking this hacky approach
// relying on Symbol.toString()

// I'm keeping this directly here instead of helper to increase probability of
// fixing ASAP and because I don't want this helper to be reused
// FIXME: replace with Symbols when we will switch to Vue3

const isVue3Comment = vnode => {
  var _vnode$type, _vnode$type$toString;
  return (vnode === null || vnode === void 0 ? void 0 : (_vnode$type = vnode.type) === null || _vnode$type === void 0 ? void 0 : (_vnode$type$toString = _vnode$type.toString) === null || _vnode$type$toString === void 0 ? void 0 : _vnode$type$toString.call(_vnode$type)) === 'Symbol(Comment)';
};
const isVue3Fragment = vnode => {
  var _vnode$type2, _vnode$type2$toString;
  return (vnode === null || vnode === void 0 ? void 0 : (_vnode$type2 = vnode.type) === null || _vnode$type2 === void 0 ? void 0 : (_vnode$type2$toString = _vnode$type2.toString) === null || _vnode$type2$toString === void 0 ? void 0 : _vnode$type2$toString.call(_vnode$type2)) === 'Symbol(Fragment)';
};
const isVNodeEmpty = vnode => {
  if (isVue3Fragment(vnode)) {
    // vnode.children might be an array or single node in edge cases
    return Array.isArray(vnode.children) ?
    // eslint-disable-next-line unicorn/no-array-callback-reference
    vnode.children.every(isVNodeEmpty) : isVNodeEmpty(vnode.children);
  }
  if (isVue3Comment(vnode)) {
    return true;
  }
  return false;
};
const isSlotNotEmpty = slot => {
  if (!slot) {
    return false;
  }
  const vnodes = typeof slot === 'function' ? slot() : slot;
  // eslint-disable-next-line unicorn/no-array-callback-reference
  return !(Array.isArray(vnodes) ? vnodes.every(isVNodeEmpty) : isVNodeEmpty(vnodes));
};
var script = {
  name: 'GlFilteredSearchTokenSegment',
  components: {
    Portal,
    GlFilteredSearchSuggestionList,
    GlFilteredSearchSuggestion
  },
  inject: ['portalName', 'alignSuggestions', 'termsAsTokens'],
  inheritAttrs: false,
  props: {
    /**
     * If this token segment is currently being edited.
     */
    active: {
      type: Boolean,
      required: false,
      default: false
    },
    isTerm: {
      type: Boolean,
      required: false,
      default: false
    },
    label: {
      type: String,
      required: false,
      default: 'Search'
    },
    multiSelect: {
      type: Boolean,
      required: false,
      default: false
    },
    options: {
      type: Array,
      required: false,
      default: () => null
    },
    optionTextField: {
      type: String,
      required: false,
      default: 'title'
    },
    customInputKeydownHandler: {
      type: Function,
      required: false,
      default: () => () => false
    },
    /**
     * Current term value
     */
    value: {
      required: true,
      validator: () => true
    },
    /**
     * HTML attributes to add to the search input
     */
    searchInputAttributes: {
      type: Object,
      required: false,
      default: () => ({})
    },
    /**
     * If this is the last token
     */
    isLastToken: {
      type: Boolean,
      required: false,
      default: false
    },
    currentValue: {
      type: Array,
      required: false,
      default: () => []
    },
    cursorPosition: {
      type: String,
      required: false,
      default: 'end',
      validator: value => ['start', 'end'].includes(value)
    },
    viewOnly: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      fallbackValue: this.value
    };
  },
  computed: {
    hasTermSuggestion() {
      if (!this.termsAsTokens()) return false;
      if (!this.options) return false;
      return this.options.some(_ref => {
        let {
          value
        } = _ref;
        return value === TERM_TOKEN_TYPE;
      });
    },
    matchingOption() {
      var _this$options;
      return (_this$options = this.options) === null || _this$options === void 0 ? void 0 : _this$options.find(o => o.value === this.value);
    },
    nonMultipleValue() {
      return Array.isArray(this.value) ? last(this.value) : this.value;
    },
    inputValue: {
      get() {
        if (this.isTerm) {
          return this.nonMultipleValue;
        }
        return this.matchingOption ? this.matchingOption[this.optionTextField] : this.nonMultipleValue;
      },
      set(inputValue) {
        /**
         * Emitted when this token segment's value changes.
         *
         * @type {object} option The current option.
         */
        this.$emit('input', inputValue);
      }
    },
    hasOptionsOrSuggestions() {
      var _this$options2;
      // eslint-disable-next-line @gitlab/vue-prefer-dollar-scopedslots
      return ((_this$options2 = this.options) === null || _this$options2 === void 0 ? void 0 : _this$options2.length) || isSlotNotEmpty(this.$slots.suggestions);
    },
    defaultSuggestedValue() {
      var _this$options$;
      if (!this.options) {
        return this.nonMultipleValue;
      }
      if (this.value) {
        const option = this.getMatchingOptionForInputValue(this.inputValue) || this.getMatchingOptionForInputValue(this.inputValue, {
          loose: true
        });
        if (option) return option.value;
        if (this.hasTermSuggestion) return TERM_TOKEN_TYPE;
        return null;
      }
      const defaultOption = this.options.find(op => op.default);
      if (defaultOption) {
        return defaultOption.value;
      }
      return this.isTerm ? undefined : (_this$options$ = this.options[0]) === null || _this$options$ === void 0 ? void 0 : _this$options$.value;
    },
    containerAttributes() {
      return this.isLastToken && !this.active && this.currentValue.length > 1 && this.searchInputAttributes;
    }
  },
  watch: {
    active: {
      immediate: true,
      handler(newValue) {
        if (newValue) {
          this.activate();
        } else {
          this.deactivate();
        }
      }
    },
    inputValue(newValue) {
      if (this.termsAsTokens()) return;
      if (this.multiSelect) return;
      const hasUnclosedQuote = newValue.split('"').length % 2 === 0;
      if (newValue.indexOf(' ') === -1 || hasUnclosedQuote) {
        return;
      }
      const [firstWord, ...otherWords] = splitOnQuotes(newValue).filter((w, idx, arr) => Boolean(w) || idx === arr.length - 1);
      this.$emit('input', firstWord);
      if (otherWords.length) {
        /**
         * Emitted when Space appears in token segment value
         * @property {array|string} newStrings New strings to be converted into term tokens
         */
        this.$emit('split', otherWords);
      }
    }
  },
  methods: {
    emitIfInactive(e) {
      if (e.button === LEFT_MOUSE_BUTTON && !this.active) {
        /**
         * Emitted on mousedown event on the main component.
         */
        this.$emit('activate');
        e.preventDefault();
      }
    },
    getMatchingOptionForInputValue(inputValue) {
      var _this$options3;
      let {
        loose
      } = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
        loose: false
      };
      return (_this$options3 = this.options) === null || _this$options3 === void 0 ? void 0 : _this$options3.find(option => loose ? match(option[this.optionTextField], inputValue) : option[this.optionTextField] === inputValue);
    },
    activate() {
      this.fallbackValue = this.value;
      this.$nextTick(() => {
        const {
          input
        } = this.$refs;
        if (input) {
          input.focus();
          input.scrollIntoView({
            block: 'nearest',
            inline: 'end'
          });
          this.alignSuggestions(input);
          if (this.cursorPosition === 'start') {
            input === null || input === void 0 ? void 0 : input.setSelectionRange(0, 0);
          }
        }
      });
    },
    deactivate() {
      var _this$matchingOption;
      if (!this.options || this.isTerm) {
        return;
      }
      if (((_this$matchingOption = this.matchingOption) === null || _this$matchingOption === void 0 ? void 0 : _this$matchingOption.value) !== this.value) {
        this.$emit('input', this.fallbackValue);
      }
    },
    applySuggestion(suggestedValue) {
      const formattedSuggestedValue = this.termsAsTokens() ? suggestedValue : wrapTokenInQuotes(suggestedValue);

      /**
       * Emitted when autocomplete entry is selected.
       *
       * @type {string} value The selected value.
       */
      this.$emit('select', formattedSuggestedValue);
      if (!this.multiSelect) {
        this.$emit('input', formattedSuggestedValue === TERM_TOKEN_TYPE ? this.inputValue : formattedSuggestedValue);
        this.$emit('complete', formattedSuggestedValue);
      }
    },
    handleInputKeydown(e) {
      const {
        key
      } = e;
      const {
        suggestions,
        input
      } = this.$refs;
      const suggestedValue = suggestions === null || suggestions === void 0 ? void 0 : suggestions.getValue();
      const handlers = {
        ArrowLeft: () => {
          if (input.selectionStart === 0) {
            e.preventDefault();
            this.$emit('previous');
          }
        },
        ArrowRight: () => {
          if (input.selectionEnd === this.inputValue.length) {
            e.preventDefault();
            this.$emit('next');
          }
        },
        Backspace: () => {
          if (this.inputValue === '') {
            e.preventDefault();
            /**
             * Emitted when Backspace is pressed and the value is empty
             */
            this.$emit('backspace');
          }
        },
        Enter: () => {
          e.preventDefault();
          if (suggestedValue != null) {
            this.applySuggestion(suggestedValue);
          } else {
            /**
             * Emitted when Enter is pressed and no suggestion is selected
             */
            this.$emit('submit');
          }
        },
        ':': () => {
          if (suggestedValue != null) {
            e.preventDefault();
            this.applySuggestion(suggestedValue);
          }
        },
        Escape: () => {
          e.preventDefault();
          /**
           * Emitted when suggestion is selected from the suggestion list
           */
          this.$emit('complete');
        }
      };
      const suggestionsHandlers = {
        ArrowDown: () => suggestions.nextItem(),
        Down: () => suggestions.nextItem(),
        ArrowUp: () => suggestions.prevItem(),
        Up: () => suggestions.prevItem()
      };
      if (this.hasOptionsOrSuggestions) {
        Object.assign(handlers, suggestionsHandlers);
      }
      if (Object.keys(handlers).includes(key)) {
        handlers[key]();
        return;
      }
      this.customInputKeydownHandler(e, {
        suggestedValue,
        inputValue: this.inputValue,
        applySuggestion: v => this.applySuggestion(v)
      });
    },
    handleBlur() {
      if (this.multiSelect) {
        this.$emit('complete');
      } else if (this.active) {
        /**
         * Emitted when this term token will lose its focus.
         */
        this.$emit('deactivate');
      }
    }
  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',_vm._g(_vm._b({staticClass:"gl-filtered-search-token-segment",class:{
    'gl-filtered-search-token-segment-active': _vm.active,
    'gl-cursor-text!': _vm.viewOnly,
  },attrs:{"data-testid":"filtered-search-token-segment"}},'div',_vm.containerAttributes,false),_vm.viewOnly ? {} : { mousedown: _vm.emitIfInactive }),[(_vm.active)?[_vm._t("before-input",null,null,{ submitValue: _vm.applySuggestion }),_vm._v(" "),(((_vm.searchInputAttributes).type)==='checkbox')?_c('input',_vm._b({directives:[{name:"model",rawName:"v-model",value:(_vm.inputValue),expression:"inputValue"}],ref:"input",staticClass:"gl-filtered-search-token-segment-input",attrs:{"data-testid":"filtered-search-token-segment-input","aria-label":_vm.label,"readonly":_vm.viewOnly,"type":"checkbox"},domProps:{"checked":Array.isArray(_vm.inputValue)?_vm._i(_vm.inputValue,null)>-1:(_vm.inputValue)},on:{"keydown":_vm.handleInputKeydown,"blur":_vm.handleBlur,"change":function($event){var $$a=_vm.inputValue,$$el=$event.target,$$c=$$el.checked?(true):(false);if(Array.isArray($$a)){var $$v=null,$$i=_vm._i($$a,$$v);if($$el.checked){$$i<0&&(_vm.inputValue=$$a.concat([$$v]));}else {$$i>-1&&(_vm.inputValue=$$a.slice(0,$$i).concat($$a.slice($$i+1)));}}else {_vm.inputValue=$$c;}}}},'input',_vm.searchInputAttributes,false)):(((_vm.searchInputAttributes).type)==='radio')?_c('input',_vm._b({directives:[{name:"model",rawName:"v-model",value:(_vm.inputValue),expression:"inputValue"}],ref:"input",staticClass:"gl-filtered-search-token-segment-input",attrs:{"data-testid":"filtered-search-token-segment-input","aria-label":_vm.label,"readonly":_vm.viewOnly,"type":"radio"},domProps:{"checked":_vm._q(_vm.inputValue,null)},on:{"keydown":_vm.handleInputKeydown,"blur":_vm.handleBlur,"change":function($event){_vm.inputValue=null;}}},'input',_vm.searchInputAttributes,false)):_c('input',_vm._b({directives:[{name:"model",rawName:"v-model",value:(_vm.inputValue),expression:"inputValue"}],ref:"input",staticClass:"gl-filtered-search-token-segment-input",attrs:{"data-testid":"filtered-search-token-segment-input","aria-label":_vm.label,"readonly":_vm.viewOnly,"type":(_vm.searchInputAttributes).type},domProps:{"value":(_vm.inputValue)},on:{"keydown":_vm.handleInputKeydown,"blur":_vm.handleBlur,"input":function($event){if($event.target.composing){ return; }_vm.inputValue=$event.target.value;}}},'input',_vm.searchInputAttributes,false)),_vm._v(" "),_c('portal',{key:("operator-" + _vm._uid),attrs:{"to":_vm.portalName}},[(_vm.hasOptionsOrSuggestions)?_c('gl-filtered-search-suggestion-list',{key:("operator-" + _vm._uid),ref:"suggestions",attrs:{"initial-value":_vm.defaultSuggestedValue},on:{"suggestion":_vm.applySuggestion}},[(_vm.options)?_vm._l((_vm.options),function(option,idx){return _c('gl-filtered-search-suggestion',{key:((option.value) + "-" + idx),attrs:{"value":option.value,"icon-name":option.icon}},[_vm._t("option",function(){return [(option.component)?[_c(option.component,{tag:"component",attrs:{"option":option}})]:[_vm._v("\n                "+_vm._s(option[_vm.optionTextField])+"\n              ")]]},null,{ option: option })],2)}):_vm._t("suggestions")],2):_vm._e()],1)]:_vm._t("view",function(){return [_vm._v(_vm._s(_vm.inputValue))]},null,{ inputValue: _vm.inputValue })],2)};
var __vue_staticRenderFns__ = [];

  /* style */
  const __vue_inject_styles__ = undefined;
  /* scoped */
  const __vue_scope_id__ = undefined;
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__ = __vue_normalize__(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
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
