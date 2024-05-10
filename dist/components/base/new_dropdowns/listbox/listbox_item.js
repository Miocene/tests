import GlIcon from '../../icon/icon';
import { ENTER, SPACE } from '../constants';
import { stopEvent } from '../../../../utils/utils';
import __vue_normalize__ from 'vue-runtime-helpers/dist/normalize-component.js';

var script = {
  name: 'GlListboxItem',
  components: {
    GlIcon
  },
  props: {
    isSelected: {
      type: Boolean,
      default: false,
      required: false
    },
    isFocused: {
      type: Boolean,
      default: false,
      required: false
    },
    isCheckCentered: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    checkedClasses() {
      if (this.isCheckCentered) {
        return '';
      }
      return 'gl-mt-3 gl-align-self-start';
    }
  },
  methods: {
    toggleSelection() {
      this.$emit('select', !this.isSelected);
    },
    onKeydown(event) {
      const {
        code
      } = event;
      if (code === ENTER || code === SPACE) {
        stopEvent(event);
        this.toggleSelection();
      }
    }
  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('li',{staticClass:"gl-new-dropdown-item",attrs:{"role":"option","tabindex":_vm.isFocused ? 0 : -1,"aria-selected":_vm.isSelected},on:{"click":_vm.toggleSelection,"keydown":_vm.onKeydown}},[_c('span',{staticClass:"gl-new-dropdown-item-content"},[_c('gl-icon',{class:[
        'gl-new-dropdown-item-check-icon',
        { 'gl-visibility-hidden': !_vm.isSelected },
        _vm.checkedClasses ],attrs:{"name":"mobile-issue-close","data-testid":"dropdown-item-checkbox"}}),_vm._v(" "),_c('span',{staticClass:"gl-new-dropdown-item-text-wrapper"},[_vm._t("default")],2)],1)])};
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
