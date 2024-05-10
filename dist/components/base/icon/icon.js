import iconsPath from '@gitlab/svgs/dist/icons.svg';
import { iconSizeOptions } from '../../../utils/constants';
import __vue_normalize__ from 'vue-runtime-helpers/dist/normalize-component.js';

//
let iconValidator = () => true;

/*
 During development/tests we want to validate that we are just using icons that are actually defined
*/
if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  const data = require('@gitlab/svgs/dist/icons.json');
  const {
    icons
  } = data;
  iconValidator = value => {
    if (icons.includes(value)) {
      return true;
    }
    // eslint-disable-next-line no-console
    console.warn(`Icon '${value}' is not a known icon of @gitlab/svgs`);
    return false;
  };
}

/** This is a re-usable vue component for rendering a svg sprite icon
 *  @example
 *  <icon
 *    name="retry"
 *    :size="32"
 *    class="top"
 *  />
 */
var script = {
  name: 'GlIcon',
  props: {
    /**
     * Accessible icon name used by screen readers and other assistive technologies.
     * Provide when icon is not merely decorative
     */
    ariaLabel: {
      type: String,
      required: false,
      default: undefined
    },
    /**
     * One of the icons from https://gitlab-org.gitlab.io/gitlab-svgs/ project
     */
    name: {
      type: String,
      required: true,
      validator: iconValidator
    },
    /**
     * Icon size
     */
    size: {
      type: Number,
      required: false,
      default: 16,
      validator: value => iconSizeOptions.includes(value)
    }
  },
  computed: {
    spriteHref() {
      return `${iconsPath}#${this.name}`;
    },
    iconSizeClass() {
      return this.size ? `s${this.size}` : '';
    }
  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',_vm._g({key:_vm.spriteHref,class:['gl-icon', _vm.iconSizeClass],attrs:{"data-testid":(_vm.name + "-icon"),"role":"img","aria-hidden":!_vm.ariaLabel,"aria-label":_vm.ariaLabel}},_vm.$listeners),[_c('use',{attrs:{"href":_vm.spriteHref}})])};
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
