import GlToken from '../token/token';
import { stopEvent } from '../../../utils/utils';
import GlFilteredSearchTokenSegment from './filtered_search_token_segment';
import { termTokenDefinition, match, tokenToOption, INTENT_ACTIVATE_PREVIOUS, TOKEN_CLOSE_SELECTOR, TERM_TOKEN_TYPE } from './filtered_search_utils';
import __vue_normalize__ from 'vue-runtime-helpers/dist/normalize-component.js';

var script = {
  name: 'GlFilteredSearchTerm',
  components: {
    GlFilteredSearchTokenSegment,
    GlToken
  },
  inject: ['termsAsTokens'],
  inheritAttrs: false,
  props: {
    /**
     * Tokens available for this filtered search instance.
     */
    availableTokens: {
      type: Array,
      required: true
    },
    /**
     * Determines if the term is being edited or not.
     */
    active: {
      type: Boolean,
      required: false,
      default: false
    },
    /**
     * Current term value.
     */
    value: {
      type: Object,
      required: false,
      default: () => ({
        data: ''
      })
    },
    placeholder: {
      type: String,
      required: false,
      default: ''
    },
    /**
     * HTML attributes to add to the search input.
     */
    searchInputAttributes: {
      type: Object,
      required: false,
      default: () => ({})
    },
    /**
     * If this is the last token.
     */
    isLastToken: {
      type: Boolean,
      required: false,
      default: false
    },
    /**
     * The current `value` (tokens) of the ancestor GlFilteredSearch component.
     */
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
    /**
     * The title of the text search option. Ignored unless termsAsTokens is enabled.
     */
    searchTextOptionLabel: {
      type: String,
      required: false,
      default: termTokenDefinition.title
    },
    viewOnly: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    showInput() {
      return this.termsAsTokens() || Boolean(this.placeholder);
    },
    showToken() {
      return this.termsAsTokens() && Boolean(this.value.data);
    },
    suggestedTokens() {
      const tokens = this.availableTokens.filter(token => match(token.title, this.value.data));
      if (this.termsAsTokens() && this.value.data) {
        tokens.push({
          ...termTokenDefinition,
          title: this.searchTextOptionLabel
        });
      }

      // eslint-disable-next-line unicorn/no-array-callback-reference
      return tokens.map(tokenToOption);
    },
    internalValue: {
      get() {
        return this.value.data;
      },
      set(data) {
        /**
         * Emitted when the token changes its value.
         *
         * @event input
         * @type {object} dataObj Object containing the update value.
         */
        this.$emit('input', {
          data
        });
      }
    },
    eventListeners() {
      return this.viewOnly ? {} : {
        mousedown: this.stopMousedownOnCloseButton,
        close: this.destroyByClose
      };
    }
  },
  methods: {
    onBackspace() {
      /**
       * Emitted when token value is empty and backspace is pressed.
       * Includes user intent to activate previous token.
       *
       * @event destroy
       * @type {object} details The user intent
       */
      this.$emit('destroy', {
        intent: INTENT_ACTIVATE_PREVIOUS
      });
    },
    stopMousedownOnCloseButton(event) {
      if (event.target.closest(TOKEN_CLOSE_SELECTOR)) {
        stopEvent(event);
      }
    },
    destroyByClose() {
      this.$emit('destroy');
    },
    onComplete(type) {
      if (type === TERM_TOKEN_TYPE) {
        // We've completed this term token
        this.$emit('complete');
      } else {
        // We're changing the current token type
        this.$emit('replace', {
          type
        });
      }
    }
  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"gl-h-auto gl-filtered-search-term",attrs:{"data-testid":"filtered-search-term"}},[_c('gl-filtered-search-token-segment',{ref:"segment",staticClass:"gl-filtered-search-term-token",attrs:{"is-term":"","active":_vm.active,"cursor-position":_vm.cursorPosition,"search-input-attributes":_vm.searchInputAttributes,"is-last-token":_vm.isLastToken,"current-value":_vm.currentValue,"view-only":_vm.viewOnly,"options":_vm.suggestedTokens},on:{"activate":function($event){return _vm.$emit('activate')},"deactivate":function($event){return _vm.$emit('deactivate')},"complete":_vm.onComplete,"backspace":_vm.onBackspace,"submit":function($event){return _vm.$emit('submit')},"split":function($event){return _vm.$emit('split', $event)},"previous":function($event){return _vm.$emit('previous')},"next":function($event){return _vm.$emit('next')}},scopedSlots:_vm._u([{key:"view",fn:function(){return [(_vm.showToken)?_c('gl-token',_vm._g({class:{ 'gl-cursor-pointer': !_vm.viewOnly },attrs:{"view-only":_vm.viewOnly}},_vm.eventListeners),[_vm._v(_vm._s(_vm.value.data))]):(_vm.showInput)?_c('input',_vm._b({staticClass:"gl-filtered-search-term-input",class:{ 'gl-bg-gray-10': _vm.viewOnly },attrs:{"placeholder":_vm.placeholder,"aria-label":_vm.placeholder,"readonly":_vm.viewOnly,"data-testid":"filtered-search-term-input"},on:{"focusin":function($event){return _vm.$emit('activate')},"focusout":function($event){return _vm.$emit('deactivate')}}},'input',_vm.searchInputAttributes,false)):[_vm._v(_vm._s(_vm.value.data))]]},proxy:true}]),model:{value:(_vm.internalValue),callback:function ($$v) {_vm.internalValue=$$v;},expression:"internalValue"}})],1)};
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
