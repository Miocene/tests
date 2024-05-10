"use strict";(globalThis.webpackChunk_gitlab_ui=globalThis.webpackChunk_gitlab_ui||[]).push([[9728],{"./src/utils/stories_utils.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{W:()=>disableControls});var disableControls=function(){var controls=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];return Object.fromEntries(controls.map(control=>[control,{control:{disable:!0}}]))}},"./src/utils/story_decorators/container.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{F:()=>makeContainer});var makeContainer=function(style){var tag=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"div";return Story=>({render:h=>h(tag,{style},[h(Story())])})}},"./src/components/base/daterange_picker/daterange_picker.stories.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,WithDatesSelectedAndTooltip:()=>WithDatesSelectedAndTooltip,default:()=>daterange_picker_stories});var stories_utils=__webpack_require__("./src/utils/stories_utils.js"),container=__webpack_require__("./src/utils/story_decorators/container.js"),daterange_picker=__webpack_require__("./src/components/base/daterange_picker/daterange_picker.vue");function ownKeys(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter(function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable})),t.push.apply(t,o)}return t}function _objectSpread(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?ownKeys(Object(t),!0).forEach(function(r){_defineProperty(e,r,t[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):ownKeys(Object(t)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))})}return e}function _defineProperty(obj,key,value){return(key=_toPropertyKey(key))in obj?Object.defineProperty(obj,key,{value:value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}function _toPropertyKey(t){var i=_toPrimitive(t,"string");return"symbol"==typeof i?i:i+""}function _toPrimitive(t,r){if("object"!=typeof t||!t)return t;var e=t[Symbol.toPrimitive];if(void 0!==e){var i=e.call(t,r||"default");if("object"!=typeof i)return i;throw TypeError("@@toPrimitive must return a primitive value.")}return("string"===r?String:Number)(t)}var defaultStartDateVal=new Date(2021,9,4),defaultEndDateVal=new Date(2021,9,24),defaultMinDateVal=new Date(2021,9,1),defaultMaxDateVal=new Date(2021,11,30),defaultValue=prop=>daterange_picker.default.props[prop].default,generateProps=function(){var{fromLabel=defaultValue("fromLabel"),toLabel=defaultValue("toLabel"),defaultMinDate=defaultMinDateVal,defaultMaxDate=defaultMaxDateVal,defaultStartDate=defaultStartDateVal,defaultEndDate=defaultEndDateVal,maxDateRange=0,sameDaySelection=!1,tooltip="",startPickerClass,endPickerClass,labelClass,theme=defaultValue("theme"),startOpened=!1}=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return{defaultMinDate:new Date(defaultMinDate),defaultMaxDate:new Date(defaultMaxDate),defaultStartDate:new Date(defaultStartDate),defaultEndDate:new Date(defaultEndDate),maxDateRange,sameDaySelection,tooltip,fromLabel,toLabel,startPickerClass,endPickerClass,labelClass,theme,startOpened}},Template=(template,props)=>({components:{GlDaterangePicker:daterange_picker.default},props:Object.keys(props),data(){return{defaultMinDateVal:this.defaultMinDate,defaultMaxDateVal:this.defaultMaxDate,defaultStartDateVal:this.defaultStartDate,defaultEndDateVal:this.defaultEndDate}},watch:{defaultMinDate(val){this.defaultMinDateVal=new Date(val)},defaultMaxDate(val){this.defaultMaxDateVal=new Date(val)}},template}),Default=Template.bind({},'\n        <gl-daterange-picker\n          class="gl-display-flex"\n          :default-min-date="defaultMinDateVal"\n          :default-max-date="defaultMaxDateVal"\n          :default-start-date="defaultStartDate"\n          :default-end-date="defaultEndDate"\n          :max-date-range="maxDateRange"\n          :same-day-selection="sameDaySelection"\n          :tooltip="tooltip"\n          :from-label="fromLabel"\n          :to-label="toLabel"\n          :start-picker-class="startPickerClass"\n          :end-picker-class="endPickerClass"\n          :label-class="labelClass"\n          :theme="theme"\n          :start-opened="startOpened"\n        /> ');Default.args=generateProps();var WithDatesSelectedAndTooltip=Template.bind({},'<gl-daterange-picker\n                                                class="gl-display-flex"\n                                                :default-min-date="defaultMinDateVal"\n                                                :default-max-date="defaultMaxDateVal"\n                                                :default-start-date="defaultStartDate"\n                                                :default-end-date="defaultEndDate"\n                                                :max-date-range="maxDateRange"\n                                                :same-day-selection="sameDaySelection"\n                                                :tooltip="tooltip"\n                                                :from-label="fromLabel"\n                                                :to-label="toLabel"\n                                                :start-picker-class="startPickerClass"\n                                                :end-picker-class="endPickerClass"\n                                                :label-class="labelClass"\n                                                :start-opened="startOpened"\n                                                :theme="theme">\n                                                    <template #default="{ daysSelected }">\n                                                      <span v-if="daysSelected === 1">{{ daysSelected }} day selected</span>\n                                                      <span v-else-if="daysSelected > -1">{{ daysSelected }} days selected</span>\n                                                      <span v-else>No days selected</span>\n                                                    </template>\n                                              </gl-daterange-picker>');WithDatesSelectedAndTooltip.args=generateProps({tooltip:"Date range limited to 31 days",maxDateRange:31});let daterange_picker_stories={title:"base/daterange-picker",component:daterange_picker.default,decorators:[(0,container.F)({height:"300px"})],parameters:{docs:{description:{component:'## Usage\n\nDaterange picker allows users to choose a date range by manually typing the start/end date\ninto the input fields or by using a calendar-like dropdown.\n\nA `maxDateRange` can be specified in order to limit the maximum number of days the component\nwill allow to be selected i.e. if the start date is `2020-08-01` and `maxDateRange` is set to `10`,\nthe highest selectable end date would be `2020-08-11`. This value will be offset by `1` if\n`sameDaySelection` is set to `true`. A `defaultMaxDate` will need to be\nprovided when making use of the `maxDateRange`.\n\nBy default, the component does not allow selection of the same start and end date.\nIn a scenario where this is required, the `sameDaySelection` property can be configured.\nThis is specifically useful when a single day selection is being defined as `2020-01-01 00:00:00`\nto `2020-01-01 23:59:59` instead of `2020-01-01 00:00:00` to `2020-01-02 00:00:00`.\n\nWhen `maxDateRange` is set it\'s a good idea to set the `tooltip` specifying the date range limit\nand to indicate the number of days currently selected using the default slot. For example:\n\n```vue\n<template #default="{ daysSelected }">\n  <span v-if="daysSelected > -1">{{ daysSelected }} days selected</span>\n  <span v-else>No days selected</span>\n</template>\n```\n\nThe `daysSelected` slot prop is the effective date range, thus the value is increased by one when\n`sameDaySelection` is set to `true`. When no date range has been selected the value is `-1`.\n\n### Note\n\nIf specifying a maxDateRange, it is good practice to include a date range indicator and toolip.\n'}}},argTypes:_objectSpread(_objectSpread({},(0,stories_utils.W)(["i18n","startPickerTarget","startPickerContainer","endPickerTarget","endPickerContainer","defaultStartDate","defaultEndDate"])),{},{defaultMinDate:{control:"date"},defaultMaxDate:{control:"date"}})};Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"Template.bind({}, defaultTemplate)",...Default.parameters?.docs?.source}}},WithDatesSelectedAndTooltip.parameters={...WithDatesSelectedAndTooltip.parameters,docs:{...WithDatesSelectedAndTooltip.parameters?.docs,source:{originalSource:"Template.bind({}, withDatesSelectedAndTooltipTemplate)",...WithDatesSelectedAndTooltip.parameters?.docs?.source}}}}}]);