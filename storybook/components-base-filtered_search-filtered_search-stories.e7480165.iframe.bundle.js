"use strict";(globalThis.webpackChunk_gitlab_ui=globalThis.webpackChunk_gitlab_ui||[]).push([[4171],{"./src/utils/story_decorators/container.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{F:()=>makeContainer});var makeContainer=function(style){var tag=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"div";return Story=>({render:h=>h(tag,{style},[h(Story())])})}},"./src/components/base/filtered_search/filtered_search.stories.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,ViewOnly:()=>ViewOnly,WithFriendlyText:()=>WithFriendlyText,WithHistoryItems:()=>WithHistoryItems,WithMultiSelect:()=>WithMultiSelect,WithTermsAsTokens:()=>WithTermsAsTokens,default:()=>filtered_search_stories});var last=__webpack_require__("./node_modules/lodash/last.js"),last_default=__webpack_require__.n(last),dist=__webpack_require__("./node_modules/@storybook/test/dist/index.mjs"),loading_icon=__webpack_require__("./src/components/base/loading_icon/loading_icon.vue"),icon=__webpack_require__("./src/components/base/icon/icon.vue"),token=__webpack_require__("./src/components/base/token/token.vue"),avatar=__webpack_require__("./src/components/base/avatar/avatar.vue"),datepicker=__webpack_require__("./src/components/base/datepicker/datepicker.vue"),dropdown_divider=__webpack_require__("./src/components/base/dropdown/dropdown_divider.vue"),test_utils=__webpack_require__("./src/utils/test_utils.js"),container=__webpack_require__("./src/utils/story_decorators/container.js"),filtered_search_token_segment=__webpack_require__("./src/components/base/filtered_search/filtered_search_token_segment.vue"),filtered_search_term=__webpack_require__("./src/components/base/filtered_search/filtered_search_term.vue"),filtered_search_suggestion_list=__webpack_require__("./src/components/base/filtered_search/filtered_search_suggestion_list.vue"),filtered_search_suggestion=__webpack_require__("./src/components/base/filtered_search/filtered_search_suggestion.vue"),filtered_search_token=__webpack_require__("./src/components/base/filtered_search/filtered_search_token.vue"),filtered_search=__webpack_require__("./src/components/base/filtered_search/filtered_search.vue");function asyncGeneratorStep(gen,resolve,reject,_next,_throw,key,arg){try{var info=gen[key](arg),value=info.value}catch(error){reject(error);return}info.done?resolve(value):Promise.resolve(value).then(_next,_throw)}function _asyncToGenerator(fn){return function(){var self=this,args=arguments;return new Promise(function(resolve,reject){var gen=fn.apply(self,args);function _next(value){asyncGeneratorStep(gen,resolve,reject,_next,_throw,"next",value)}function _throw(err){asyncGeneratorStep(gen,resolve,reject,_next,_throw,"throw",err)}_next(void 0)})}}var fakeUsers=[{id:1,name:"User Alpha",username:"alpha"},{id:2,name:"User Beta",username:"beta"},{id:3,name:"User Gamma",username:"gamma"},{id:4,name:"User Delta",username:"delta"},{id:5,name:"User Epsilon",username:"epsilon"}],fakeMilestones=[{id:1,title:"12.7",name:"%12.7"},{id:2,title:"12.8",name:"%12.8"},{id:3,title:"12.9",name:"%12.9"},{id:4,title:"12.10",name:"%12.10"},{id:5,title:"Backlog",name:"Backlog"}],fakeLabels=[{id:1,title:"Bug",color:"#D9534F",text_color:"#FFFFFF"},{id:2,title:"Enhancement",color:"#F0AD4E",text_color:"#FFFFFF"},{id:3,title:"Backlog",color:"#cccccc",text_color:"#333333"},{id:4,title:"Feature",color:"#A8D695",text_color:"#333333"},{id:5,title:"Documentation",color:"#5CB85C",text_color:"#FFFFFF"}],UserToken={name:"UserToken",__v_skip:!0,components:{GlFilteredSearchToken:filtered_search_token.default,GlFilteredSearchSuggestion:filtered_search_suggestion.default,GlLoadingIcon:loading_icon.default,GlAvatar:avatar.default},props:["value","active"],inheritAttrs:!1,data:()=>({loadingView:!1,loadingSuggestions:!1,users:[],activeUser:null}),methods:{loadView(){this.loadingView=!0,(0,test_utils.$L)(()=>{this.loadingView=!1,this.activeUser=fakeUsers.find(u=>u.username===this.value.data)},500)},loadSuggestions(){this.loadingSuggestions=!0,(0,test_utils.$L)(()=>{this.loadingSuggestions=!1,this.users=fakeUsers},500)}},watch:{"value.data":function valueData(){this.active&&this.loadSuggestions()},active:{immediate:!0,handler(newValue){newValue?this.loadSuggestions():this.loadView()}}},template:'\n    <gl-filtered-search-token\n      v-bind="{ ...this.$props, ...this.$attrs }"\n      v-on="$listeners"\n    >\n      <template #view="{ inputValue }">\n        <gl-loading-icon size="sm" v-if="loadingView" />\n        <gl-avatar :size="16" :entity-name="inputValue" shape="circle" v-else />\n        {{ activeUser ? activeUser.name : inputValue }}\n      </template>\n      <template #suggestions>\n        <template v-if="loadingSuggestions">\n          <gl-loading-icon />\n        </template>\n        <template v-else>\n        <gl-filtered-search-suggestion :key="user.id" v-for="user in users" :value="user.username">\n          <div class="gl-display-flex">\n            <gl-avatar :size="32" :entity-name="user.username" />\n            <div>\n              <p class="gl-m-0">{{ user.name }}</p>\n              <p class="gl-m-0">@{{ user.username }}</p>\n            </div>\n          </div>\n        </gl-filtered-search-suggestion>\n        </template>\n      </template>\n    </gl-filtered-search-token>\n  '},MilestoneToken={name:"MilestoneToken",__v_skip:!0,components:{GlFilteredSearchToken:filtered_search_token.default,GlFilteredSearchSuggestion:filtered_search_suggestion.default,GlLoadingIcon:loading_icon.default,GlDropdownDivider:dropdown_divider.default},props:["value","active"],inheritAttrs:!1,data:()=>({loadingView:!1,loadingSuggestions:!1,milestones:[]}),methods:{loadSuggestions(){this.loadingSuggestions=!0,(0,test_utils.$L)(()=>{this.loadingSuggestions=!1,this.milestones=fakeMilestones},500)}},watch:{"value.data":function valueData(){this.active&&this.loadSuggestions()},active:{immediate:!0,handler(newValue){newValue&&this.loadSuggestions()}}},template:'\n    <gl-filtered-search-token\n      v-bind="{ ...this.$props, ...this.$attrs }"\n      v-on="$listeners"\n    >\n      <template #suggestions>\n        <gl-filtered-search-suggestion value="None">None</gl-filtered-search-suggestion>\n        <gl-filtered-search-suggestion value="Any">Any</gl-filtered-search-suggestion>\n        <gl-filtered-search-suggestion value="Upcoming">Upcoming</gl-filtered-search-suggestion>\n        <gl-filtered-search-suggestion value="Started">Started</gl-filtered-search-suggestion>\n        <gl-dropdown-divider v-if="loadingSuggestions || milestones.length" />\n        <template v-if="loadingSuggestions">\n          <gl-loading-icon />\n        </template>\n        <template v-else>\n        <gl-filtered-search-suggestion :key="milestone.id" v-for="milestone in milestones" :value="milestone.name">\n        {{ milestone.title }}\n        </gl-filtered-search-suggestion>\n        </template>\n      </template>\n    </gl-filtered-search-token>\n  '},LabelToken={name:"LabelToken",__v_skip:!0,components:{GlFilteredSearchToken:filtered_search_token.default,GlFilteredSearchSuggestion:filtered_search_suggestion.default,GlLoadingIcon:loading_icon.default,GlToken:token.default,GlDropdownDivider:dropdown_divider.default},props:["value","active","viewOnly"],inheritAttrs:!1,data:()=>({loadingView:!1,loadingSuggestions:!1,labels:[],activeLabel:null}),computed:{currentValue(){return this.value.data.toLowerCase()},containerStyle(){if(this.activeLabel){var{color,text_color}=this.activeLabel;return{backgroundColor:color,color:text_color}}return{}}},methods:{loadView(){this.loadingView=!0,(0,test_utils.$L)(()=>{this.loadingView=!1,this.activeLabel=fakeLabels.find(l=>l.title===this.value.data)},100)},loadSuggestions(){this.loadingSuggestions=!0,(0,test_utils.$L)(()=>{this.loadingSuggestions=!1,this.labels=fakeLabels},500)}},watch:{"value.data":function valueData(){this.active&&this.loadSuggestions()},active:{immediate:!0,handler(newValue){newValue?this.loadSuggestions():this.loadView()}}},template:'\n    <gl-filtered-search-token\n      v-bind="{ ...this.$props, ...this.$attrs }"\n      v-on="$listeners"\n    >\n      <template #view-token="{ inputValue, cssClasses, listeners }">\n        <gl-token variant="search-value" :view-only="viewOnly" :class="cssClasses" :style="containerStyle" v-on="listeners">\n          {{ activeLabel ? activeLabel.title : inputValue }}\n        </gl-token>\n      </template>\n      <template #suggestions>\n        <gl-filtered-search-suggestion value="None">None</gl-filtered-search-suggestion>\n        <gl-filtered-search-suggestion value="Any">Any</gl-filtered-search-suggestion>\n        <gl-dropdown-divider v-if="loadingSuggestions || labels.length" />\n        <template v-if="loadingSuggestions">\n          <gl-loading-icon />\n        </template>\n        <template v-else>\n        <gl-filtered-search-suggestion :key="label.id" v-for="label in labels" :value="label.title">\n          <div class="d-flex">\n            <span\n              :style="{ backgroundColor: label.color, height: \'16px\', width: \'16px\' }"\n              class="d-inline-block mr-2"\n            ></span>\n            {{ label.title }}\n          </div>\n        </gl-filtered-search-suggestion>\n        </template>\n      </template>\n    </gl-filtered-search-token>\n  '},DateToken={name:"DateToken",__v_skip:!0,components:{GlIcon:icon.default,GlDatepicker:datepicker.default,GlFilteredSearchToken:filtered_search_token.default},props:["value","active","viewOnly"],inheritAttrs:!1,data:()=>({dataSegmentInputAttributes:{id:"this-id",placeholder:"YYYY-MM-DD",style:"padding-left: 23px;"}}),methods:{selectValue(value,submitValue){var date=new Date(value),offset=date.getTimezoneOffset();submitValue(new Date(date.getTime()-6e4*offset).toISOString().split("T")[0])}},template:'\n    <div>\n      <gl-filtered-search-token\n        :data-segment-input-attributes="dataSegmentInputAttributes"\n        v-bind="{ ...this.$props, ...this.$attrs }"\n        v-on="$listeners"\n      >\n        <template #before-data-segment-input="{ submitValue }">\n          <gl-icon\n            class="gl-text-gray-500"\n            name="calendar"\n            style="margin-right: -20px; z-index: 1; pointer-events: none;"\n          />\n          <gl-datepicker\n            class="gl-display-none!"\n            target=\'#this-id\'\n            :container="null"\n            @input="selectValue($event, submitValue)" />\n        </template>\n      </gl-filtered-search-token>\n    </div>\n  '},tokens=[{type:"author",icon:"pencil",title:"Author",dataType:"user",unique:!0,token:UserToken},{type:"user",icon:"user",title:"Assignee",dataType:"user",token:UserToken},{type:"milestone",icon:"milestone",title:"Milestone",unique:!0,token:MilestoneToken},{type:"label",icon:"labels",title:"Label",token:LabelToken},{type:"weight",icon:"weight",title:"Weight",unique:!0,token:filtered_search_token.default},{type:"confidential",icon:"eye-slash",title:"Confidential",unique:!0,token:filtered_search_token.default,options:[{icon:"eye-slash",value:"true",title:"Yes"},{icon:"eye",value:"false",title:"No"}]},{type:"date",icon:"history",title:"Created",token:DateToken,operators:[{value:"<",description:"before"},{value:">",description:"after"}]}],components={GlFilteredSearch:filtered_search.default},Default=()=>({data:()=>({tokens,value:[{type:"author",value:{data:"beta",operator:"="}},{type:"label",value:{data:"Bug",operator:"="}},"raw text"]}),components,template:'<gl-filtered-search :available-tokens="tokens" :value="value" />'}),WithTermsAsTokens=()=>({data:()=>({tokens,value:[{type:"author",value:{data:"beta",operator:"="}},{type:"label",value:{data:"Bug",operator:"="}},"raw text"]}),components,template:'\n    <gl-filtered-search :available-tokens="tokens" v-model="value" terms-as-tokens />\n  '}),ViewOnly=()=>({data:()=>({tokens,value:[{type:"author",value:{data:"epsilon",operator:"="}},"raw text"]}),components,template:'<gl-filtered-search view-only :available-tokens="tokens" :value="value" />'}),WithHistoryItems=()=>({components,data:()=>({tokens:[{type:"demotoken",title:"Unique",icon:"document",token:filtered_search_token.default,operators:[{value:"=",description:"is",default:"true"}],options:[{icon:"heart",title:"heart",value:1},{icon:"hook",title:"hook",value:2}],unique:!0}],value:[],historyItems:[[{type:"demotoken",value:{operator:"=",data:1}},"item 1"],["item 2",{type:"demotoken",value:{operator:"=",data:2}}]]}),methods:{isString:val=>"string"==typeof val},template:'\n    <div>\n      {{ value }}\n      <gl-filtered-search v-model="value" :available-tokens="tokens" :history-items="historyItems">\n        <template #history-item="{ historyItem }">\n          <template v-for="(token, idx) in historyItem">\n            <span v-if="isString(token)" :key="idx" class="gl-px-1">{{ token }}</span>\n            <span v-else :key="idx" class="gl-px-1">\n              <strong>{{ token.type }}</strong> {{ token.value.operator }}\n              <strong>{{ token.value.data }}</strong>\n            </span>\n          </template>\n        </template>\n      </gl-filtered-search>\n    </div>\n  '});WithHistoryItems.play=function(){var _ref2=_asyncToGenerator(function*(_ref){var{canvasElement}=_ref,button=(0,dist.uh)(canvasElement).getByTestId("base-dropdown-toggle");yield dist.mV.click(button),yield(0,dist.X_)(()=>(0,dist.l_)((0,dist.uh)(document).getByTestId("base-dropdown-menu")).toBeVisible())});return function(_x){return _ref2.apply(this,arguments)}}();var WithFriendlyText=()=>({components,data:()=>({tokens:[{type:"weight",icon:"weight",title:"Weight",unique:!0,token:filtered_search_token.default},{type:"confidential",icon:"eye-slash",title:"Confidential",unique:!0,token:filtered_search_token.default,options:[{icon:"eye-slash",value:"true",title:"Yes"},{icon:"eye",value:"false",title:"No"}]}],value:[{type:"weight",value:{data:"3",operator:"="}},{type:"confidential",value:{data:"Yes",operator:"!="}}]}),template:'\n    <gl-filtered-search\n      v-model="value"\n      :available-tokens="tokens"\n      :show-friendly-text="true"\n    />\n  '}),WithMultiSelect=()=>{var MultiUserToken={__v_skip:!0,props:["value","active","config"],components:{GlFilteredSearchToken:filtered_search_token.default,GlFilteredSearchSuggestion:filtered_search_suggestion.default,GlLoadingIcon:loading_icon.default,GlIcon:icon.default,GlAvatar:avatar.default},inheritAttrs:!1,data(){return{users:fakeUsers,selectedUsernames:this.value.data||[],activeUser:null}},computed:{filteredUsers(){var term=this.value.data;return Array.isArray(this.value.data)&&this.value.data.length>1&&(term=last_default()(this.value.data)),this.users.filter(user=>user.username.includes(term))},selectedUsers(){return this.config.multiSelect?this.users.filter(user=>this.selectedUsernames.includes(user.username)):this.users.filter(user=>user.username===this.activeUser)}},methods:{loadView(){this.activeUser=fakeUsers.find(u=>u.username===this.value.data)},loadSuggestions(){this.users=fakeUsers},handleSelect(username){this.config.multiSelect&&(this.selectedUsernames.includes(username)?this.selectedUsernames=this.selectedUsernames.filter(user=>user!==username):this.selectedUsernames.push(username))},isLastUser(index){return index===this.selectedUsers.length-1},key:(user,index)=>"".concat(user.id,"-").concat(index)},watch:{"value.data":function valueData(){this.active&&this.loadSuggestions()},active:{immediate:!0,handler(newValue){newValue?this.loadSuggestions():this.loadView()}}},template:'\n    <gl-filtered-search-token\n      v-bind="{ ...this.$props, ...this.$attrs }"\n      v-on="$listeners"\n      :multi-select-values="selectedUsernames"\n      @select="handleSelect"\n    >\n    <template #view="{ inputValue }">\n      <template v-for="(user, index) in selectedUsers">\n        <gl-avatar :size="16" :entity-name="user.username" shape="circle" />\n        {{ user.name }}\n        <span v-if="!isLastUser(index)">,&nbsp;</span>\n      </template>\n    </template>\n    <template #suggestions>\n      <gl-filtered-search-suggestion :key="key(user, index)" v-for="(user, index) in filteredUsers" :value="user.username">\n        <div class="gl-display-flex gl-align-items-center">\n          <gl-icon\n            v-if="config.multiSelect"\n            name="check"\n            class="gl-mr-3 gl-text-gray-700"\n            :class="{ \'gl-visibility-hidden\': !selectedUsernames.includes(user.username) }"\n          />\n          <gl-avatar :size="32" :entity-name="user.username" />\n          <div>\n            <p class="gl-m-0">{{ user.name }}</p>\n            <p class="gl-m-0">@{{ user.username }}</p>\n          </div>\n        </div>\n      </gl-filtered-search-suggestion>\n    </template>\n    </gl-filtered-search-token>\n  '};return{components,data:()=>({tokens:[{type:"assignee",icon:"user",title:"Assignee",token:MultiUserToken,operators:[{value:"=",description:"is",default:"true"},{value:"!=",description:"is not one of"},{value:"||",description:"is one of"}],multiSelect:!0}],value:[{type:"assignee",value:{data:["alpha","beta"],operator:"="}}]}),template:'\n      <gl-filtered-search v-model="value" :available-tokens="tokens" />\n    '}};let filtered_search_stories={title:"base/filtered-search",decorators:[(0,container.F)({height:"250px"})],component:filtered_search.default,subcomponents:{GlFilteredSearchSuggestion:filtered_search_suggestion.default,GlFilteredSearchSuggestionList:filtered_search_suggestion_list.default,GlFilteredSearchTerm:filtered_search_term.default,GlFilteredSearchTokenSegment:filtered_search_token_segment.default,GlFilteredSearchToken:filtered_search_token.default},parameters:{docs:{description:{component:"The filtered search component is responsible for managing search with possible filters.\n\n## Usage\n\nEach filter option (named token) requires a separate Vue component. `GlFilteredSearchToken` is an\nexample of such a token.\n\nPrepare array of available token configurations with the following fields:\n\n- `type`: unique identifier of token type\n- `title`: human-readable title of the token\n- `icon`: token icon\n- `token`: (optional) the token Vue component to use (e.g. `AuthorToken`)\n- `dataType`: (optional) identifier of type (for example \"user\") for this filter. Tokens\n  of the same type could be switched without losing their values\n- `unique`: (optional) indicate this token could appear only once in the filter\n- `disabled`: (optional) indicate this token should be hidden from the dropdown\n- `operators`: (optional) an array of selectable operators.\n  Each array item is an object that must contain `value` and `description`, and optionally `default`\n  (e.g. `{ value: '=', description: 'is', default: 'true' }`)\n- `multiSelect`: (optional) when `true`, the suggestions list becomes multi-select instead of single-select.\n  It is discouraged to use this together with `unique`, as `unique` is intended for single-select.\n- `options`: (optional) an array of options which the user can pick after the\n  operator has been selected. The option object can have the following\n  properties defined: `value: string`, `icon: string`, `title: string`,\n  `component: Object` and `default: boolean`. If `component` is provided, it is\n  is used to render the option in the suggestions list.\n- `optionComponent`: (optional) A component used to render the token option\n  itself when adding a new token or replacing an existing one\n- any additional fields required to configure your component\n\nEach token for filtered search is a Vue component with the following props:\n\n- `value`: an object with a `data` property containing the current value, and optionally an\n  `operator` value containing the operator value\n- `active`: indicates if the token is currently active. It's the token's responsibility\n  to render proper control for editing (for example input).\n- `current-value`: current tokens of the filtered search.\n- `index`: current token position in the filtered search.\n- `config`: additional configuration, supplied in filtered search config for this token.\n\nThe token should emit the following events:\n\n- `activate`: when the token requests activation (for example, when being clicked).\n- `deactivate`: when token requests deactivation (for example due to losing blur on input).\n- `destroy`: when token requests self-destruction (for instance for clicking \"X\" sign).\n- `replace`: token requests its replacement with another token.\n- `split`: token requests adding string values after the current token.\n- `complete`: token indicates its editing is completed.\n\n### Improve space handling\n\nSet the `terms-as-tokens` prop to `true` to enable new term rendering and\ninteraction behavior. This makes it easier to input/edit free text tokens, and\nremoves the need for quoting values with spaces and other workarounds.\n\nIn future, this prop will be enabled by default and eventually removed. Opt in\nto this earlier rather than later to ease migration.\n\n## Examples\n\nDefine a list of available tokens:\n\n```js\nconst availableTokens = [\n  { type: 'static', icon: 'label', title: 'static:token', token: staticToken },\n  { type: 'dynamic', icon: 'rocket', title: 'dynamic:~token', token: dynamicToken },\n];\n```\n\nPass the list of tokens to the search component. Optionally, you can use `v-model` to receive\nrealtime updates:\n\n```html\n<gl-filtered-search :available-tokens=\"tokens\" v-model=\"value\" terms-as-tokens />\n```\n"}}},argTypes:{}};Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"() => ({\n  data() {\n    return {\n      tokens,\n      value: [{\n        type: 'author',\n        value: {\n          data: 'beta',\n          operator: '='\n        }\n      }, {\n        type: 'label',\n        value: {\n          data: 'Bug',\n          operator: '='\n        }\n      }, 'raw text']\n    };\n  },\n  components,\n  template: `<gl-filtered-search :available-tokens=\"tokens\" :value=\"value\" />`\n})",...Default.parameters?.docs?.source}}},WithTermsAsTokens.parameters={...WithTermsAsTokens.parameters,docs:{...WithTermsAsTokens.parameters?.docs,source:{originalSource:"() => ({\n  data() {\n    return {\n      tokens,\n      value: [{\n        type: 'author',\n        value: {\n          data: 'beta',\n          operator: '='\n        }\n      }, {\n        type: 'label',\n        value: {\n          data: 'Bug',\n          operator: '='\n        }\n      }, 'raw text']\n    };\n  },\n  components,\n  template: `\n    <gl-filtered-search :available-tokens=\"tokens\" v-model=\"value\" terms-as-tokens />\n  `\n})",...WithTermsAsTokens.parameters?.docs?.source}}},ViewOnly.parameters={...ViewOnly.parameters,docs:{...ViewOnly.parameters?.docs,source:{originalSource:"() => ({\n  data() {\n    return {\n      tokens,\n      value: [{\n        type: 'author',\n        value: {\n          data: 'epsilon',\n          operator: '='\n        }\n      }, 'raw text']\n    };\n  },\n  components,\n  template: `<gl-filtered-search view-only :available-tokens=\"tokens\" :value=\"value\" />`\n})",...ViewOnly.parameters?.docs?.source}}},WithHistoryItems.parameters={...WithHistoryItems.parameters,docs:{...WithHistoryItems.parameters?.docs,source:{originalSource:"() => ({\n  components,\n  data() {\n    return {\n      tokens: [{\n        type: 'demotoken',\n        title: 'Unique',\n        icon: 'document',\n        token: GlFilteredSearchToken,\n        operators: [{\n          value: '=',\n          description: 'is',\n          default: 'true'\n        }],\n        options: [{\n          icon: 'heart',\n          title: 'heart',\n          value: 1\n        }, {\n          icon: 'hook',\n          title: 'hook',\n          value: 2\n        }],\n        unique: true\n      }],\n      value: [],\n      historyItems: [[{\n        type: 'demotoken',\n        value: {\n          operator: '=',\n          data: 1\n        }\n      }, 'item 1'], ['item 2', {\n        type: 'demotoken',\n        value: {\n          operator: '=',\n          data: 2\n        }\n      }]]\n    };\n  },\n  methods: {\n    isString(val) {\n      return typeof val === 'string';\n    }\n  },\n  template: `\n    <div>\n      {{ value }}\n      <gl-filtered-search v-model=\"value\" :available-tokens=\"tokens\" :history-items=\"historyItems\">\n        <template #history-item=\"{ historyItem }\">\n          <template v-for=\"(token, idx) in historyItem\">\n            <span v-if=\"isString(token)\" :key=\"idx\" class=\"gl-px-1\">{{ token }}</span>\n            <span v-else :key=\"idx\" class=\"gl-px-1\">\n              <strong>{{ token.type }}</strong> {{ token.value.operator }}\n              <strong>{{ token.value.data }}</strong>\n            </span>\n          </template>\n        </template>\n      </gl-filtered-search>\n    </div>\n  `\n})",...WithHistoryItems.parameters?.docs?.source}}},WithFriendlyText.parameters={...WithFriendlyText.parameters,docs:{...WithFriendlyText.parameters?.docs,source:{originalSource:"() => ({\n  components,\n  data() {\n    return {\n      tokens: [{\n        type: 'weight',\n        icon: 'weight',\n        title: 'Weight',\n        unique: true,\n        token: GlFilteredSearchToken\n      }, {\n        type: 'confidential',\n        icon: 'eye-slash',\n        title: 'Confidential',\n        unique: true,\n        token: GlFilteredSearchToken,\n        options: [{\n          icon: 'eye-slash',\n          value: 'true',\n          title: 'Yes'\n        }, {\n          icon: 'eye',\n          value: 'false',\n          title: 'No'\n        }]\n      }],\n      value: [{\n        type: 'weight',\n        value: {\n          data: '3',\n          operator: '='\n        }\n      }, {\n        type: 'confidential',\n        value: {\n          data: 'Yes',\n          operator: '!='\n        }\n      }]\n    };\n  },\n  template: `\n    <gl-filtered-search\n      v-model=\"value\"\n      :available-tokens=\"tokens\"\n      :show-friendly-text=\"true\"\n    />\n  `\n})",...WithFriendlyText.parameters?.docs?.source}}},WithMultiSelect.parameters={...WithMultiSelect.parameters,docs:{...WithMultiSelect.parameters?.docs,source:{originalSource:'() => {\n  const MultiUserToken = {\n    __v_skip: true /* temporary workaround for @vue/compat */,\n    props: [\'value\', \'active\', \'config\'],\n    components: {\n      GlFilteredSearchToken,\n      GlFilteredSearchSuggestion,\n      GlLoadingIcon,\n      GlIcon,\n      GlAvatar\n    },\n    inheritAttrs: false,\n    data() {\n      return {\n        users: fakeUsers,\n        selectedUsernames: this.value.data || [],\n        activeUser: null\n      };\n    },\n    computed: {\n      filteredUsers() {\n        let term = this.value.data;\n        if (Array.isArray(this.value.data) && this.value.data.length > 1) {\n          term = last(this.value.data);\n        }\n        return this.users.filter(user => user.username.includes(term));\n      },\n      selectedUsers() {\n        return this.config.multiSelect ? this.users.filter(user => this.selectedUsernames.includes(user.username)) : this.users.filter(user => user.username === this.activeUser);\n      }\n    },\n    methods: {\n      loadView() {\n        this.activeUser = fakeUsers.find(u => u.username === this.value.data);\n      },\n      loadSuggestions() {\n        this.users = fakeUsers;\n      },\n      handleSelect(username) {\n        if (!this.config.multiSelect) {\n          return;\n        }\n        if (this.selectedUsernames.includes(username)) {\n          this.selectedUsernames = this.selectedUsernames.filter(user => user !== username);\n        } else {\n          this.selectedUsernames.push(username);\n        }\n      },\n      isLastUser(index) {\n        return index === this.selectedUsers.length - 1;\n      },\n      key(user, index) {\n        return `${user.id}-${index}`;\n      }\n    },\n    watch: {\n      // eslint-disable-next-line func-names\n      \'value.data\': function () {\n        if (this.active) {\n          this.loadSuggestions();\n        }\n      },\n      active: {\n        immediate: true,\n        handler(newValue) {\n          if (!newValue) {\n            this.loadView();\n          } else {\n            this.loadSuggestions();\n          }\n        }\n      }\n    },\n    template: `\n    <gl-filtered-search-token\n      v-bind="{ ...this.$props, ...this.$attrs }"\n      v-on="$listeners"\n      :multi-select-values="selectedUsernames"\n      @select="handleSelect"\n    >\n    <template #view="{ inputValue }">\n      <template v-for="(user, index) in selectedUsers">\n        <gl-avatar :size="16" :entity-name="user.username" shape="circle" />\n        {{ user.name }}\n        <span v-if="!isLastUser(index)">,&nbsp;</span>\n      </template>\n    </template>\n    <template #suggestions>\n      <gl-filtered-search-suggestion :key="key(user, index)" v-for="(user, index) in filteredUsers" :value="user.username">\n        <div class="gl-display-flex gl-align-items-center">\n          <gl-icon\n            v-if="config.multiSelect"\n            name="check"\n            class="gl-mr-3 gl-text-gray-700"\n            :class="{ \'gl-visibility-hidden\': !selectedUsernames.includes(user.username) }"\n          />\n          <gl-avatar :size="32" :entity-name="user.username" />\n          <div>\n            <p class="gl-m-0">{{ user.name }}</p>\n            <p class="gl-m-0">@{{ user.username }}</p>\n          </div>\n        </div>\n      </gl-filtered-search-suggestion>\n    </template>\n    </gl-filtered-search-token>\n  `\n  };\n  return {\n    components,\n    data() {\n      return {\n        tokens: [{\n          type: \'assignee\',\n          icon: \'user\',\n          title: \'Assignee\',\n          token: MultiUserToken,\n          operators: [{\n            value: \'=\',\n            description: \'is\',\n            default: \'true\'\n          }, {\n            value: \'!=\',\n            description: \'is not one of\'\n          }, {\n            value: \'||\',\n            description: \'is one of\'\n          }],\n          multiSelect: true\n        }],\n        value: [{\n          type: \'assignee\',\n          value: {\n            data: [\'alpha\', \'beta\'],\n            operator: \'=\'\n          }\n        }]\n      };\n    },\n    template: `\n      <gl-filtered-search v-model="value" :available-tokens="tokens" />\n    `\n  };\n}',...WithMultiSelect.parameters?.docs?.source}}}}}]);