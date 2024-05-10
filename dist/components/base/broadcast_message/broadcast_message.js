import { colorThemes } from '../../../utils/constants';
import CloseButton from '../../shared_components/close_button/close_button';
import GlIcon from '../icon/icon';
import { TYPE_BANNER, TYPE_LIST, TYPE_NOTIFICATION } from './constants';
import __vue_normalize__ from 'vue-runtime-helpers/dist/normalize-component.js';

var script = {
  name: 'GlBroadcastMessage',
  components: {
    CloseButton,
    GlIcon
  },
  props: {
    /**
     * The icon to show next to the text.
     */
    iconName: {
      type: String,
      required: false,
      default: 'bullhorn'
    },
    /**
     * Allow the broadcast message to be dismissed by a user.
     */
    dismissible: {
      type: Boolean,
      required: false,
      default: true
    },
    /**
     * The dismiss button's label, it is visible in mobile viewports and used for the button's aria-label attribute.
     */
    dismissLabel: {
      type: String,
      required: false,
      default: 'Dismiss'
    },
    /**
     * The theme's name to use, this should correspond to the user's selected theme in GitLab.
     */
    theme: {
      type: String,
      required: false,
      default: Object.keys(colorThemes)[0],
      validator: value => Object.keys(colorThemes).includes(value)
    },
    /**
     * The base layout to use. `notification` type broadcast messages are not compatible
     with the `dismissible` or `theme` props.
     */
    type: {
      type: String,
      required: false,
      default: TYPE_BANNER,
      validator: value => TYPE_LIST.includes(value)
    }
  },
  computed: {
    showDismissButton() {
      return this.dismissible || this.type === TYPE_NOTIFICATION;
    }
  },
  methods: {
    onDismiss() {
      /**
       * Emitted when the dismiss button is clicked.
       *
       * @event dismiss
       * @type {object}
       */
      this.$emit('dismiss');
    }
  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"gl-broadcast-message",class:(_vm.theme + " " + _vm.type)},[_c('div',{staticClass:"gl-broadcast-message-content"},[_c('div',{staticClass:"gl-broadcast-message-icon"},[_c('gl-icon',{attrs:{"name":_vm.iconName}})],1),_vm._v(" "),_c('div',{staticClass:"gl-broadcast-message-text"},[_c('h2',{staticClass:"gl-sr-only"},[_vm._v("Admin message")]),_vm._v(" "),_vm._t("default")],2)]),_vm._v(" "),(_vm.showDismissButton)?_c('close-button',{ref:"dismiss",staticClass:"gl-close-btn-color-inherit gl-broadcast-message-dismiss",attrs:{"label":_vm.dismissLabel},on:{"click":_vm.onDismiss}}):_vm._e()],1)};
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
