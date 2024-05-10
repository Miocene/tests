import { BFormSelect } from 'bootstrap-vue/esm/index.js';
import isObject from 'lodash/isObject';
import { formInputWidths } from '../../../../utils/constants';
import __vue_normalize__ from 'vue-runtime-helpers/dist/normalize-component.js';

var script = {
  name: 'GlFormSelect',
  components: {
    BFormSelect
  },
  inheritAttrs: false,
  props: {
    /**
     * Maximum width of the Select
     */
    width: {
      type: [String, Object],
      required: false,
      default: null,
      validator: value => {
        const widths = isObject(value) ? Object.values(value) : [value];
        return widths.every(width => Object.values(formInputWidths).includes(width));
      }
    }
  },
  computed: {
    cssClasses() {
      if (this.width === null) {
        return [];
      }
      if (isObject(this.width)) {
        const {
          default: defaultWidth,
          ...nonDefaultWidths
        } = this.width;
        return [...(defaultWidth ? [`gl-form-select-${defaultWidth}`] : []), ...Object.entries(nonDefaultWidths).map(_ref => {
          let [breakpoint, width] = _ref;
          return `gl-${breakpoint}-form-select-${width}`;
        })];
      }
      return [`gl-form-select-${this.width}`];
    }
  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('b-form-select',_vm._g(_vm._b({staticClass:"gl-form-select",class:_vm.cssClasses,scopedSlots:_vm._u([_vm._l((Object.keys(_vm.$slots)),function(slot){return {key:slot,fn:function(){return [_vm._t(slot)]},proxy:true}})],null,true)},'b-form-select',_vm.$attrs,false),_vm.$listeners))};
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
