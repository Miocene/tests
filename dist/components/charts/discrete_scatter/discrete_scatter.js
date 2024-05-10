import merge from 'lodash/merge';
import { GRAY_200 } from '../../../../dist/tokens/js/tokens';
import { defaultChartOptions, dataZoomAdjustments, mergeSeriesToOptions } from '../../../utils/charts/config';
import { colorFromDefaultPalette } from '../../../utils/charts/theme';
import { HEIGHT_AUTO_CLASSES } from '../../../utils/charts/constants';
import TooltipDefaultFormat from '../../shared_components/charts/tooltip_default_format';
import Chart from '../chart/chart';
import ChartTooltip from '../tooltip/tooltip';
import __vue_normalize__ from 'vue-runtime-helpers/dist/normalize-component.js';

var script = {
  name: 'GlDiscreteScatterChart',
  components: {
    Chart,
    ChartTooltip,
    TooltipDefaultFormat
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
    yAxisTitle: {
      type: String,
      required: true
    },
    xAxisTitle: {
      type: String,
      required: true
    },
    symbolSize: {
      type: Number,
      required: false,
      default: 8
    },
    formatTooltipText: {
      type: Function,
      required: false,
      default: null
    },
    disableTooltip: {
      type: Boolean,
      required: false,
      default: false
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
      tooltipContent: {},
      tooltipPosition: {
        left: '0',
        top: '0'
      },
      selectedFormatTooltipText: this.formatTooltipText || this.defaultFormatTooltipText
    };
  },
  computed: {
    series() {
      return this.data.map((series, index) => {
        const defaultColor = colorFromDefaultPalette(index);
        const getColor = type => series[type] && series[type].color ? series[type].color : defaultColor;
        return merge({
          symbolSize: this.symbolSize,
          lineStyle: {
            color: getColor('lineStyle')
          },
          itemStyle: {
            color: getColor('itemStyle')
          }
        }, series);
      });
    },
    options() {
      const mergedOptions = merge({}, defaultChartOptions, {
        tooltip: this.disableTooltip ? undefined : {
          formatter: this.onLabelChange
        },
        xAxis: {
          type: 'category',
          name: this.xAxisTitle,
          axisTick: {
            alignWithLabel: true,
            show: true,
            lineStyle: {
              color: GRAY_200
            }
          },
          axisLabel: {
            margin: 20,
            verticalAlign: 'bottom'
          }
        },
        yAxis: {
          type: 'value',
          name: this.yAxisTitle
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
    defaultFormatTooltipText(params) {
      const data = this.getChartData(params);
      const [title, content] = data;
      this.tooltipTitle = title;
      const seriesName = this.yAxisTitle;
      const tooltipContent = {
        [seriesName]: {
          value: content,
          color: ''
        }
      };
      this.$set(this, 'tooltipContent', tooltipContent);
    },
    onCreated(chart) {
      this.chart = chart;
      this.$emit('created', chart);
    },
    onLabelChange(params) {
      this.selectedFormatTooltipText(params);
      const data = this.getChartData(params);
      if (data.length) {
        const [left, top] = this.chart.convertToPixel('grid', data);
        this.tooltipPosition = {
          left: `${left}px`,
          top: `${top}px`
        };
      }
    },
    getChartData(_ref) {
      let {
        data
      } = _ref;
      const chartData = (data === null || data === void 0 ? void 0 : data.value) || data;
      return Array.isArray(chartData) ? chartData : [];
    }
  },
  HEIGHT_AUTO_CLASSES
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {
var _obj;
var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"position-relative",class:( _obj = {}, _obj[_vm.$options.HEIGHT_AUTO_CLASSES] = _vm.autoHeight, _obj )},[_c('chart',_vm._g(_vm._b({class:{ 'gl-flex-grow-1': _vm.autoHeight },attrs:{"height":_vm.height,"options":_vm.options},on:{"created":_vm.onCreated}},'chart',_vm.$attrs,false),_vm.$listeners)),_vm._v(" "),(!_vm.disableTooltip && _vm.chart)?_c('chart-tooltip',{attrs:{"chart":_vm.chart,"top":_vm.tooltipPosition.top,"left":_vm.tooltipPosition.left},scopedSlots:_vm._u([{key:"title",fn:function(){return [_vm._t("tooltip-title",function(){return [_vm._v(_vm._s(_vm.tooltipTitle)+" ("+_vm._s(_vm.xAxisTitle)+")")]})]},proxy:true}],null,true)},[_vm._v(" "),_vm._t("tooltip-content",function(){return [_c('tooltip-default-format',{attrs:{"tooltip-content":_vm.tooltipContent}})]})],2):_vm._e()],1)};
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
