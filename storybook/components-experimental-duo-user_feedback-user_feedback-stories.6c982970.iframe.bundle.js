"use strict";(globalThis.webpackChunk_gitlab_ui=globalThis.webpackChunk_gitlab_ui||[]).push([[6882],{"./src/components/experimental/duo/user_feedback/user_feedback.stories.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,Slots:()=>Slots,default:()=>user_feedback_stories});var alert_alert=__webpack_require__("./src/components/base/alert/alert.vue"),form_group=__webpack_require__("./src/components/base/form/form_group/form_group.vue"),form_textarea=__webpack_require__("./src/components/base/form/form_textarea/form_textarea.vue"),user_feedback=__webpack_require__("./src/components/experimental/duo/user_feedback/user_feedback.vue"),Default=(args,_ref)=>{var{argTypes}=_ref;return{components:{GlDuoUserFeedback:user_feedback.default,GlAlert:alert_alert.default,GlFormGroup:form_group.default,GlFormTextarea:form_textarea.default},props:Object.keys(argTypes),data:()=>({eventOutput:""}),methods:{logEvent(event){this.eventOutput=JSON.stringify(event)}},template:'\n    <div>\n      <gl-duo-user-feedback\n        :feedback-link-text="feedbackLinkText"\n        :feedback-link-url="feedbackLinkUrl"\n        @feedback="logEvent"/>\n      <p v-if="eventOutput"><code>{{ eventOutput }}</code></p>\n    </div>\n    '}};Default.args=function(){var{feedbackLinkText,feedbackLinkUrl}=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return{feedbackLinkText,feedbackLinkUrl}}();var Slots=(args,_ref2)=>{var{argTypes}=_ref2;return{components:{GlDuoUserFeedback:user_feedback.default,GlAlert:alert_alert.default,GlFormGroup:form_group.default,GlFormTextarea:form_textarea.default},props:Object.keys(argTypes),data:()=>({eventOutput:"",didWhat:"",expectedWhat:"",improveWhat:""}),methods:{logEvent(event){var{feedbackChoices}=event;this.eventOutput=JSON.stringify({feedbackChoices,didWhat:this.didWhat,expectedWhat:this.expectedWhat,improveWhat:this.improveWhat})}},template:'\n    <div>\n      <gl-duo-user-feedback\n        :feedback-link-text="feedbackLinkText"\n        :feedback-link-url="feedbackLinkUrl"\n        @feedback="logEvent">\n        <template #feedback-extra-fields>\n          <div class="gl-mb-5">\n              Example slot content: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n          </div>\n          <gl-form-group label="What were you doing?" optional>\n            <gl-form-textarea placeholder="The situation in which you interacted with GitLab Duo Chat." v-model="didWhat" />\n          </gl-form-group>\n          <gl-form-group label="What were you expecting from the response?" optional>\n            <gl-form-textarea placeholder="What kind of information or assistance were you hoping to receive?" v-model="expectedWhat" />\n          </gl-form-group>\n          <gl-form-group label="How could the response be improved?" optional>\n            <gl-form-textarea placeholder="How the response might better meet your needs."v-model="improveWhat" />\n          </gl-form-group>\n        </template>\n      </gl-duo-user-feedback>\n      <p v-if="eventOutput"><code>{{ eventOutput }}</code></p>\n    </div>\n    '}};Slots.parameters={controls:{disable:!0}};let user_feedback_stories={title:"experimental/duo/duo-user-feedback",component:user_feedback.default,tags:["skip-visual-test"],parameters:{docs:{description:{component:'The main entry point component for gathering the user feedback for AI features.\n\nThe component consists of a textual button and a connected modal with the actual form, emitting\nthe form data on submission.\n\n## Custom button text\n\nThe component allows to customize the button text presented to the user.\n\n```html\n<gl-duo-user-feedback feedback-link-text="Leave your custom feedback" />\n```\n\n## Linking to a separate feedback form\n\nThe main goal of this component is to provide an advanced feedback form. However, it might only\nbe necessary for some consumers. In such a case, the component bypasses the default\nform and links to an external feedback page/form.\n\n```html\n<gl-duo-user-feedback feedback-link-url="https://gitlab.com" />\n```\n\n## Listening to the feedback form submission\n\nThis component emits the `feedback` event with all the options selected in the feedback form.\n\n```html\n<gl-duo-user-feedback @feedback="myEventTracker" />\n```\n\nThe returned event contains two props (`feedbackChoices` and `extendedTextFeedback`) from\nthe underlying `FeedbackModal` component. Here\'s an example of a possible event:\n\n```json\n{\n  "feedbackChoices": ["unhelpful", "long"],\n  "extendedTextFeedback": "The answer was too long to understand"\n}\n```\n\n## Using the `feedback-extra-fields` slot\n\nBy default, the component renders one extra textarea field to gather additional feedback\ninformation from users. However, it may not be enough sometimes, and different use cases of\nthis component might need to fine-tune the form to gather information most suitable for that\nor another use case. For this purpose, the component provides the `feedback-extra-fields`\nslot, which can override the default textarea with different fields/information.\n\nNote, however, that the content put into this slot will override the default textarea. So,\nif you want to append additional fields, instead of completely overriding the default textarea,\nyou must copy the textarea field from the `DuoChatFeedbackModal` component into the slot.\n\n```html\n<gl-duo-user-feedback\n  :feedback-link-text="feedbackLinkText"\n  :feedback-link-url="feedbackLinkUrl"\n  @feedback="logEvent"\n>\n  <template #feedback-extra-fields>\n    <gl-form-group label="What were you doing?" optional>\n      <gl-form-textarea\n        placeholder="The situation in which you interacted with GitLab Duo Chat."\n        v-model="didWhat"\n      />\n    </gl-form-group>\n    <gl-form-group label="What were you expecting from the response?" optional>\n      <gl-form-textarea\n        placeholder="What kind of information or assistance were you hoping to receive?"\n        v-model="expectedWhat"\n      />\n    </gl-form-group>\n    <gl-form-group label="How could the response be improved?" optional>\n      <gl-form-textarea\n        placeholder="How the response might better meet your needs."\n        v-model="improveWhat"\n      />\n    </gl-form-group>\n  </template>\n</gl-duo-user-feedback>\n```\n'}}}};Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:'(args, {\n  argTypes\n}) => ({\n  components: {\n    GlDuoUserFeedback,\n    GlAlert,\n    GlFormGroup,\n    GlFormTextarea\n  },\n  props: Object.keys(argTypes),\n  data() {\n    return {\n      eventOutput: \'\'\n    };\n  },\n  methods: {\n    logEvent(event) {\n      this.eventOutput = JSON.stringify(event);\n    }\n  },\n  template: `\n    <div>\n      <gl-duo-user-feedback\n        :feedback-link-text="feedbackLinkText"\n        :feedback-link-url="feedbackLinkUrl"\n        @feedback="logEvent"/>\n      <p v-if="eventOutput"><code>{{ eventOutput }}</code></p>\n    </div>\n    `\n})',...Default.parameters?.docs?.source}}},Slots.parameters={...Slots.parameters,docs:{...Slots.parameters?.docs,source:{originalSource:'(args, {\n  argTypes\n}) => ({\n  components: {\n    GlDuoUserFeedback,\n    GlAlert,\n    GlFormGroup,\n    GlFormTextarea\n  },\n  props: Object.keys(argTypes),\n  data() {\n    return {\n      eventOutput: \'\',\n      didWhat: \'\',\n      expectedWhat: \'\',\n      improveWhat: \'\'\n    };\n  },\n  methods: {\n    logEvent(event) {\n      const {\n        feedbackChoices\n      } = event;\n      this.eventOutput = JSON.stringify({\n        feedbackChoices,\n        didWhat: this.didWhat,\n        expectedWhat: this.expectedWhat,\n        improveWhat: this.improveWhat\n      });\n    }\n  },\n  template: `\n    <div>\n      <gl-duo-user-feedback\n        :feedback-link-text="feedbackLinkText"\n        :feedback-link-url="feedbackLinkUrl"\n        @feedback="logEvent">\n        <template #feedback-extra-fields>\n          <div class="gl-mb-5">\n              Example slot content: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n          </div>\n          <gl-form-group label="What were you doing?" optional>\n            <gl-form-textarea placeholder="The situation in which you interacted with GitLab Duo Chat." v-model="didWhat" />\n          </gl-form-group>\n          <gl-form-group label="What were you expecting from the response?" optional>\n            <gl-form-textarea placeholder="What kind of information or assistance were you hoping to receive?" v-model="expectedWhat" />\n          </gl-form-group>\n          <gl-form-group label="How could the response be improved?" optional>\n            <gl-form-textarea placeholder="How the response might better meet your needs."v-model="improveWhat" />\n          </gl-form-group>\n        </template>\n      </gl-duo-user-feedback>\n      <p v-if="eventOutput"><code>{{ eventOutput }}</code></p>\n    </div>\n    `\n})',...Slots.parameters?.docs?.source}}}}}]);