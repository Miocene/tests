import uniqueId from 'lodash/uniqueId';
import { toggleLabelPosition } from '../../../utils/constants';
import GlIcon from '../icon/icon';
import GlLoadingIcon from '../loading_icon/loading_icon';
import __vue_normalize__ from 'vue-runtime-helpers/dist/normalize-component.js';

//
let uuid = 0;
var script = {
  name: 'GlToggle',
  components: {
    GlIcon,
    GlLoadingIcon
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    name: {
      type: String,
      required: false,
      default: null
    },
    /**
     * The toggle's state.
     * @model
     */
    value: {
      type: Boolean,
      required: false,
      default: null
    },
    /**
     * Whether the toggle should be disabled.
     */
    disabled: {
      type: Boolean,
      required: false,
      default: false
    },
    /**
     * Whether the toggle is in the loading state.
     */
    isLoading: {
      type: Boolean,
      required: false,
      default: false
    },
    /**
     * The toggle's label.
     */
    label: {
      type: String,
      required: true
    },
    /**
     * The toggle's description.
     */
    description: {
      type: String,
      required: false,
      default: undefined
    },
    /**
     * A help text to be shown below the toggle.
     */
    help: {
      type: String,
      required: false,
      default: undefined
    },
    /**
     * The label's position relative to the toggle. If 'hidden', the toggle will add the .gl-sr-only class so the label is still accessible to screen readers.
     */
    labelPosition: {
      type: String,
      required: false,
      default: 'top',
      validator(position) {
        return Object.values(toggleLabelPosition).includes(position);
      }
    }
  },
  data() {
    return {
      labelId: uniqueId('toggle-label-')
    };
  },
  computed: {
    shouldRenderDescription() {
      // eslint-disable-next-line @gitlab/vue-prefer-dollar-scopedslots
      return Boolean(this.$scopedSlots.description || this.description) && this.isVerticalLayout;
    },
    shouldRenderHelp() {
      // eslint-disable-next-line @gitlab/vue-prefer-dollar-scopedslots
      return Boolean(this.$slots.help || this.help) && this.isVerticalLayout;
    },
    toggleClasses() {
      return [{
        'gl-sr-only': this.labelPosition === 'hidden'
      }, this.shouldRenderDescription ? 'gl-mb-2' : 'gl-mb-3'];
    },
    icon() {
      return this.value ? 'mobile-issue-close' : 'close';
    },
    helpId() {
      return this.shouldRenderHelp ? `toggle-help-${this.uuid}` : undefined;
    },
    isChecked() {
      return this.value ? 'true' : 'false';
    },
    isVerticalLayout() {
      return this.labelPosition === 'top' || this.labelPosition === 'hidden';
    }
  },
  beforeCreate() {
    this.uuid = uuid;
    uuid += 1;
  },
  methods: {
    toggleFeature() {
      if (!this.disabled) {
        /**
         * Emitted when the state changes.
         *
         * @event change
         * @property {boolean} value Whether the toggle is enabled.
         */
        this.$emit('change', !this.value);
      }
    }
  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"gl-toggle-wrapper gl-display-flex gl-mb-0",class:{
    'gl-flex-direction-column': _vm.isVerticalLayout,
    'gl-toggle-label-inline': !_vm.isVerticalLayout,
    'is-disabled': _vm.disabled,
  },attrs:{"data-testid":"toggle-wrapper"}},[_c('span',{staticClass:"gl-toggle-label gl-flex-shrink-0",class:_vm.toggleClasses,attrs:{"id":_vm.labelId,"data-testid":"toggle-label"}},[_vm._t("label",function(){return [_vm._v(_vm._s(_vm.label))]})],2),_vm._v(" "),(_vm.shouldRenderDescription)?_c('span',{staticClass:"gl-description-label gl-mb-3",attrs:{"data-testid":"toggle-description"}},[_vm._t("description",function(){return [_vm._v(_vm._s(_vm.description))]})],2):_vm._e(),_vm._v(" "),(_vm.name)?_c('input',{attrs:{"name":_vm.name,"type":"hidden"},domProps:{"value":_vm.value}}):_vm._e(),_vm._v(" "),_c('button',{staticClass:"gl-flex-shrink-0",class:{
      'gl-toggle': true,
      'is-checked': _vm.value,
      'is-disabled': _vm.disabled,
    },attrs:{"role":"switch","aria-checked":_vm.isChecked,"aria-labelledby":_vm.labelId,"aria-describedby":_vm.helpId,"aria-disabled":_vm.disabled,"type":"button"},on:{"click":function($event){$event.preventDefault();return _vm.toggleFeature.apply(null, arguments)}}},[(_vm.isLoading)?_c('gl-loading-icon',{staticClass:"toggle-loading",attrs:{"color":"light"}}):_c('span',{class:{ 'toggle-icon': true, disabled: _vm.disabled }},[_c('gl-icon',{attrs:{"name":_vm.icon,"size":16}})],1)],1),_vm._v(" "),(_vm.shouldRenderHelp)?_c('span',{staticClass:"gl-help-label",attrs:{"id":_vm.helpId,"data-testid":"toggle-help"}},[_vm._t("help",function(){return [_vm._v(_vm._s(_vm.help))]})],2):_vm._e()])};
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
