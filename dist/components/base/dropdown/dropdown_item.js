import { BDropdownItem, BDropdownItemButton } from 'bootstrap-vue/esm/index.js';
import { variantCssColorMap } from '../../../utils/constants';
import GlAvatar from '../avatar/avatar';
import GlButton from '../button/button';
import GlIcon from '../icon/icon';
import __vue_normalize__ from 'vue-runtime-helpers/dist/normalize-component.js';

var script = {
  name: 'GlDropdownItem',
  components: {
    GlIcon,
    GlAvatar,
    GlButton
  },
  inheritAttrs: false,
  props: {
    avatarUrl: {
      type: String,
      required: false,
      default: ''
    },
    iconColor: {
      type: String,
      required: false,
      default: ''
    },
    iconName: {
      type: String,
      required: false,
      default: ''
    },
    iconRightAriaLabel: {
      type: String,
      required: false,
      default: ''
    },
    iconRightName: {
      type: String,
      required: false,
      default: ''
    },
    isChecked: {
      type: Boolean,
      required: false,
      default: false
    },
    isCheckItem: {
      type: Boolean,
      required: false,
      default: false
    },
    isCheckCentered: {
      type: Boolean,
      required: false,
      default: false
    },
    secondaryText: {
      type: String,
      required: false,
      default: ''
    }
  },
  computed: {
    bootstrapComponent() {
      const {
        href,
        to
      } = this.$attrs;
      // Support 'href' and Vue Router's 'to'
      return href || to ? BDropdownItem : BDropdownItemButton;
    },
    iconColorCss() {
      return variantCssColorMap[this.iconColor] || 'gl-text-gray-700';
    },
    shouldShowCheckIcon() {
      return this.isChecked || this.isCheckItem;
    },
    checkedClasses() {
      if (this.isCheckCentered) {
        return '';
      }
      return 'gl-mt-3 gl-align-self-start';
    }
  },
  methods: {
    handleClickIconRight() {
      this.$emit('click-icon-right');
    }
  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c(_vm.bootstrapComponent,_vm._g(_vm._b({tag:"component",staticClass:"gl-dropdown-item"},'component',_vm.$attrs,false),_vm.$listeners),[(_vm.shouldShowCheckIcon)?_c('gl-icon',{class:[
      'gl-dropdown-item-check-icon',
      { 'gl-visibility-hidden': !_vm.isChecked },
      _vm.checkedClasses ],attrs:{"name":"mobile-issue-close","data-testid":"dropdown-item-checkbox"}}):_vm._e(),_vm._v(" "),(_vm.iconName)?_c('gl-icon',{class:['gl-dropdown-item-icon', _vm.iconColorCss],attrs:{"name":_vm.iconName}}):_vm._e(),_vm._v(" "),(_vm.avatarUrl)?_c('gl-avatar',{attrs:{"size":32,"src":_vm.avatarUrl}}):_vm._e(),_vm._v(" "),_c('div',{staticClass:"gl-dropdown-item-text-wrapper"},[_c('p',{staticClass:"gl-dropdown-item-text-primary"},[_vm._t("default")],2),_vm._v(" "),(_vm.secondaryText)?_c('p',{staticClass:"gl-dropdown-item-text-secondary"},[_vm._v(_vm._s(_vm.secondaryText))]):_vm._e()]),_vm._v(" "),(_vm.iconRightName)?_c('gl-button',{attrs:{"size":"small","icon":_vm.iconRightName,"aria-label":_vm.iconRightAriaLabel || _vm.iconRightName},on:{"click":function($event){$event.stopPropagation();$event.preventDefault();return _vm.handleClickIconRight.apply(null, arguments)}}}):_vm._e()],1)};
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
