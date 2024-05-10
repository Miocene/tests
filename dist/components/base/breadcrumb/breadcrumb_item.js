import { BLink } from 'bootstrap-vue/esm/index.js';
import __vue_normalize__ from 'vue-runtime-helpers/dist/normalize-component.js';

var script = {
  name: 'GlBreadcrumbItem',
  components: {
    BLink
  },
  inheritAttrs: false,
  props: {
    text: {
      type: String,
      required: false,
      default: null
    },
    to: {
      type: [String, Object],
      required: false,
      default: null
    },
    href: {
      type: String,
      required: false,
      default: null
    },
    ariaCurrent: {
      type: [String, Boolean],
      required: false,
      default: false,
      validator(value) {
        return [false, 'page'].indexOf(value) !== -1;
      }
    }
  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('li',{staticClass:"gl-breadcrumb-item"},[_c('b-link',{attrs:{"href":_vm.href,"to":_vm.to,"aria-current":_vm.ariaCurrent}},[_vm._t("default",function(){return [_vm._v(_vm._s(_vm.text))]})],2)],1)};
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
