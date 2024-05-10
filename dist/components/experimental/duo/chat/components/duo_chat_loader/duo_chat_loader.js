import GlSprintf from '../../../../../utilities/sprintf/sprintf';
import { LOADING_TRANSITION_DURATION } from '../../constants';
import __vue_normalize__ from 'vue-runtime-helpers/dist/normalize-component.js';

const i18n = {
  LOADER_LOADING_MESSAGE: '%{tool} is %{transition} an answer',
  LOADER_LOADING_TRANSITIONS: ['finding', 'working on', 'generating', 'producing'],
  GITLAB_DUO: 'GitLab Duo'
};
var script = {
  name: 'GlDuoChatLoader',
  components: {
    GlSprintf
  },
  i18n,
  props: {
    /**
     * The message containing the name of the current AI tool working on the answer.
     */
    toolName: {
      type: String,
      required: false,
      default: i18n.GITLAB_DUO
    }
  },
  data() {
    return {
      loadingSequence: 0,
      timeout: null
    };
  },
  beforeDestroy() {
    clearTimeout(this.timeout);
  },
  mounted() {
    this.computeTransitionWidth();
    this.enter();
  },
  methods: {
    computeTransitionWidth() {
      const container = this.$refs.transition;
      const active = this.$refs.currentTransition[0]; // There's only one `currentTransition` ref at a time, but refs in v-for loops are always Arrays
      const {
        width,
        height
      } = active.getBoundingClientRect();
      container.$el.style.width = `${width}px`;
      container.$el.style.height = `${height}px`;
    },
    enter() {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.loadingSequence = (this.loadingSequence + 1) % this.$options.i18n.LOADER_LOADING_TRANSITIONS.length;
        this.enter();
      }, LOADING_TRANSITION_DURATION);
    },
    isCurrentTransition(index) {
      return index === this.loadingSequence;
    }
  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"duo-chat-loader gl-display-flex gl-align-items-center"},[_vm._m(0),_vm._v(" "),_c('div',[_c('gl-sprintf',{attrs:{"message":_vm.$options.i18n.LOADER_LOADING_MESSAGE},scopedSlots:_vm._u([{key:"tool",fn:function(){return [_c('strong',{attrs:{"data-testid":"tool"}},[_vm._v(_vm._s(_vm.toolName))])]},proxy:true},{key:"transition",fn:function(){return [_c('transition-group',{ref:"transition",staticClass:"transition gl-display-inline-block gl-relative gl-vertical-align-bottom",attrs:{"name":"text"},on:{"after-leave":_vm.computeTransitionWidth}},_vm._l((_vm.$options.i18n.LOADER_LOADING_TRANSITIONS),function(message,index){return _c('span',{directives:[{name:"show",rawName:"v-show",value:(_vm.isCurrentTransition(index)),expression:"isCurrentTransition(index)"}],key:message,ref:_vm.isCurrentTransition(index) ? 'currentTransition' : '',refInFor:true,staticClass:"gl-white-space-nowrap gl-absolute gl-bottom-0 gl-left-0",attrs:{"data-testid":_vm.isCurrentTransition(index) ? 'current-transition' : ''}},[_vm._v(_vm._s(message))])}),0)]},proxy:true}])})],1)])};
var __vue_staticRenderFns__ = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"gl-display-flex gl-mr-3"},[_c('div',{staticClass:"duo-chat-loader__dot duo-chat-loader__dot--1"}),_vm._v(" "),_c('div',{staticClass:"duo-chat-loader__dot duo-chat-loader__dot--2"}),_vm._v(" "),_c('div',{staticClass:"duo-chat-loader__dot duo-chat-loader__dot--3"})])}];

  /* style */
  const __vue_inject_styles__ = undefined;
  /* scoped */
  const __vue_scope_id__ = undefined;
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__ = __vue_normalize__(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    undefined,
    undefined,
    undefined
  );

export default __vue_component__;
export { i18n };
