import __vue_normalize__ from 'vue-runtime-helpers/dist/normalize-component.js';

const makePathRect = (startX, startY, width, height) => `M${startX},${startY}H${startX + width}V${startY + height}H${startX}Z`;
var script = {
  name: 'GlChartSeriesLabel',
  props: {
    color: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: false,
      default: 'solid'
    }
  },
  data() {
    return {
      labelLineHeight: 0
    };
  },
  computed: {
    pathContent() {
      const width = this.$options.svgWidth;
      const height = this.$options.svgHeight;
      if (this.type === 'dashed') {
        const dashWidth = Math.ceil(width / 3);
        const firstDash = makePathRect(0, 0, dashWidth, height);
        const secondDash = makePathRect(width - dashWidth, 0, dashWidth, height);
        return `${firstDash}${secondDash}`;
      }
      return makePathRect(0, 0, width, height);
    },
    svgStyles() {
      return {
        fill: this.color,
        transform: `translateY(${this.formatPixelDimension(this.svgYTranslationValue)})`,
        width: 'auto'
      };
    },
    svgYTranslationValue() {
      const value = this.labelLineHeight / 2 - this.$options.svgHeight / 2;
      return Math.round(value) || 0;
    }
  },
  mounted() {
    if (getComputedStyle && this.$refs.label) {
      const computedStyle = getComputedStyle(this.$refs.label);
      const lineHeight = computedStyle['line-height'].match(/(\d+)px/);
      if (lineHeight !== null) {
        this.labelLineHeight = parseFloat(lineHeight[1]);
      }
    }
  },
  methods: {
    formatPixelDimension(dimension) {
      return `${dimension}px`;
    }
  },
  svgWidth: 16,
  svgHeight: 4
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"gl-series-label-container"},[(_vm.color.length)?_c('div',{staticClass:"gl-series-label-color"},[_c('svg',{style:(_vm.svgStyles),attrs:{"width":_vm.formatPixelDimension(_vm.$options.svgWidth),"height":_vm.formatPixelDimension(_vm.$options.svgHeight)}},[_c('path',{attrs:{"d":_vm.pathContent}})])]):_vm._e(),_vm._v(" "),_c('div',{ref:"label",staticClass:"gl-series-label-text"},[_vm._t("default")],2)])};
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
