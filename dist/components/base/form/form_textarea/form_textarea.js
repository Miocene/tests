import { BFormTextarea } from 'bootstrap-vue/esm/index.js';
import debounce from 'lodash/debounce';
import uniqueId from 'lodash/uniqueId';
import __vue_normalize__ from 'vue-runtime-helpers/dist/normalize-component.js';

const model = {
  prop: 'value',
  event: 'input'
};
var script = {
  name: 'GlFormTextarea',
  components: {
    BFormTextarea
  },
  inheritAttrs: false,
  model,
  props: {
    // This prop is needed to map the v-model correctly
    // https://alligator.io/vuejs/add-v-model-support/
    value: {
      type: String,
      required: false,
      default: ''
    },
    noResize: {
      type: Boolean,
      required: false,
      default: true
    },
    submitOnEnter: {
      type: Boolean,
      required: false,
      default: false
    },
    /**
     * Max character count for the textarea.
     */
    characterCount: {
      type: Number,
      required: false,
      default: null
    }
  },
  data() {
    return {
      characterCountId: uniqueId('form-textarea-character-count-'),
      remainingCharacterCount: this.initialRemainingCharacterCount(),
      remainingCharacterCountSrOnly: this.initialRemainingCharacterCount()
    };
  },
  computed: {
    listeners() {
      var _this = this;
      return {
        ...this.$listeners,
        // Swap purpose of input and update events from underlying BFormTextarea.
        // See https://gitlab.com/gitlab-org/gitlab-ui/-/issues/631.
        input: function () {
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          /**
           * Emitted to update the v-model
           */
          _this.$emit('update', ...args);
        },
        update: function () {
          for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }
          /**
           * Triggered by user interaction.
           * Emitted after any formatting (not including 'trim' or 'number' props).
           * Useful for getting the currently entered value when the 'debounce' or 'lazy' props are set.
           */
          _this.$emit(model.event, ...args);
        }
      };
    },
    keypressEvent() {
      return this.submitOnEnter ? 'keyup' : null;
    },
    isCharacterCountOverLimit() {
      return this.remainingCharacterCount < 0;
    },
    characterCountTextClass() {
      return this.isCharacterCountOverLimit ? 'gl-text-red-500' : 'gl-text-gray-500';
    },
    showCharacterCount() {
      return this.characterCount !== null;
    },
    bFormTextareaProps() {
      return {
        ...this.$attrs,
        class: 'gl-form-input gl-form-textarea',
        noResize: this.noResize,
        value: this.value
      };
    }
  },
  watch: {
    value(newValue) {
      if (!this.showCharacterCount) {
        return;
      }
      this.remainingCharacterCount = this.characterCount - this.valueLength(newValue);
      this.debouncedUpdateRemainingCharacterCountSrOnly(newValue);
    }
  },
  created() {
    // Debounce updating the remaining character count for a second so
    // screen readers announce the remaining text after the text in the textarea.
    this.debouncedUpdateRemainingCharacterCountSrOnly = debounce(this.updateRemainingCharacterCountSrOnly, 1000);
  },
  methods: {
    valueLength(value) {
      return (value === null || value === void 0 ? void 0 : value.length) || 0;
    },
    handleKeyPress(e) {
      if (e.keyCode === 13 && (e.metaKey || e.ctrlKey)) {
        this.$emit('submit');
      }
    },
    updateRemainingCharacterCountSrOnly(newValue) {
      this.remainingCharacterCountSrOnly = this.characterCount - this.valueLength(newValue);
    },
    initialRemainingCharacterCount() {
      return this.characterCount - this.valueLength(this.value);
    }
  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.showCharacterCount)?_c('div',[_c('b-form-textarea',_vm._g(_vm._b({attrs:{"aria-describedby":_vm.characterCountId},nativeOn:_vm._d({},[_vm.keypressEvent,function($event){return _vm.handleKeyPress.apply(null, arguments)}])},'b-form-textarea',_vm.bFormTextareaProps,false),_vm.listeners)),_vm._v(" "),_c('small',{class:['form-text', _vm.characterCountTextClass],attrs:{"aria-hidden":"true"}},[(_vm.isCharacterCountOverLimit)?_vm._t("character-count-over-limit-text",null,{"count":Math.abs(_vm.remainingCharacterCount)}):_vm._t("character-count-text",null,{"count":_vm.remainingCharacterCount})],2),_vm._v(" "),_c('div',{staticClass:"gl-sr-only",attrs:{"id":_vm.characterCountId,"aria-live":"polite","data-testid":"character-count-text-sr-only"}},[(_vm.isCharacterCountOverLimit)?_vm._t("character-count-over-limit-text",null,{"count":Math.abs(_vm.remainingCharacterCount)}):_vm._t("character-count-text",null,{"count":_vm.remainingCharacterCountSrOnly})],2)],1):_c('b-form-textarea',_vm._g(_vm._b({nativeOn:_vm._d({},[_vm.keypressEvent,function($event){return _vm.handleKeyPress.apply(null, arguments)}])},'b-form-textarea',_vm.bFormTextareaProps,false),_vm.listeners))};
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
