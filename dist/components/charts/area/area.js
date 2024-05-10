import merge from 'lodash/merge';
import { defaultAreaOpacity, lineStyle, getThresholdConfig, generateAnnotationSeries, defaultChartOptions, dataZoomAdjustments, mergeSeriesToOptions, mergeAnnotationAxisToOptions, grid } from '../../../utils/charts/config';
import { LEGEND_AVERAGE_TEXT, LEGEND_MAX_TEXT, LEGEND_MIN_TEXT, LEGEND_CURRENT_TEXT, LEGEND_LAYOUT_INLINE, LEGEND_LAYOUT_TABLE, HEIGHT_AUTO_CLASSES } from '../../../utils/charts/constants';
import { colorFromDefaultPalette } from '../../../utils/charts/theme';
import { seriesHasAnnotations, isDataPointAnnotation } from '../../../utils/charts/utils';
import Chart from '../chart/chart';
import ChartLegend from '../legend/legend';
import ChartTooltip from '../tooltip/tooltip';
import __vue_normalize__ from 'vue-runtime-helpers/dist/normalize-component.js';

//
var script = {
  name: 'GlAreaChart',
  components: {
    Chart,
    ChartLegend,
    ChartTooltip
  },
  inheritAttrs: false,
  props: {
    data: {
      type: Array,
      required: true
    },
    option: {
      type: Object,
      required: false,
      default: () => ({})
    },
    thresholds: {
      type: Array,
      required: false,
      default: () => []
    },
    annotations: {
      type: Array,
      required: false,
      default: () => []
    },
    includeLegendAvgMax: {
      type: Boolean,
      required: false,
      default: true
    },
    formatAnnotationsTooltipText: {
      type: Function,
      required: false,
      default: null
    },
    /**
     * Callback called when showing or refreshing a tooltip.
     * **Deprecated:** Use slots `#tooltip-title`, `#tooltip-content` or `#tooltip-value`.
     *
     * @deprecated Use slots `#tooltip-title`, `#tooltip-content` or `#tooltip-value`.
     */
    formatTooltipText: {
      type: Function,
      required: false,
      default: null
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
    /**
     * Sets the chart's height in pixels. Set to `"auto"` to use the height of the container.
     */
    height: {
      type: [Number, String],
      required: false,
      default: null
    },
    legendSeriesInfo: {
      type: Array,
      required: false,
      default: () => []
    }
  },
  data() {
    // Part of the tooltip related data can be
    // moved into the tooltip component.
    // Tracking that progress in
    // https://gitlab.com/gitlab-org/gitlab-ui/-/issues/618
    return {
      chart: null,
      showAnnotationsTooltip: false,
      annotationsTooltipTitle: '',
      annotationsTooltipContent: '',
      annotationsTooltipPosition: {
        left: '0',
        top: '0'
      }
    };
  },
  computed: {
    series() {
      const dataSeries = this.data.map((series, index) => {
        const defaultColor = colorFromDefaultPalette(index);
        const getColor = type => series[type] && series[type].color ? series[type].color : defaultColor;
        return merge({
          areaStyle: {
            opacity: defaultAreaOpacity,
            color: getColor('areaStyle')
          },
          showSymbol: false,
          lineStyle: {
            color: getColor('lineStyle')
          },
          itemStyle: {
            color: getColor('itemStyle')
          }
        }, lineStyle, series, getThresholdConfig(this.thresholds));
      });
      // if annotation series exists, append it
      // along with data series
      if (this.annotationSeries) {
        return [...dataSeries, this.annotationSeries];
      }
      return dataSeries;
    },
    annotationSeries() {
      return generateAnnotationSeries(this.annotations);
    },
    options() {
      const defaultAreaChartOptions = {
        xAxis: {
          axisPointer: {
            show: true,
            lineStyle: {
              type: 'solid'
            },
            label: {
              formatter: this.formatTooltipText
            }
          }
        },
        yAxis: {
          axisTick: {
            show: false
          }
        },
        legend: {
          show: false
        }
      };
      const mergedOptions = merge({}, defaultChartOptions, defaultAreaChartOptions, this.option, dataZoomAdjustments(this.option.dataZoom));
      // All chart options can be merged but series
      // needs to be handled specially.
      return mergeSeriesToOptions(mergeAnnotationAxisToOptions(mergedOptions, this.hasAnnotations), this.series);
    },
    /**
     * Annotations currently are passed as series options in monitoring dashboard.
     * Once https://gitlab.com/gitlab-org/gitlab/-/issues/213390 is closed,
     * annotations will be passed as props and not as series options.
     *
     * For backward compatibility, we're having to check for both.
     */
    hasAnnotations() {
      return this.annotations.length !== 0 || seriesHasAnnotations(this.option.series);
    },
    shouldShowAnnotationsTooltip() {
      return this.chart && this.hasAnnotations;
    },
    compiledOptions() {
      return this.chart ? this.chart.getOption() : null;
    },
    legendStyle() {
      return {
        paddingLeft: `${grid.left}px`
      };
    },
    seriesInfo() {
      if (this.legendSeriesInfo.length > 0) return this.legendSeriesInfo;
      return this.compiledOptions.series.reduce((acc, series, index) => {
        if (series.type === 'line') {
          acc.push({
            name: series.name,
            type: series.lineStyle.type,
            color: series.lineStyle.color || colorFromDefaultPalette(index),
            data: this.includeLegendAvgMax ? series.data.map(data => data[1]) : undefined
          });
        }
        return acc;
      }, []);
    },
    autoHeight() {
      return this.height === 'auto';
    }
  },
  beforeDestroy() {
    this.chart.off('mouseout', this.hideAnnotationsTooltip);
    this.chart.off('mouseover', this.onChartMouseOver);
  },
  methods: {
    defaultAnnotationTooltipText(params) {
      var _params$data$tooltipD;
      return {
        title: params.data.xAxis,
        content: (_params$data$tooltipD = params.data.tooltipData) === null || _params$data$tooltipD === void 0 ? void 0 : _params$data$tooltipD.content
      };
    },
    onCreated(chart) {
      // eCharts inbuild mouse events
      // https://echarts.apache.org/en/api.html#events.Mouse%20events
      // is used to attach listeners to markPoints. These listeners
      // are currently used for annotation arrows at the bottom of the chart.

      // Because data points and annotations arrows are in different
      // sections of the charts with their own mouseovers and mouseouts,
      // there shouldn't be an overlapping situation where both tooltips
      // are visible.
      if (this.hasAnnotations) {
        chart.on('mouseout', this.onChartDataPointMouseOut);
        chart.on('mouseover', this.onChartDataPointMouseOver);
      }
      this.chart = chart;
      this.$emit('created', chart);
    },
    onChartDataPointMouseOut() {
      this.showAnnotationsTooltip = false;
    },
    /**
     * Check if the hovered data point is an annotation
     * point to show the annotation tooltip.
     */
    onChartDataPointMouseOver(params) {
      if (isDataPointAnnotation(params)) {
        const {
          event
        } = params;
        const toolTipFormatter = this.formatAnnotationsTooltipText || this.defaultAnnotationTooltipText;
        const {
          title = '',
          content = ''
        } = toolTipFormatter(params);
        this.showAnnotationsTooltip = true;
        this.annotationsTooltipTitle = title;
        this.annotationsTooltipContent = content;
        this.annotationsTooltipPosition = {
          left: `${event.event.zrX}px`,
          top: `${event.event.zrY}px`
        };
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
var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"position-relative",class:( _obj = {}, _obj[_vm.$options.HEIGHT_AUTO_CLASSES] = _vm.autoHeight, _obj )},[_c('chart',_vm._g(_vm._b({class:{ 'gl-flex-grow-1': _vm.autoHeight },attrs:{"height":_vm.height,"options":_vm.options},on:{"created":_vm.onCreated}},'chart',_vm.$attrs,false),_vm.$listeners)),_vm._v(" "),(_vm.shouldShowAnnotationsTooltip)?_c('chart-tooltip',{ref:"annotationsTooltip",attrs:{"id":"annotationsTooltip","show":_vm.showAnnotationsTooltip,"top":_vm.annotationsTooltipPosition.top,"left":_vm.annotationsTooltipPosition.left,"chart":_vm.chart,"placement":"bottom"},scopedSlots:_vm._u([{key:"title",fn:function(){return [_c('div',[_vm._v(_vm._s(_vm.annotationsTooltipTitle))])]},proxy:true}],null,false,1889294429)},[_vm._v(" "),_c('div',[_vm._v(_vm._s(_vm.annotationsTooltipContent))])]):_vm._e(),_vm._v(" "),(_vm.chart)?_c('chart-tooltip',{ref:"dataTooltip",attrs:{"chart":_vm.chart,"use-default-tooltip-formatter":!_vm.formatTooltipText},scopedSlots:_vm._u([(_vm.$scopedSlots['tooltip-title'])?{key:"title",fn:function(scope){return [_vm._t("tooltip-title",null,null,scope)]}}:null,(_vm.$scopedSlots['tooltip-content'])?{key:"default",fn:function(scope){return [_vm._t("tooltip-content",null,null,scope)]}}:null,(_vm.$scopedSlots['tooltip-value'])?{key:"tooltip-value",fn:function(scope){return [_vm._t("tooltip-value",null,null,scope)]}}:null],null,true)}):_vm._e(),_vm._v(" "),(_vm.compiledOptions)?_c('chart-legend',{style:(_vm.legendStyle),attrs:{"chart":_vm.chart,"series-info":_vm.seriesInfo,"text-style":_vm.compiledOptions.textStyle,"min-text":_vm.legendMinText,"max-text":_vm.legendMaxText,"average-text":_vm.legendAverageText,"current-text":_vm.legendCurrentText,"layout":_vm.legendLayout}}):_vm._e()],1)};
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
