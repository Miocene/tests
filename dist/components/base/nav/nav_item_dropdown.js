import { BNavItemDropdown } from 'bootstrap-vue/esm/index.js';
import GlIcon from '../icon/icon';
import __vue_normalize__ from 'vue-runtime-helpers/dist/normalize-component.js';

var script = {
  name: 'GlNavItemDropdown',
  components: {
    BNavItemDropdown,
    GlIcon
  },
  inheritAttrs: false,
  props: {
    text: {
      type: String,
      required: false,
      default: ''
    },
    icon: {
      type: String,
      required: false,
      default: ''
    }
  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('b-nav-item-dropdown',_vm._g(_vm._b({staticClass:"gl-dropdown",scopedSlots:_vm._u([{key:"default",fn:function(){return [_vm._t("default")]},proxy:true},{key:"button-content",fn:function(){return [_vm._t("button-content",function(){return [(_vm.icon)?_c('gl-icon',{staticClass:"dropdown-icon",attrs:{"name":_vm.icon}}):_vm._e(),_vm._v("\n      "+_vm._s(_vm.text)+"\n      "),_c('gl-icon',{staticClass:"dropdown-chevron",attrs:{"name":"chevron-down"}})]})]},proxy:true}],null,true)},'b-nav-item-dropdown',_vm.$attrs,false),_vm.$listeners))};
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
