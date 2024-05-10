import GlFormCheckbox from '../form_checkbox/form_checkbox';
import { QA_PREFIX } from './models/constants';
import __vue_normalize__ from 'vue-runtime-helpers/dist/normalize-component.js';

var script = {
  name: 'GlFormCheckboxTreeNode',
  qaPrefix: QA_PREFIX,
  components: {
    GlFormCheckbox
  },
  inject: ['tree'],
  props: {
    option: {
      type: Object,
      required: true
    },
    isNested: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    node() {
      return this.tree.getNode(this.option.value);
    },
    label() {
      return this.node.label || this.node.value;
    },
    rootClass() {
      return this.isNested ? 'gl-ml-6' : null;
    },
    checkboxClass() {
      const {
        isChecked,
        isIndeterminate
      } = this.node;
      return [isChecked && 'js-is-checked', isIndeterminate && 'js-is-indeterminate'];
    }
  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:_vm.rootClass,attrs:{"data-testid":("" + (_vm.$options.qaPrefix) + (_vm.option.value))}},[_c('gl-form-checkbox',{class:_vm.checkboxClass,attrs:{"checked":_vm.node.isChecked,"indeterminate":_vm.node.isIndeterminate},on:{"change":function($event){return _vm.tree.toggleOption(_vm.option, $event)}}},[_vm._v("\n    "+_vm._s(_vm.label)+"\n  ")]),_vm._v(" "),_vm._l((_vm.option.children),function(child){return _c('gl-form-checkbox-tree-node',{key:child.value,attrs:{"option":child,"is-nested":""}})})],2)};
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
