import { GlTooltipDirective } from '../../../directives/tooltip';
import GlButton from '../../base/button/button';
import { translate } from '../../../utils/i18n';
import __vue_normalize__ from 'vue-runtime-helpers/dist/normalize-component.js';

var script = {
  name: 'ClearIconButton',
  components: {
    GlButton
  },
  directives: {
    GlTooltip: GlTooltipDirective
  },
  props: {
    title: {
      type: String,
      required: false,
      default: () => translate('ClearIconButton.title', 'Clear')
    },
    tooltipContainer: {
      required: false,
      default: false,
      validator: value => value === false || typeof value === 'string' || value instanceof HTMLElement
    }
  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('gl-button',_vm._g({directives:[{name:"gl-tooltip",rawName:"v-gl-tooltip.hover",value:({ container: _vm.tooltipContainer }),expression:"{ container: tooltipContainer }",modifiers:{"hover":true}}],staticClass:"gl-clear-icon-button",attrs:{"variant":"default","category":"tertiary","size":"small","name":"clear","icon":"clear","title":_vm.title,"aria-label":_vm.title}},_vm.$listeners))};
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
