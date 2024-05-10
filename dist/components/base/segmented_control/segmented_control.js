import { BFormRadioGroup } from 'bootstrap-vue/esm/index.js';
import __vue_normalize__ from 'vue-runtime-helpers/dist/normalize-component.js';

const genericErrorMessage = 'Segmented button should always have valid option selected';
var script = {
  name: 'GlSegmentedControl',
  components: {
    BFormRadioGroup
  },
  inheritAttrs: false,
  model: {
    prop: 'checked',
    event: 'input'
  },
  props: {
    checked: {
      required: true,
      validator: () => true
    },
    options: {
      type: Array,
      required: true
    }
  },
  computed: {
    enabledOptions() {
      return this.options.filter(option => !option.disabled);
    }
  },
  watch: {
    checked: {
      handler(newValue, oldValue) {
        this.checkValue(newValue, oldValue);
      }
    },
    options: {
      handler() {
        this.checkValue(this.checked);
      }
    }
  },
  created() {
    this.checkValue(this.checked);
  },
  methods: {
    checkValue(newValue) {
      let oldValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      if (!this.isValidValue(newValue)) {
        // eslint-disable-next-line no-console
        console.warn(genericErrorMessage);
        if (this.enabledOptions.length) {
          const suggestion = oldValue && this.isValidValue(oldValue) ? oldValue : this.enabledOptions[0].value;
          /**
           * Emitted when the selection changes
           * @event input
           * @argument checked The selected option
           */
          this.$emit('input', suggestion);
        }
      }
    },
    isValidValue(val) {
      return this.enabledOptions.some(_ref => {
        let {
          value
        } = _ref;
        return value === val;
      });
    }
  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('b-form-radio-group',_vm._g(_vm._b({staticClass:"gl-segmented-control",attrs:{"buttons":"","button-variant":"gl-segmented-button gl-button"}},'b-form-radio-group',Object.assign({}, _vm.$attrs, {options: _vm.options, checked: _vm.checked}),false),_vm.$listeners))};
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
