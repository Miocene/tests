import GlButton from '../button/button';
import GlButtonGroup from '../button_group/button_group';
import GlIcon from '../icon/icon';
import { translate } from '../../../utils/i18n';
import __vue_normalize__ from 'vue-runtime-helpers/dist/normalize-component.js';

var script = {
  name: 'GlKeysetPagination',
  components: {
    GlButtonGroup,
    GlButton,
    GlIcon
  },
  inheritAttrs: false,
  props: {
    // The following 4 properties match the default names of the
    // [PageInfo](https://docs.gitlab.com/ee/api/graphql/reference/index.html#pageinfo)
    // GraphQL type, allowing the returned `pageInfo` object to
    // be bound directly to this component:
    // `<gl-keyset-pagination v-bind="pageInfo">`
    /**
     * Whether or not the "Prev" button should be enabled
     */
    hasPreviousPage: {
      type: Boolean,
      required: false,
      default: false
    },
    /**
     * Whether or not the "Next" button should be enabled
     */
    hasNextPage: {
      type: Boolean,
      required: false,
      default: false
    },
    /**
     * A cursor that points to the first item in the current page.
     * Will be passed as an event parameter when the "prev" event is fired.
     */
    startCursor: {
      type: String,
      required: false,
      default: null
    },
    /**
     * A cursor that points to the last item in the current page.
     * Will be passed as an event parameter when the "next" event is fired.
     */
    endCursor: {
      type: String,
      required: false,
      default: null
    },
    /**
     * The text that will be rendered inside the "Previous" button.
     * It's important to provide this parameter since the default text is not translatable.
     */
    prevText: {
      type: String,
      required: false,
      default: () => translate('GlKeysetPagination.prevText', 'Previous')
    },
    /**
     * A link that will be used as the "Prev" button\'s "href" attribute.
     * If provided, the "Prev" button renders as a link button; otherwise, it is rendered as a regular button.
     */
    prevButtonLink: {
      type: String,
      required: false,
      default: null
    },
    /**
     * The aria-label that needs to be set for the
     * pagination landmark region.
     */
    navigationLabel: {
      type: String,
      required: false,
      default: () => translate('GlKeysetPagination.navigationLabel', 'Pagination')
    },
    /**
     * The text that will be rendered inside the "Next" button.
     * It's important to provide this parameter since the default text is not translatable.
     */
    nextText: {
      type: String,
      required: false,
      default: () => translate('GlKeysetPagination.nextText', 'Next')
    },
    /**
     * A link that will be used as the "Next" button\'s "href" attribute.
     * If provided, the "Next" button renders as a link button; otherwise, it is rendered as a regular button.
     */
    nextButtonLink: {
      type: String,
      required: false,
      default: null
    },
    /**
     * Whether or not both buttons should be disabled (regardless of the "hasPreviousPage" and "hasNextPage" values).
     */
    disabled: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    isVisible() {
      return this.hasPreviousPage || this.hasNextPage;
    }
  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.isVisible)?_c('nav',{staticClass:"gl-pagination",attrs:{"aria-label":_vm.navigationLabel}},[_c('gl-button-group',_vm._g(_vm._b({staticClass:"gl-keyset-pagination"},'gl-button-group',_vm.$attrs,false),_vm.$listeners),[_c('gl-button',{attrs:{"href":_vm.prevButtonLink,"disabled":_vm.disabled || !_vm.hasPreviousPage,"data-testid":"prevButton"},on:{"click":function($event){return _vm.$emit('prev', _vm.startCursor)}}},[_vm._t("previous-button-content",function(){return [_c('div',{staticClass:"gl-display-flex gl-align-center"},[_c('gl-icon',{attrs:{"name":"chevron-left"}}),_vm._v("\n          "+_vm._s(_vm.prevText)+"\n        ")],1)]})],2),_vm._v(" "),_c('gl-button',{attrs:{"href":_vm.nextButtonLink,"disabled":_vm.disabled || !_vm.hasNextPage,"data-testid":"nextButton"},on:{"click":function($event){return _vm.$emit('next', _vm.endCursor)}}},[_vm._t("next-button-content",function(){return [_c('div',{staticClass:"gl-display-flex gl-align-center"},[_vm._v("\n          "+_vm._s(_vm.nextText)+"\n          "),_c('gl-icon',{attrs:{"name":"chevron-right"}})],1)]})],2)],1)],1):_vm._e()};
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
