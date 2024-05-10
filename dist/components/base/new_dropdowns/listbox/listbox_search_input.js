import GlClearIconButton from '../../../shared_components/clear_icon_button/clear_icon_button';
import GlIcon from '../../icon/icon';
import __vue_normalize__ from 'vue-runtime-helpers/dist/normalize-component.js';

var script = {
  name: 'GlListboxSearchInput',
  components: {
    GlClearIconButton,
    GlIcon
  },
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
    /**
     * Search input placeholder text and aria-label
     */
    placeholder: {
      type: String,
      required: false,
      default: 'Search'
    }
  },
  computed: {
    hasValue() {
      return Boolean(this.value.length);
    },
    inputListeners() {
      return {
        ...this.$listeners,
        input: event => {
          this.$emit('input', event.target.value);
        }
      };
    }
  },
  methods: {
    clearInput() {
      this.$emit('input', '');
      this.focusInput();
    },
    focusInput() {
      this.$refs.input.focus();
    }
  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"gl-listbox-search"},[_c('gl-icon',{staticClass:"gl-listbox-search-icon",attrs:{"name":"search-sm","size":12}}),_vm._v(" "),_c('input',_vm._g({ref:"input",staticClass:"gl-listbox-search-input",attrs:{"type":"search","aria-label":_vm.placeholder,"placeholder":_vm.placeholder},domProps:{"value":_vm.value}},_vm.inputListeners)),_vm._v(" "),(_vm.hasValue)?_c('gl-clear-icon-button',{staticClass:"gl-listbox-search-clear-button",on:{"click":function($event){$event.stopPropagation();return _vm.clearInput.apply(null, arguments)}}}):_vm._e()],1)};
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
