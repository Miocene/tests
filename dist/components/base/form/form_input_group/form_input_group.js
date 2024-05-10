import { BInputGroup, BInputGroupPrepend, BInputGroupAppend, BFormInput } from 'bootstrap-vue/esm/index.js';
import GlDropdown from '../../dropdown/dropdown';
import GlDropdownItem from '../../dropdown/dropdown_item';
import { InputGroupMixin } from './form_input_group_mixin';
import __vue_normalize__ from 'vue-runtime-helpers/dist/normalize-component.js';

var script = {
  name: 'GlFormInputGroup',
  components: {
    BInputGroup,
    BInputGroupPrepend,
    BInputGroupAppend,
    BFormInput,
    GlDropdown,
    GlDropdownItem
  },
  mixins: [InputGroupMixin],
  props: {
    /**
     * Automatically selects the content of the input field on click.
     */
    selectOnClick: {
      type: Boolean,
      required: false,
      default: false
    },
    /**
     * Array of options. Each option should have `name` and `value` information: {name: "Foo", value: "Bar"})
     */
    predefinedOptions: {
      type: Array,
      required: false,
      default: () => [{
        value: '',
        name: ''
      }],
      validator: options => options.every(opt => Object.keys(opt).includes('name', 'value'))
    },
    label: {
      type: String,
      required: false,
      default: undefined
    },
    inputClass: {
      type: [String, Array, Object],
      required: false,
      default: ''
    }
  },
  data() {
    return {
      activeOption: this.predefinedOptions && this.predefinedOptions[0].name
    };
  },
  methods: {
    handleClick() {
      if (this.selectOnClick) {
        this.$refs.input.$el.select();
      }
    },
    updateValue(option) {
      const {
        name,
        value
      } = option;
      this.activeOption = name;
      this.localValue = value;
    }
  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('b-input-group',[(_vm.activeOption || _vm.$scopedSlots.prepend)?_c('b-input-group-prepend',[_vm._t("prepend"),_vm._v(" "),(_vm.activeOption)?_c('gl-dropdown',{attrs:{"text":_vm.activeOption}},_vm._l((_vm.predefinedOptions),function(option){return _c('gl-dropdown-item',{key:option.value,attrs:{"is-check-item":"","is-checked":_vm.activeOption === option.name},on:{"click":function($event){return _vm.updateValue(option)}}},[_vm._v("\n        "+_vm._s(option.name)+"\n      ")])}),1):_vm._e()],2):_vm._e(),_vm._v(" "),_vm._t("default",function(){return [_c('b-form-input',_vm._g(_vm._b({ref:"input",class:['gl-form-input', _vm.inputClass],attrs:{"aria-label":_vm.label},on:{"click":_vm.handleClick},model:{value:(_vm.localValue),callback:function ($$v) {_vm.localValue=$$v;},expression:"localValue"}},'b-form-input',_vm.$attrs,false),_vm.$listeners))]}),_vm._v(" "),(_vm.$scopedSlots.append)?_c('b-input-group-append',[_vm._t("append")],2):_vm._e()],2)};
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
