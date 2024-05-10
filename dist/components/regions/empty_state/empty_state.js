import GlButton from '../../base/button/button';
import __vue_normalize__ from 'vue-runtime-helpers/dist/normalize-component.js';

var script = {
  name: 'GlEmptyState',
  components: {
    GlButton
  },
  props: {
    /**
     * The title (heading) of the empty state.
     */
    title: {
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
     * The illustration's height used to prevent content reflow.
     */
    svgHeight: {
      type: Number,
      required: false,
      default: 144
    },
    /**
     * The desciption/body text of the empty state.
     */
    description: {
      type: String,
      required: false,
      default: null
    },
    /**
     * The primary GlButton's href.
     */
    primaryButtonLink: {
      type: String,
      required: false,
      default: null
    },
    /**
     * The primary GlButton's text. If falsey, the button is not shown.
     */
    primaryButtonText: {
      type: String,
      required: false,
      default: null
    },
    /**
     * The secondary GlButton's href.
     */
    secondaryButtonLink: {
      type: String,
      required: false,
      default: null
    },
    /**
     * The secondary GlButton's text. If falsey, the button is not shown.
     */
    secondaryButtonText: {
      type: String,
      required: false,
      default: null
    },
    /**
     * Determines whether to render the compact layout.
     */
    compact: {
      type: Boolean,
      required: false,
      default: false
    },
    invertInDarkMode: {
      type: Boolean,
      required: false,
      default: true
    },
    /**
     * CSS classes to add to the content container
     */
    contentClass: {
      type: [Array, String, Object],
      required: false,
      default: () => []
    }
  },
  computed: {
    height() {
      return this.shouldPreventImageReflow ? this.svgHeight : null;
    },
    shouldPreventImageReflow() {
      return Boolean(this.svgHeight);
    },
    shouldRenderPrimaryButton() {
      return Boolean(this.primaryButtonLink && this.primaryButtonText);
    },
    shouldRenderSecondaryButton() {
      return Boolean(this.secondaryButtonLink && this.secondaryButtonText);
    },
    contentClasses() {
      return [this.compact ? 'gl-flex-grow-1 gl-flex-basis-0 gl-px-4' : 'gl-m-auto gl-p-5', this.contentClass];
    }
  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('section',{staticClass:"gl-display-flex",class:{
    'gl-empty-state gl-text-center gl-flex-direction-column': !_vm.compact,
    'gl-flex-direction-row': _vm.compact,
  }},[_c('div',{class:{ 'gl-display-none gl-sm-display-block gl-px-4': _vm.compact, 'gl-max-w-full': !_vm.compact }},[(_vm.svgPath)?_c('img',{staticClass:"gl-max-w-full",class:{ 'gl-dark-invert-keep-hue': _vm.invertInDarkMode },attrs:{"src":_vm.svgPath,"alt":"","height":_vm.height}}):_vm._e()]),_vm._v(" "),_c('div',{staticClass:"gl-empty-state-content gl-mx-auto gl-my-0",class:_vm.contentClasses,attrs:{"data-testid":"gl-empty-state-content"}},[_vm._t("title",function(){return [_c('h1',{staticClass:"gl-font-size-h-display gl-line-height-36 gl-mt-0 gl-mb-0",class:_vm.compact ? 'h5' : 'h4'},[_vm._v("\n        "+_vm._s(_vm.title)+"\n      ")])]}),_vm._v(" "),(_vm.description || _vm.$scopedSlots.description)?_c('p',{ref:"description",staticClass:"gl-mt-4 gl-mb-0"},[_vm._t("description",function(){return [_vm._v("\n        "+_vm._s(_vm.description)+"\n      ")]})],2):_vm._e(),_vm._v(" "),_c('div',{staticClass:"gl-display-flex gl-flex-wrap gl-mt-5",class:{ 'gl-justify-content-center': !_vm.compact }},[_vm._t("actions",function(){return [(_vm.shouldRenderPrimaryButton)?_c('gl-button',{staticClass:"gl-mb-3",class:_vm.compact ? 'gl-mr-3' : 'gl-mx-2',attrs:{"variant":"confirm","href":_vm.primaryButtonLink}},[_vm._v(_vm._s(_vm.primaryButtonText))]):_vm._e(),_vm._v(" "),(_vm.shouldRenderSecondaryButton)?_c('gl-button',{staticClass:"gl-mb-3 gl-mr-3",class:{ 'gl-mx-2!': !_vm.compact },attrs:{"href":_vm.secondaryButtonLink}},[_vm._v(_vm._s(_vm.secondaryButtonText)+"\n        ")]):_vm._e()]})],2)],2)])};
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
