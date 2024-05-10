import { badgeVariantOptions, variantCssColorMap } from '../../../utils/constants';
import GlBadge from '../../base/badge/badge';
import GlIcon from '../../base/icon/icon';
import GlAnimatedNumber from '../../utilities/animated_number/animated_number';
import { formatNumberToLocale } from '../../../utils/number_utils';
import __vue_normalize__ from 'vue-runtime-helpers/dist/normalize-component.js';

var script = {
  name: 'GlSingleStat',
  components: {
    GlIcon,
    GlBadge,
    GlAnimatedNumber
  },
  props: {
    title: {
      type: String,
      required: true
    },
    value: {
      type: [String, Number],
      required: true
    },
    unit: {
      type: String,
      required: false,
      default: null
    },
    /**
     * Requires the `value` property to be a valid Number or convertible to one
     */
    useDelimiters: {
      type: Boolean,
      required: false,
      default: false
    },
    variant: {
      type: String,
      required: false,
      default: badgeVariantOptions.muted,
      validator: variant => Object.values(badgeVariantOptions).includes(variant)
    },
    titleIcon: {
      type: String,
      required: false,
      default: null
    },
    /**
     * Additional CSS class(es) to be applied to the title icon.
     */
    titleIconClass: {
      type: [Array, Object, String],
      required: false,
      default: ''
    },
    metaIcon: {
      type: String,
      required: false,
      default: null
    },
    metaText: {
      type: String,
      required: false,
      default: null
    },
    shouldAnimate: {
      type: Boolean,
      required: false,
      default: false
    },
    animationDecimalPlaces: {
      type: Number,
      required: false,
      default: 0
    }
  },
  data() {
    return {
      hideUnits: false
    };
  },
  computed: {
    showMetaIcon() {
      return Boolean(this.metaIcon && !this.metaText);
    },
    showBadge() {
      return Boolean(this.metaText);
    },
    showTitleIcon() {
      return Boolean(this.titleIcon);
    },
    textColor() {
      return variantCssColorMap[this.variant];
    },
    canAnimate() {
      return this.shouldAnimate && !Number.isNaN(Number(this.value));
    },
    statValue() {
      if (this.useDelimiters) {
        var _this$value$toString$;
        const minimumFractionDigits = ((_this$value$toString$ = this.value.toString().split('.')[1]) === null || _this$value$toString$ === void 0 ? void 0 : _this$value$toString$.length) || 0;
        return formatNumberToLocale(this.value, {
          minimumFractionDigits
        });
      }
      return this.value;
    }
  },
  methods: {
    setHideUnits(flag) {
      this.hideUnits = flag;
    }
  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',_vm._g(_vm._b({staticClass:"gl-single-stat gl-display-flex gl-flex-direction-column gl-p-2"},'div',_vm.$attrs,false),_vm.$listeners),[_c('div',{staticClass:"gl-display-flex gl-align-items-center gl-text-gray-700 gl-mb-2"},[(_vm.showTitleIcon)?_c('gl-icon',{class:['gl-mr-2', _vm.titleIconClass],attrs:{"name":_vm.titleIcon,"data-testid":"title-icon"}}):_vm._e(),_vm._v(" "),_c('span',{staticClass:"gl-font-base gl-font-weight-normal",attrs:{"data-testid":"title-text"}},[_vm._v(_vm._s(_vm.title))])],1),_vm._v(" "),_c('div',{staticClass:"gl-single-stat-content gl-display-flex gl-align-items-baseline gl-font-weight-bold gl-text-gray-900"},[_c('span',{staticClass:"gl-single-stat-number gl-line-height-1",class:{ 'gl-mr-2': !_vm.unit },attrs:{"data-testid":"displayValue"}},[(_vm.canAnimate)?_c('gl-animated-number',{attrs:{"number":Number(_vm.value),"decimal-places":_vm.animationDecimalPlaces,"use-delimiters":_vm.useDelimiters},on:{"animating":function($event){return _vm.setHideUnits(true)},"animated":function($event){return _vm.setHideUnits(false)}}}):_c('span',{attrs:{"data-testid":"non-animated-value"}},[_vm._v(_vm._s(_vm.statValue))])],1),_vm._v(" "),(_vm.unit)?_c('span',{staticClass:"gl-font-sm gl-mx-2 gl-transition-medium gl-opacity-10",class:{ 'gl-opacity-0!': _vm.hideUnits },attrs:{"data-testid":"unit"}},[_vm._v(_vm._s(_vm.unit))]):_vm._e(),_vm._v(" "),(_vm.showMetaIcon)?_c('gl-icon',{class:_vm.textColor,attrs:{"name":_vm.metaIcon,"data-testid":"meta-icon"}}):_vm._e(),_vm._v(" "),(_vm.showBadge)?_c('gl-badge',{attrs:{"variant":_vm.variant,"icon":_vm.metaIcon,"data-testid":"meta-badge"}},[_vm._v(_vm._s(_vm.metaText))]):_vm._e()],1)])};
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
