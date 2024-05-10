import GlIcon from '../../../../../base/icon/icon';
import GlLink from '../../../../../base/link/link';
import { DOCUMENTATION_SOURCE_TYPES } from '../../constants';
import __vue_normalize__ from 'vue-runtime-helpers/dist/normalize-component.js';

const i18n = {
  MESSAGE_SOURCE: 'Source',
  MESSAGE_SOURCES: 'Sources'
};
var script = {
  name: 'GlDuoChatMessageSources',
  components: {
    GlIcon,
    GlLink
  },
  props: {
    /**
     * The Array of the message sources.
     */
    sources: {
      type: Array,
      required: true
    }
  },
  computed: {
    sourceLabel() {
      return this.sources.length > 1 ? i18n.MESSAGE_SOURCES : i18n.MESSAGE_SOURCES;
    }
  },
  methods: {
    getSourceIcon(sourceType) {
      const currentSourceType = Object.values(DOCUMENTATION_SOURCE_TYPES).find(_ref => {
        let {
          value
        } = _ref;
        return value === sourceType;
      });
      return (currentSourceType === null || currentSourceType === void 0 ? void 0 : currentSourceType.icon) || 'document';
    },
    getSourceTitle(_ref2) {
      let {
        title,
        source_type: sourceType,
        stage,
        group,
        date,
        author
      } = _ref2;
      if (title) {
        return title;
      }
      if (sourceType === DOCUMENTATION_SOURCE_TYPES.DOC.value) {
        if (stage && group) {
          return `${stage} / ${group}`;
        }
      }
      if (sourceType === DOCUMENTATION_SOURCE_TYPES.BLOG.value) {
        if (date && author) {
          return `${date} / ${author}`;
        }
      }
      return i18n.MESSAGE_SOURCE;
    }
  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"gl-mt-4 gl-mr-3 gl-text-gray-600",attrs:{"data-testid":"duo-chat-message-sources"}},[(_vm.sources.length)?_c('span',[_vm._v(_vm._s(_vm.sourceLabel)+":")]):_vm._e(),_vm._v(" "),_c('ul',{staticClass:"gl-list-style-none gl-p-0 gl-m-0"},_vm._l((_vm.sources),function(source,index){return _c('li',{key:index,staticClass:"gl-display-flex gl-pt-3 gl-align-items-center",attrs:{"data-testid":"source-list-item"}},[(source.source_type)?_c('gl-icon',{staticClass:"gl-flex-shrink-0 gl-mr-2",attrs:{"name":_vm.getSourceIcon(source.source_type)}}):_vm._e(),_vm._v(" "),_c('gl-link',{attrs:{"href":source.source_url}},[_vm._v(_vm._s(_vm.getSourceTitle(source)))])],1)}),0)])};
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
export { i18n };
