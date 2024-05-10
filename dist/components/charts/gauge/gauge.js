import merge from 'lodash/merge';
import uniq from 'lodash/uniq';
import sortBy from 'lodash/sortBy';
import { gaugeNeutralHues, gaugeSafeHues, gaugeWarningHue } from '../../../utils/charts/theme';
import Chart from '../chart/chart';
import __vue_normalize__ from 'vue-runtime-helpers/dist/normalize-component.js';

//
const AXIS_LABEL_FONT_SIZE_PX = 14;
const ARC_RADIUS = '80%';
const DETAIL_FONT_SIZE_PX = 30;
const DETAIL_FONT_FAMILY = 'sans-serif';
const DETAIL_FONT_WEIGHT = 'bold';
const POINTER_LENGTH = '65%';
const POINTER_WIDTH_PX = 5;
const gaugeChartSeries = _ref => {
  let {
    value,
    text,
    min,
    max,
    splitNumber,
    axisColor
  } = _ref;
  return [{
    type: 'gauge',
    detail: {
      show: true,
      formatter: () => {
        const currentValue = Number.isFinite(value) ? value : null;
        return text || (currentValue !== null && currentValue !== void 0 ? currentValue : '--');
      },
      color: `${gaugeNeutralHues[0]}`,
      fontSize: DETAIL_FONT_SIZE_PX,
      fontFamily: DETAIL_FONT_FAMILY,
      fontWeight: DETAIL_FONT_WEIGHT
    },
    axisLabel: {
      show: true,
      fontSize: AXIS_LABEL_FONT_SIZE_PX,
      formatter: theValue => Number.isFinite(theValue) ? theValue : '--',
      color: `${gaugeNeutralHues[1]}`
    },
    axisLine: {
      lineStyle: {
        color: axisColor
      }
    },
    radius: ARC_RADIUS,
    pointer: {
      length: POINTER_LENGTH,
      width: POINTER_WIDTH_PX
    },
    data: [{
      value
    }],
    min,
    max,
    splitNumber
  }];
};
var script = {
  name: 'GlGaugeChart',
  components: {
    Chart
  },
  props: {
    value: {
      type: Number,
      required: true
    },
    min: {
      type: Number,
      required: false,
      default: 0
    },
    max: {
      type: Number,
      required: false,
      default: 100
    },
    thresholds: {
      type: Array,
      required: false,
      default: () => [],
      validator: value => {
        return value !== null && value !== void 0 && value.length ? value.every(item => Number.isFinite(item)) : true;
      }
    },
    text: {
      type: String,
      required: false,
      default: ''
    },
    splitNumber: {
      type: Number,
      required: false,
      default: 10
    },
    option: {
      type: Object,
      required: false,
      default: () => ({})
    }
  },
  computed: {
    options() {
      const mergedOptions = merge({}, {
        series: gaugeChartSeries({
          value: this.value,
          text: this.text,
          min: this.min,
          max: this.max,
          splitNumber: this.splitNumber,
          axisColor: this.axisColor
        })
      }, this.option);
      return mergedOptions;
    },
    validThresholds() {
      const {
        thresholds,
        min,
        max
      } = this;
      if (!(thresholds !== null && thresholds !== void 0 && thresholds.length)) return [];
      const uniqueThresholds = uniq(thresholds);
      const filteredThresholds = uniqueThresholds.filter(threshold => {
        return Number.isFinite(threshold) && threshold > min && threshold < max;
      });
      /**
       * Only the first two thresholds will be used
       */
      const reducedThresholdsList = filteredThresholds.length > 2 ? [filteredThresholds[0], filteredThresholds[1]] : [...filteredThresholds];
      const sortedThresholds = sortBy(reducedThresholdsList);
      return sortedThresholds;
    },
    valueIsInLastThreshold() {
      const {
        validThresholds,
        value
      } = this;
      return validThresholds.length > 0 && value >= validThresholds[validThresholds.length - 1];
    },
    axisColor() {
      const {
        validThresholds,
        max
      } = this;
      let color;
      if (validThresholds.length === 0) {
        color = [[1, gaugeSafeHues[0]]];
      } else if (validThresholds.length === 1) {
        color = [[validThresholds[0] / max, gaugeSafeHues[0]], [1, gaugeWarningHue]];
      } else if (validThresholds.length >= 2) {
        /**
         * If there are more than two ranges set, only the first two will
         * be used
         */
        color = [[validThresholds[0] / max, gaugeSafeHues[0]], [validThresholds[1] / max, gaugeSafeHues[1]], [1, gaugeWarningHue]];
      }
      return color;
    }
  },
  methods: {
    onCreated(chart) {
      this.$emit('created', chart);
    }
  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('chart',_vm._g(_vm._b({attrs:{"options":_vm.options},on:{"created":_vm.onCreated}},'chart',_vm.$attrs,false),_vm.$listeners))};
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
