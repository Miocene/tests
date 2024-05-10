import isEmpty from 'lodash/isEmpty';
import { maxZIndex, drawerVariants } from '../../../utils/constants';
import GlButton from '../button/button';
import __vue_normalize__ from 'vue-runtime-helpers/dist/normalize-component.js';

//
var script = {
  name: 'GlDrawer',
  components: {
    GlButton
  },
  props: {
    open: {
      type: Boolean,
      required: true
    },
    headerHeight: {
      type: String,
      required: false,
      default: ''
    },
    headerSticky: {
      type: Boolean,
      required: false,
      default: false
    },
    zIndex: {
      type: Number,
      required: false,
      default: maxZIndex
    },
    variant: {
      type: String,
      required: false,
      default: drawerVariants.default,
      validator: value => Object.keys(drawerVariants).includes(value)
    }
  },
  computed: {
    positionFromTop() {
      return !isEmpty(this.headerHeight) ? this.headerHeight : 0;
    },
    drawerStyles() {
      const styles = {
        top: this.positionFromTop,
        zIndex: this.zIndex
      };
      if (this.positionFromTop) {
        styles.maxHeight = `calc(100vh - ${this.positionFromTop})`;
      }
      return styles;
    },
    drawerHeaderStyles() {
      return {
        zIndex: this.headerSticky ? maxZIndex : null
      };
    },
    shouldRenderFooter() {
      // eslint-disable-next-line @gitlab/vue-prefer-dollar-scopedslots
      return Boolean(this.$slots.footer);
    },
    variantClass() {
      return `gl-drawer-${this.variant}`;
    }
  },
  watch: {
    open: {
      immediate: true,
      handler(open) {
        if (open) {
          document.addEventListener('keydown', this.handleEscape);
        } else {
          document.removeEventListener('keydown', this.handleEscape);
        }
      }
    }
  },
  beforeDestroy() {
    document.removeEventListener('keydown', this.handleEscape);
  },
  methods: {
    emitOpened() {
      /**
       * Emits when the opening animation has finished.
       * @event opened
       */
      this.$emit('opened');
    },
    handleEscape(e) {
      const ESC = 27;
      if (this.open && e.keyCode === ESC) {
        this.$emit('close');
      }
    }
  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('transition',{attrs:{"name":"gl-drawer"},on:{"after-enter":_vm.emitOpened}},[(_vm.open)?_c('aside',{staticClass:"gl-drawer",class:_vm.variantClass,style:(_vm.drawerStyles)},[_c('div',{staticClass:"gl-drawer-header",class:{ 'gl-drawer-header-sticky': _vm.headerSticky },style:(_vm.drawerHeaderStyles)},[_c('div',{staticClass:"gl-drawer-title"},[_vm._t("title"),_vm._v(" "),_c('gl-button',{staticClass:"gl-drawer-close-button",attrs:{"category":"tertiary","size":"small","icon":"close","aria-label":"Close drawer"},on:{"click":function($event){return _vm.$emit('close')}}})],2),_vm._v(" "),_vm._t("header")],2),_vm._v(" "),_c('div',{staticClass:"gl-drawer-body",class:{ 'gl-drawer-body-scrim': !_vm.shouldRenderFooter }},[_vm._t("default")],2),_vm._v(" "),(_vm.shouldRenderFooter)?_c('div',{staticClass:"gl-drawer-footer gl-drawer-footer-sticky",class:{ 'gl-drawer-body-scrim-on-footer': _vm.shouldRenderFooter },style:({ zIndex: _vm.zIndex })},[_vm._t("footer")],2):_vm._e()]):_vm._e()])};
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
