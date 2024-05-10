import { BFormRadio } from 'bootstrap-vue/esm/index.js';
import __vue_normalize__ from 'vue-runtime-helpers/dist/normalize-component.js';

const {
  model
} = BFormRadio.options;
var script = {
  name: 'GlFormRadio',
  components: {
    BFormRadio
  },
  inheritAttrs: false,
  model: {
    prop: model.prop,
    event: model.event
  },
  props: {
    /**
     * Whether the radio is checked
     */
    checked: {
      type: [String, Number, Boolean, Object],
      required: false,
      default: false
    }
  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('b-form-radio',_vm._b({staticClass:"gl-form-radio",attrs:{"checked":_vm.checked},on:{"input":function($event){return _vm.$emit('input', $event)},"change":function($event){return _vm.$emit('change', $event)}}},'b-form-radio',_vm.$attrs,false),[_vm._t("default"),_vm._v(" "),(_vm.$scopedSlots.help)?_c('p',{staticClass:"help-text"},[_vm._t("help")],2):_vm._e()],2)};
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
