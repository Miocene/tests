import { BPopover } from 'bootstrap-vue/esm/index.js';
import tooltipMixin from '../../mixins/tooltip_mixin';
import CloseButton from '../../shared_components/close_button/close_button';
import { popoverPlacements } from '../../../utils/constants';
import __vue_normalize__ from 'vue-runtime-helpers/dist/normalize-component.js';

//
const popoverRefName = 'bPopover';
var script = {
  name: 'GlPopover',
  components: {
    BPopover,
    CloseButton
  },
  mixins: [tooltipMixin(popoverRefName)],
  inheritAttrs: false,
  props: {
    cssClasses: {
      type: Array,
      required: false,
      default: () => []
    },
    /**
     * Space-separated triggers for the popover.
     *
     * @values click, hover, focus, manual
     */
    triggers: {
      type: String,
      required: false,
      default: 'hover focus'
    },
    title: {
      type: String,
      required: false,
      default: ''
    },
    showCloseButton: {
      type: Boolean,
      required: false,
      default: false
    },
    placement: {
      type: String,
      required: false,
      default: popoverPlacements.top
    },
    boundaryPadding: {
      type: [Number, String],
      required: false,
      default: 5
    }
  },
  computed: {
    customClass() {
      return ['gl-popover', ...this.cssClasses].join(' ');
    },
    shouldShowTitle() {
      return this.$scopedSlots.title || this.title || this.showCloseButton;
    }
  },
  methods: {
    close(e) {
      this.$refs[popoverRefName].doClose();
      /**
       * Emitted when the close button is clicked (requires showCloseButton to be `true`).
       */
      this.$emit('close-button-clicked', e);
    }
  },
  popoverRefName
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('b-popover',_vm._g(_vm._b({ref:_vm.$options.popoverRefName,attrs:{"custom-class":_vm.customClass,"triggers":_vm.triggers,"title":_vm.title,"placement":_vm.placement,"boundary-padding":_vm.boundaryPadding},scopedSlots:_vm._u([(_vm.shouldShowTitle)?{key:"title",fn:function(){return [_vm._t("title",function(){return [_vm._v("\n      "+_vm._s(_vm.title)+"\n    ")]}),_vm._v(" "),(_vm.showCloseButton)?_c('close-button',{staticClass:"gl-float-right gl-mt-n2 gl-mr-n3",attrs:{"data-testid":"close-button"},on:{"click":_vm.close}}):_vm._e()]},proxy:true}:null],null,true)},'b-popover',_vm.$attrs,false),_vm.$listeners),[_vm._v(" "),_vm._t("default")],2)};
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
