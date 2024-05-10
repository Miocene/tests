import GlButton from '../../../../../base/button/button';
import __vue_normalize__ from 'vue-runtime-helpers/dist/normalize-component.js';

var script = {
  name: 'GlDuoChatPredefinedPrompts',
  components: {
    GlButton
  },
  props: {
    /**
     * Array of predefined prompts to display. Every prompt should be a string which will be converted into a prompt when clicked.
     */
    prompts: {
      type: Array,
      required: true
    }
  },
  methods: {
    handleClick(prompt) {
      /**
       * Emits the prompt string that was clicked.
       */
      this.$emit('click', prompt);
    }
  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"gl-text-right"},_vm._l((_vm.prompts),function(prompt,index){return _c('div',{key:("question-" + index),staticClass:"gl-mt-3"},[_c('gl-button',{attrs:{"category":"secondary","variant":"confirm"},on:{"click":function($event){return _vm.handleClick(prompt)}}},[_c('span',{staticClass:"gl-white-space-normal"},[_vm._v(_vm._s(prompt))])])],1)}),0)};
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
