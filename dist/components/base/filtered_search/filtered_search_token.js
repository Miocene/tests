import cloneDeep from 'lodash/cloneDeep';
import isEqual from 'lodash/isEqual';
import GlToken from '../token/token';
import { stopEvent } from '../../../utils/utils';
import GlFilteredSearchTokenSegment from './filtered_search_token_segment';
import { tokenToOption, createTerm, TOKEN_CLOSE_SELECTOR } from './filtered_search_utils';
import __vue_normalize__ from 'vue-runtime-helpers/dist/normalize-component.js';

const SEGMENT_TITLE = 'TYPE';
const SEGMENT_OPERATOR = 'OPERATOR';
const SEGMENT_DATA = 'DATA';
const DEFAULT_OPERATORS = [{
  value: '=',
  description: 'is',
  default: true
}, {
  value: '!=',
  description: 'is not'
}];
var script = {
  name: 'GlFilteredSearchToken',
  // FIXME: temporary workaround to ensure compatibility with @vue/compat
  __v_skip: true,
  components: {
    GlToken,
    GlFilteredSearchTokenSegment
  },
  inheritAttrs: false,
  props: {
    availableTokens: {
      type: Array,
      required: false,
      default: () => []
    },
    /**
     * Token configuration with available operators and options.
     */
    config: {
      type: Object,
      required: false,
      default: () => ({})
    },
    /**
     * Determines if the token is being edited or not.
     */
    active: {
      type: Boolean,
      required: false,
      default: false
    },
    multiSelectValues: {
      type: Array,
      required: false,
      default: () => []
    },
    /**
     * Current token value.
     */
    value: {
      type: Object,
      required: false,
      default: () => ({
        operator: '',
        data: ''
      })
    },
    /**
     * Display operators' descriptions instead of their values (e.g., "is" instead of "=").
     */
    showFriendlyText: {
      type: Boolean,
      required: false,
      default: false
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
    },
    dataSegmentInputAttributes: {
      type: Object,
      required: false,
      default: () => ({})
    }
  },
  data() {
    return {
      activeSegment: null,
      tokenValue: cloneDeep(this.value),
      intendedCursorPosition: this.cursorPosition
    };
  },
  computed: {
    operators() {
      return this.config.operators || DEFAULT_OPERATORS;
    },
    tokenEmpty() {
      var _this$tokenValue$data;
      return ((_this$tokenValue$data = this.tokenValue.data) === null || _this$tokenValue$data === void 0 ? void 0 : _this$tokenValue$data.length) === 0;
    },
    hasDataOrDataSegmentIsCurrentlyActive() {
      const hasData = !this.tokenEmpty;
      return hasData || this.isSegmentActive(SEGMENT_DATA);
    },
    availableTokensWithSelf() {
      return [this.config, ...this.availableTokens.filter(token => token !== this.config)].map(
      // eslint-disable-next-line unicorn/no-array-callback-reference
      tokenToOption);
    },
    operatorDescription() {
      const operator = this.operators.find(op => op.value === this.tokenValue.operator);
      return this.showFriendlyText ? operator === null || operator === void 0 ? void 0 : operator.description : operator === null || operator === void 0 ? void 0 : operator.value;
    },
    eventListeners() {
      return this.viewOnly ? {} : {
        mousedown: this.stopMousedownOnCloseButton,
        close: this.destroyByClose
      };
    }
  },
  segments: {
    SEGMENT_TITLE,
    SEGMENT_DATA,
    SEGMENT_OPERATOR
  },
  watch: {
    tokenValue: {
      deep: true,
      handler(newValue) {
        /**
         * Emitted when the token changes its value.
         *
         * @event input
         * @type {object} dataObj Object containing the update value.
         */
        this.$emit('input', newValue);
      }
    },
    value: {
      handler(newValue, oldValue) {
        if (isEqual(newValue === null || newValue === void 0 ? void 0 : newValue.data, oldValue === null || oldValue === void 0 ? void 0 : oldValue.data) && (newValue === null || newValue === void 0 ? void 0 : newValue.operator) === (oldValue === null || oldValue === void 0 ? void 0 : oldValue.operator)) {
          return;
        }
        this.tokenValue = cloneDeep(newValue);
      }
    },
    active: {
      immediate: true,
      handler(tokenIsActive) {
        if (tokenIsActive) {
          this.intendedCursorPosition = this.cursorPosition;
          if (!this.activeSegment) {
            this.activateSegment(this.tokenEmpty ? SEGMENT_OPERATOR : SEGMENT_DATA);
          }
        } else {
          this.activeSegment = null;

          // restore multi select values if we have them
          // otherwise destroy the token
          if (this.config.multiSelect) {
            this.$emit('input', {
              ...this.tokenValue,
              data: this.multiSelectValues || ''
            });
          }
          if (this.tokenEmpty && this.multiSelectValues.length === 0) {
            /**
             * Emitted when token is about to be destroyed.
             *
             * @event destroy
             */
            this.$emit('destroy');
          }
        }
      }
    }
  },
  created() {
    if (!('operator' in this.tokenValue)) {
      if (this.operators.length === 1) {
        const operator = this.operators[0].value;
        this.$emit('input', {
          ...this.tokenValue,
          operator
        });
        this.activeSegment = SEGMENT_DATA;
      } else {
        this.$emit('input', {
          ...this.tokenValue,
          operator: ''
        });
      }
    }
  },
  methods: {
    activateSegment(segment) {
      if (this.viewOnly) return;
      this.activeSegment = segment;
      if (!this.active) {
        /**
         * Emitted when this term token is clicked.
         *
         * @event activate
         */
        this.$emit('activate');
      }
    },
    getAdditionalSegmentClasses(segment) {
      if (this.viewOnly) {
        return 'gl-cursor-text';
      }
      return {
        'gl-cursor-pointer': !this.isSegmentActive(segment)
      };
    },
    isSegmentActive(segment) {
      return this.active && this.activeSegment === segment;
    },
    replaceWithTermIfEmpty() {
      if (this.tokenValue.operator === '' && this.tokenEmpty) {
        /**
         * Emitted when this token is converted to another type
         * @property {object} token Replacement token configuration
         */
        this.$emit('replace', createTerm(this.config.title));
      }
    },
    replaceToken(newType) {
      const newTokenConfig = this.availableTokens.find(_ref => {
        let {
          type
        } = _ref;
        return type === newType;
      });
      if (newTokenConfig === this.config) {
        this.$nextTick(() => {
          /**
           * Emitted when this term token will lose its focus.
           *
           * @event deactivate
           */
          this.$emit('deactivate');
        });
        return;
      }
      if (newTokenConfig) {
        const isCompatible = this.config.dataType && this.config.dataType === newTokenConfig.dataType;
        this.$emit('replace', {
          type: newTokenConfig.type,
          value: isCompatible ? this.tokenValue : {
            data: ''
          }
        });
      }
    },
    handleOperatorKeydown(evt, _ref2) {
      let {
        inputValue,
        suggestedValue,
        applySuggestion
      } = _ref2;
      const {
        key
      } = evt;
      if (key === ' ' || key === 'Spacebar') {
        applySuggestion(suggestedValue);
        return;
      }
      const potentialValue = `${inputValue}${key}`;
      if (key.length === 1 && !this.operators.find(_ref3 => {
        let {
          value
        } = _ref3;
        return value.startsWith(potentialValue);
      })) {
        if (this.tokenEmpty) {
          applySuggestion(suggestedValue);
        } else {
          evt.preventDefault();
        }
      }
    },
    activateDataSegment() {
      if (this.config.multiSelect) {
        this.$emit('input', {
          ...this.tokenValue,
          data: ''
        });
      }
      this.activateSegment(this.$options.segments.SEGMENT_DATA);
    },
    activatePreviousOperatorSegment() {
      this.activateSegment(this.$options.segments.SEGMENT_OPERATOR);
      this.intendedCursorPosition = 'end';
    },
    activatePreviousTitleSegment() {
      this.activateSegment(this.$options.segments.SEGMENT_TITLE);
      this.intendedCursorPosition = 'end';
    },
    activateNextDataSegment() {
      this.activateDataSegment();
      this.intendedCursorPosition = 'start';
    },
    activateNextOperatorSegment() {
      this.activateSegment(this.$options.segments.SEGMENT_OPERATOR);
      this.intendedCursorPosition = 'start';
    },
    handleComplete(value) {
      /**
       * Emitted when the token entry has been completed.
       *
       * @event complete
       */
      this.$emit('complete', value);
    },
    stopMousedownOnCloseButton(event) {
      if (event.target.closest(TOKEN_CLOSE_SELECTOR)) {
        stopEvent(event);
      }
    },
    destroyByClose() {
      this.$emit('destroy');
    }
  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"gl-filtered-search-token",class:{
    'gl-filtered-search-token-active': _vm.active,
    'gl-filtered-search-token-hover': !_vm.viewOnly,
    'gl-cursor-default': _vm.viewOnly,
  },attrs:{"data-testid":"filtered-search-token"}},[_c('gl-filtered-search-token-segment',{key:"title-segment",attrs:{"value":_vm.config.title,"active":_vm.isSegmentActive(_vm.$options.segments.SEGMENT_TITLE),"cursor-position":_vm.intendedCursorPosition,"options":_vm.availableTokensWithSelf,"view-only":_vm.viewOnly},on:{"activate":function($event){return _vm.activateSegment(_vm.$options.segments.SEGMENT_TITLE)},"deactivate":function($event){return _vm.$emit('deactivate')},"complete":_vm.replaceToken,"backspace":function($event){return _vm.$emit('destroy')},"submit":function($event){return _vm.$emit('submit')},"previous":function($event){return _vm.$emit('previous')},"next":_vm.activateNextOperatorSegment},scopedSlots:_vm._u([{key:"view",fn:function(ref){
  var inputValue = ref.inputValue;
return [_c('gl-token',{staticClass:"gl-filtered-search-token-type",class:_vm.getAdditionalSegmentClasses(_vm.$options.segments.SEGMENT_TITLE),attrs:{"view-only":""}},[_vm._v("\n        "+_vm._s(inputValue)+"\n      ")])]}}])}),_vm._v(" "),_c('gl-filtered-search-token-segment',{key:"operator-segment",attrs:{"active":_vm.isSegmentActive(_vm.$options.segments.SEGMENT_OPERATOR),"cursor-position":_vm.intendedCursorPosition,"options":_vm.operators,"option-text-field":"value","custom-input-keydown-handler":_vm.handleOperatorKeydown,"view-only":_vm.viewOnly},on:{"activate":function($event){return _vm.activateSegment(_vm.$options.segments.SEGMENT_OPERATOR)},"backspace":_vm.replaceWithTermIfEmpty,"complete":function($event){return _vm.activateSegment(_vm.$options.segments.SEGMENT_DATA)},"deactivate":function($event){return _vm.$emit('deactivate')},"previous":_vm.activatePreviousTitleSegment,"next":_vm.activateNextDataSegment},scopedSlots:_vm._u([{key:"view",fn:function(){return [_c('gl-token',{staticClass:"gl-filtered-search-token-operator",class:_vm.getAdditionalSegmentClasses(_vm.$options.segments.SEGMENT_OPERATOR),attrs:{"variant":"search-value","view-only":""}},[_vm._v("\n        "+_vm._s(_vm.operatorDescription)+"\n      ")])]},proxy:true},{key:"option",fn:function(ref){
  var option = ref.option;
return [_c('div',{staticClass:"gl-display-flex"},[_vm._v("\n        "+_vm._s(_vm.showFriendlyText ? option.description : option.value)+"\n        "),(option.description)?_c('span',{staticClass:"gl-filtered-search-token-operator-description"},[_vm._v("\n          "+_vm._s(_vm.showFriendlyText ? option.value : option.description)+"\n        ")]):_vm._e()])]}}]),model:{value:(_vm.tokenValue.operator),callback:function ($$v) {_vm.$set(_vm.tokenValue, "operator", $$v);},expression:"tokenValue.operator"}}),_vm._v(" "),(_vm.hasDataOrDataSegmentIsCurrentlyActive)?_c('gl-filtered-search-token-segment',{key:"data-segment",attrs:{"active":_vm.isSegmentActive(_vm.$options.segments.SEGMENT_DATA),"cursor-position":_vm.intendedCursorPosition,"multi-select":_vm.config.multiSelect,"options":_vm.config.options,"view-only":_vm.viewOnly,"search-input-attributes":_vm.dataSegmentInputAttributes},on:{"activate":_vm.activateDataSegment,"backspace":function($event){return _vm.activateSegment(_vm.$options.segments.SEGMENT_OPERATOR)},"complete":_vm.handleComplete,"select":function($event){return _vm.$emit('select', $event)},"submit":function($event){return _vm.$emit('submit')},"deactivate":function($event){return _vm.$emit('deactivate')},"split":function($event){return _vm.$emit('split', $event)},"previous":_vm.activatePreviousOperatorSegment,"next":function($event){return _vm.$emit('next')}},scopedSlots:_vm._u([{key:"before-input",fn:function(scope){return [_vm._t("before-data-segment-input",null,null,scope)]}},{key:"suggestions",fn:function(){return [_vm._t("suggestions")]},proxy:true},{key:"view",fn:function(ref){
  var inputValue = ref.inputValue;
return [_vm._t("view-token",function(){return [_c('gl-token',_vm._g({staticClass:"gl-filtered-search-token-data",class:_vm.getAdditionalSegmentClasses(_vm.$options.segments.SEGMENT_DATA),attrs:{"variant":"search-value","view-only":_vm.viewOnly}},_vm.eventListeners),[_c('span',{staticClass:"gl-filtered-search-token-data-content"},[_vm._t("view",function(){return [_vm._v(_vm._s(inputValue))]},null,{ inputValue: inputValue })],2)])]},null,{
          inputValue: inputValue,
          listeners: _vm.eventListeners,
          cssClasses: Object.assign({}, {'gl-filtered-search-token-data': true},
            _vm.getAdditionalSegmentClasses(_vm.$options.segments.SEGMENT_DATA)),
        })]}}],null,true),model:{value:(_vm.tokenValue.data),callback:function ($$v) {_vm.$set(_vm.tokenValue, "data", $$v);},expression:"tokenValue.data"}}):_vm._e()],1)};
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
