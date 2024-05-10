"use strict";(globalThis.webpackChunk_gitlab_ui=globalThis.webpackChunk_gitlab_ui||[]).push([[9687],{"./src/utils/story_decorators/container.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{F:()=>makeContainer});var makeContainer=function(style){var tag=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"div";return Story=>({render:h=>h(tag,{style},[h(Story())])})}},"./src/components/experimental/duo/chat/duo_chat.stories.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,Interactive:()=>Interactive,Slots:()=>Slots,default:()=>duo_chat_stories});var button_button=__webpack_require__("./src/components/base/button/button.vue"),alert_alert=__webpack_require__("./src/components/base/alert/alert.vue"),container=__webpack_require__("./src/utils/story_decorators/container.js"),duo_chat=__webpack_require__("./src/components/experimental/duo/chat/duo_chat.vue"),constants=__webpack_require__("./src/components/experimental/duo/chat/constants.js"),mock_data=__webpack_require__("./src/components/experimental/duo/chat/mock_data.js");function asyncGeneratorStep(gen,resolve,reject,_next,_throw,key,arg){try{var info=gen[key](arg),value=info.value}catch(error){reject(error);return}info.done?resolve(value):Promise.resolve(value).then(_next,_throw)}function _asyncToGenerator(fn){return function(){var self=this,args=arguments;return new Promise(function(resolve,reject){var gen=fn.apply(self,args);function _next(value){asyncGeneratorStep(gen,resolve,reject,_next,_throw,"next",value)}function _throw(err){asyncGeneratorStep(gen,resolve,reject,_next,_throw,"throw",err)}_next(void 0)})}}function ownKeys(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter(function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable})),t.push.apply(t,o)}return t}function _objectSpread(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?ownKeys(Object(t),!0).forEach(function(r){_defineProperty(e,r,t[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):ownKeys(Object(t)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))})}return e}function _defineProperty(obj,key,value){return(key=_toPropertyKey(key))in obj?Object.defineProperty(obj,key,{value:value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}function _toPropertyKey(t){var i=_toPrimitive(t,"string");return"symbol"==typeof i?i:i+""}function _toPrimitive(t,r){if("object"!=typeof t||!t)return t;var e=t[Symbol.toPrimitive];if(void 0!==e){var i=e.call(t,r||"default");if("object"!=typeof i)return i;throw TypeError("@@toPrimitive must return a primitive value.")}return("string"===r?String:Number)(t)}function _asyncIterator(r){var n,t,o,e=2;for("undefined"!=typeof Symbol&&(t=Symbol.asyncIterator,o=Symbol.iterator);e--;){if(t&&null!=(n=r[t]))return n.call(r);if(o&&null!=(n=r[o]))return new AsyncFromSyncIterator(n.call(r));t="@@asyncIterator",o="@@iterator"}throw TypeError("Object is not async iterable")}function AsyncFromSyncIterator(r){function AsyncFromSyncIteratorContinuation(r){if(Object(r)!==r)return Promise.reject(TypeError(r+" is not an object."));var n=r.done;return Promise.resolve(r.value).then(function(r){return{value:r,done:n}})}return(AsyncFromSyncIterator=function AsyncFromSyncIterator(r){this.s=r,this.n=r.next}).prototype={s:null,n:null,next:function next(){return AsyncFromSyncIteratorContinuation(this.n.apply(this.s,arguments))},return:function _return(r){var n=this.s.return;return void 0===n?Promise.resolve({value:r,done:!0}):AsyncFromSyncIteratorContinuation(n.apply(this.s,arguments))},throw:function _throw(r){var n=this.s.return;return void 0===n?Promise.reject(r):AsyncFromSyncIteratorContinuation(n.apply(this.s,arguments))}},new AsyncFromSyncIterator(r)}var defaultValue=prop=>"function"==typeof duo_chat.default.props[prop].default?duo_chat.default.props[prop].default():duo_chat.default.props[prop].default,generateProps=function(){var{title=defaultValue("title"),messages=defaultValue("messages"),error=defaultValue("error"),isLoading=defaultValue("isLoading"),isChatAvailable=defaultValue("isChatAvailable"),predefinedPrompts=defaultValue("predefinedPrompts"),badgeHelpPageUrl=defaultValue("badgeHelpPageUrl"),badgeType=defaultValue("badgeType"),toolName=defaultValue("toolName"),showHeader=defaultValue("showHeader"),emptyStateTitle=defaultValue("emptyStateTitle"),emptyStateDescription=defaultValue("emptyStateDescription"),chatPromptPlaceholder=defaultValue("chatPromptPlaceholder")}=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return{title,messages,error,isLoading,isChatAvailable,predefinedPrompts,badgeHelpPageUrl,badgeType,toolName,slashCommands:mock_data.SLASH_COMMANDS,showHeader,emptyStateTitle,emptyStateDescription,chatPromptPlaceholder}},Default=(args,_ref)=>{var{argTypes}=_ref;return{components:{GlDuoChat:duo_chat.default},props:Object.keys(argTypes),provide:{renderGFM:mock_data.renderGFM},template:'\n    <gl-duo-chat\n      :title="title"\n      :messages="messages"\n      :error="error"\n      :is-loading="isLoading"\n      :is-chat-available="isChatAvailable"\n      :predefined-prompts="predefinedPrompts"\n      :badge-help-page-url="badgeHelpPageUrl"\n      :badge-type="badgeType"\n      :tool-name="toolName"\n      :show-header="showHeader"\n      :empty-state-title="emptyStateTitle"\n      :empty-state-description="emptyStateDescription"\n      :chat-prompt-placeholder="chatPromptPlaceholder"\n    />'}};Default.args=generateProps({messages:[mock_data.MOCK_USER_PROMPT_MESSAGE,mock_data.MOCK_RESPONSE_MESSAGE]}),Default.decorators=[(0,container.F)({height:"800px"})];var Interactive=(args,_ref2)=>{var{argTypes}=_ref2;return{components:{GlDuoChat:duo_chat.default,GlButton:button_button.default},props:Object.keys(argTypes),provide:{renderGFM:mock_data.renderGFM},data:()=>({isHidden:!1,loggerInfo:"",promptInFlight:!1,msgs:args.messages,chunks:[],timeout:null,requestId:1}),methods:{onSendChatPrompt(prompt){var newPrompt=_objectSpread(_objectSpread({},mock_data.MOCK_USER_PROMPT_MESSAGE),{},{contentHtml:"",content:prompt,requestId:this.requestId});this.loggerInfo+="New prompt: ".concat(JSON.stringify(newPrompt),"\n\n"),prompt===constants.CHAT_CLEAN_MESSAGE?this.msgs=[]:(this.msgs.push(newPrompt),this.promptInFlight=!0)},onChatHidden(){this.isHidden=!0,this.loggerInfo+="Chat closed\n\n"},showChat(){this.isHidden=!1,this.loggerInfo+="Chat opened\n\n"},onResponseRequested(){var _this=this;return _asyncToGenerator(function*(){_this.timeout=null,yield _this.mockResponseFromAi(),_this.requestId+=1})()},mockResponseFromAi(){var _this2=this;return _asyncToGenerator(function*(){var generator=(0,mock_data.generateMockResponseChunks)(_this2.requestId),_iteratorAbruptCompletion=!1,_didIteratorError=!1;try{for(var _iteratorError,_step,_loop=function*(){var newResponse=_step.value,existingMessageIndex=_this2.msgs.findIndex(msg=>msg.requestId===newResponse.requestId&&msg.role===newResponse.role);_this2.msgs[existingMessageIndex]?_this2.updateExistingMessage(newResponse,existingMessageIndex):_this2.addNewMessage(newResponse)},_iterator=_asyncIterator(generator);_iteratorAbruptCompletion=!(_step=yield _iterator.next()).done;_iteratorAbruptCompletion=!1)yield*_loop()}catch(err){_didIteratorError=!0,_iteratorError=err}finally{try{_iteratorAbruptCompletion&&null!=_iterator.return&&(yield _iterator.return())}finally{if(_didIteratorError)throw _iteratorError}}})()},addNewMessage(msg){this.promptInFlight=!1,this.$set(this.msgs,this.msgs.length,msg)},updateExistingMessage(newResponse,existingMessageIndex){var existingMessage=this.msgs[existingMessageIndex];this.$set(this.msgs,existingMessageIndex,_objectSpread(_objectSpread({},existingMessage),newResponse))}},template:'\n  <div style="height: 800px">\n    <div id="logger" class="gl-w-half">\n      <pre class="gl-font-sm" style="text-wrap: wrap">\n<code>{{ loggerInfo }}</code>\n      </pre>\n      <gl-button v-if="promptInFlight" @click="onResponseRequested">Mock the response</gl-button>\n    </div>\n    <gl-button v-if="isHidden" @click="showChat">Show chat</gl-button>\n    <gl-duo-chat\n      v-if="!isHidden"\n      :title="title"\n      :messages="msgs"\n      :error="error"\n      :is-loading="promptInFlight"\n      :is-chat-available="isChatAvailable"\n      :predefined-prompts="predefinedPrompts"\n      :badge-help-page-url="badgeHelpPageUrl"\n      :badge-type="badgeType"\n      :tool-name="toolName"\n      :show-header="showHeader"\n      :empty-state-title="emptyStateTitle"\n      :empty-state-description="emptyStateDescription"\n      :chat-prompt-placeholder="chatPromptPlaceholder"\n      :slash-commands="slashCommands"\n      class="gl-drawer-default"\n      @send-chat-prompt="onSendChatPrompt"\n      @chat-hidden="onChatHidden"\n    />\n  </div>'}};Interactive.args=generateProps({});var Slots=(args,_ref3)=>{var{argTypes}=_ref3;return{components:{GlDuoChat:duo_chat.default,GlAlert:alert_alert.default},props:Object.keys(argTypes),provide:{renderMarkdown:md=>"THIS IS ALTERED MARKDOWN: ".concat(md),renderGFM:mock_data.renderGFM},template:'\n    <div>\n      <gl-duo-chat\n        :title="title"\n        :messages="messages"\n        :error="error"\n        :is-loading="isLoading"\n        :is-chat-available="isChatAvailable"\n        :predefined-prompts="predefinedPrompts"\n        :badge-help-page-url="badgeHelpPageUrl"\n        :badge-type="badgeType"\n        :tool-name="toolName"\n        :show-header="showHeader"\n        :empty-state-title="emptyStateTitle"\n        :empty-state-description="emptyStateDescription"\n        :chat-prompt-placeholder="chatPromptPlaceholder">\n        <template #subheader>\n          <gl-alert\n            :dismissible="false"\n            variant="warning"\n            class="gl-font-sm gl-border-t"\n            role="alert"\n            data-testid="chat-legal-warning-gitlab-usage"\n            primary-button-link="https://internal-handbook.gitlab.io/handbook/product/ai-strategy/ai-integration-effort/legal_restrictions/"\n            primary-button-text="Read more"\n          >\n            <p>\n              You are not allowed to copy any part of this output into issues, comments, GitLab source code, commit messages, merge requests or any other user interface in the <code>/gitlab-org</code> or <code>/gitlab-com</code> groups.\n            </p>\n          </gl-alert>\n        </template>\n      </gl-duo-chat>\n    </div>\n    '}};Slots.args=generateProps(),Slots.decorators=[(0,container.F)({height:"800px"})];let duo_chat_stories={title:"experimental/duo/chat/duo-chat",component:duo_chat.default,parameters:{docs:{description:{component:'The component represents the complete Duo Chat feature.\n\nThe component provides a configurable chat UI interface. The primary use is communication with\nGitLab Duo, however, the component is BE-agnostic and can accept information from any source.\n\n## Usage\n\nTo use the component in its simplest form, import it and add it to the `template` part of your\nconsumer component.\n\n```html\n<gl-duo-chat\n  :title="title"\n  :messages="messages"\n  :error="error"\n  :is-loading="isLoading"\n  :is-chat-available="isChatAvailable"\n  :predefined-prompts="predefinedPrompts"\n  :badge-help-page-url="badgeHelpPageUrl"\n  :tool-name="toolName"\n  :empty-state-title="emptyStateTitle"\n  :empty-state-description="emptyStateDescription"\n  :chat-prompt-placeholder="chatPromptPlaceholder"\n  :slash-commands="slashCommands"\n  @chat-hidden="onChatHidden"\n  @send-chat-prompt="onSendChatPrompt"\n  @track-feedback="onTrackFeedback"\n/>\n```\n\n## Integration\n\nTo demonstrate how to connect this component to a backend implementation, let\'s consider its use\nfor GitLab Duo. First, some general notes on the best practices and expectations when using this\ncomponent.\n\n### Expected dependency injection\n\nTo be universal, the component delegates some of its responsibilities to the consumer component.\n\nThe component expects two function props:\n\n- `renderMarkdown`\n- `renderGFM`\n\n#### `renderMarkdown`\n\nThis function prop converts plain Markdown text into HTML markup. To have a better understanding\nof what is expected from this function, take a look at\n[the existing GitLab example](https://gitlab.com/gitlab-org/gitlab/-/blob/774ecc1f2b15a581e8eab6441de33585c9691c82/app/assets/javascripts/notes/utils.js#L22-24).\n\n#### `renderGFM`\n\nThis function prop extends the standard Markdown rendering with support for the\n[GitLab Flavored Markdown (GLFM)](https://docs.gitlab.com/ee/user/markdown.html). To\nhave a better understanding of what is expected from this function, take a look at\n[the existing GitLab example](https://gitlab.com/gitlab-org/gitlab/-/blob/774ecc1f2b15a581e8eab6441de33585c9691c82/app/assets/javascripts/behaviors/markdown/render_gfm.js#L18-40).\n\nThe reason to have two different functions for rendering Markdown is performance. `renderGFM`\noperates on a DOM node and might come with many additional mutations for the node\'s content.\nSuch behavior suits a one-time update. However, Duo Chat also supports streaming of the AI\nresponses (check the [Interactive story for this component](?path=/story/experimental-duo-chat-duo-chat--interactive))\nand, in this case, when the message is constantly updating, we rely on a more lightweight\n`renderMarkdown` to render the updated message faster.\n\n### Don\'t use reactivity where unnecessary\n\nThe `GlDuoChat` component exposes many properties, as seen below. But not all of those should\nbe necessarily reactive in the consumer component. The properties that might be static:\n\n- `title`. The title is shown in the head of the component.\n- `isChatAvailable`. The flag indicates whether the communication interface should allow follow-up\n  questions. Usually, this decision stays the same during the component\'s lifecycle.\n- `predefinedPrompts`. The `Array` of strings that represents the possible questions to ask when\n  there are no messages in the chat.\n- `badgeHelpPageUrl`. The link to an external page explaining the meaning of an "experiment".\n  The prop is passed down to the [`GlExperimentBadge` component](?path=/docs/experimental-experiment-badge--docs).\n- `emptyStateTitle`. Title of the empty state component. Visible when there are no messages.\n- `emptyStateDescription`. Description text of the empty state component. Visible when there are no messages.\n- `chatPromptPlaceholder`. Placeholder text for the chat prompt input.\n\n### Set up communication with consumer\n\n```javascript\nimport { GlDuoChat } from \'@gitlab/ui\';\n\nexport default {\n  ...\n  data() {\n    return {\n      messages: [],\n      error: null,\n      isLoading: false,\n      toolName: \'\',\n    }\n  },\n  provide: {\n    renderMarkdown: (content) => {\n      // implementation of the `renderMarkdown` functionality\n    },\n    renderGFM: (el) => {\n      // implementation of the `renderGFM` functionality\n    },\n  },\n  beforeCreate() {\n    // Here, we set up our non-reactive properties if we must change the default values\n    this.title = \'Foo Bar\';\n    this.isChatAvailable = true; // this is just an example. `true` is the default value\n    this.predefinedPrompts = [\'How to …?\', \'Where do I …?\'];\n    this.badgeHelpPageUrl = \'https://dev.null\';\n    this.emptyStateTitle = \'Ask anything\';\n    this.emptyStateDescription = \'You will see the answers below\';\n    this.chatPromptPlaceholder = \'Type your question here\';\n  }\n  methods: {\n    onChatHidden() {\n      ...\n    },\n    onSendChatPrompt(prompt = \'\') {\n      this.isLoading = true;\n      this.messages.push(constructUserMessage(prompt));\n      ...\n    },\n    onTrackFeedback(feedbackObj = {}) {\n      ...\n    },\n    onAiResponse(data) {\n      this.messages = data\n      …\n      this.isLoading = false;\n    },\n    onAiResponseError(error) {\n      this.error = error;\n      this.isLoading = false;\n    },\n    onToolNameChange(toolMessage) {\n      this.toolName = toolMessage.content;\n    }\n  }\n}\n```\n\nWith this template in place, consumer is left with the following things to implement:\n\n- Fetch `messages`. For Duo Chat, we rely on GraphQL query to get the cached\n  messages and subscription to monitor new messages when:\n\n  - streaming response\n  - listening to chat messages in other tabs/environments\n  - listen to updates from different tools to update `toolName`\n\n- Send the new user\'s prompt. For Duo Chat, we rely on GraphQL mutation for this purpose.\n- Send user feedback to the telemetry of your choice when `track-feedback` event arrives.\n\n## Slash commands\n\nOne of the props accepted by the component is the `slashCommands`. This is an `Array` of\nthe commands, shown to user when they start typing the prompt with a slash (`/`)\ncharacter.\n\n```javascript\n<script>\n  const slashCommands = [\n    {\n      name: \'/mycommand\', // This is the exact name of my command as it will be submitted\n      shouldSubmit: true, // If the command should be submitted right away without free text\n      description: \'The description of my super-duper command.\',\n    },\n    ...\n  ];\n  export default {\n    ...\n    options: {\n      slashCommands\n    }\n  }\n<script>\n<template>\n  <gl-duo-chat\n    ...\n    :slash-commands="slashCommands"\n  />\n</template>\n```\n'}}}};Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:'(args, {\n  argTypes\n}) => ({\n  components: {\n    GlDuoChat\n  },\n  props: Object.keys(argTypes),\n  provide: {\n    renderGFM\n  },\n  template: `\n    <gl-duo-chat\n      :title="title"\n      :messages="messages"\n      :error="error"\n      :is-loading="isLoading"\n      :is-chat-available="isChatAvailable"\n      :predefined-prompts="predefinedPrompts"\n      :badge-help-page-url="badgeHelpPageUrl"\n      :badge-type="badgeType"\n      :tool-name="toolName"\n      :show-header="showHeader"\n      :empty-state-title="emptyStateTitle"\n      :empty-state-description="emptyStateDescription"\n      :chat-prompt-placeholder="chatPromptPlaceholder"\n    />`\n})',...Default.parameters?.docs?.source}}},Interactive.parameters={...Interactive.parameters,docs:{...Interactive.parameters?.docs,source:{originalSource:'(args, {\n  argTypes\n}) => ({\n  components: {\n    GlDuoChat,\n    GlButton\n  },\n  props: Object.keys(argTypes),\n  provide: {\n    renderGFM\n  },\n  data() {\n    return {\n      isHidden: false,\n      loggerInfo: \'\',\n      promptInFlight: false,\n      msgs: args.messages,\n      chunks: [],\n      timeout: null,\n      requestId: 1\n    };\n  },\n  methods: {\n    onSendChatPrompt(prompt) {\n      const newPrompt = {\n        ...MOCK_USER_PROMPT_MESSAGE,\n        contentHtml: \'\',\n        content: prompt,\n        requestId: this.requestId\n      };\n      this.loggerInfo += `New prompt: ${JSON.stringify(newPrompt)}\\n\\n`;\n      if (prompt === CHAT_CLEAN_MESSAGE) {\n        this.msgs = [];\n      } else {\n        this.msgs.push(newPrompt);\n        this.promptInFlight = true;\n      }\n    },\n    onChatHidden() {\n      this.isHidden = true;\n      this.loggerInfo += `Chat closed\\n\\n`;\n    },\n    showChat() {\n      this.isHidden = false;\n      this.loggerInfo += `Chat opened\\n\\n`;\n    },\n    async onResponseRequested() {\n      this.timeout = null;\n      await this.mockResponseFromAi();\n      this.requestId += 1;\n    },\n    async mockResponseFromAi() {\n      const generator = generateMockResponseChunks(this.requestId);\n      for await (const newResponse of generator) {\n        const existingMessageIndex = this.msgs.findIndex(msg => msg.requestId === newResponse.requestId && msg.role === newResponse.role);\n        const existingMessage = this.msgs[existingMessageIndex];\n        if (existingMessage) {\n          this.updateExistingMessage(newResponse, existingMessageIndex);\n        } else {\n          this.addNewMessage(newResponse);\n        }\n      }\n    },\n    addNewMessage(msg) {\n      this.promptInFlight = false;\n      this.$set(this.msgs, this.msgs.length, msg);\n    },\n    updateExistingMessage(newResponse, existingMessageIndex) {\n      const existingMessage = this.msgs[existingMessageIndex];\n      this.$set(this.msgs, existingMessageIndex, {\n        ...existingMessage,\n        ...newResponse\n      });\n    }\n  },\n  template: `\n  <div style="height: 800px">\n    <div id="logger" class="gl-w-half">\n      <pre class="gl-font-sm" style="text-wrap: wrap">\n<code>{{ loggerInfo }}</code>\n      </pre>\n      <gl-button v-if="promptInFlight" @click="onResponseRequested">Mock the response</gl-button>\n    </div>\n    <gl-button v-if="isHidden" @click="showChat">Show chat</gl-button>\n    <gl-duo-chat\n      v-if="!isHidden"\n      :title="title"\n      :messages="msgs"\n      :error="error"\n      :is-loading="promptInFlight"\n      :is-chat-available="isChatAvailable"\n      :predefined-prompts="predefinedPrompts"\n      :badge-help-page-url="badgeHelpPageUrl"\n      :badge-type="badgeType"\n      :tool-name="toolName"\n      :show-header="showHeader"\n      :empty-state-title="emptyStateTitle"\n      :empty-state-description="emptyStateDescription"\n      :chat-prompt-placeholder="chatPromptPlaceholder"\n      :slash-commands="slashCommands"\n      class="gl-drawer-default"\n      @send-chat-prompt="onSendChatPrompt"\n      @chat-hidden="onChatHidden"\n    />\n  </div>`\n})',...Interactive.parameters?.docs?.source}}},Slots.parameters={...Slots.parameters,docs:{...Slots.parameters?.docs,source:{originalSource:'(args, {\n  argTypes\n}) => ({\n  components: {\n    GlDuoChat,\n    GlAlert\n  },\n  props: Object.keys(argTypes),\n  provide: {\n    renderMarkdown: md => `THIS IS ALTERED MARKDOWN: ${md}`,\n    renderGFM\n  },\n  template: `\n    <div>\n      <gl-duo-chat\n        :title="title"\n        :messages="messages"\n        :error="error"\n        :is-loading="isLoading"\n        :is-chat-available="isChatAvailable"\n        :predefined-prompts="predefinedPrompts"\n        :badge-help-page-url="badgeHelpPageUrl"\n        :badge-type="badgeType"\n        :tool-name="toolName"\n        :show-header="showHeader"\n        :empty-state-title="emptyStateTitle"\n        :empty-state-description="emptyStateDescription"\n        :chat-prompt-placeholder="chatPromptPlaceholder">\n        <template #subheader>\n          <gl-alert\n            :dismissible="false"\n            variant="warning"\n            class="gl-font-sm gl-border-t"\n            role="alert"\n            data-testid="chat-legal-warning-gitlab-usage"\n            primary-button-link="https://internal-handbook.gitlab.io/handbook/product/ai-strategy/ai-integration-effort/legal_restrictions/"\n            primary-button-text="Read more"\n          >\n            <p>\n              You are not allowed to copy any part of this output into issues, comments, GitLab source code, commit messages, merge requests or any other user interface in the <code>/gitlab-org</code> or <code>/gitlab-com</code> groups.\n            </p>\n          </gl-alert>\n        </template>\n      </gl-duo-chat>\n    </div>\n    `\n})',...Slots.parameters?.docs?.source}}}}}]);