import isObject from 'lodash/isObject';
import { BFormInput } from 'bootstrap-vue/esm/index.js';
import { formInputWidths } from '../../../../utils/constants';
import __vue_normalize__ from 'vue-runtime-helpers/dist/normalize-component.js';

const MODEL_PROP = 'value';
const MODEL_EVENT = 'input';
var script = {
  name: 'GlFormInput',
  components: {
    BFormInput
  },
  inheritAttrs: false,
  model: {
    prop: MODEL_PROP,
    event: MODEL_EVENT
  },
  props: {
    /**
     * Maximum width of the input
     */
    width: {
      type: [String, Object],
      required: false,
      default: null,
      validator: value => {
        const widths = isObject(value) ? Object.values(value) : [value];
        return widths.every(width => Object.values(formInputWidths).includes(width));
      }
    }
  },
  computed: {
    cssClasses() {
      if (this.width === null) {
        return [];
      }
      if (isObject(this.width)) {
        const {
          default: defaultWidth,
          ...nonDefaultWidths
        } = this.width;
        return [...(defaultWidth ? [`gl-form-input-${defaultWidth}`] : []), ...Object.entries(nonDefaultWidths).map(_ref => {
          let [breakpoint, width] = _ref;
          return `gl-${breakpoint}-form-input-${width}`;
        })];
      }
      return [`gl-form-input-${this.width}`];
    },
    listeners() {
      var _this = this;
      return {
        ...this.$listeners,
        // Swap purpose of input and update events from underlying BFormInput.
        // See https://gitlab.com/gitlab-org/gitlab-ui/-/issues/631.
        input: function () {
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          /**
           * Emitted to update the v-model
           *
           * @event update
           * @property {string} value new value
           */
          _this.$emit('update', ...args);
        },
        update: function () {
          for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }
          /**
           * Triggered by user interaction. Emitted after any formatting (not including 'trim' or 'number' props).
           * Useful for getting the currently entered value when the 'debounce' or 'lazy' props are set.
           *
           * @event input
           * @property {string} value new value
           */
          _this.$emit(MODEL_EVENT, ...args);
        }
      };
    }
  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('b-form-input',_vm._g(_vm._b({staticClass:"gl-form-input",class:_vm.cssClasses,attrs:{"no-wheel":""}},'b-form-input',_vm.$attrs,false),_vm.listeners))};
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
