"use strict";(globalThis.webpackChunk_gitlab_ui=globalThis.webpackChunk_gitlab_ui||[]).push([[5591],{"./src/components/base/form/form_checkbox_tree/form_checkbox_tree.stories.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,default:()=>form_checkbox_tree_stories});var token=__webpack_require__("./src/components/base/token/token.vue"),form_checkbox_tree=__webpack_require__("./src/components/base/form/form_checkbox_tree/form_checkbox_tree.vue"),components={GlFormCheckboxTree:form_checkbox_tree.default,GlToken:token.default},defaultOptions=[{value:1,label:"Felidae",children:[{value:11,label:"Lion"},{value:12,label:"Felinae",children:[{value:121,label:"Cheetah"},{value:122,label:"Ocelot"}]}]},{value:2,label:"Canidae",children:[{value:21,label:"Caninae",children:[{value:211,label:"Canis lupus",children:[{value:2112,label:"Wolf"},{value:2113,label:"Himalayan wolf"},{value:2114,label:"Dingo"}]},{value:212,label:"Black-backed jackal"}]},{value:22,label:"Fennec fox"}]},{value:3,label:"Karabair"},{value:4,label:"Okapi"}],defaultValue=prop=>form_checkbox_tree.default.props[prop].default,Default=(args,_ref)=>{var{argTypes}=_ref;return{props:Object.keys(argTypes),data:()=>({checked:[1,11,12,121,122,2113,3]}),components,template:'\n    <div>\n      <gl-form-checkbox-tree\n        v-model="checked"\n        :options="options"\n        :hide-toggle-all="hideToggleAll"\n        :select-all-label="selectAllLabel"\n        :unselect-all-label="unselectAllLabel"\n        :label="label"\n        :label-sr-only="labelSrOnly" />\n      Selected options:\n      <gl-token v-for="value in checked" :key="value" class="gl-mr-1" view-only>{{ value }}</gl-token>\n    </div>\n  '}};Default.args=function(){var{options=defaultOptions,hideToggleAll=defaultValue("hideToggleAll"),selectAllLabel=defaultValue("selectAllLabel"),unselectAllLabel=defaultValue("unselectAllLabel"),label=defaultValue("label"),labelSrOnly=defaultValue("labelSrOnly")}=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return{options,hideToggleAll,selectAllLabel,unselectAllLabel,label,labelSrOnly}}();let form_checkbox_tree_stories={title:"base/form/form-checkbox-tree",component:form_checkbox_tree.default,parameters:{docs:{description:{component:"`GlFormCheckboxTree` lets you display an options structure where any option can have n-level of\nchildren. It can be useful for creating a search filter that has nested facets.\n\n## Usage\n\n`GlFormCheckboxTree` accepts an `options` prop representing the available options in the form of\nan n-level deep tree. Each option should have a `value` and can have optional\n`label` and `children`. If `label` is omitted, `value` is used as the checkbox's label.\nHere's a simple `options` tree for example:\n\n```js\n[\n  {\n    label: 'Option #1',\n    value: 1,\n    children: [\n      {\n        label: 'Option #2',\n        value: 2,\n      },\n    ],\n  },\n  {\n    label: 'Option #3',\n    value: 3,\n  },\n]\n```\n\n`GlFormCheckboxTree` exposes the selected options via a `v-model` which is being kept in sync with\nthe `change` event.\n\n## Dos and don'ts\n\n### Don't\n\nWhen rendering a `GlFormCheckboxTree` with pre-selected options, all the selected values should be\npassed to the component via the `v-model`/`value` property. For example, with the options tree\nabove, if you wanted options `1` and `2` to be pre-selected, make sure that they are both included\nin the initial value, don't rely on the component to infer initially checked boxes by only passing\n`1` or `2`.\n\n```html\n<!-- Good -->\n<gl-form-checkbox-tree\n  :value=\"[1, 2]\"\n  :options=\"[\n    {\n      value: 1,\n      children: [\n        {\n          value: 2,\n        },\n      ],\n    },\n  ]\"\n/>\n\n<!-- Bad -->\n<gl-form-checkbox-tree\n  :value=\"[1]\"\n  :options=\"[\n    {\n      value: 1,\n      children: [\n        {\n          value: 2,\n        },\n      ],\n    },\n  ]\"\n/>\n```\n"}}}};Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:'(args, {\n  argTypes\n}) => ({\n  props: Object.keys(argTypes),\n  data: () => ({\n    checked: [1, 11, 12, 121, 122, 2113, 3]\n  }),\n  components,\n  template: `\n    <div>\n      <gl-form-checkbox-tree\n        v-model="checked"\n        :options="options"\n        :hide-toggle-all="hideToggleAll"\n        :select-all-label="selectAllLabel"\n        :unselect-all-label="unselectAllLabel"\n        :label="label"\n        :label-sr-only="labelSrOnly" />\n      Selected options:\n      <gl-token v-for="value in checked" :key="value" class="gl-mr-1" view-only>{{ value }}</gl-token>\n    </div>\n  `\n})',...Default.parameters?.docs?.source}}}}}]);