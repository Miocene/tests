import GlAvatar from '../avatar/avatar';
import GlLink from '../link/link';
import __vue_normalize__ from 'vue-runtime-helpers/dist/normalize-component.js';

var script = {
  name: 'GlAvatarLabeled',
  components: {
    GlAvatar,
    GlLink
  },
  props: {
    label: {
      type: String,
      required: true
    },
    subLabel: {
      type: String,
      required: false,
      default: ''
    },
    labelLink: {
      type: String,
      required: false,
      default: ''
    },
    subLabelLink: {
      type: String,
      required: false,
      default: ''
    },
    inlineLabels: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    hasLabelLink() {
      return Boolean(this.labelLink);
    },
    hasSubLabelLink() {
      return Boolean(this.subLabelLink);
    },
    avatarListeners() {
      if (this.hasLabelLink) {
        return {
          ...this.$listeners,
          click: this.onAvatarClick
        };
      }
      return this.$listeners;
    },
    avatarCssClasses() {
      return {
        'gl-cursor-pointer': this.hasLabelLink
      };
    },
    avatarRowLayoutClass() {
      return {
        'inline-labels': this.inlineLabels
      };
    }
  },
  methods: {
    onAvatarClick() {
      this.$refs.labelLink.$el.click();
    }
  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"gl-avatar-labeled"},[_c('gl-avatar',_vm._g(_vm._b({class:_vm.avatarCssClasses,attrs:{"alt":""}},'gl-avatar',_vm.$attrs,false),_vm.avatarListeners)),_vm._v(" "),_c('div',{staticClass:"gl-avatar-labeled-labels gl-text-left!",class:_vm.avatarRowLayoutClass},[_c('div',{staticClass:"gl-display-flex gl-flex-wrap gl-align-items-center gl-text-left! gl-mx-n1 gl-my-n1"},[(_vm.hasLabelLink)?_c('gl-link',{ref:"labelLink",staticClass:"gl-avatar-link",attrs:{"href":_vm.labelLink}},[_c('span',{staticClass:"gl-avatar-labeled-label"},[_vm._v(_vm._s(_vm.label))])]):_c('span',{staticClass:"gl-avatar-labeled-label"},[_vm._v(_vm._s(_vm.label))]),_vm._v(" "),_vm._t("meta")],2),_vm._v(" "),(_vm.hasSubLabelLink)?_c('gl-link',{staticClass:"gl-avatar-link",attrs:{"href":_vm.subLabelLink}},[_c('span',{staticClass:"gl-avatar-labeled-sublabel"},[_vm._v(_vm._s(_vm.subLabel))])]):_c('span',{staticClass:"gl-avatar-labeled-sublabel"},[_vm._v(_vm._s(_vm.subLabel))]),_vm._v(" "),_vm._t("default")],2)],1)};
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
