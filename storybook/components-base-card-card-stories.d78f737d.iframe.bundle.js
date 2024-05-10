"use strict";(globalThis.webpackChunk_gitlab_ui=globalThis.webpackChunk_gitlab_ui||[]).push([[8011],{"./src/components/base/card/card.stories.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,default:()=>card_stories});var card=__webpack_require__("./src/components/base/card/card.vue"),Default=((args,_ref)=>{var{argTypes}=_ref;return{components:{GlCard:card.default},props:Object.keys(argTypes),template:'\n      <gl-card :header-class="headerClass" :body-class="bodyClass" :footer-class="footerClass">\n        <template #header>\n          <h3 class="gl-my-0 gl-font-weight-bold gl-font-lg">This is a custom header</h3>\n        </template>\n        <template #default>\n          Hello World\n        </template>\n        <template #footer>\n          <span>This is a custom footer</span>\n        </template>\n      </gl-card>'}}).bind({});Default.args=function(){var{headerClass,bodyClass,footerClass}=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return{headerClass,bodyClass,footerClass}}();let card_stories={title:"base/card",component:card.default,parameters:{docs:{description:{component:"Cards are a flexible component used to display content and actions in a variety of contexts.\nThey are generally restricted to a single topic and it should be easy for users to scan relevant and\nactionable information. Content, such as images and text, should be positioned within them in a\nmanner that demonstrates their intended hierarchy.\n"}}},argTypes:{headerClass:{control:"text"},bodyClass:{control:"text"},footerClass:{control:"text"},header:{control:{disable:!0}},default:{control:{disable:!0}},footer:{control:{disable:!0}}}};Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:'(args, {\n  argTypes\n}) => ({\n  components: {\n    GlCard\n  },\n  props: Object.keys(argTypes),\n  template: `\n      <gl-card :header-class="headerClass" :body-class="bodyClass" :footer-class="footerClass">\n        <template #header>\n          <h3 class="gl-my-0 gl-font-weight-bold gl-font-lg">This is a custom header</h3>\n        </template>\n        <template #default>\n          Hello World\n        </template>\n        <template #footer>\n          <span>This is a custom footer</span>\n        </template>\n      </gl-card>`\n})',...Default.parameters?.docs?.source}}}}}]);