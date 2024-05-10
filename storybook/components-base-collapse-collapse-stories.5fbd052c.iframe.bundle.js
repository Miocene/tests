"use strict";(globalThis.webpackChunk_gitlab_ui=globalThis.webpackChunk_gitlab_ui||[]).push([[4645],{"./src/components/base/collapse/collapse.stories.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,default:()=>collapse_stories});var button_button=__webpack_require__("./src/components/base/button/button.vue"),card=__webpack_require__("./src/components/base/card/card.vue"),collapse=__webpack_require__("./src/components/base/collapse/collapse.vue"),Default=((args,_ref)=>{var{argTypes}=_ref;return{components:{GlButton:button_button.default,GlCard:card.default,GlCollapse:collapse.default},props:Object.keys(argTypes),template:'\n  <div>\n    <h1>Here\'s a headline</h1>\n    <gl-button v-gl-collapse-toggle.collapse class="float-right" category="primary">\n      Toggle Collapse\n    </gl-button>\n    <gl-collapse :visible="visible" id="collapse" class="gl-mt-2">\n      <span>\n        This content can be hidden by default, which is good if there are some extensive details \n        that should only be visible if the user wants to interact with them\n      </span>\n    </gl-collapse>\n  </div>'}}).bind({});Default.args=function(){var{visible=!1}=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return{visible}}();let collapse_stories={title:"base/collapse",component:collapse.default,parameters:{bootstrapComponent:"b-collapse",docs:{description:{component:"Collapse is used to keep pages focused on the overview of what the user can do. Details and\nadditional actions are hidden in the fold, and can be opened if the user wants to interact with\nthose elements.\n"}}}};Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"(args, {\n  argTypes\n}) => ({\n  components: {\n    GlButton,\n    GlCard,\n    GlCollapse\n  },\n  props: Object.keys(argTypes),\n  template\n})",...Default.parameters?.docs?.source}}}}}]);