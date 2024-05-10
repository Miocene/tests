import { bannerVariants } from '../../../utils/constants';
import CloseButton from '../../shared_components/close_button/close_button';
import GlButton from '../button/button';
import GlCard from '../card/card';
import __vue_normalize__ from 'vue-runtime-helpers/dist/normalize-component.js';

var script = {
  name: 'GlBanner',
  components: {
    CloseButton,
    GlButton,
    GlCard
  },
  props: {
    /**
     * Used to set the title of the banner.
     */
    title: {
      type: String,
      required: true
    },
    /**
     * HTML attributes to add to the submit button.
     */
    buttonAttributes: {
      type: Object,
      required: false,
      default: () => ({})
    },
    /**
     * Text for the submit button.
     */
    buttonText: {
      type: String,
      required: true
    },
    /**
     * Link for the submit button.
     */
    buttonLink: {
      type: String,
      required: false,
      default: null
    },
    /**
     * The illustration's URL.
     */
    svgPath: {
      type: String,
      required: false,
      default: null
    },
    /**
     * The variant of the banner.
     */
    variant: {
      type: String,
      required: false,
      default: bannerVariants[0],
      validator(value) {
        return bannerVariants.includes(value);
      }
    },
    /**
     * Dismiss button's aria-label.
     */
    dismissLabel: {
      type: String,
      required: false,
      default: 'Dismiss'
    }
  },
  computed: {
    isIntroducing() {
      return this.variant === bannerVariants[1];
    }
  },
  methods: {
    handleClose() {
      /**
       * Emitted when the close button is clicked.
       *
       * @event close
       * @type {object}
       */
      this.$emit('close');
    },
    primaryButtonClicked() {
      /**
       * Emitted when the primary action button is clicked.
       *
       * @event primary
       * @type {object}
       */
      this.$emit('primary');
    }
  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('gl-card',{staticClass:"gl-pl-6 gl-pr-8 gl-py-6",class:{
    'gl-banner-introduction': _vm.isIntroducing,
    'gl-bg-gray-10!': !_vm.isIntroducing,
  },attrs:{"body-class":"gl-display-flex gl-p-0!"}},[(_vm.svgPath)?_c('div',{staticClass:"gl-banner-illustration"},[_c('img',{attrs:{"src":_vm.svgPath,"alt":""}})]):_vm._e(),_vm._v(" "),_c('div',{staticClass:"gl-banner-content"},[_c('h2',{staticClass:"gl-banner-title"},[_vm._v(_vm._s(_vm.title))]),_vm._v(" "),_vm._t("default"),_vm._v(" "),_c('gl-button',_vm._b({attrs:{"variant":"confirm","category":"primary","data-testid":"gl-banner-primary-button","href":_vm.buttonLink},on:{"click":_vm.primaryButtonClicked}},'gl-button',_vm.buttonAttributes,false),[_vm._v(_vm._s(_vm.buttonText))]),_vm._v(" "),_vm._t("actions")],2),_vm._v(" "),_c('close-button',{staticClass:"gl-banner-close",attrs:{"label":_vm.dismissLabel},on:{"click":_vm.handleClose}})],1)};
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
