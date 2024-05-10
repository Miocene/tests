import { BBadge } from 'bootstrap-vue/esm/index.js';
import { badgeSizeOptions, badgeVariantOptions, badgeIconSizeOptions } from '../../../utils/constants';
import GlIcon from '../icon/icon';
import __vue_normalize__ from 'vue-runtime-helpers/dist/normalize-component.js';

//
var script = {
  name: 'GlBadge',
  components: {
    BBadge,
    GlIcon
  },
  inheritAttrs: false,
  props: {
    /**
     * The size of the badge.
     */
    size: {
      type: String,
      default: badgeSizeOptions.md,
      validator(value) {
        return badgeSizeOptions[value] !== undefined;
      },
      required: false
    },
    /**
     * The variant of the badge.
     */
    variant: {
      type: String,
      default: badgeVariantOptions.muted,
      validator(value) {
        return badgeVariantOptions[value] !== undefined;
      },
      required: false
    },
    /**
     * The icon to show next to the text
     */
    icon: {
      type: String,
      required: false,
      default: null
    },
    /**
     * The size of the icon 16 or 12
     */
    iconSize: {
      type: String,
      default: 'md',
      validator: value => Object.keys(badgeIconSizeOptions).includes(value),
      required: false
    }
  },
  computed: {
    hasIconOnly() {
      // eslint-disable-next-line @gitlab/vue-prefer-dollar-scopedslots
      return Boolean(this.icon && Object.keys(this.$slots).length === 0);
    },
    role() {
      return this.hasIconOnly ? 'img' : undefined;
    },
    ariaLabel() {
      if (this.$attrs['aria-label']) {
        return this.$attrs['aria-label'];
      }
      return this.role === 'img' ? this.icon : undefined;
    },
    iconSizeComputed() {
      return badgeIconSizeOptions[this.iconSize];
    }
  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('b-badge',_vm._b({class:['gl-badge', _vm.size],attrs:{"variant":_vm.variant,"role":_vm.role,"aria-label":_vm.ariaLabel,"pill":""}},'b-badge',_vm.$attrs,false),[(_vm.icon)?_c('gl-icon',{staticClass:"gl-badge-icon",class:{ 'gl-mr-2': !_vm.hasIconOnly },attrs:{"size":_vm.iconSizeComputed,"name":_vm.icon}}):_vm._e(),_vm._v(" "),_vm._t("default")],2)};
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
