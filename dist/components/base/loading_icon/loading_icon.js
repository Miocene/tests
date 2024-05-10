import __vue_normalize__ from 'vue-runtime-helpers/dist/normalize-component.js';

const sizes = ['sm',
// -> 16px
'md',
// -> 24px
'lg',
// -> 32px
'xl' // -> 64px
];
const colors = {
  dark: 'dark',
  light: 'light'
};
const defaultColor = colors.dark;
var script = {
  name: 'GlLoadingIcon',
  props: {
    /**
     * Aria-label.
     */
    label: {
      type: String,
      required: false,
      default: 'Loading'
    },
    size: {
      type: String,
      required: false,
      default: 'sm',
      validator(value) {
        return sizes.indexOf(value) !== -1;
      }
    },
    color: {
      type: String,
      required: false,
      default: defaultColor,
      validator(value) {
        return Object.keys(colors).includes(value);
      }
    },
    variant: {
      type: String,
      required: false,
      default: 'spinner',
      validator(value) {
        return ['spinner', 'dots'].includes(value);
      }
    },
    /**
     * Wrap in a span or div.
     */
    inline: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    rootElementType() {
      return this.inline ? 'span' : 'div';
    },
    spinnerCssClasses() {
      const baseCssClass = 'gl-spinner';
      return [baseCssClass, `${baseCssClass}-${colors[this.color]}`, `${baseCssClass}-${this.size}`];
    },
    dotsCssClasses() {
      const baseCssClass = 'gl-dots-loader';
      return [baseCssClass, `${baseCssClass}-${colors[this.color]}`, `${baseCssClass}-${this.size}`];
    }
  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.variant === 'spinner')?_c(_vm.rootElementType,{tag:"component",staticClass:"gl-spinner-container",attrs:{"aria-label":_vm.label,"role":"status"}},[_c('span',{staticClass:"gl-vertical-align-text-bottom!",class:_vm.spinnerCssClasses})]):_c(_vm.rootElementType,{tag:"component",class:_vm.dotsCssClasses,attrs:{"role":"status","aria-label":_vm.label}},[_c('span')])};
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
