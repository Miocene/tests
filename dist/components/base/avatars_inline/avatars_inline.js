import truncate from 'lodash/truncate';
import get from 'lodash/get';
import { avatarsInlineSizeOptions } from '../../../utils/constants';
import GlAvatar from '../avatar/avatar';
import GlTooltip from '../tooltip/tooltip';
import __vue_normalize__ from 'vue-runtime-helpers/dist/normalize-component.js';

var script = {
  name: 'AvatarsInline',
  components: {
    GlAvatar,
    GlTooltip
  },
  props: {
    avatars: {
      type: Array,
      required: true
    },
    maxVisible: {
      type: Number,
      required: true
    },
    avatarSize: {
      type: Number,
      required: true,
      validator: value => avatarsInlineSizeOptions.includes(value)
    },
    collapsed: {
      type: Boolean,
      required: false,
      default: false
    },
    badgeSrOnlyText: {
      type: String,
      required: true
    },
    badgeTooltipProp: {
      type: String,
      required: false,
      default: ''
    },
    badgeTooltipMaxChars: {
      type: Number,
      required: false,
      default: null
    }
  },
  computed: {
    hiddenAvatars() {
      return this.avatars.slice(this.maxVisible);
    },
    collapsable() {
      return this.hiddenAvatars.length > 0;
    },
    visibleAvatars() {
      return this.collapsed ? this.avatars.slice(0, this.maxVisible) : this.avatars;
    },
    badgeSize() {
      return {
        16: 'sm',
        24: 'md',
        32: 'lg'
      }[this.avatarSize] || 'lg';
    },
    badgeLabel() {
      return `+${this.hiddenAvatars.length}`;
    },
    badgeTooltipTitle() {
      if (!this.badgeTooltipProp) {
        return '';
      }
      const tooltipTitle = this.hiddenAvatars.map(avatar => get(avatar, this.badgeTooltipProp, '').trim()).join(', ');

      // truncate will append '...'
      // we need to take these extra 3 characters into account in badgeTooltipMaxChars
      return this.badgeTooltipMaxChars ? truncate(tooltipTitle, {
        length: this.badgeTooltipMaxChars
      }) : tooltipTitle;
    }
  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"gl-avatars-inline",class:("gl-avatars-inline-" + _vm.badgeSize)},[_vm._l((_vm.visibleAvatars),function(avatar,index){return _c('div',{key:index,staticClass:"gl-avatars-inline-child"},[_vm._t("avatar",function(){return [_c('gl-avatar',_vm._b({attrs:{"size":_vm.avatarSize}},'gl-avatar',avatar,false))]},{"avatar":avatar})],2)}),_vm._v(" "),(_vm.collapsed && _vm.collapsable)?_c('div',{staticClass:"gl-avatars-inline-child"},[(_vm.badgeTooltipProp)?_c('gl-tooltip',{attrs:{"target":function () { return _vm.$refs.badge; }}},[_vm._v("\n      "+_vm._s(_vm.badgeTooltipTitle)+"\n    ")]):_vm._e(),_vm._v(" "),_c('span',{ref:"badge",class:['gl-avatars-inline-badge', _vm.badgeSize],attrs:{"data-testid":"collapsed-avatars-badge","aria-hidden":"true"}},[_vm._v("\n      "+_vm._s(_vm.badgeLabel)+"\n    ")]),_vm._v(" "),_c('span',{staticClass:"sr-only",attrs:{"data-testid":"badge-sr-only-text"}},[_vm._v(_vm._s(_vm.badgeSrOnlyText))])],1):_vm._e()],2)};
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
