import GlIcon from '../../../../../base/icon/icon';
import { GlTooltipDirective } from '../../../../../../directives/tooltip';
import GlDuoUserFeedback from '../../../user_feedback/user_feedback';
import GlFormGroup from '../../../../../base/form/form_group/form_group';
import GlFormTextarea from '../../../../../base/form/form_textarea/form_textarea';
import { SafeHtmlDirective } from '../../../../../../directives/safe_html/safe_html';
import { MESSAGE_MODEL_ROLES } from '../../constants';
import DocumentationSources from '../duo_chat_message_sources/duo_chat_message_sources';
import { renderDuoChatMarkdownPreview } from '../../markdown_renderer';
import { CopyCodeElement } from './copy_code_element';
import { concatUntilEmpty } from './utils';
import __vue_normalize__ from 'vue-runtime-helpers/dist/normalize-component.js';

const i18n = {
  MODAL: {
    TITLE: 'Give feedback on GitLab Duo Chat',
    ALERT_TEXT: 'GitLab team members cannot view your conversation. Please be as descriptive as possible.',
    DID_WHAT: 'What were you doing?',
    INTERACTION: 'The situation in which you interacted with GitLab Duo Chat.',
    IMPROVE_WHAT: 'How could the response be improved?',
    BETTER_RESPONSE: 'How the response might better meet your needs.',
    MESSAGE_ERROR: 'Error sending the message'
  }
};
var script = {
  name: 'GlDuoChatMessage',
  i18n,
  safeHtmlConfigExtension: {
    ADD_TAGS: ['copy-code']
  },
  components: {
    DocumentationSources,
    GlDuoUserFeedback,
    GlFormGroup,
    GlFormTextarea,
    GlIcon
  },
  directives: {
    SafeHtml: SafeHtmlDirective,
    GlTooltip: GlTooltipDirective
  },
  provide() {
    return {
      modalTitle: i18n.MODAL.TITLE,
      modalAlertText: i18n.MODAL.ALERT_TEXT
    };
  },
  inject: {
    // Note, we likely might move away from Provide/Inject for this
    // and only ship the versions that are currently in the default
    // See https://gitlab.com/gitlab-org/gitlab-ui/-/merge_requests/3953#note_1762834219
    // for more context.
    renderGFM: {
      from: 'renderGFM',
      default: () => element => {
        element.classList.add('gl-markdown', 'gl-compact-markdown');
      }
    },
    renderMarkdown: {
      from: 'renderMarkdown',
      default: () => renderDuoChatMarkdownPreview
    }
  },
  props: {
    /**
     * A message object
     */
    message: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      didWhat: '',
      improveWhat: '',
      messageWatcher: null,
      // imperatively set up watcher on message
      messageChunks: []
    };
  },
  computed: {
    isChunk() {
      return typeof this.message.chunkId === 'number';
    },
    isAssistantMessage() {
      return this.message.role.toLowerCase() === MESSAGE_MODEL_ROLES.assistant;
    },
    isUserMessage() {
      return this.message.role.toLowerCase() === MESSAGE_MODEL_ROLES.user;
    },
    sources() {
      var _this$message$extras;
      return (_this$message$extras = this.message.extras) === null || _this$message$extras === void 0 ? void 0 : _this$message$extras.sources;
    },
    hasFeedback() {
      var _this$message$extras2;
      return (_this$message$extras2 = this.message.extras) === null || _this$message$extras2 === void 0 ? void 0 : _this$message$extras2.hasFeedback;
    },
    defaultContent() {
      if (this.message.contentHtml) {
        return this.message.contentHtml;
      }
      return this.renderMarkdown(this.message.content);
    },
    messageContent() {
      if (this.isAssistantMessage && this.isChunk) {
        return this.renderMarkdown(concatUntilEmpty(this.messageChunks));
      }
      return this.defaultContent || this.renderMarkdown(concatUntilEmpty(this.message.chunks));
    },
    error() {
      var _this$message, _this$message$errors;
      return Boolean((_this$message = this.message) === null || _this$message === void 0 ? void 0 : (_this$message$errors = _this$message.errors) === null || _this$message$errors === void 0 ? void 0 : _this$message$errors.length) && this.message.errors.join('; ');
    }
  },
  beforeCreate() {
    if (!customElements.get('copy-code')) {
      customElements.define('copy-code', CopyCodeElement);
    }
  },
  mounted() {
    if (this.isAssistantMessage) {
      // The watcher has to be created imperatively here
      // to give an opportunity to remove it after
      // the complete message has arrived
      this.messageWatcher = this.$watch('message', this.manageMessageUpdate);
    }
    this.setChunks();
    this.hydrateContentWithGFM();
  },
  updated() {
    this.hydrateContentWithGFM();
  },
  methods: {
    setChunks() {
      if (this.isChunk) {
        const {
          chunkId,
          content
        } = this.message;
        this.$set(this.messageChunks, chunkId - 1, content);
      } else {
        this.messageChunks = [];
      }
    },
    stopWatchingMessage() {
      if (this.messageWatcher) {
        this.messageWatcher(); // Stop watching the message prop
        this.messageWatcher = null; // Ensure the watcher can't be stopped multiple times
      }
    },
    hydrateContentWithGFM() {
      if (!this.isChunk && this.$refs.content) {
        this.$nextTick(this.renderGFM(this.$refs.content));
      }
    },
    logEvent(e) {
      this.$emit('track-feedback', {
        ...e,
        didWhat: this.didWhat,
        improveWhat: this.improveWhat,
        message: this.message
      });
    },
    manageMessageUpdate() {
      this.setChunks();
      if (!this.isChunk) {
        this.stopWatchingMessage();
      }
    }
  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"gl-p-4 gl-mb-4 gl-rounded-lg gl-line-height-20 gl-word-break-word duo-chat-message",class:{
    'gl-ml-auto gl-bg-blue-100 gl-text-blue-900 gl-rounded-bottom-right-none': _vm.isUserMessage,
    'gl-rounded-bottom-left-none gl-text-gray-900 gl-bg-white gl-border-1 gl-border-solid gl-border-gray-50':
      _vm.isAssistantMessage,
    'gl-bg-red-50 gl-border-none!': _vm.error,
  }},[(_vm.error)?_c('gl-icon',{staticClass:"gl-text-red-600 gl-border gl-border-red-500 gl-rounded-full gl-mr-3 gl-flex-shrink-0 error-icon",attrs:{"aria-label":_vm.$options.i18n.MESSAGE_ERROR,"name":"status_warning_borderless","size":16,"data-testid":"error"}}):_vm._e(),_vm._v(" "),_c('div',{ref:"content-wrapper",class:{ 'has-error': _vm.error }},[(_vm.error)?_c('div',{ref:"error-message",staticClass:"error-message"},[_vm._v(_vm._s(_vm.error))]):_c('div',[_c('div',{directives:[{name:"safe-html",rawName:"v-safe-html:[$options.safeHtmlConfigExtension]",value:(_vm.messageContent),expression:"messageContent",arg:_vm.$options.safeHtmlConfigExtension}],ref:"content"}),_vm._v(" "),(_vm.isAssistantMessage)?[(_vm.sources)?_c('documentation-sources',{attrs:{"sources":_vm.sources}}):_vm._e(),_vm._v(" "),_c('div',{staticClass:"gl-display-flex gl-align-items-flex-end gl-mt-4 duo-chat-message-feedback"},[_c('gl-duo-user-feedback',{attrs:{"feedback-received":_vm.hasFeedback,"modal-title":_vm.$options.i18n.MODAL.TITLE,"modal-alert":_vm.$options.i18n.MODAL.ALERT_TEXT},on:{"feedback":_vm.logEvent},scopedSlots:_vm._u([{key:"feedback-extra-fields",fn:function(){return [_c('gl-form-group',{attrs:{"label":_vm.$options.i18n.MODAL.DID_WHAT,"optional":""}},[_c('gl-form-textarea',{attrs:{"placeholder":_vm.$options.i18n.MODAL.INTERACTION},model:{value:(_vm.didWhat),callback:function ($$v) {_vm.didWhat=$$v;},expression:"didWhat"}})],1),_vm._v(" "),_c('gl-form-group',{attrs:{"label":_vm.$options.i18n.MODAL.IMPROVE_WHAT,"optional":""}},[_c('gl-form-textarea',{attrs:{"placeholder":_vm.$options.i18n.MODAL.BETTER_RESPONSE},model:{value:(_vm.improveWhat),callback:function ($$v) {_vm.improveWhat=$$v;},expression:"improveWhat"}})],1)]},proxy:true}],null,false,419229417)})],1)]:_vm._e()],2)])],1)};
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
