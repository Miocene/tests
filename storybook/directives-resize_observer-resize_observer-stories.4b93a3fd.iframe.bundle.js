"use strict";(globalThis.webpackChunk_gitlab_ui=globalThis.webpackChunk_gitlab_ui||[]).push([[7048],{"./src/directives/resize_observer/resize_observer.stories.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,default:()=>resize_observer_stories});var resize_observer=__webpack_require__("./src/directives/resize_observer/resize_observer.js"),Default=(args,_ref)=>{var{argTypes}=_ref;return{props:Object.keys(argTypes),directives:{GlResizeObserver:resize_observer.default},data:()=>({width:0,height:0}),computed:{wrapperStyles:()=>({height:"400px"}),elementStyles(){return{height:this.elementHeight,width:this.elementWidth}}},methods:{handleResize(_ref2){var{contentRect:{width,height}}=_ref2;this.width=Math.round(width),this.height=Math.round(height)}},template:'\n    <div\n      :style="wrapperStyles"\n      class="d-flex justify-content-center align-items-center">\n      <div\n        v-gl-resize-observer="handleResize"\n        :style="elementStyles"\n        class="d-flex position-relative justify-content-center align-items-center bg-light text-dark">\n          <span class="d-inline-block p-2">\n            I am {{ width }}px wide and {{ height }}px high.\n          </span>\n      </div>\n    </div>\n  '}};Default.args=function(){var{elementWidth="100%",elementHeight="100%"}=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return{elementWidth,elementHeight}}();var makeControl=()=>({options:["100%","75%","50%"],control:"select"});let resize_observer_stories={title:"directives/resize-observer-directive",component:resize_observer.default,tags:["skip-visual-test"],parameters:{docs:{description:{component:'This directive can be used to get notified whenever a given element\'s size (width or height) changes\nand to retrieve the updated dimensions.\n\nUnder the hood, it leverages the [Resize Observer API](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver).\nIf you use GitLab UI in an older browser which doesn\'t support the Resize Observer API,\nyou can use a [polyfill](https://github.com/que-etc/resize-observer-polyfill).\n\nThe directive accepts a callback as a value and passes on the received\n[contentRect](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserverEntry/contentRect)\nand the target element whenever a resize event gets triggered.\n\n```html\n<script>\nexport default {\n  data() {\n    return {\n      width: 0,\n      height: 0,\n    };\n  },\n  methods: {\n    handleResize({ contentRect: { width, height } }) {\n      this.width = width;\n      this.height = height;\n    },\n  },\n};\n</script>\n<template>\n  <div v-gl-resize-observer-directive="handleResize">\n    <p>{{ width }} x {{ height }}</p>\n  </div>\n</template>\n```\n\nThe observer can be toggled on or off by passing a boolean argument to the directive:\n\n```html\n<script>\nexport default {\n  data() {\n    return {\n      shouldObserve: true,\n    };\n  },\n  methods: {\n    handleResize() {},\n  },\n};\n</script>\n<template>\n  <div v-gl-resize-observer-directive[shouldObserve]="handleResize"></div>\n</template>\n```\n'}}},argTypes:{elementWidth:makeControl(),elementHeight:makeControl()}};Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:'(args, {\n  argTypes\n}) => ({\n  props: Object.keys(argTypes),\n  directives: {\n    GlResizeObserver\n  },\n  data() {\n    return {\n      width: 0,\n      height: 0\n    };\n  },\n  computed: {\n    wrapperStyles() {\n      return {\n        height: \'400px\'\n      };\n    },\n    elementStyles() {\n      return {\n        height: this.elementHeight,\n        width: this.elementWidth\n      };\n    }\n  },\n  methods: {\n    handleResize({\n      contentRect: {\n        width,\n        height\n      }\n    }) {\n      this.width = Math.round(width);\n      this.height = Math.round(height);\n    }\n  },\n  template: `\n    <div\n      :style="wrapperStyles"\n      class="d-flex justify-content-center align-items-center">\n      <div\n        v-gl-resize-observer="handleResize"\n        :style="elementStyles"\n        class="d-flex position-relative justify-content-center align-items-center bg-light text-dark">\n          <span class="d-inline-block p-2">\n            I am {{ width }}px wide and {{ height }}px high.\n          </span>\n      </div>\n    </div>\n  `\n})',...Default.parameters?.docs?.source}}}}}]);