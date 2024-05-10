import merge from 'lodash/merge';
import { yAxis, generateBarSeries, generateLineSeries, defaultChartOptions, gridWithSecondaryYAxis, grid, dataZoomAdjustments, mergeSeriesToOptions } from '../../../utils/charts/config';
import { CHART_TYPE_LINE, HEIGHT_AUTO_CLASSES } from '../../../utils/charts/constants';
import { colorFromDefaultPalette } from '../../../utils/charts/theme';
import { columnOptions } from '../../../utils/constants';
import Chart from '../chart/chart';
import ChartTooltip from '../tooltip/tooltip';
import __vue_normalize__ from 'vue-runtime-helpers/dist/normalize-component.js';

//
const yAxisDefaults = {
  ...yAxis,
  nameLocation: 'center',
  axisTick: {
    show: false
  }
};
var script = {
  name: 'GlColumnChart',
  components: {
    Chart,
    ChartTooltip
  },
  inheritAttrs: false,
  props: {
    bars: {
      type: Array,
      required: false,
      default: () => []
    },
    lines: {
      type: Array,
      required: false,
      default: () => []
    },
    secondaryData: {
      type: Array,
      required: false,
      default: () => []
    },
    option: {
      type: Object,
      required: false,
      default: () => ({})
    },
    yAxisTitle: {
      type: String,
      required: true
    },
    secondaryDataTitle: {
      type: String,
      required: false,
      default: ''
    },
    xAxisTitle: {
      type: String,
      required: true
    },
    xAxisType: {
      type: String,
      required: true,
      validator: value => ['value', 'category', 'time', 'log'].indexOf(value) !== -1
    },
    /**
     * Sets the chart's height in pixels. Set to `"auto"` to use the height of the container.
     */
    height: {
      type: [Number, String],
      required: false,
      default: null
    }
  },
  data() {
    return {
      chart: null
    };
  },
  computed: {
    hasSecondaryAxis() {
      return Boolean(this.secondaryData.length);
    },
    barSeries() {
      return this.bars.map((_ref, index) => {
        let {
          name,
          data,
          stack
        } = _ref;
        const color = colorFromDefaultPalette(index);
        return generateBarSeries({
          name,
          data,
          stack,
          color
        });
      });
    },
    lineSeries() {
      const offset = this.bars.length;
      return this.lines.map((_ref2, index) => {
        let {
          name,
          data
        } = _ref2;
        const color = colorFromDefaultPalette(offset + index);
        return generateLineSeries({
          name,
          data,
          color
        });
      });
    },
    secondarySeries() {
      const offset = this.bars.length + this.lines.length;
      return this.secondaryData.map((_ref3, index) => {
        let {
          name,
          data,
          type,
          stack = columnOptions.tiled
        } = _ref3;
        const color = colorFromDefaultPalette(offset + index);
        return type === CHART_TYPE_LINE ? generateLineSeries({
          color,
          name,
          data,
          yAxisIndex: 1
        }) : generateBarSeries({
          color,
          name,
          data,
          yAxisIndex: 1,
          stack
        });
      });
    },
    series() {
      return [...this.barSeries, ...this.lineSeries, ...this.secondarySeries];
    },
    options() {
      const yAxisPrimary = {
        ...yAxisDefaults,
        name: this.yAxisTitle
      };
      const mergedOptions = merge({}, defaultChartOptions, {
        grid: this.hasSecondaryAxis ? gridWithSecondaryYAxis : grid,
        xAxis: {
          boundaryGap: true,
          axisLabel: {
            margin: 20,
            verticalAlign: 'bottom'
          },
          axisLine: {
            show: false
          },
          axisPointer: {
            type: 'none'
          },
          name: this.xAxisTitle,
          type: this.xAxisType
        },
        yAxis: this.hasSecondaryAxis ? [yAxisPrimary, {
          ...yAxisDefaults,
          name: this.secondaryDataTitle,
          show: this.hasSecondaryAxis
        }] : yAxisPrimary,
        legend: {
          show: false
        }
      }, this.option, dataZoomAdjustments(this.option.dataZoom));
      // All chart options can be merged but series
      // needs to be handled specially
      return mergeSeriesToOptions(mergedOptions, this.series);
    },
    autoHeight() {
      return this.height === 'auto';
    }
  },
  methods: {
    onCreated(chart) {
      this.chart = chart;
      this.$emit('created', chart);
    }
  },
  HEIGHT_AUTO_CLASSES
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {
var _obj;
var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"position-relative",class:( _obj = {}, _obj[_vm.$options.HEIGHT_AUTO_CLASSES] = _vm.autoHeight, _obj )},[_c('chart',_vm._g(_vm._b({class:{ 'gl-flex-grow-1': _vm.autoHeight },attrs:{"height":_vm.height,"options":_vm.options},on:{"created":_vm.onCreated}},'chart',_vm.$attrs,false),_vm.$listeners)),_vm._v(" "),(_vm.chart)?_c('chart-tooltip',{ref:"dataTooltip",attrs:{"chart":_vm.chart,"use-default-tooltip-formatter":true},scopedSlots:_vm._u([(_vm.$scopedSlots['tooltip-title'])?{key:"title",fn:function(scope){return [_vm._t("tooltip-title",null,null,scope)]}}:null,(_vm.$scopedSlots['tooltip-content'])?{key:"default",fn:function(scope){return [_vm._t("tooltip-content",null,null,scope)]}}:null,(_vm.$scopedSlots['tooltip-value'])?{key:"tooltip-value",fn:function(scope){return [_vm._t("tooltip-value",null,null,scope)]}}:null],null,true)}):_vm._e()],1)};
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
