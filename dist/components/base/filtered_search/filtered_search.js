import isEqual from 'lodash/isEqual';
import cloneDeep from 'lodash/cloneDeep';
import { PortalTarget } from 'portal-vue';
import { GlTooltipDirective } from '../../../directives/tooltip';
import GlIcon from '../icon/icon';
import GlSearchBoxByClick from '../search_box_by_click/search_box_by_click';
import GlFilteredSearchTerm from './filtered_search_term';
import { termTokenDefinition, createTerm, isEmptyTerm, needDenormalization, denormalizeTokens, INTENT_ACTIVATE_PREVIOUS, ensureTokenId, normalizeTokens } from './filtered_search_utils';
import __vue_normalize__ from 'vue-runtime-helpers/dist/normalize-component.js';

let portalUuid = 0;
function initialState() {
  return [createTerm()];
}
var script = {
  name: 'GlFilteredSearch',
  components: {
    GlSearchBoxByClick,
    GlIcon,
    PortalTarget
  },
  directives: {
    GlTooltip: GlTooltipDirective
  },
  provide() {
    portalUuid += 1;
    this.portalName = `filters_portal_${portalUuid}`;
    return {
      portalName: this.portalName,
      alignSuggestions: ref => this.alignSuggestions(ref),
      // Return a function reference instead of a prop to work around vue-apollo@3 bug.
      // TODO: This can be reverted once https://github.com/vuejs/vue-apollo/pull/1153
      // has been merged and we consume it, or we upgrade to vue-apollo@4.
      suggestionsListClass: () => this.suggestionsListClass,
      termsAsTokens: () => this.termsAsTokens
    };
  },
  inheritAttrs: false,
  props: {
    /**
     * If provided, used as value of filtered search
     */
    value: {
      required: false,
      type: Array,
      default: () => []
    },
    /**
     * Available tokens
     */
    availableTokens: {
      type: Array,
      required: false,
      default: () => [],
      validator(value) {
        // eslint-disable-next-line no-underscore-dangle
        if (!value.__v_raw) {
          // This is Vue 2
          return true;
        }

        // eslint-disable-next-line no-underscore-dangle
        const isOk = Array.isArray(value) && value.every(_ref => {
          let {
            token
          } = _ref;
          return token.__v_skip;
        });
        if (!isOk) {
          // eslint-disable-next-line no-console
          console.warn('You are using Vue3. In Vue3 each token component passed to filtered search must be wrapped into markRaw');
        }
        return isOk;
      }
    },
    /**
     * If provided, used as history items for this component
     */
    placeholder: {
      type: String,
      required: false,
      default: 'Search'
    },
    clearButtonTitle: {
      type: String,
      required: false,
      default: 'Clear'
    },
    historyItems: {
      type: Array,
      required: false,
      default: null
    },
    /**
     * Additional classes to add to the suggestion list menu. NOTE: this not reactive, and the value
     * must be available and fixed when the component is instantiated
     */
    suggestionsListClass: {
      type: [String, Array, Object],
      required: false,
      default: null
    },
    /**
     * Display operators' descriptions instead of their values (e.g., "is" instead of "=").
     */
    showFriendlyText: {
      type: Boolean,
      required: false,
      default: false
    },
    /**
     * HTML attributes to add to the search button
     */
    searchButtonAttributes: {
      type: Object,
      required: false,
      default: () => ({})
    },
    /**
     * HTML attributes to add to the search input
     */
    searchInputAttributes: {
      type: Object,
      required: false,
      default: () => ({})
    },
    viewOnly: {
      type: Boolean,
      required: false,
      default: false
    },
    /**
     * Render search terms as GlTokens. Ideally, this prop will be as
     * short-lived as possible, and this behavior will become the default and
     * only behavior.
     *
     * This prop is *not* reactive.
     *
     * See https://gitlab.com/gitlab-org/gitlab-ui/-/issues/2159.
     */
    termsAsTokens: {
      type: Boolean,
      required: false,
      default: false
    },
    /**
     * The title of the text search option. Ignored unless termsAsTokens is enabled.
     */
    searchTextOptionLabel: {
      type: String,
      required: false,
      default: termTokenDefinition.title
    },
    /**
     * Display search button to perform a search.
     *
     * Note: it is required to ensure accessibility for WCAG 2.1 3.2.2: On Input.
     * If the search button is hidden, a separate button should be provided for the same context.
     */
    showSearchButton: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  data() {
    return {
      tokens: initialState(),
      activeTokenIdx: null,
      suggestionsStyle: {},
      intendedCursorPosition: 'end'
    };
  },
  computed: {
    activeToken() {
      return this.tokens[this.activeTokenIdx];
    },
    appliedTokens() {
      return this.tokens.filter(token => !isEmptyTerm(token));
    },
    lastTokenIdx() {
      return this.tokens.length - 1;
    },
    isLastTokenActive() {
      return this.activeTokenIdx === this.lastTokenIdx;
    },
    hasValue() {
      return this.tokens.length > 1 || this.tokens[0].value.data !== '';
    },
    termPlaceholder() {
      return this.hasValue ? null : this.placeholder;
    },
    currentAvailableTokens() {
      return this.availableTokens.filter(token => {
        if (token.disabled) {
          return false;
        }
        if (token.unique) {
          return !this.tokens.find(t => t.type === token.type);
        }
        return true;
      });
    }
  },
  watch: {
    tokens: {
      handler() {
        if (process.env.NODE_ENV !== 'production') {
          const invalidToken = this.tokens.find(token => !token.id);
          if (invalidToken) {
            throw new Error(`Token does not have an id:\n${JSON.stringify(invalidToken)}`);
          }
        }
        if ((this.tokens.length === 0 || !this.isLastTokenEmpty()) && !this.viewOnly) {
          this.tokens.push(createTerm());
        }

        /**
         * Emitted when the tokens (value) changes
         * @property {array} tokens
         */
        this.$emit('input', this.tokens);
      },
      deep: true,
      immediate: true
    },
    value: {
      handler(newValue, oldValue) {
        if (newValue.length && !isEqual(newValue, oldValue)) {
          this.applyNewValue(cloneDeep(newValue));
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    applyNewValue(newValue) {
      this.tokens = needDenormalization(newValue) ? denormalizeTokens(newValue, this.termsAsTokens) : newValue;
    },
    isActiveToken(idx) {
      return this.activeTokenIdx === idx;
    },
    isLastToken(idx) {
      return this.activeTokenIdx === null && idx === this.lastTokenIdx;
    },
    isLastTokenEmpty() {
      return isEmptyTerm(this.tokens[this.lastTokenIdx]);
    },
    getTokenEntry(type) {
      return this.availableTokens.find(t => t.type === type);
    },
    getTokenComponent(type) {
      var _this$getTokenEntry;
      return ((_this$getTokenEntry = this.getTokenEntry(type)) === null || _this$getTokenEntry === void 0 ? void 0 : _this$getTokenEntry.token) || GlFilteredSearchTerm;
    },
    getTokenClassList(idx) {
      return {
        'gl-filtered-search-item': true,
        'gl-filtered-search-last-item': this.isLastToken(idx) && !this.viewOnly
      };
    },
    activate(idx) {
      if (!this.viewOnly) {
        this.activeTokenIdx = idx;
      }
    },
    activatePreviousToken() {
      if (this.activeTokenIdx > 0) {
        this.activeTokenIdx -= 1;
        this.intendedCursorPosition = 'end';
      }
    },
    activateNextToken() {
      if (this.activeTokenIdx < this.value.length) {
        this.activeTokenIdx += 1;
        this.intendedCursorPosition = 'start';
      }
    },
    alignSuggestions(ref) {
      const offsetRef = ref.getBoundingClientRect().left;
      const offsetMenu = this.$el.getBoundingClientRect().left;
      const transform = `translateX(${Math.floor(offsetRef - offsetMenu)}px)`;
      this.suggestionsStyle = {
        transform
      };
    },
    deactivate(token) {
      this.intendedCursorPosition = 'end';
      const tokenIdx = this.tokens.indexOf(token);
      if (tokenIdx === -1 || this.activeTokenIdx !== tokenIdx) {
        return;
      }
      if (!this.isLastTokenEmpty()) {
        this.tokens.push(createTerm());
      }
      if (!this.isLastTokenActive && isEmptyTerm(this.activeToken)) {
        this.tokens.splice(tokenIdx, 1);
      }
      this.activeTokenIdx = null;
    },
    destroyToken(idx) {
      let {
        intent
      } = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      if (this.tokens.length === 1) {
        return;
      }
      this.tokens.splice(idx, 1);

      // First, attempt to honor the user's activation intent behind the
      // destruction of the token, if any. Otherwise, try to maintain the
      // active state for the token that was active at the time. If that's not
      // possible, make sure no token is active.
      if (intent === INTENT_ACTIVATE_PREVIOUS) {
        // If there is a previous token, activate it; else, activate the first token
        this.activeTokenIdx = Math.max(idx - 1, 0);
      } else if (idx < this.activeTokenIdx) {
        // Preserve the active token's active status (it shifted down one index)
        this.activeTokenIdx -= 1;
      } else if (idx === this.activeTokenIdx) {
        // User destroyed the active token; don't activate another one.
        this.activeTokenIdx = null;
      }
      // Do nothing if there was no active token, or if idx > this.activeTokenIdx,
      // to preserve the active state of the remaining tokens.
    },
    replaceToken(idx, token) {
      this.$set(this.tokens, idx, ensureTokenId({
        ...token,
        value: {
          data: '',
          ...token.value
        }
      }));
      this.activeTokenIdx = idx;
    },
    // This method can be deleted once termsAsTokens behavior is the default.
    createTokens(idx) {
      let newStrings = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [''];
      if (!this.isLastTokenActive && newStrings.length === 1 && newStrings[0] === '') {
        this.activeTokenIdx = this.lastTokenIdx;
        return;
      }
      const newTokens = newStrings.map(data => createTerm(data));
      this.tokens.splice(idx + 1, 0, ...newTokens);
      this.activeTokenIdx = idx + newStrings.length;
    },
    completeToken() {
      if (this.activeTokenIdx === this.lastTokenIdx - 1) {
        this.activeTokenIdx = this.lastTokenIdx;
      } else {
        this.activeTokenIdx = null;
      }
    },
    submit() {
      /**
       * Emitted when search is submitted
       * @property {array} tokens
       */
      this.$emit('submit', normalizeTokens(cloneDeep(this.tokens)));
    }
  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('gl-search-box-by-click',_vm._b({attrs:{"value":_vm.tokens,"history-items":_vm.historyItems,"clearable":_vm.hasValue,"search-button-attributes":_vm.searchButtonAttributes,"show-search-button":_vm.showSearchButton,"disabled":_vm.viewOnly,"data-testid":"filtered-search-input"},on:{"submit":_vm.submit,"input":_vm.applyNewValue,"history-item-selected":function($event){return _vm.$emit('history-item-selected', $event)},"clear":function($event){return _vm.$emit('clear')},"clear-history":function($event){return _vm.$emit('clear-history')}},scopedSlots:_vm._u([{key:"history-item",fn:function(slotScope){return [_vm._t("history-item",null,null,slotScope)]}},{key:"input",fn:function(){return [_c('div',{staticClass:"gl-filtered-search-scrollable-container",class:{
        'gl-filtered-search-scrollable-container-with-search-button': _vm.showSearchButton,
        'gl-bg-gray-10! gl-inset-border-1-gray-100!': _vm.viewOnly,
      }},[_c('div',{staticClass:"gl-filtered-search-scrollable"},_vm._l((_vm.tokens),function(token,idx){return _c(_vm.getTokenComponent(token.type),{key:token.id,ref:"tokens",refInFor:true,tag:"component",class:_vm.getTokenClassList(idx),attrs:{"config":_vm.getTokenEntry(token.type),"active":_vm.activeTokenIdx === idx,"cursor-position":_vm.intendedCursorPosition,"available-tokens":_vm.currentAvailableTokens,"current-value":_vm.tokens,"index":idx,"placeholder":_vm.termPlaceholder,"show-friendly-text":_vm.showFriendlyText,"search-input-attributes":_vm.searchInputAttributes,"view-only":_vm.viewOnly,"is-last-token":_vm.isLastToken(idx),"search-text-option-label":_vm.searchTextOptionLabel,"applied-tokens":_vm.appliedTokens},on:{"activate":function($event){return _vm.activate(idx)},"deactivate":function($event){return _vm.deactivate(token)},"destroy":function($event){return _vm.destroyToken(idx, $event)},"replace":function($event){return _vm.replaceToken(idx, $event)},"complete":_vm.completeToken,"submit":_vm.submit,"split":function($event){return _vm.createTokens(idx, $event)},"previous":_vm.activatePreviousToken,"next":_vm.activateNextToken},model:{value:(token.value),callback:function ($$v) {_vm.$set(token, "value", $$v);},expression:"token.value"}})}),1)]),_vm._v(" "),_c('portal-target',{key:_vm.activeTokenIdx,ref:"menu",style:(_vm.suggestionsStyle),attrs:{"name":_vm.portalName,"slim":""}})]},proxy:true}],null,true)},'gl-search-box-by-click',_vm.$attrs,false))};
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
