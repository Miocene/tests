import { BTab } from 'bootstrap-vue/esm/index.js';
import isPlainObject from 'lodash/isPlainObject';
import { DEFAULT_TAB_TITLE_LINK_CLASS } from '../constants';
import __vue_normalize__ from 'vue-runtime-helpers/dist/normalize-component.js';

//
var script = {
  name: 'GlTab',
  components: {
    BTab
  },
  inheritAttrs: false,
  props: {
    titleLinkClass: {
      type: [String, Array, Object],
      required: false,
      default: ''
    },
    /**
     * Query string parameter value to use when `gl-tabs` `sync-active-tab-with-query-params` prop is set to `true`.
     */
    queryParamValue: {
      type: String,
      required: false,
      default: null
    }
  },
  computed: {
    linkClass() {
      const {
        titleLinkClass
      } = this;
      if (Array.isArray(titleLinkClass)) {
        return [...titleLinkClass, DEFAULT_TAB_TITLE_LINK_CLASS];
      }
      if (isPlainObject(titleLinkClass)) {
        return {
          ...titleLinkClass,
          [DEFAULT_TAB_TITLE_LINK_CLASS]: true
        };
      }
      return `${titleLinkClass} ${DEFAULT_TAB_TITLE_LINK_CLASS}`.trim();
    }
  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('b-tab',_vm._g(_vm._b({attrs:{"title-link-class":_vm.linkClass,"query-param-value":_vm.queryParamValue},scopedSlots:_vm._u([_vm._l((Object.keys(_vm.$slots)),function(slot){return {key:slot,fn:function(){return [_vm._t(slot)]},proxy:true}})],null,true)},'b-tab',_vm.$attrs,false),_vm.$listeners))};
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
