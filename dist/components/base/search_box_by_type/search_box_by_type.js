import GlClearIconButton from '../../shared_components/clear_icon_button/clear_icon_button';
import GlFormInput from '../form/form_input/form_input';
import GlIcon from '../icon/icon';
import GlLoadingIcon from '../loading_icon/loading_icon';
import { translate } from '../../../utils/i18n';
import __vue_normalize__ from 'vue-runtime-helpers/dist/normalize-component.js';

var script = {
  name: 'GlSearchboxByType',
  components: {
    GlClearIconButton,
    GlIcon,
    GlFormInput,
    GlLoadingIcon
  },
  inheritAttrs: false,
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    /**
     * If provided, used as value of search input
     */
    value: {
      type: String,
      required: false,
      default: ''
    },
    borderless: {
      type: Boolean,
      required: false,
      default: false
    },
    clearButtonTitle: {
      type: String,
      required: false,
      default: () => translate('GlSearchBoxByType.clearButtonTitle', 'Clear')
    },
    /**
     * If provided and true, disables the input and controls
     */
    disabled: {
      type: Boolean,
      required: false,
      default: false
    },
    /**
     * Puts search box into loading state, rendering spinner
     */
    isLoading: {
      type: Boolean,
      required: false,
      default: false
    },
    /**
     * Container for tooltip. Valid values: DOM node, selector string or `false` for default
     */
    tooltipContainer: {
      required: false,
      default: false,
      validator: value => value === false || typeof value === 'string' || value instanceof HTMLElement
    }
  },
  computed: {
    inputAttributes() {
      const attributes = {
        type: 'search',
        placeholder: translate('GlSearchBoxByType.input.placeholder', 'Search'),
        ...this.$attrs
      };
      if (!attributes['aria-label']) {
        attributes['aria-label'] = attributes.placeholder;
      }
      return attributes;
    },
    hasValue() {
      return Boolean(this.value.length);
    },
    inputListeners() {
      return {
        ...this.$listeners,
        input: this.onInput,
        focusin: this.onFocusin,
        focusout: this.onFocusout
      };
    },
    showClearButton() {
      return this.hasValue && !this.disabled;
    }
  },
  methods: {
    isInputOrClearButton(element) {
      var _this$$refs$input, _this$$refs$clearButt;
      return element === ((_this$$refs$input = this.$refs.input) === null || _this$$refs$input === void 0 ? void 0 : _this$$refs$input.$el) || element === ((_this$$refs$clearButt = this.$refs.clearButton) === null || _this$$refs$clearButt === void 0 ? void 0 : _this$$refs$clearButt.$el);
    },
    clearInput() {
      this.onInput('');
      this.focusInput();
    },
    focusInput() {
      this.$refs.input.$el.focus();
    },
    onInput(value) {
      this.$emit('input', value);
    },
    onFocusout(event) {
      const {
        relatedTarget
      } = event;
      if (this.isInputOrClearButton(relatedTarget)) {
        return;
      }
      this.$emit('focusout', event);
    },
    onFocusin(event) {
      const {
        relatedTarget
      } = event;
      if (this.isInputOrClearButton(relatedTarget)) {
        return;
      }
      this.$emit('focusin', event);
    }
  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"gl-search-box-by-type"},[_c('gl-icon',{staticClass:"gl-search-box-by-type-search-icon",attrs:{"name":"search"}}),_vm._v(" "),_c('gl-form-input',_vm._g(_vm._b({ref:"input",class:{
      'gl-search-box-by-type-input': !_vm.borderless,
      'gl-search-box-by-type-input-borderless': _vm.borderless,
    },attrs:{"value":_vm.value,"disabled":_vm.disabled}},'gl-form-input',_vm.inputAttributes,false),_vm.inputListeners)),_vm._v(" "),(_vm.isLoading || _vm.showClearButton)?_c('div',{staticClass:"gl-search-box-by-type-right-icons"},[(_vm.isLoading)?_c('gl-loading-icon',{staticClass:"gl-search-box-by-type-loading-icon"}):_vm._e(),_vm._v(" "),(_vm.showClearButton)?_c('gl-clear-icon-button',{ref:"clearButton",staticClass:"gl-search-box-by-type-clear gl-clear-icon-button",attrs:{"title":_vm.clearButtonTitle,"tooltip-container":_vm.tooltipContainer},on:{"click":function($event){$event.stopPropagation();return _vm.clearInput.apply(null, arguments)},"focusin":_vm.onFocusin,"focusout":_vm.onFocusout}}):_vm._e()],1):_vm._e()],1)};
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
