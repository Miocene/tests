import { BFormCheckboxGroup } from 'bootstrap-vue/esm/index.js';
import { formOptionsMixin } from 'bootstrap-vue/esm/mixins/form-options';
import { SafeHtmlDirective } from '../../../../directives/safe_html/safe_html';
import GlFormCheckbox from './form_checkbox';
import __vue_normalize__ from 'vue-runtime-helpers/dist/normalize-component.js';

var script = {
  name: 'GlFormCheckboxGroup',
  components: {
    BFormCheckboxGroup,
    GlFormCheckbox
  },
  directives: {
    SafeHtml: SafeHtmlDirective
  },
  mixins: [formOptionsMixin],
  inheritAttrs: false,
  model: {
    prop: 'checked',
    event: 'input'
  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('b-form-checkbox-group',_vm._b({staticClass:"gl-form-checkbox-group",attrs:{"stacked":""},on:{"change":function($event){return _vm.$emit('change', $event)},"input":function($event){return _vm.$emit('input', $event)}}},'b-form-checkbox-group',_vm.$attrs,false),[_vm._t("first"),_vm._v(" "),_vm._l((_vm.formOptions),function(option,idx){return _c('gl-form-checkbox',{key:idx,attrs:{"value":option.value,"disabled":option.disabled}},[(option.html)?_c('span',{directives:[{name:"safe-html",rawName:"v-safe-html",value:(option.html),expression:"option.html"}]}):_c('span',[_vm._v(_vm._s(option.text))])])}),_vm._v(" "),_vm._t("default")],2)],1)};
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
