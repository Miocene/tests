import merge from 'lodash/merge';
import truncate from 'lodash/truncate';
import { dataZoomAdjustments, mergeSeriesToOptions, grid } from '../../../utils/charts/config';
import { HEIGHT_AUTO_CLASSES } from '../../../utils/charts/constants';
import { colorFromDefaultPalette } from '../../../utils/charts/theme';
import { engineeringNotation } from '../../../utils/number_utils';
import { hexToRgba } from '../../../utils/utils';
import TooltipDefaultFormat from '../../shared_components/charts/tooltip_default_format';
import Chart from '../chart/chart';
import ChartTooltip from '../tooltip/tooltip';
import __vue_normalize__ from 'vue-runtime-helpers/dist/normalize-component.js';

//

/**
 * `nameGap` in charts/config is set to 50 but it is not
 * used for bar charts as the axes are flipped. That is why
 * we're explicitly setting it here
 */
const DEFAULT_NAME_GAP = 50;

/**
 * This is the magic number at which the y-axis name
 * and y-axis labels don't overlap
 * @Number
 */
const AXIS_LABEL_LENGTH = 7;

/**
 * Because the axes are reversed in bar charts defaultChartOptions
 * xAxis and yAxis needs to be handled specifically.
 */
const defaultOptions = {
  grid,
  xAxis: {
    nameLocation: 'center',
    axisLabel: {
      formatter: num => engineeringNotation(num, 2)
    }
  },
  yAxis: {
    nameGap: DEFAULT_NAME_GAP,
    boundaryGap: true,
    nameLocation: 'center',
    splitLine: {
      show: false
    },
    axisLabel: {
      interval: 0,
      formatter: str => truncate(str, {
        length: AXIS_LABEL_LENGTH,
        separator: '...'
      })
    }
  }
};
var script = {
  name: 'GlBarChart',
  components: {
    Chart,
    ChartTooltip,
    TooltipDefaultFormat
  },
  inheritAttrs: false,
  props: {
    data: {
      type: Object,
      required: true
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
    xAxisTitle: {
      type: String,
      required: true
    },
    xAxisType: {
      type: String,
      required: false,
      default: 'value'
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
    series() {
      return Object.keys(this.data).map((key, index) => {
        const barColor = colorFromDefaultPalette(index);
        return {
          name: key,
          data: this.data[key],
          type: 'bar',
          stack: 'chart',
          itemStyle: {
            color: hexToRgba(barColor, 0.2),
            borderColor: barColor,
            borderWidth: 1
          },
          emphasis: {
            itemStyle: {
              color: hexToRgba(barColor, 0.4)
            }
          },
          barMaxWidth: '50%'
        };
      });
    },
    options() {
      const mergedOptions = merge({}, defaultOptions, {
        xAxis: {
          axisLine: {
            show: false
          },
          name: this.xAxisTitle,
          type: this.xAxisType
        },
        yAxis: {
          name: this.yAxisTitle,
          type: 'category',
          axisTick: {
            show: true
          },
          axisPointer: {
            show: true,
            type: 'none',
            label: {
              formatter: this.onLabelChange
            }
          }
        },
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
    },
    onLabelChange(params) {
      const {
        yLabels,
        tooltipContent
      } = this.getTooltipContent(params, this.xAxisTitle);
      this.$set(this, 'tooltipContent', tooltipContent);
      this.tooltipTitle = yLabels.join(', ');
    },
    /**
     * For bar charts, the tooltip should be against x-axis values.
     * This method will be removed after https://gitlab.com/gitlab-org/gitlab-ui/-/issues/674
     *
     * @param {Object} params series data
     * @param {String} xAxisTitle x-axis title
     * @returns {Object} tooltip title and content
     */
    getTooltipContent(params) {
      let xAxisTitle = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      const seriesDataLength = params.seriesData.length;
      const {
        yLabels,
        tooltipContent
      } = params.seriesData.reduce((acc, chartItem) => {
        const [value, title] = chartItem.value || [];
        // The x axis title is used instead of y axis
        const seriesName = seriesDataLength === 1 && xAxisTitle ? xAxisTitle : chartItem.seriesName;
        const color = seriesDataLength === 1 ? '' : chartItem.color;
        acc.tooltipContent[seriesName] = {
          value,
          color
        };
        if (!acc.yLabels.includes(title)) {
          acc.yLabels.push(title);
        }
        return acc;
      }, {
        yLabels: [],
        tooltipContent: {}
      });
      return {
        yLabels,
        tooltipContent
      };
    }
  },
  HEIGHT_AUTO_CLASSES
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {
var _obj;
var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"position-relative",class:( _obj = {}, _obj[_vm.$options.HEIGHT_AUTO_CLASSES] = _vm.autoHeight, _obj )},[_c('chart',_vm._g(_vm._b({class:{ 'gl-flex-grow-1': _vm.autoHeight },attrs:{"height":_vm.height,"options":_vm.options},on:{"created":_vm.onCreated}},'chart',_vm.$attrs,false),_vm.$listeners)),_vm._v(" "),(_vm.chart)?_c('chart-tooltip',{attrs:{"chart":_vm.chart},scopedSlots:_vm._u([{key:"title",fn:function(){return [_c('div',[_vm._v(_vm._s(_vm.tooltipTitle)+" ("+_vm._s(_vm.yAxisTitle)+")")])]},proxy:true}],null,false,1644826356)},[_vm._v(" "),_c('tooltip-default-format',{attrs:{"tooltip-content":_vm.tooltipContent}})],1):_vm._e()],1)};
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
