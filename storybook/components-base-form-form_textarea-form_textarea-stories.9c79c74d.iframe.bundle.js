"use strict";(globalThis.webpackChunk_gitlab_ui=globalThis.webpackChunk_gitlab_ui||[]).push([[8594],{"./src/components/base/form/form_textarea/form_textarea.stories.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,WithCharacterCount:()=>WithCharacterCount,default:()=>form_textarea_stories});var form_textarea=__webpack_require__("./src/components/base/form/form_textarea/form_textarea.vue");function ownKeys(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter(function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable})),t.push.apply(t,o)}return t}function _objectSpread(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?ownKeys(Object(t),!0).forEach(function(r){_defineProperty(e,r,t[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):ownKeys(Object(t)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))})}return e}function _defineProperty(obj,key,value){return(key=_toPropertyKey(key))in obj?Object.defineProperty(obj,key,{value:value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}function _toPropertyKey(t){var i=_toPrimitive(t,"string");return"symbol"==typeof i?i:i+""}function _toPrimitive(t,r){if("object"!=typeof t||!t)return t;var e=t[Symbol.toPrimitive];if(void 0!==e){var i=e.call(t,r||"default");if("object"!=typeof i)return i;throw TypeError("@@toPrimitive must return a primitive value.")}return("string"===r?String:Number)(t)}var generateProps=function(){var{value="We take inspiration from other companies, and we always go for the boring solutions. Just like the rest of our work, we continually adjust our values and strive always to make them better. We used to have more values, but it was difficult to remember them all, so we condensed them and gave sub-values and created an acronym. Everyone is welcome to suggest improvements.",placeholder="hello",noResize=form_textarea.default.props.noResize.default,characterCount=null}=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return{value,placeholder,noResize,characterCount}},Template=(args,_ref)=>{var{updateArgs}=_ref;return{components:{GlFormTextarea:form_textarea.default},props:Object.keys(args),methods:{onInput(value){updateArgs(_objectSpread(_objectSpread({},args),{},{value}))},characterCountText:count=>1===count?"".concat(count," character remaining"):"".concat(count," characters remaining"),characterCountOverLimitText:count=>1===count?"".concat(count," character over limit"):"".concat(count," characters over limit")},template:'\n  <gl-form-textarea\n    :value="value"\n    :placeholder="placeholder"\n    :rows="5"\n    :no-resize="noResize"\n    :character-count="characterCount"\n    @input="onInput"\n  >\n    <template #character-count-text="{ count }">{{ characterCountText(count) }}</template>\n    <template #character-count-over-limit-text="{ count }">{{ characterCountOverLimitText(count) }}</template>\n  </gl-form-textarea>\n'}},Default=Template.bind({});Default.args=generateProps();var WithCharacterCount=Template.bind({});WithCharacterCount.args=generateProps({value:"",placeholder:"hello",characterCount:100});let form_textarea_stories={title:"base/form/form-textarea",component:form_textarea.default,parameters:{bootstrapComponent:"b-form-textarea",docs:{description:{component:"**Note:** This needs a `v-model` property to work correctly.\nSee [this issue](https://github.com/bootstrap-vue/bootstrap-vue/issues/1915) on Bootstrap Vue for\nmore information.\n"}}}};Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"(args, {\n  updateArgs\n}) => ({\n  components: {\n    GlFormTextarea\n  },\n  props: Object.keys(args),\n  methods: {\n    onInput(value) {\n      updateArgs({\n        ...args,\n        value\n      });\n    },\n    characterCountText(count) {\n      return count === 1 ? `${count} character remaining` : `${count} characters remaining`;\n    },\n    characterCountOverLimitText(count) {\n      return count === 1 ? `${count} character over limit` : `${count} characters over limit`;\n    }\n  },\n  template\n})",...Default.parameters?.docs?.source}}},WithCharacterCount.parameters={...WithCharacterCount.parameters,docs:{...WithCharacterCount.parameters?.docs,source:{originalSource:"(args, {\n  updateArgs\n}) => ({\n  components: {\n    GlFormTextarea\n  },\n  props: Object.keys(args),\n  methods: {\n    onInput(value) {\n      updateArgs({\n        ...args,\n        value\n      });\n    },\n    characterCountText(count) {\n      return count === 1 ? `${count} character remaining` : `${count} characters remaining`;\n    },\n    characterCountOverLimitText(count) {\n      return count === 1 ? `${count} character over limit` : `${count} characters over limit`;\n    }\n  },\n  template\n})",...WithCharacterCount.parameters?.docs?.source}}}}}]);