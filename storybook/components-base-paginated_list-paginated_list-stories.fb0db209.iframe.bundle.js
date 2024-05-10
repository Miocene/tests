"use strict";(globalThis.webpackChunk_gitlab_ui=globalThis.webpackChunk_gitlab_ui||[]).push([[2666],{"./src/components/base/paginated_list/paginated_list.stories.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,NoFilter:()=>NoFilter,WithEmptyList:()=>WithEmptyList,WithHeaderSlot:()=>WithHeaderSlot,WithRowSlot:()=>WithRowSlot,WithSubheaderSlot:()=>WithSubheaderSlot,default:()=>paginated_list_stories});var button_button=__webpack_require__("./src/components/base/button/button.vue"),paginated_list=__webpack_require__("./src/components/base/paginated_list/paginated_list.vue"),sampleList=[{id:"foo"},{id:"bar"},{id:"baz"},{id:"qux"},{id:"quux"},{id:"corge"},{id:"grault"},{id:"garply"},{id:"waldo"},{id:"fred"},{id:"xyzzy"},{id:"plugh"},{id:"thud"}],template='\n  <gl-paginated-list\n  :list="list"\n  :perPage="perPage"\n  :page="page"\n  :filterable="filterable"\n  :filter="filter"\n  :item-key="itemKey"\n  :emptyMessage="emptyMessage"\n  :emptySearchMessage="emptySearchMessage"\n  />\n',generateProps=function(){var{list=[...sampleList],perPage=10,page=1,filterable=!0,filter="id",itemKey="id",emptyMessage="There are currently no items in this list.",emptySearchMessage="Sorry, your filter produced no results."}=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return{list,perPage,page,filterable,filter,itemKey,emptyMessage,emptySearchMessage}},Default=((args,_ref)=>{var{argTypes}=_ref;return{components:{GlPaginatedList:paginated_list.default,GlButton:button_button.default},props:Object.keys(argTypes),template}}).bind({});Default.args=generateProps();var NoFilter=(args,_ref2)=>{var{argTypes}=_ref2;return{components:{GlPaginatedList:paginated_list.default,GlButton:button_button.default},props:Object.keys(argTypes),template}};NoFilter.args=generateProps({filterable:!1});var WithEmptyList=(args,_ref3)=>{var{argTypes}=_ref3;return{components:{GlPaginatedList:paginated_list.default,GlButton:button_button.default},props:Object.keys(argTypes),template}};WithEmptyList.args=generateProps({list:[]});var WithHeaderSlot=(args,_ref4)=>{var{argTypes}=_ref4;return{components:{GlPaginatedList:paginated_list.default,GlButton:button_button.default},props:Object.keys(argTypes),template:'\n    <gl-paginated-list\n    :list="list"\n    :perPage="perPage"\n    :page="page"\n    :filterable="filterable"\n    :filter="filter"\n    :item-key="itemKey"\n    :emptyMessage="emptyMessage"\n    :emptySearchMessage="emptySearchMessage"\n    >\n\n      <template #header>\n        <gl-button\n          variant="success"\n          class="order-1"\n          @click="alert"\n        >\n          Foo Button\n        </gl-button>\n      </template>\n\n    </gl-paginated-list>\n    ',methods:{alert(){window.alert("clicked")}}}};WithHeaderSlot.args=generateProps();var WithSubheaderSlot=(args,_ref5)=>{var{argTypes}=_ref5;return{components:{GlPaginatedList:paginated_list.default,GlButton:button_button.default},props:Object.keys(argTypes),template:'\n    <gl-paginated-list\n    :list="list"\n    :perPage="perPage"\n    :page="page"\n    :filterable="filterable"\n    :filter="filter"\n    :item-key="itemKey"\n    :emptyMessage="emptyMessage"\n    :emptySearchMessage="emptySearchMessage"\n    >\n\n    <template #subheader>\n      Dropdown content can go here when like when an action button is clicked \n    </template>\n    \n    </gl-paginated-list>\n  '}};WithSubheaderSlot.args=generateProps();var WithRowSlot=(args,_ref6)=>{var{argTypes}=_ref6;return{components:{GlPaginatedList:paginated_list.default,GlButton:button_button.default},props:Object.keys(argTypes),template:'\n    <gl-paginated-list\n    :list="list"\n    :perPage="perPage"\n    :page="page"\n    :filterable="filterable"\n    :filter="filter"\n    :item-key="itemKey"\n    :emptyMessage="emptyMessage"\n    :emptySearchMessage="emptySearchMessage"\n    >\n    \n      <template slot-scope="{ listItem }"  >\n        <gl-button\n        variant="success"\n        class="order-1"\n        @click="alert"\n        >\n          {{ listItem.id }}\n        </gl-button>\n      </template>\n    \n    </gl-paginated-list>\n    ',methods:{alert(){window.alert("clicked")}}}};WithRowSlot.args=generateProps();let paginated_list_stories={title:"base/paginated-list",component:paginated_list.default,parameters:{docs:{description:{component:"The paginated list component allows the easy creation of list with pagination and client side sorting.\n"}}}};Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"(args, {\n  argTypes\n}) => ({\n  components: {\n    GlPaginatedList,\n    GlButton\n  },\n  props: Object.keys(argTypes),\n  template\n})",...Default.parameters?.docs?.source}}},NoFilter.parameters={...NoFilter.parameters,docs:{...NoFilter.parameters?.docs,source:{originalSource:"(args, {\n  argTypes\n}) => ({\n  components: {\n    GlPaginatedList,\n    GlButton\n  },\n  props: Object.keys(argTypes),\n  template\n})",...NoFilter.parameters?.docs?.source}}},WithEmptyList.parameters={...WithEmptyList.parameters,docs:{...WithEmptyList.parameters?.docs,source:{originalSource:"(args, {\n  argTypes\n}) => ({\n  components: {\n    GlPaginatedList,\n    GlButton\n  },\n  props: Object.keys(argTypes),\n  template\n})",...WithEmptyList.parameters?.docs?.source}}},WithHeaderSlot.parameters={...WithHeaderSlot.parameters,docs:{...WithHeaderSlot.parameters?.docs,source:{originalSource:'(args, {\n  argTypes\n}) => ({\n  components: {\n    GlPaginatedList,\n    GlButton\n  },\n  props: Object.keys(argTypes),\n  template: `\n    <gl-paginated-list\n    :list="list"\n    :perPage="perPage"\n    :page="page"\n    :filterable="filterable"\n    :filter="filter"\n    :item-key="itemKey"\n    :emptyMessage="emptyMessage"\n    :emptySearchMessage="emptySearchMessage"\n    >\n\n      <template #header>\n        <gl-button\n          variant="success"\n          class="order-1"\n          @click="alert"\n        >\n          Foo Button\n        </gl-button>\n      </template>\n\n    </gl-paginated-list>\n    `,\n  methods: {\n    alert() {\n      // eslint-disable-next-line no-alert\n      window.alert(\'clicked\');\n    }\n  }\n})',...WithHeaderSlot.parameters?.docs?.source}}},WithSubheaderSlot.parameters={...WithSubheaderSlot.parameters,docs:{...WithSubheaderSlot.parameters?.docs,source:{originalSource:'(args, {\n  argTypes\n}) => ({\n  components: {\n    GlPaginatedList,\n    GlButton\n  },\n  props: Object.keys(argTypes),\n  template: `\n    <gl-paginated-list\n    :list="list"\n    :perPage="perPage"\n    :page="page"\n    :filterable="filterable"\n    :filter="filter"\n    :item-key="itemKey"\n    :emptyMessage="emptyMessage"\n    :emptySearchMessage="emptySearchMessage"\n    >\n\n    <template #subheader>\n      Dropdown content can go here when like when an action button is clicked \n    </template>\n    \n    </gl-paginated-list>\n  `\n})',...WithSubheaderSlot.parameters?.docs?.source}}},WithRowSlot.parameters={...WithRowSlot.parameters,docs:{...WithRowSlot.parameters?.docs,source:{originalSource:'(args, {\n  argTypes\n}) => ({\n  components: {\n    GlPaginatedList,\n    GlButton\n  },\n  props: Object.keys(argTypes),\n  template: `\n    <gl-paginated-list\n    :list="list"\n    :perPage="perPage"\n    :page="page"\n    :filterable="filterable"\n    :filter="filter"\n    :item-key="itemKey"\n    :emptyMessage="emptyMessage"\n    :emptySearchMessage="emptySearchMessage"\n    >\n    \n      <template slot-scope="{ listItem }"  >\n        <gl-button\n        variant="success"\n        class="order-1"\n        @click="alert"\n        >\n          {{ listItem.id }}\n        </gl-button>\n      </template>\n    \n    </gl-paginated-list>\n    `,\n  methods: {\n    alert() {\n      // eslint-disable-next-line no-alert\n      window.alert(\'clicked\');\n    }\n  }\n})',...WithRowSlot.parameters?.docs?.source}}}}}]);