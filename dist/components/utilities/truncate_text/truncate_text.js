import { GlResizeObserverDirective } from '../../../directives/resize_observer/resize_observer';
import GlButton from '../../base/button/button';
import { STATES } from './constants';
import __vue_normalize__ from 'vue-runtime-helpers/dist/normalize-component.js';

var script = {
  name: 'GlTruncateText',
  components: {
    GlButton
  },
  directives: {
    GlResizeObserver: GlResizeObserverDirective
  },
  props: {
    /**
     * The text for the 'Show more' button
     */
    showMoreText: {
      type: String,
      required: false,
      default: 'Show more'
    },
    /**
     * The text for the 'Show less' button
     */
    showLessText: {
      type: String,
      required: false,
      default: 'Show less'
    },
    /**
     * The number of lines that are initially visible on larger screens
     */
    lines: {
      type: Number,
      required: false,
      default: 3
    },
    /**
     * The number of lines that are initially visible on smaller screens
     */
    mobileLines: {
      type: Number,
      required: false,
      default: 10
    },
    /**
     * Props that are passed to the toggle button
     */
    toggleButtonProps: {
      type: Object,
      required: false,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      state: STATES.INITIAL
    };
  },
  computed: {
    showTruncationToggle() {
      return this.isTruncated || this.isExtended;
    },
    truncationToggleText() {
      return this.isTruncated ? this.showMoreText : this.showLessText;
    },
    cssVariables() {
      return {
        '--lines': this.lines,
        '--mobile-lines': this.mobileLines
      };
    },
    truncationClasses() {
      return this.isExtended ? null : 'gl-truncate-text gl-overflow-hidden';
    },
    ariaExpanded() {
      return (!this.isTruncated).toString();
    },
    isTruncated() {
      return this.state === STATES.TRUNCATED;
    },
    isExtended() {
      return this.state === STATES.EXTENDED;
    }
  },
  methods: {
    onResize(_ref) {
      let {
        target
      } = _ref;
      if (target.scrollHeight > target.offsetHeight) {
        this.state = STATES.TRUNCATED;
      } else if (this.isTruncated) {
        this.state = STATES.INITIAL;
      }
    },
    toggleTruncation() {
      if (this.isTruncated) {
        this.state = STATES.EXTENDED;
      } else if (this.isExtended) {
        this.state = STATES.TRUNCATED;
      }
    }
  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('section',[_c('article',{directives:[{name:"gl-resize-observer",rawName:"v-gl-resize-observer",value:(_vm.onResize),expression:"onResize"}],class:_vm.truncationClasses,style:(_vm.cssVariables),attrs:{"aria-expanded":_vm.ariaExpanded}},[_vm._t("default")],2),_vm._v(" "),(_vm.showTruncationToggle)?_c('gl-button',_vm._b({attrs:{"variant":"link"},on:{"click":_vm.toggleTruncation}},'gl-button',_vm.toggleButtonProps,false),[_vm._v(_vm._s(_vm.truncationToggleText))]):_vm._e()],1)};
var __vue_staticRenderFns__ = [];

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
