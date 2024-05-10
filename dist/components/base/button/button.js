import { BButton } from 'bootstrap-vue/esm/index.js';
import { buttonCategoryOptions, buttonVariantOptions, buttonSizeOptions } from '../../../utils/constants';
import { logWarning } from '../../../utils/utils';
import { isSlotEmpty } from '../../../utils/is_slot_empty';
import { SafeLinkMixin } from '../../mixins/safe_link_mixin';
import GlIcon from '../icon/icon';
import GlLoadingIcon from '../loading_icon/loading_icon';
import __vue_normalize__ from 'vue-runtime-helpers/dist/normalize-component.js';

//

// const showWave = ref(false)

var script = {
  name: 'GlButton',
  components: {
    BButton,
    GlIcon,
    GlLoadingIcon
  },
  mixins: [SafeLinkMixin],
  data() {
    return {
      isWaveVisible: false
    };
  },
  props: {
    category: {
      type: String,
      required: false,
      default: buttonCategoryOptions.primary,
      validator: value => Object.keys(buttonCategoryOptions).includes(value)
    },
    variant: {
      type: String,
      required: false,
      default: buttonVariantOptions.default,
      validator: value => Object.keys(buttonVariantOptions).includes(value)
    },
    size: {
      type: String,
      required: false,
      default: 'medium',
      validator: value => Object.keys(buttonSizeOptions).includes(value)
    },
    selected: {
      type: Boolean,
      required: false,
      default: false
    },
    icon: {
      type: String,
      required: false,
      default: ''
    },
    label: {
      type: Boolean,
      required: false,
      default: false
    },
    loading: {
      type: Boolean,
      required: false,
      default: false
    },
    buttonTextClasses: {
      type: String,
      required: false,
      default: ''
    },
    block: {
      type: Boolean,
      required: false,
      default: false
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    hasIcon() {
      return this.icon !== '';
    },
    hasIconOnly() {
      return isSlotEmpty(this, 'default') && this.hasIcon;
    },
    isButtonDisabled() {
      return this.disabled || this.loading;
    },
    buttonClasses() {
      const classes = ['gl-button'];
      const nonCategoryVariants = [buttonVariantOptions.dashed, buttonVariantOptions.link, buttonVariantOptions.reset];
      if (!nonCategoryVariants.includes(this.variant) && this.category !== buttonCategoryOptions.primary) {
        classes.push(`btn-${this.variant}-${this.category}`);
      }
      classes.push({
        'btn-icon': this.hasIconOnly,
        'button-ellipsis-horizontal': this.hasIconOnly && this.icon === 'ellipsis_h',
        selected: this.selected
      });
      if (this.label) {
        classes.push('btn', 'btn-label', `btn-${this.buttonSize}`);
      }
      return classes;
    },
    buttonSize() {
      return buttonSizeOptions[this.size];
    },
    displayBlock() {
      return !this.label && this.block;
    }
  },
  methods: {
    showWaveOnClick() {
      this.isWaveVisible = true;
      setTimeout(() => {
        this.isWaveVisible = false;
      }, 500);
    }
  },
  mounted() {
    // eslint-disable-next-line @gitlab/vue-prefer-dollar-scopedslots
    if (!this.$slots.default && !this.$attrs['aria-label'] && !this.$props.label) {
      logWarning('[gl-button]: Accessible name missing. Please add inner text or aria-label.', this.$el);
    }
  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c(_vm.label ? 'span' : 'b-button',_vm._g(_vm._b({directives:[{name:"safe-link",rawName:"v-safe-link:[safeLinkConfig]",arg:_vm.safeLinkConfig}],tag:"component",class:_vm.buttonClasses,attrs:{"block":_vm.displayBlock,"target":_vm.target,"variant":_vm.variant,"size":_vm.buttonSize,"disabled":_vm.isButtonDisabled},on:{"click":_vm.showWaveOnClick}},'component',_vm.$attrs,false),_vm.$listeners),[(_vm.loading)?_c('gl-loading-icon',{staticClass:"gl-button-icon gl-button-loading-indicator",attrs:{"inline":""}}):_vm._e(),_vm._v(" "),(_vm.hasIcon && !(_vm.hasIconOnly && _vm.loading))?_c('gl-icon',{staticClass:"gl-button-icon",attrs:{"name":_vm.icon}}):_vm._e(),_vm._v(" "),_vm._t("emoji"),_vm._v(" "),(!_vm.hasIconOnly)?_c('span',{staticClass:"gl-button-text",class:_vm.buttonTextClasses},[_vm._t("default")],2):_vm._e(),_vm._v(" "),(_vm.isWaveVisible)?_c('span',{staticClass:"gl-button-wave"}):_vm._e()],2)};
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
