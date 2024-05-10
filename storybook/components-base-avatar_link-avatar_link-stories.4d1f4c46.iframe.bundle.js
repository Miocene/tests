"use strict";(globalThis.webpackChunk_gitlab_ui=globalThis.webpackChunk_gitlab_ui||[]).push([[418],{"./src/components/base/avatar_link/avatar_link.stories.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,WithLabeledAvatar:()=>WithLabeledAvatar,WithNoImageAvatar:()=>WithNoImageAvatar,default:()=>avatar_link_stories});var avatar=__webpack_require__("./src/components/base/avatar/avatar.vue"),avatar_labeled=__webpack_require__("./src/components/base/avatar_labeled/avatar_labeled.vue"),constants=__webpack_require__("./src/utils/constants.js"),img_avatar=__webpack_require__("./static/img/avatar.png"),avatar_link=__webpack_require__("./src/components/base/avatar_link/avatar_link.vue");function ownKeys(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter(function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable})),t.push.apply(t,o)}return t}function _objectSpread(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?ownKeys(Object(t),!0).forEach(function(r){_defineProperty(e,r,t[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):ownKeys(Object(t)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))})}return e}function _defineProperty(obj,key,value){return(key=_toPropertyKey(key))in obj?Object.defineProperty(obj,key,{value:value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}function _toPropertyKey(t){var i=_toPrimitive(t,"string");return"symbol"==typeof i?i:i+""}function _toPrimitive(t,r){if("object"!=typeof t||!t)return t;var e=t[Symbol.toPrimitive];if(void 0!==e){var i=e.call(t,r||"default");if("object"!=typeof i)return i;throw TypeError("@@toPrimitive must return a primitive value.")}return("string"===r?String:Number)(t)}var components={GlAvatarLink:avatar_link.default,GlAvatar:avatar.default,GlAvatarLabeled:avatar_labeled.default},generateDefaultProps=function(){var{href="https://gitlab.com/gitlab-org/gitlab",shape="circle",size=32}=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return{href,shape,size}},generateLabelsProps=function(){var{label="GitLab User",subLabel="@gitlab"}=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return{label,subLabel}},generateImageProps=function(){var{src=img_avatar}=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return{src}},Default=(args,_ref)=>{var{argTypes}=_ref;return{components,props:Object.keys(argTypes),template:'\n    <gl-avatar-link target="blank" :href="href">\n      <gl-avatar :src="src" :size="size" :shape="shape" />\n    </gl-avatar-link>\n    '}};Default.args=_objectSpread(_objectSpread({},generateDefaultProps()),generateImageProps());var WithLabeledAvatar=(args,_ref2)=>{var{argTypes}=_ref2;return{components,props:Object.keys(argTypes),template:'\n  <gl-avatar-link target="blank" :href="href">\n    <gl-avatar-labeled :src="src" :size="size" :shape="shape" :label="label" :sub-label="subLabel" />\n  </gl-avatar-link>\n  '}};WithLabeledAvatar.args=_objectSpread(_objectSpread(_objectSpread({},generateDefaultProps({})),generateLabelsProps({})),generateImageProps({}));var WithNoImageAvatar=(args,_ref3)=>{var{argTypes}=_ref3;return{components,props:Object.keys(argTypes),template:'\n    <gl-avatar-link target="blank" :href="href">\n      <gl-avatar-labeled :entity-name="label" :label="label" :sub-label="subLabel" :size="size" :shape="shape" />\n    </gl-avatar-link>\n    '}};WithNoImageAvatar.args=_objectSpread(_objectSpread({},generateDefaultProps({})),generateLabelsProps({}));let avatar_link_stories={title:"base/avatar/avatar-link",component:avatar_link.default,parameters:{docs:{description:{component:'`<gl-avatar-link>` decorates `<gl-avatar>` with hyperlink functionality. It accepts the same\nproperties as the `<gl-link>` component and it works in the same way too. The main purpose of this\ncomponent is to apply visual enhancements that makes evident that the user can interact with the\navatar.\n\n## Using the component\n\nWhen wrapping an `<gl-avatar>` component, `<gl-avatar-link>` darkens\nthe border that surrounds the avatar image or fallback text when hovering over it.\n\n```vue\n<gl-avatar-link target="blank" href="https://gitlab.com/gitlab-org/gitlab">\n  <gl-avatar\n    :size="32"\n    :src="avatarUrl"\n  />\n</gl-avatar-link>\n```\n\nWhen wrapping an `<avatar-labeled>` component, `<avatar-link>` underlines\nthe label and sub-label text when hovering over the avatar. It also applies the\nsame effects described in the first example.\n\n```vue\n<gl-avatar-link target="blank" href="https://gitlab.com/gitlab-org/gitlab">\n  <gl-avatar-labeled\n    :size="32"\n    entity-name="GitLab"\n    label="GitLab User"\n    sub-label="@gitlab"\n  />\n</gl-avatar-link>\n```\n'}}},argTypes:{shape:{options:constants.yV,control:"select"},size:{options:constants.E4,control:"select"}}};Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:'(args, {\n  argTypes\n}) => ({\n  components,\n  props: Object.keys(argTypes),\n  template: `\n    <gl-avatar-link target="blank" :href="href">\n      <gl-avatar :src="src" :size="size" :shape="shape" />\n    </gl-avatar-link>\n    `\n})',...Default.parameters?.docs?.source}}},WithLabeledAvatar.parameters={...WithLabeledAvatar.parameters,docs:{...WithLabeledAvatar.parameters?.docs,source:{originalSource:'(args, {\n  argTypes\n}) => ({\n  components,\n  props: Object.keys(argTypes),\n  template: `\n  <gl-avatar-link target="blank" :href="href">\n    <gl-avatar-labeled :src="src" :size="size" :shape="shape" :label="label" :sub-label="subLabel" />\n  </gl-avatar-link>\n  `\n})',...WithLabeledAvatar.parameters?.docs?.source}}},WithNoImageAvatar.parameters={...WithNoImageAvatar.parameters,docs:{...WithNoImageAvatar.parameters?.docs,source:{originalSource:'(args, {\n  argTypes\n}) => ({\n  components,\n  props: Object.keys(argTypes),\n  template: `\n    <gl-avatar-link target="blank" :href="href">\n      <gl-avatar-labeled :entity-name="label" :label="label" :sub-label="subLabel" :size="size" :shape="shape" />\n    </gl-avatar-link>\n    `\n})',...WithNoImageAvatar.parameters?.docs?.source}}}},"./static/img/avatar.png":(module,__unused_webpack_exports,__webpack_require__)=>{module.exports=__webpack_require__.p+"0bdb369be89fe90bf186.png"}}]);