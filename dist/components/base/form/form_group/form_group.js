import { BFormGroup } from 'bootstrap-vue/esm/index.js';
import isString from 'lodash/isString';
import isPlainObject from 'lodash/isPlainObject';
import __vue_normalize__ from 'vue-runtime-helpers/dist/normalize-component.js';

var script = {
  name: 'GlFormGroup',
  components: {
    BFormGroup
  },
  inheritAttrs: false,
  props: {
    labelClass: {
      type: [String, Array, Object],
      required: false,
      default: null
    },
    labelDescription: {
      type: String,
      required: false,
      default: ''
    },
    optional: {
      type: Boolean,
      required: false,
      default: false
    },
    optionalText: {
      type: String,
      required: false,
      default: '(optional)'
    }
  },
  computed: {
    actualLabelClass() {
      const {
        labelClass
      } = this;
      const defaultClass = 'col-form-label';
      if (isString(labelClass)) {
        return `${labelClass} ${defaultClass}`;
      }
      if (Array.isArray(labelClass)) {
        return [...labelClass, defaultClass];
      }
      if (isPlainObject(labelClass)) {
        return {
          ...labelClass,
          [defaultClass]: true
        };
      }
      return defaultClass;
    },
    hasLabelDescription() {
      // eslint-disable-next-line @gitlab/vue-prefer-dollar-scopedslots
      return Boolean(this.labelDescription || this.$slots['label-description']);
    }
  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('b-form-group',_vm._b({staticClass:"gl-form-group",attrs:{"label-class":_vm.actualLabelClass},scopedSlots:_vm._u([{key:"label",fn:function(){return [_vm._t("label",function(){return [_vm._v("\n      "+_vm._s(_vm.$attrs.label)+"\n      "),(_vm.optional)?_c('span',{staticClass:"optional-label",attrs:{"data-testid":"optional-label"}},[_vm._v(_vm._s(_vm.optionalText))]):_vm._e()]}),_vm._v(" "),(_vm.hasLabelDescription)?_c('div',{staticClass:"label-description",attrs:{"data-testid":"label-description"}},[_vm._t("label-description",function(){return [_vm._v(_vm._s(_vm.labelDescription))]})],2):_vm._e()]},proxy:true},_vm._l((Object.keys(_vm.$slots)),function(slot){return {key:slot,fn:function(){return [_vm._t(slot)]},proxy:true}})],null,true)},'b-form-group',_vm.$attrs,false))};
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
