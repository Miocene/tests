import uniqueId from 'lodash/uniqueId';
import GlBadge from '../../base/badge/badge';
import GlLink from '../../base/link/link';
import GlPopover from '../../base/popover/popover';
import GlSprintf from '../../utilities/sprintf/sprintf';
import { badgeTypes, badgeTypeValidator } from './constants';
import __vue_normalize__ from 'vue-runtime-helpers/dist/normalize-component.js';

const i18n = {
  experiment: {
    BADGE: 'Experiment',
    POPOVER_TITLE: "What's an Experiment?",
    POPOVER_CONTENT: "An %{linkStart}Experiment%{linkEnd} is a feature that's in the process of being developed. It's not production-ready. We encourage users to try Experimental features and provide feedback. An Experiment: %{bullets}",
    POPOVER_BULLETS: ['May be unstable', 'Has no support and might not be documented', 'Can be removed at any time']
  },
  beta: {
    BADGE: 'Beta',
    POPOVER_TITLE: "What's a Beta?",
    POPOVER_CONTENT: "A %{linkStart}Beta%{linkEnd} feature is not production-ready, but is unlikely to change drastically before it's released. We encourage users to try Beta features and provide feedback.\nA Beta feature: %{bullets}",
    POPOVER_BULLETS: ['May be unstable', 'Should not cause data loss', 'Is supported by a commercially reasonable effort', 'Is complete or near completion']
  }
};
var script = {
  name: 'GlExperimentBadge',
  components: {
    GlBadge,
    GlPopover,
    GlSprintf,
    GlLink
  },
  props: {
    /**
     * The URL of a page to provide more explanations on the experiment.
     */
    helpPageUrl: {
      type: String,
      required: false,
      default: ''
    },
    /**
     * The placement of the popover in relation to the button.
     */
    popoverPlacement: {
      type: String,
      required: false,
      default: 'bottom'
    },
    /**
     * The type of the badge.
     */
    type: {
      type: String,
      required: false,
      default: badgeTypes[0],
      validator: badgeTypeValidator
    }
  },
  computed: {
    activeType() {
      return i18n[this.type];
    }
  },
  created() {
    this.triggerId = uniqueId('experiment-badge-');
  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('gl-badge',{staticClass:"gl-mx-4 gl-hover-cursor-pointer",attrs:{"id":_vm.triggerId,"variant":"neutral","size":"md"}},[_c('span',[_vm._v(_vm._s(_vm.activeType.BADGE))]),_vm._v(" "),_c('gl-popover',{attrs:{"triggers":"click","show-close-button":"","placement":_vm.popoverPlacement,"target":_vm.triggerId,"css-classes":['gl-z-index-9999!'],"title":_vm.activeType.POPOVER_TITLE}},[_c('gl-sprintf',{attrs:{"message":_vm.activeType.POPOVER_CONTENT},scopedSlots:_vm._u([{key:"link",fn:function(ref){
var content = ref.content;
return [(_vm.helpPageUrl)?_c('gl-link',{staticClass:"gl-font-sm!",attrs:{"href":_vm.helpPageUrl,"target":"_blank"}},[_vm._v("\n          "+_vm._s(content)+"\n        ")]):_c('span',[_vm._v(_vm._s(content))])]}},{key:"bullets",fn:function(){return [_c('ul',{staticClass:"gl-mb-0 gl-pl-5"},_vm._l((_vm.activeType.POPOVER_BULLETS),function(item,i){return _c('li',{key:("li-" + i)},[_vm._v("\n            "+_vm._s(item)+"\n          ")])}),0)]},proxy:true}])})],1)],1)};
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
