import { tokenVariants } from '../../../utils/constants';
import CloseButton from '../../shared_components/close_button/close_button';
import __vue_normalize__ from 'vue-runtime-helpers/dist/normalize-component.js';

//
var script = {
  name: 'GlToken',
  components: {
    CloseButton
  },
  props: {
    viewOnly: {
      type: Boolean,
      required: false,
      default: false
    },
    /**
     * Token visual variants: default, search-type, and search-value.
     */
    variant: {
      type: String,
      required: false,
      default: 'default',
      validator: variant => tokenVariants.includes(variant)
    }
  },
  computed: {
    variantClass() {
      return `gl-token-${this.variant}-variant`;
    },
    viewOnlyClass() {
      return {
        'gl-token-view-only': this.viewOnly
      };
    }
  },
  methods: {
    close($event) {
      /**
       * Emitted when x is clicked
       *
       * @event close
       */
      this.$emit('close', $event);
    }
  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('span',_vm._g({class:['gl-token', _vm.variantClass, _vm.viewOnlyClass]},_vm.$listeners),[_c('span',{staticClass:"gl-token-content"},[_vm._t("default"),_vm._v(" "),(!_vm.viewOnly)?_c('close-button',{staticClass:"gl-token-close gl-close-btn-color-inherit",on:{"click":_vm.close}}):_vm._e()],2)])};
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
