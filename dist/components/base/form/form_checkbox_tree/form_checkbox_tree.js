import GlFormCheckbox from '../form_checkbox/form_checkbox';
import GlFormGroup from '../form_group/form_group';
import GlFormCheckboxTreeNode from './checkbox_tree_node';
import { V_MODEL } from './models/constants';
import { Tree } from './models/tree';
import __vue_normalize__ from 'vue-runtime-helpers/dist/normalize-component.js';

var script = {
  name: 'GlFormCheckboxTree',
  components: {
    GlFormGroup,
    GlFormCheckbox,
    GlFormCheckboxTreeNode
  },
  provide() {
    return {
      tree: this.tree
    };
  },
  model: {
    prop: V_MODEL.PROP,
    event: V_MODEL.EVENT
  },
  props: {
    /**
     * Options tree where each option is in the form:
     * {
     *  value: String|Number,
     *  label: String,
     *  children: Array,
     * }
     */
    options: {
      type: Array,
      required: true
    },
    /**
     * The selected options as an array of values
     */
    value: {
      type: Array,
      required: false,
      default: () => []
    },
    /**
     * Set to true to hide the "Select/unselect all" checkbox
     */
    hideToggleAll: {
      type: Boolean,
      required: false,
      default: false
    },
    /**
     * Label for the toggle all checkbox when some or all options are unchecked
     */
    selectAllLabel: {
      type: String,
      required: false,
      default: 'Select all'
    },
    /**
     * Label for the toggle all checkbox when all options are checked
     */
    unselectAllLabel: {
      type: String,
      required: false,
      default: 'Unselect all'
    },
    label: {
      type: String,
      required: false,
      default: 'Checkbox tree'
    },
    labelSrOnly: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  data() {
    return {
      tree: new Tree(this.options, this.value)
    };
  },
  computed: {
    toggleAllLabel() {
      return this.tree.allOptionsChecked ? this.unselectAllLabel : this.selectAllLabel;
    }
  },
  watch: {
    'tree.selected': {
      handler(selected) {
        /**
         * Emitted when the selection changes.
         */
        this.$emit(V_MODEL.EVENT, selected);
      }
    }
  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('gl-form-group',{attrs:{"label":_vm.label,"label-sr-only":_vm.labelSrOnly}},[(!_vm.hideToggleAll)?_c('gl-form-checkbox',{staticClass:"gl-form-checkbox-tree-toggle-all",attrs:{"checked":_vm.tree.allOptionsChecked,"indeterminate":_vm.tree.someOptionsChecked},on:{"change":function($event){return _vm.tree.toggleAllOptions($event)}}},[_vm._v("\n    "+_vm._s(_vm.toggleAllLabel)+"\n  ")]):_vm._e(),_vm._v(" "),_vm._l((_vm.options),function(option){return _c('gl-form-checkbox-tree-node',{key:option.value,attrs:{"option":option}})})],2)};
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
