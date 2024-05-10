import { BTableLite } from 'bootstrap-vue/esm/index.js';
import __vue_normalize__ from 'vue-runtime-helpers/dist/normalize-component.js';

const {
  tableClass
} = BTableLite.options.props;
var script = {
  name: 'GlTableLite',
  components: {
    BTableLite
  },
  inheritAttrs: false,
  props: {
    tableClass,
    fields: {
      type: Array,
      required: false,
      default: null
    },
    stickyHeader: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  computed: {
    stickyHeaderClass() {
      return this.stickyHeader ? 'gl-table--sticky-header' : null;
    },
    localTableClass() {
      return ['gl-table', this.tableClass, this.stickyHeaderClass];
    }
  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('b-table-lite',_vm._g(_vm._b({attrs:{"table-class":_vm.localTableClass,"fields":_vm.fields},scopedSlots:_vm._u([_vm._l((Object.keys(_vm.$scopedSlots)),function(slot){return {key:slot,fn:function(scope){return [_vm._t(slot,null,null,scope)]}}})],null,true)},'b-table-lite',_vm.$attrs,false),_vm.$listeners))};
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
