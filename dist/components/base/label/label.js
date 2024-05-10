import { labelColorOptions } from '../../../utils/constants';
import { colorFromBackground } from '../../../utils/utils';
import GlButton from '../button/button';
import GlIcon from '../icon/icon';
import GlLink from '../link/link';
import GlTooltip from '../tooltip/tooltip';
import __vue_normalize__ from 'vue-runtime-helpers/dist/normalize-component.js';

//
var script = {
  name: 'GlLabel',
  components: {
    GlButton,
    GlIcon,
    GlLink,
    GlTooltip
  },
  props: {
    backgroundColor: {
      type: String,
      required: true,
      validator: value => /^(#|rgb|rgba)/.test(value)
    },
    title: {
      type: String,
      required: true,
      default: ''
    },
    description: {
      type: String,
      required: false,
      default: ''
    },
    tooltipPlacement: {
      type: String,
      required: false,
      default: 'top'
    },
    target: {
      type: String,
      required: false,
      default: ''
    },
    scoped: {
      type: Boolean,
      required: false,
      default: false
    },
    showCloseButton: {
      type: Boolean,
      required: false,
      default: false
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      splitScopedLabelIndex: this.title.lastIndexOf('::')
    };
  },
  computed: {
    cssClasses() {
      const textColorVariant = colorFromBackground(this.backgroundColor);
      return {
        'gl-label-scoped': this.scoped,
        'gl-label-text-dark': textColorVariant === labelColorOptions.dark,
        'gl-label-text-light': textColorVariant === labelColorOptions.light
      };
    },
    cssVariables() {
      return {
        '--label-background-color': this.backgroundColor,
        '--label-inset-border': `inset 0 0 0 2px ${this.backgroundColor}`
      };
    },
    scopedKey() {
      return this.scoped ? this.title.slice(0, this.splitScopedLabelIndex) : this.title;
    },
    scopedValue() {
      return this.title.slice(this.splitScopedLabelIndex + 2);
    },
    labelComponent() {
      return this.target ? GlLink : 'span';
    },
    tooltipTarget() {
      return this.target ? this.$refs.labelTitle.$el : this.$refs.labelTitle;
    }
  },
  watch: {
    title() {
      this.splitScopedLabelIndex = this.title.lastIndexOf('::');
    }
  },
  methods: {
    onClick(e) {
      /**
       * Emitted when label is clicked
       *
       * @event click
       * @type {object}
       */
      this.$emit('click', e);
    },
    onClose(e) {
      /**
       * Emitted when x is clicked
       *
       * @event close
       * @type {object}
       */
      this.$emit('close', e);
    }
  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('span',_vm._b({staticClass:"gl-label",class:_vm.cssClasses,style:(_vm.cssVariables),on:{"click":_vm.onClick}},'span',_vm.$attrs,false),[_c(_vm.labelComponent,{ref:"labelTitle",tag:"component",staticClass:"gl-label-link",attrs:{"href":_vm.target ? _vm.target : false,"tabindex":"0"}},[_c('span',{staticClass:"gl-label-text"},[_vm._v("\n      "+_vm._s(_vm.scopedKey)+"\n    ")]),_vm._v(" "),(_vm.scoped && _vm.scopedValue)?_c('span',{staticClass:"gl-label-text-scoped"},[_vm._v("\n      "+_vm._s(_vm.scopedValue)+"\n    ")]):_vm._e()]),_vm._v(" "),(_vm.showCloseButton)?_c('gl-button',{staticClass:"gl-label-close gl-p-0!",attrs:{"category":"tertiary","size":"small","variant":"reset","aria-label":"Remove label","disabled":_vm.disabled},on:{"click":_vm.onClose}},[_c('gl-icon',{attrs:{"name":"close-xs","size":12}})],1):_vm._e(),_vm._v(" "),(_vm.description)?_c('gl-tooltip',{attrs:{"target":function () { return _vm.tooltipTarget; },"placement":_vm.tooltipPlacement,"boundary":"viewport"}},[(_vm.scoped)?_c('span',{staticClass:"gl-label-tooltip-title"},[_vm._v("Scoped label")]):_vm._e(),_vm._v("\n    "+_vm._s(_vm.description)+"\n  ")]):_vm._e()],1)};
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
