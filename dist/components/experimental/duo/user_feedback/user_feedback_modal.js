import GlModal from '../../../base/modal/modal';
import GlAlert from '../../../base/alert/alert';
import GlFormGroup from '../../../base/form/form_group/form_group';
import GlFormTextarea from '../../../base/form/form_textarea/form_textarea';
import GlFormCheckboxGroup from '../../../base/form/form_checkbox/form_checkbox_group';
import __vue_normalize__ from 'vue-runtime-helpers/dist/normalize-component.js';

const i18n = {
  MODAL: {
    TITLE: 'Give feedback on GitLab Duo',
    DESCRIPTION: 'To help improve GitLab Duo, send your feeback to GitLab team members.',
    ALERT: 'GitLab team members cannot see the AI content. Please be as descriptive as possible.',
    OPTIONS_LABEL: 'How could the AI content be improved?',
    SITUATION_DESCRIPTION_LABEL: 'What were you doing?',
    SITUATION_DESCRIPTION_PLACEHOLDER: 'The situation in which you interacted with GitLab Duo Chat.',
    IMPROVEMENT_SUGGESTION_LABEL: 'How could the response be improved?',
    IMPROVEMENT_SUGGESTION_PLACEHOLDER: 'How the response might better meet your needs.',
    MORE_LABEL: 'More information',
    MORE_PLACEHOLDER: 'How could the content be improved?',
    REQUIRED_VALIDATION_ERROR: 'Select at least one option.',
    FEEDBACK_OPTIONS: {
      helpful: 'Helpful',
      unhelpful: 'Unhelpful or irrelevant',
      incorrect: 'Factually incorrect',
      long: 'Too long',
      abuse: 'Abusive or offensive',
      other: 'Something else'
    },
    ACTIONS: {
      submit: 'Submit',
      cancel: 'Cancel'
    }
  }
};
const feedbackOptions = [{
  text: i18n.MODAL.FEEDBACK_OPTIONS.helpful,
  value: 'helpful'
}, {
  text: i18n.MODAL.FEEDBACK_OPTIONS.unhelpful,
  value: 'unhelpful'
}, {
  text: i18n.MODAL.FEEDBACK_OPTIONS.incorrect,
  value: 'incorrect'
}, {
  text: i18n.MODAL.FEEDBACK_OPTIONS.long,
  value: 'long'
}, {
  text: i18n.MODAL.FEEDBACK_OPTIONS.abuse,
  value: 'abuse'
}, {
  text: i18n.MODAL.FEEDBACK_OPTIONS.other,
  value: 'other'
}];
var script = {
  name: 'DuoChatFeedbackModal',
  components: {
    GlModal,
    GlAlert,
    GlFormCheckboxGroup,
    GlFormGroup,
    GlFormTextarea
  },
  inject: {
    modalTitle: {
      default: i18n.MODAL.TITLE
    },
    modalAlert: {
      default: i18n.MODAL.ALERT
    }
  },
  data() {
    return {
      selectedFeedbackOptions: [],
      extendedFeedback: '',
      isValid: null
    };
  },
  watch: {
    selectedFeedbackOptions(options) {
      this.isValid = options.length > 0;
    }
  },
  methods: {
    close() {
      this.$refs.feedbackModal.hide();
    },
    show() {
      this.$refs.feedbackModal.show();
    },
    onFeedbackSubmit(e) {
      if (this.selectedFeedbackOptions.length) {
        this.$emit('feedback-submitted', {
          feedbackChoices: this.selectedFeedbackOptions,
          extendedTextFeedback: this.extendedFeedback
        });
        this.close();
        this.isValid = null;
      } else {
        e === null || e === void 0 ? void 0 : e.preventDefault();
        this.isValid = false;
      }
    }
  },
  actions: {
    primary: {
      text: i18n.MODAL.ACTIONS.submit
    },
    cancel: {
      text: i18n.MODAL.ACTIONS.cancel
    }
  },
  feedbackOptions,
  i18n
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('gl-modal',{ref:"feedbackModal",attrs:{"modal-id":"feedbackModal","title":_vm.modalTitle,"action-primary":_vm.$options.actions.primary,"action-cancel":_vm.$options.actions.cancel,"visible":false,"size":"sm"},on:{"primary":_vm.onFeedbackSubmit,"canceled":_vm.close}},[_c('p',[_vm._v(_vm._s(_vm.$options.i18n.MODAL.DESCRIPTION))]),_vm._v(" "),_c('gl-form-group',{attrs:{"invalid-feedback":_vm.$options.i18n.MODAL.REQUIRED_VALIDATION_ERROR,"state":_vm.isValid,"label":_vm.$options.i18n.MODAL.OPTIONS_LABEL,"data-testid":"feedback-options"}},[_c('gl-form-checkbox-group',{attrs:{"options":_vm.$options.feedbackOptions},model:{value:(_vm.selectedFeedbackOptions),callback:function ($$v) {_vm.selectedFeedbackOptions=$$v;},expression:"selectedFeedbackOptions"}})],1),_vm._v(" "),_c('gl-alert',{staticClass:"gl-mb-5",attrs:{"dismissible":false}},[_vm._v(_vm._s(_vm.modalAlert))]),_vm._v(" "),_vm._t("feedback-extra-fields",function(){return [_c('gl-form-group',{attrs:{"label":_vm.$options.i18n.MODAL.MORE_LABEL,"optional":""}},[_c('gl-form-textarea',{attrs:{"placeholder":_vm.$options.i18n.MODAL.MORE_PLACEHOLDER},model:{value:(_vm.extendedFeedback),callback:function ($$v) {_vm.extendedFeedback=$$v;},expression:"extendedFeedback"}})],1)]})],2)};
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
export { feedbackOptions, i18n };
