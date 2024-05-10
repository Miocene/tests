import merge from 'lodash/merge';
import { yAxis, generateBarSeries, generateLineSeries, defaultChartOptions, gridWithSecondaryYAxis, grid, dataZoomAdjustments, mergeSeriesToOptions } from '../../../utils/charts/config';
import { LEGEND_AVERAGE_TEXT, LEGEND_MAX_TEXT, LEGEND_MIN_TEXT, LEGEND_CURRENT_TEXT, LEGEND_LAYOUT_INLINE, LEGEND_LAYOUT_TABLE, CHART_TYPE_LINE, HEIGHT_AUTO_CLASSES } from '../../../utils/charts/constants';
import { colorFromDefaultPalette } from '../../../utils/charts/theme';
import { columnOptions } from '../../../utils/constants';
import TooltipDefaultFormat from '../../shared_components/charts/tooltip_default_format';
import Chart from '../chart/chart';
import ChartLegend from '../legend/legend';
import ChartTooltip from '../tooltip/tooltip';
import __vue_normalize__ from 'vue-runtime-helpers/dist/normalize-component.js';

const yAxisDefaults = {
  ...yAxis,
  nameLocation: 'center',
  axisTick: {
    show: false
  }
};
var script = {
  name: 'GlStackedColumnChart',
  components: {
    Chart,
    ChartTooltip,
    ChartLegend,
    TooltipDefaultFormat
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
    presentation: {
      type: String,
      required: false,
      default: 'stacked',
      validator: value => ['stacked', 'tiled'].indexOf(value) !== -1
    },
    groupBy: {
      type: Array,
      required: true
    },
    xAxisType: {
      type: String,
      required: true,
      validator: value => ['value', 'category', 'time', 'log'].indexOf(value) !== -1
    },
    xAxisTitle: {
      type: String,
      required: true
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
    seriesNames: {
      type: Array,
      required: false,
      default: () => []
    },
    legendAverageText: {
      type: String,
      required: false,
      default: LEGEND_AVERAGE_TEXT
    },
    legendMaxText: {
      type: String,
      required: false,
      default: LEGEND_MAX_TEXT
    },
    legendMinText: {
      type: String,
      required: false,
      default: LEGEND_MIN_TEXT
    },
    legendCurrentText: {
      type: String,
      required: false,
      default: LEGEND_CURRENT_TEXT
    },
    legendLayout: {
      type: String,
      required: false,
      default: LEGEND_LAYOUT_INLINE,
      validator(layout) {
        return [LEGEND_LAYOUT_INLINE, LEGEND_LAYOUT_TABLE].indexOf(layout) !== -1;
      }
    },
    formatTooltipText: {
      type: Function,
      required: false,
      default: null
    },
    customPalette: {
      type: Array,
      required: false,
      default: null
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
      chart: null,
      tooltipTitle: '',
      tooltipContent: {}
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
          data
        } = _ref;
        const stack = this.presentation === 'stacked' ? this.groupBy : null;
        const color = this.getColor(index);
        return generateBarSeries({
          stack,
          name,
          data,
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
        const color = this.getColor(offset + index);
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
        const color = this.getColor(offset + index);
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
            show: true,
            type: 'none',
            label: {
              formatter: this.onLabelChange
            }
          },
          data: this.groupBy,
          name: this.xAxisTitle,
          type: this.xAxisType
        },
        yAxis: [{
          ...yAxisDefaults,
          name: this.yAxisTitle
        }, {
          ...yAxisDefaults,
          name: this.secondaryDataTitle,
          show: this.hasSecondaryAxis
        }],
        legend: {
          show: false
        }
      }, this.option, dataZoomAdjustments(this.option.dataZoom));
      // All chart options can be merged but series
      // needs to be handled specially
      return mergeSeriesToOptions(mergedOptions, this.series);
    },
    legendStyle() {
      return {
        paddingLeft: `${grid.left}px`
      };
    },
    compiledOptions() {
      return this.chart ? this.chart.getOption() : null;
    },
    seriesInfo() {
      return this.compiledOptions.series.reduce((acc, series, index) => {
        acc.push({
          name: series.name,
          type: series.type,
          color: this.getColor(index),
          data: series.data.map(data => data),
          yAxisIndex: series.yAxisIndex
        });
        return acc;
      }, []);
    },
    autoHeight() {
      return this.height === 'auto';
    }
  },
  methods: {
    getColor(index) {
      var _this$customPalette;
      return this.customPalette ? (_this$customPalette = this.customPalette) === null || _this$customPalette === void 0 ? void 0 : _this$customPalette[index] : colorFromDefaultPalette(index);
    },
    onCreated(chart) {
      this.chart = chart;
      this.$emit('created', chart);
    },
    defaultFormatTooltipText(params) {
      const {
        tooltipContent
      } = params.seriesData.reverse().reduce((acc, bar) => {
        acc.tooltipContent[bar.seriesName] = {
          value: bar.value,
          index: bar.seriesIndex,
          color: this.getColor(bar.seriesIndex)
        };
        return acc;
      }, {
        tooltipContent: {}
      });
      this.tooltipTitle = params.value;
      this.$set(this, 'tooltipContent', tooltipContent);
    },
    onLabelChange(params) {
      if (this.formatTooltipText) {
        this.formatTooltipText(params);
      } else {
        this.defaultFormatTooltipText(params);
      }
    }
  },
  HEIGHT_AUTO_CLASSES
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {
var _obj;
var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"position-relative",class:( _obj = {}, _obj[_vm.$options.HEIGHT_AUTO_CLASSES] = _vm.autoHeight, _obj )},[_c('chart',_vm._g(_vm._b({class:{ 'gl-flex-grow-1': _vm.autoHeight },attrs:{"height":_vm.height,"options":_vm.options},on:{"created":_vm.onCreated}},'chart',_vm.$attrs,false),_vm.$listeners)),_vm._v(" "),(_vm.chart)?_c('chart-tooltip',{attrs:{"chart":_vm.chart},scopedSlots:_vm._u([{key:"title",fn:function(){return [_vm._t("tooltip-title",function(){return [_vm._v(_vm._s(_vm.tooltipTitle)+" ("+_vm._s(_vm.xAxisTitle)+")")]})]},proxy:true}],null,true)},[_vm._v(" "),_vm._t("tooltip-content",function(){return [_c('tooltip-default-format',{attrs:{"tooltip-content":_vm.tooltipContent}})]})],2):_vm._e(),_vm._v(" "),(_vm.compiledOptions)?_c('chart-legend',{style:(_vm.legendStyle),attrs:{"chart":_vm.chart,"series-info":_vm.seriesInfo,"text-style":_vm.compiledOptions.textStyle,"min-text":_vm.legendMinText,"max-text":_vm.legendMaxText,"average-text":_vm.legendAverageText,"current-text":_vm.legendCurrentText,"layout":_vm.legendLayout}}):_vm._e()],1)};
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
