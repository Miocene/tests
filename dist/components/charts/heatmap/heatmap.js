import merge from 'lodash/merge';
import { GRAY_100, WHITE } from '../../../../dist/tokens/js/tokens';
import { getTooltipTitle, getTooltipContent } from '../../../utils/charts/config';
import { HEIGHT_AUTO_CLASSES } from '../../../utils/charts/constants';
import { heatmapHues } from '../../../utils/charts/theme';
import { engineeringNotation } from '../../../utils/number_utils';
import TooltipDefaultFormat from '../../shared_components/charts/tooltip_default_format';
import Chart from '../chart/chart';
import ChartLegend from '../legend/legend';
import ChartTooltip from '../tooltip/tooltip';
import __vue_normalize__ from 'vue-runtime-helpers/dist/normalize-component.js';

//
const defaultOptions = {
  visualMap: {
    show: false,
    inRange: {
      color: heatmapHues
    }
  },
  series: {
    type: 'heatmap'
  }
};

/*
 * The series is an array of arrays containing [x, y, value]
 * x and y are position, value determines the color
 * We want the min and max from value field to make the range of colors
 */
function getRange(series) {
  return series.reduce((acc, curr) => {
    const value = curr[2] || 0;
    if (value < acc.min) acc.min = value;
    if (value > acc.max) acc.max = value;
    return acc;
  }, {
    min: 0,
    max: 0
  });
}
var script = {
  name: 'GlHeatmap',
  components: {
    Chart,
    ChartLegend,
    ChartTooltip,
    TooltipDefaultFormat
  },
  props: {
    options: {
      type: Object,
      required: false,
      default: () => ({})
    },
    dataSeries: {
      type: Array,
      required: true
    },
    xAxisLabels: {
      type: Array,
      required: false,
      default: () => []
    },
    yAxisLabels: {
      type: Array,
      required: false,
      default: () => []
    },
    xAxisName: {
      type: String,
      required: false,
      default: ''
    },
    yAxisName: {
      type: String,
      required: false,
      default: ''
    },
    formatTooltipText: {
      type: Function,
      required: false,
      default: null
    },
    legendAverageText: {
      type: String,
      required: false,
      default: 'Avg'
    },
    legendMaxText: {
      type: String,
      required: false,
      default: 'Max'
    },
    responsive: {
      type: Boolean,
      required: false,
      default: true
    },
    /**
     * Sets the chart's height in pixels. Set to `"auto"` to use the height of the container.
     */
    height: {
      type: [Number, String],
      required: false,
      default: null
    },
    showTooltip: {
      type: Boolean,
      default: true,
      required: false
    }
  },
  data() {
    return {
      chart: null,
      tooltip: {
        title: '',
        content: {},
        left: '0',
        top: '0'
      },
      selectedFormatTooltipText: this.formatTooltipText || this.defaultFormatTooltipText
    };
  },
  computed: {
    computedOptions() {
      const {
        min,
        max
      } = getRange(this.dataSeries);
      return merge({}, defaultOptions, {
        series: {
          data: this.dataSeries,
          z: 2
        },
        grid: {
          left: '64px',
          right: '32px',
          show: true,
          borderWidth: 0,
          backgroundColor: GRAY_100
        },
        visualMap: {
          min,
          max
        },
        xAxis: {
          data: this.xAxisLabels,
          z: 3,
          axisTick: false,
          axisLabel: {
            margin: 2
          },
          name: this.xAxisName,
          nameGap: 16,
          nameLocation: 'middle',
          nameTextStyle: {
            verticalAlign: 'middle'
          },
          offset: 0,
          splitLine: {
            show: true,
            interval: 0,
            lineStyle: {
              color: WHITE,
              width: 2
            }
          },
          axisPointer: {
            show: true,
            label: {
              formatter: this.onLabelChange
            }
          }
        },
        yAxis: {
          data: this.yAxisLabels,
          z: 3,
          type: 'category',
          axisTick: false,
          axisLabel: {
            margin: 8
          },
          name: this.yAxisName,
          nameLocation: 'center',
          nameGap: 50,
          nameRotate: 90,
          splitLine: {
            show: true,
            interval: 0,
            lineStyle: {
              color: WHITE,
              width: 2
            }
          }
        }
      }, this.options);
    },
    legendStyle() {
      return {
        paddingLeft: this.computedOptions.grid.left,
        marginTop: '-32px'
      };
    },
    compiledOptions() {
      return this.chart ? this.chart.getOption() : null;
    },
    seriesInfo() {
      const {
        min,
        max
      } = getRange(this.dataSeries);
      const step = (max - min) / heatmapHues.length;
      return heatmapHues.map((color, index) => {
        const lowerBound = engineeringNotation(min + step * index);
        const upperBound = engineeringNotation(min + step * (index + 1));
        return {
          name: `${lowerBound} - ${upperBound}`,
          color,
          type: 'solid'
        };
      });
    },
    autoHeight() {
      return this.height === 'auto';
    }
  },
  methods: {
    defaultFormatTooltipText(params) {
      this.tooltip.title = getTooltipTitle(params, this.computedOptions.xAxis.name);
      this.tooltip.content = getTooltipContent(params, this.computedOptions.yAxis.name);
    },
    onCreated(chart) {
      this.chart = chart;
      this.$emit('created', chart);
    },
    onLabelChange(params) {
      this.selectedFormatTooltipText(params);
      const {
        seriesData = []
      } = params;
      if (seriesData.length && seriesData[0].value) {
        const {
          seriesId,
          value
        } = seriesData[0];
        const [left, top] = this.chart.convertToPixel({
          seriesId
        }, value);
        this.tooltip = {
          ...this.tooltip,
          left: `${left}px`,
          top: `${top}px`
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
var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"gl-heatmap",class:( _obj = {}, _obj[_vm.$options.HEIGHT_AUTO_CLASSES] = _vm.autoHeight, _obj )},[_c('chart',_vm._g(_vm._b({class:{ 'gl-flex-grow-1': _vm.autoHeight },attrs:{"height":_vm.height,"options":_vm.computedOptions},on:{"created":_vm.onCreated}},'chart',_vm.$attrs,false),_vm.$listeners)),_vm._v(" "),(_vm.chart)?_c('chart-tooltip',{attrs:{"chart":_vm.chart,"top":_vm.tooltip.top,"left":_vm.tooltip.left,"show":_vm.showTooltip},scopedSlots:_vm._u([{key:"title",fn:function(){return [(_vm.formatTooltipText)?_vm._t("tooltip-title"):_c('div',[_vm._v(_vm._s(_vm.tooltip.title))])]},proxy:true}],null,true)},[_vm._v(" "),(_vm.formatTooltipText)?_vm._t("tooltip-content"):_c('tooltip-default-format',{attrs:{"tooltip-content":_vm.tooltip.content}})],2):_vm._e(),_vm._v(" "),(_vm.compiledOptions)?_c('chart-legend',{style:(_vm.legendStyle),attrs:{"chart":_vm.chart,"series-info":_vm.seriesInfo,"text-style":_vm.compiledOptions.textStyle,"max-text":_vm.legendMaxText,"average-text":_vm.legendAverageText}}):_vm._e()],1)};
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