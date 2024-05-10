import { colorFromBackground } from '../utils/utils';
import { GlTooltipDirective } from '../directives/tooltip';
import GlBadge from '../components/base/badge/badge';
import GlColorContrast from '../internal/color_contrast/color_contrast';
import __vue_normalize__ from 'vue-runtime-helpers/dist/normalize-component.js';

var script = {
  name: 'TokensStory',
  components: {
    GlBadge,
    GlColorContrast
  },
  directives: {
    GlTooltip: GlTooltipDirective
  },
  inject: ['isBackgroundColorStory', 'lightBackground', 'darkBackground', 'containerClass'],
  props: {
    tokens: {
      type: Object,
      required: false,
      default: () => ({})
    }
  },
  methods: {
    isAlpha(value) {
      return value.startsWith('rgba(');
    },
    getTokenName(token) {
      return token.path.filter(Boolean).join('.');
    },
    getClasses(value) {
      if (this.isAlpha(value)) return '';
      if (!this.isBackgroundColorStory) return '';
      const textColorVariant = colorFromBackground(value, 4.5);
      return {
        'gl-text-gray-950': textColorVariant === 'dark',
        'gl-text-white': textColorVariant === 'light'
      };
    },
    getStyle(value) {
      if (this.isBackgroundColorStory) {
        return {
          backgroundColor: value
        };
      }
      return {
        color: value
      };
    }
  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:_vm.containerClass},[_c('ul',{staticClass:"gl-list-style-none gl-m-0 gl-p-0"},_vm._l((_vm.tokens),function(token){return _c('li',{key:token.name,staticClass:"gl-display-flex gl-flex-wrap gl-align-items-center gl-justify-content-space-between gl-gap-3 gl-p-3",class:_vm.getClasses(token.value),style:(_vm.getStyle(token.value))},[_c('code',{directives:[{name:"gl-tooltip",rawName:"v-gl-tooltip"}],staticClass:"gl-reset-color",attrs:{"title":token.comment}},[_vm._v("\n        "+_vm._s(_vm.getTokenName(token))+"\n      ")]),_vm._v(" "),_c('div',{staticClass:"gl-display-flex gl-align-items-center gl-gap-3"},[(token.deprecated)?_c('gl-badge',{directives:[{name:"gl-tooltip",rawName:"v-gl-tooltip"}],attrs:{"title":token.comment,"variant":"danger"}},[_vm._v("\n          Deprecated\n        ")]):_vm._e(),_vm._v(" "),_c('code',{staticClass:"gl-reset-color"},[_vm._v(_vm._s(token.value))]),_vm._v(" "),(!_vm.isAlpha(token.value))?_c('gl-color-contrast',{attrs:{"foreground":token.value,"background":_vm.darkBackground}}):_vm._e(),_vm._v(" "),(!_vm.isAlpha(token.value))?_c('gl-color-contrast',{attrs:{"foreground":token.value,"background":_vm.lightBackground}}):_vm._e()],1)])}),0)])};
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
