import { BFormCheckbox } from 'bootstrap-vue/esm/index.js';
import uniqueId from 'lodash/uniqueId';
import __vue_normalize__ from 'vue-runtime-helpers/dist/normalize-component.js';

var script = {
  name: 'GlFormCheckbox',
  components: {
    BFormCheckbox
  },
  inheritAttrs: false,
  model: {
    prop: 'checked',
    event: 'input'
  },
  props: {
    id: {
      type: String,
      required: false,
      default: () => uniqueId()
    }
  },
  methods: {
    change($event) {
      /**
       * Emitted when selected value(s) is changed due to user interaction.
       *
       * @event change
       */
      this.$emit('change', $event);
    },
    input($event) {
      /**
       * Emitted when checked state is changed.
       *
       * @event input
       */
      this.$emit('input', $event);
    }
  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('b-form-checkbox',_vm._b({staticClass:"gl-form-checkbox",attrs:{"id":_vm.id},on:{"change":_vm.change,"input":_vm.input}},'b-form-checkbox',_vm.$attrs,false),[_vm._t("default"),_vm._v(" "),(Boolean(_vm.$scopedSlots.help))?_c('p',{staticClass:"help-text"},[_vm._t("help")],2):_vm._e()],2)};
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
