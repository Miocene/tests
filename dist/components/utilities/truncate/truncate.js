import { GlTooltipDirective } from '../../../directives/tooltip';
import { GlResizeObserverDirective } from '../../../directives/resize_observer/resize_observer';
import { POSITION } from './constants';
import __vue_normalize__ from 'vue-runtime-helpers/dist/normalize-component.js';

//
var script = {
  name: 'GlTruncate',
  POSITION,
  directives: {
    GlTooltip: GlTooltipDirective,
    GlResizeObserver: GlResizeObserverDirective
  },
  props: {
    /**
     * Text to be ellipsized
     */
    text: {
      type: String,
      required: true
    },
    /**
     * Ellipsis position
     */
    position: {
      type: String,
      required: false,
      default: POSITION.END,
      validator: value => Object.values(POSITION).includes(value)
    },
    /**
     * Display the full text in a tooltip only if it is being truncated
     */
    withTooltip: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      isTruncated: false
    };
  },
  computed: {
    middleIndex() {
      return Math.floor(this.text.length / 2);
    },
    first() {
      return this.text.slice(0, this.middleIndex);
    },
    last() {
      return this.text.slice(this.middleIndex);
    },
    isTooltipDisabled() {
      return !this.withTooltip || !this.isTruncated;
    }
  },
  watch: {
    withTooltip(withTooltip) {
      if (withTooltip) {
        this.checkTruncationState();
      }
    }
  },
  methods: {
    checkTruncationState() {
      if (this.withTooltip) {
        this.isTruncated = this.$refs.text.scrollWidth > this.$refs.text.offsetWidth;
      }
    }
  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.position === _vm.$options.POSITION.START)?_c('span',{directives:[{name:"gl-tooltip",rawName:"v-gl-tooltip",value:({ disabled: _vm.isTooltipDisabled }),expression:"{ disabled: isTooltipDisabled }"},{name:"gl-resize-observer",rawName:"v-gl-resize-observer:[withTooltip]",value:(_vm.checkTruncationState),expression:"checkTruncationState",arg:_vm.withTooltip}],staticClass:"gl-truncate",attrs:{"title":_vm.text}},[_c('span',{ref:"text",staticClass:"gl-truncate-start gl-text-overflow-ellipsis!"},[_vm._v("‎"+_vm._s(_vm.text)+"‎")])]):(_vm.position === _vm.$options.POSITION.MIDDLE)?_c('span',{directives:[{name:"gl-tooltip",rawName:"v-gl-tooltip",value:({ disabled: _vm.isTooltipDisabled }),expression:"{ disabled: isTooltipDisabled }"},{name:"gl-resize-observer",rawName:"v-gl-resize-observer:[withTooltip]",value:(_vm.checkTruncationState),expression:"checkTruncationState",arg:_vm.withTooltip}],staticClass:"gl-truncate",attrs:{"title":_vm.text}},[_c('span',{ref:"text",staticClass:"gl-truncate-end"},[_vm._v(_vm._s(_vm.first))]),_c('span',{staticClass:"gl-truncate-start"},[_vm._v("‎"+_vm._s(_vm.last)+"‎")])]):_c('span',{directives:[{name:"gl-tooltip",rawName:"v-gl-tooltip",value:({ disabled: _vm.isTooltipDisabled }),expression:"{ disabled: isTooltipDisabled }"},{name:"gl-resize-observer",rawName:"v-gl-resize-observer:[withTooltip]",value:(_vm.checkTruncationState),expression:"checkTruncationState",arg:_vm.withTooltip}],staticClass:"gl-truncate",attrs:{"data-testid":"truncate-end-container","title":_vm.text}},[_c('span',{ref:"text",staticClass:"gl-truncate-end"},[_vm._v(_vm._s(_vm.text))])])};
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
