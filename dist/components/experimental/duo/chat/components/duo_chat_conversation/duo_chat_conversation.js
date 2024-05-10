import GlDuoChatMessage from '../duo_chat_message/duo_chat_message';
import __vue_normalize__ from 'vue-runtime-helpers/dist/normalize-component.js';

const i18n = {
  CONVERSATION_NEW_CHAT: 'New chat'
};
const isMessage = item => Boolean(item) && (item === null || item === void 0 ? void 0 : item.role);

// eslint-disable-next-line unicorn/no-array-callback-reference
const itemsValidator = items => items.every(isMessage);
var script = {
  name: 'GlDuoChatConversation',
  components: {
    GlDuoChatMessage
  },
  props: {
    /**
     * Messages to display
     */
    messages: {
      type: Array,
      required: false,
      default: () => [],
      validator: itemsValidator
    },
    /**
     * Whether to show the delimiter before this conversation
     */
    showDelimiter: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  methods: {
    onTrackFeedback(event) {
      /**
       * Notify listeners about the feedback form submission on a response message.
       * @param {*} event An event, containing the feedback choices and the extended feedback text.
       */
      this.$emit('track-feedback', event);
    }
  },
  i18n
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"gl-display-flex gl-flex-direction-column gl-justify-content-end"},[(_vm.showDelimiter)?_c('div',{staticClass:"gl-my-5 gl-display-flex gl-align-items-center gl-text-gray-500 gl-gap-4",attrs:{"data-testid":"conversation-delimiter"}},[_c('hr',{staticClass:"gl-flex-grow-1"}),_vm._v(" "),_c('span',[_vm._v(_vm._s(_vm.$options.i18n.CONVERSATION_NEW_CHAT))]),_vm._v(" "),_c('hr',{staticClass:"gl-flex-grow-1"})]):_vm._e(),_vm._v(" "),_vm._l((_vm.messages),function(msg,index){return _c('gl-duo-chat-message',{key:((msg.role) + "-" + index),attrs:{"message":msg},on:{"track-feedback":_vm.onTrackFeedback}})})],2)};
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
