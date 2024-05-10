import __vue_normalize__ from 'vue-runtime-helpers/dist/normalize-component.js';

//

var script = {
  name: 'GlCard',
  props: {
    /**
     * Additional CSS class(es) to be applied to the header.
     */
    headerClass: {
      type: [String, Object, Array],
      required: false,
      default: ''
    },
    /**
     * Additional CSS class(es) to be applied to the body.
     */
    bodyClass: {
      type: [String, Object, Array],
      required: false,
      default: ''
    },
    /**
     * Additional CSS class(es) to be applied to the footer.
     */
    footerClass: {
      type: [String, Object, Array],
      required: false,
      default: ''
    }
  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"gl-card"},[(_vm.$scopedSlots.header)?_c('div',{staticClass:"gl-card-header",class:_vm.headerClass},[_vm._t("header")],2):_vm._e(),_vm._v(" "),_c('div',{staticClass:"gl-card-body",class:_vm.bodyClass},[_vm._t("default")],2),_vm._v(" "),(_vm.$scopedSlots.footer)?_c('div',{staticClass:"gl-card-footer",class:_vm.footerClass},[_vm._t("footer")],2):_vm._e()])};
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
