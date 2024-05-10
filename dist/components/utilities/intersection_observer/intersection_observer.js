import memoize from 'lodash/memoize';
import __vue_normalize__ from 'vue-runtime-helpers/dist/normalize-component.js';

const getObserver = memoize(options => new IntersectionObserver(entries => {
  entries.forEach(entry => {
    entry.target.$_gl_intersectionHandler(entry);
  });
}, options || {}));
var script = {
  name: 'GlIntersectionObserver',
  props: {
    /**
     * Extra options to pass directly to the intersection observer API.
     */
    options: {
      type: Object,
      required: false,
      default: null
    }
  },
  mounted() {
    const observer = getObserver(this.options);
    this.$el.$_gl_intersectionHandler = entry => {
      /**
       * Emitted when the element's visibility changes
       */
      this.$emit('update', entry);
      if (entry.isIntersecting) {
        /**
         * Emitted when the element appears on the page
         */
        this.$emit('appear');
      } else {
        /**
         * Emitted when the element disappears from the page
         */
        this.$emit('disappear');
      }
    };
    this.$el.$_gl_intersectionObserver = observer;
    observer.observe(this.$el);
  },
  destroyed() {
    this.$el.$_gl_intersectionObserver.unobserve(this.$el);
    delete this.$el.$_gl_intersectionHandler;
    delete this.$el.$_gl_intersectionObserver;
  },
  // Expose getObserver method for tests
  getObserver
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_vm._t("default")],2)};
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
