import __vue_normalize__ from 'vue-runtime-helpers/dist/normalize-component.js';

var script = {
  name: 'GlDashboardSkeleton',
  props: {
    /**
     * Number of cards to be shown
     */
    cards: {
      type: Number,
      required: false,
      default: 3
    }
  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"row dashboard-cards"},_vm._l((_vm.cards),function(index){return _c('div',{key:index,staticClass:"col-12 col-md-6 col-xl-4 px-2"},[_c('div',{staticClass:"rounded-top py-4 bg-light"}),_vm._v(" "),_vm._m(0,true)])}),0)};
var __vue_staticRenderFns__ = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"dashboard-card-body card-body bg-secondary"},[_c('div',{staticClass:"row"},[_c('div',{staticClass:"col-1 align-self-center"},[_c('div',{staticClass:"bg-light p-3 rounded-circle"})]),_vm._v(" "),_c('div',{staticClass:"col-10 col-sm-6 align-self-center pl-4"},[_c('div',{staticClass:"dashboard-card-skeleton-info bg-light py-2 w-100 mb-2"}),_vm._v(" "),_c('div',{staticClass:"dashboard-card-skeleton-info bg-light py-2 w-100"})]),_vm._v(" "),_c('div',{staticClass:"col-sm-5 align-self-center d-none d-sm-block"},[_c('div',{staticClass:"dashboard-card-skeleton-info bg-light py-2 w-100"})])]),_vm._v(" "),_c('div',{staticClass:"dashboard-card-footer bg-light py-3 mt-3"})])}];

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
