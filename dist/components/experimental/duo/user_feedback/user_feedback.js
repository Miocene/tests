import GlButton from '../../../base/button/button';
import FeedbackModal from './user_feedback_modal';
import __vue_normalize__ from 'vue-runtime-helpers/dist/normalize-component.js';

const i18n = {
  FEEDBACK_LINK_TEXT: 'Give feedback to improve this answer.',
  FEEDBACK_THANKS: 'Thank you for your feedback.'
};
var script = {
  name: 'GlDuoUserFeedback',
  components: {
    GlButton,
    FeedbackModal
  },
  props: {
    /**
     * Whether the message already has gotten feedback
     */
    feedbackReceived: {
      type: Boolean,
      required: false,
      default: false
    },
    /**
     * The text to be displayed as the feedback link/button.
     */
    feedbackLinkText: {
      type: String,
      required: false,
      default: i18n.FEEDBACK_LINK_TEXT
    },
    /**
     * The URL of a page to provide more explanations on the experiment. If provided, clicking
     * the feedback link will open a new tab with the URL instead of showing the feedback modal.
     */
    feedbackLinkUrl: {
      type: String,
      required: false,
      default: ''
    }
  },
  computed: {
    shouldRenderModal() {
      return !this.feedbackReceived && !this.feedbackLinkUrl;
    }
  },
  methods: {
    notify(event) {
      /**
       * Notify listeners about the feedback form submission.
       * @param {*} event An event, containing the feedback choices and the extended feedback text.
       */
      this.$emit('feedback', event);
    }
  },
  i18n
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"gl-pt-4"},[_c('div',[(!_vm.feedbackReceived)?_c('gl-button',{attrs:{"variant":"link","target":"_blank","href":_vm.feedbackLinkUrl,"button-text-classes":"gl-white-space-normal! gl-text-left"},on:{"click":function($event){_vm.shouldRenderModal && _vm.$refs.feedbackModal.show();}}},[_vm._v(_vm._s(_vm.feedbackLinkText))]):_c('span',{staticClass:"gl-text-gray-500"},[_vm._v("\n      "+_vm._s(_vm.$options.i18n.FEEDBACK_THANKS)+"\n    ")])],1),_vm._v(" "),(_vm.shouldRenderModal)?_c('feedback-modal',{ref:"feedbackModal",on:{"feedback-submitted":_vm.notify},scopedSlots:_vm._u([{key:"feedback-extra-fields",fn:function(){return [_vm._t("feedback-extra-fields")]},proxy:true}],null,true)}):_vm._e()],1)};
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
