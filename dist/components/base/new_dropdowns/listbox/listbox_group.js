import uniqueId from 'lodash/uniqueId';
import __vue_normalize__ from 'vue-runtime-helpers/dist/normalize-component.js';

var script = {
  name: 'GlListboxGroup',
  props: {
    name: {
      type: String,
      required: true
    },
    textSrOnly: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  created() {
    this.nameId = uniqueId('gl-listbox-group-');
  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('ul',{staticClass:"gl-mb-0 gl-pl-0",attrs:{"role":"group","aria-labelledby":_vm.nameId}},[_c('li',{staticClass:"gl-pl-4 gl-pt-3 gl-pb-2 gl-font-sm gl-font-weight-bold",class:{ 'gl-sr-only': _vm.textSrOnly },attrs:{"id":_vm.nameId,"role":"presentation"}},[_vm._t("group-label",function(){return [_vm._v(_vm._s(_vm.name))]})],2),_vm._v(" "),_vm._t("default")],2)};
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
