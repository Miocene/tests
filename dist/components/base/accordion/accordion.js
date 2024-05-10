import uniqueId from 'lodash/uniqueId';
import __vue_normalize__ from 'vue-runtime-helpers/dist/normalize-component.js';

var script = {
  name: 'GlAccordion',
  provide() {
    const accordionId = uniqueId('accordion-set-');
    // temporary fix for this issue: https://gitlab.com/gitlab-org/gitlab-ui/-/merge_requests/2019#note_514671251
    // MR for the upstream pending: https://github.com/vuejs/apollo/pull/1153
    return {
      defaultHeaderLevel: () => this.headerLevel,
      accordionSetId: () => this.autoCollapse && accordionId
    };
  },
  props: {
    /*
    When true, will have the effect of closing other accordion items when one accordion item is visible.
     */
    autoCollapse: {
      type: Boolean,
      required: false,
      default: false
    },
    /*
    The header tag used in the accordion (h1/h2/h3/h4/h5/h6). This overrides the value provided by GlAccordion. For accessibility this should be set to an appropriate value in the context where the accordion is used.
     */
    headerLevel: {
      type: Number,
      required: true,
      validator(value) {
        return value > 0 && value <= 6;
      }
    }
  }
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
