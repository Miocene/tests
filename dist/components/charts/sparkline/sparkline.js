import merge from 'lodash/merge';
import isNil from 'lodash/isNil';
import { graphic } from 'echarts';
import { GlResizeObserverDirective } from '../../../directives/resize_observer/resize_observer';
import { defaultChartOptions, mergeSeriesToOptions, symbolSize } from '../../../utils/charts/config';
import { HEIGHT_AUTO_HORIZONTAL_LAYOUT_CLASSES } from '../../../utils/charts/constants';
import Chart from '../chart/chart';
import ChartTooltip from '../tooltip/tooltip';
import __vue_normalize__ from 'vue-runtime-helpers/dist/normalize-component.js';

//

// the padding is needed so the mark points don't overflow when visible
const gridPadding = symbolSize / 2;
const generateGradient = colors => {
  return new graphic.LinearGradient(0, 0, 0, 1, colors.map((color, index) => {
    const offset = index / (colors.length - 1);
    return {
      offset,
      color
    };
  }));
};
var script = {
  name: 'GlSparklineChart',
  components: {
    Chart,
    ChartTooltip
  },
  directives: {
    resizeObserver: GlResizeObserverDirective
  },
  props: {
    /**
     * The data that is used to plot the chart.
     */
    data: {
      type: Array,
      required: true
    },
    /**
     * Controls the label that is shown within the chart's tooltip. Use it to describe your data.
     */
    tooltipLabel: {
      type: String,
      required: false,
      default: ''
    },
    /**
     * Sets the chart's height in pixels. Set to `"auto"` to use the height of the container.
     */
    height: {
      type: [Number, String],
      required: false,
      default: 50
    },
    /**
     * If enabled will show the value of the latest "y" data-point on the side right of the chart.
     */
    showLastYValue: {
      type: Boolean,
      required: false,
      default: true
    },
    /**
     * Sets a colour gradient for the sparkline
     */
    gradient: {
      type: Array,
      required: false,
      default: () => []
    },
    /**
     * The smoothness of the line, valued from 0 to 1. A smaller value makes it less smooth.
     */
    smooth: {
      type: Number,
      required: false,
      default: 0,
      validator: x => x >= 0 && x <= 1
    }
  },
  data() {
    return {
      chartInstance: null,
      tooltip: {
        title: '',
        content: '',
        position: {
          left: '0',
          top: '0'
        }
      }
    };
  },
  computed: {
    options() {
      const sparkLineChartOptions = {
        grid: {
          top: gridPadding,
          bottom: gridPadding,
          left: gridPadding,
          right: gridPadding
        },
        xAxis: {
          type: 'category',
          show: false,
          axisLabel: {
            show: true
          },
          axisPointer: {
            show: true,
            type: 'none',
            label: {
              formatter: this.generateTooltip
            }
          }
        },
        yAxis: {
          type: 'value',
          show: false,
          min: 'datamin'
        }
      };
      const mergedOptions = merge({}, defaultChartOptions, sparkLineChartOptions);
      return mergeSeriesToOptions(mergedOptions, this.series);
    },
    series() {
      const {
        data,
        smooth,
        itemStyle,
        showLastYValue
      } = this;
      const markPoint = showLastYValue ? {
        symbol: 'circle',
        cursor: 'auto',
        animation: false,
        symbolSize,
        data: [{
          xAxis: data.length - 1,
          yAxis: data[data.length - 1][1]
        }]
      } : undefined;
      return {
        type: 'line',
        symbol: 'circle',
        hoverAnimation: false,
        animation: true,
        cursor: 'auto',
        symbolSize,
        markPoint,
        data,
        smooth,
        itemStyle,
        lineStyle: {
          cap: 'round'
        }
      };
    },
    itemStyle() {
      if (this.gradient.length) {
        return {
          color: generateGradient(this.gradient)
        };
      }
      return {};
    },
    lastYValue() {
      const latestEntry = this.data.slice(-1)[0];
      return latestEntry[1];
    },
    autoHeight() {
      return this.height === 'auto';
    }
  },
  methods: {
    onChartCreated(chartInstance) {
      this.chartInstance = chartInstance;
      /**
       * Emitted when the chart is created.
       * The payload contains the echarts instance.
       * @event chartCreated
       * @type {object}
       */
      this.$emit('chartCreated', chartInstance);
    },
    handleResize() {
      this.chartInstance.resize();
    },
    setTooltipPosition(data) {
      const [left, top] = this.chartInstance.convertToPixel('grid', data);
      this.tooltip.position = {
        left: `${left}px`,
        top: `${top}px`
      };
    },
    // This function is called any time the axis pointer is changed (the black bubble showing which
    // point on the line is selected). Note that it will not trigger if the axis pointer is removed,
    // only when it changes from one point to another or is shown for the first time.
    generateTooltip(_ref) {
      let {
        seriesData = []
      } = _ref;
      // seriesData is an array of nearby data point coordinates
      // seriesData[0] is the nearest point at which the tooltip is displayed
      // https://echarts.apache.org/en/option.html#xAxis.axisPointer.label.formatter
      const [firstEntry = {}] = seriesData;
      const {
        data
      } = firstEntry;
      if (!data) return;
      const [title, content] = data;
      if (isNil(title) || isNil(content)) return;
      this.tooltip.title = title;
      this.tooltip.content = content;
      this.setTooltipPosition(data);
    }
  },
  HEIGHT_AUTO_HORIZONTAL_LAYOUT_CLASSES
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {
var _obj;
var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{directives:[{name:"resize-observer",rawName:"v-resize-observer",value:(_vm.handleResize),expression:"handleResize"}],staticClass:"gl-display-flex gl-align-items-center",class:{ 'gl-h-full': _vm.autoHeight }},[_vm._t("default"),_vm._v(" "),_c('div',{staticClass:"gl-flex-grow-1 gl-relative",class:( _obj = {}, _obj[_vm.$options.HEIGHT_AUTO_HORIZONTAL_LAYOUT_CLASSES] = _vm.autoHeight, _obj ),attrs:{"data-testid":"chart-container"}},[_c('chart',_vm._g(_vm._b({class:{ 'gl-flex-grow-1': _vm.autoHeight },attrs:{"height":_vm.height,"options":_vm.options},on:{"created":_vm.onChartCreated}},'chart',_vm.$attrs,false),_vm.$listeners)),_vm._v(" "),(_vm.chartInstance)?_c('chart-tooltip',{attrs:{"chart":_vm.chartInstance,"top":_vm.tooltip.position.top,"left":_vm.tooltip.position.left,"placement":"top"},scopedSlots:_vm._u([{key:"title",fn:function(){return [_c('div',{staticClass:"gl-white-space-nowrap",attrs:{"data-testid":"tooltip-title"}},[_vm._v("\n          "+_vm._s(_vm.tooltip.title)+"\n        ")])]},proxy:true},{key:"default",fn:function(){return [_c('div',{staticClass:"gl-display-flex",attrs:{"data-testid":"tooltip-content"}},[(_vm.tooltipLabel)?_c('span',{staticClass:"gl-pr-6 gl-mr-auto"},[_vm._v(_vm._s(_vm.tooltipLabel))]):_vm._e(),_vm._v(" "),_c('strong',[_vm._v(_vm._s(_vm.tooltip.content))])])]},proxy:true}],null,false,2830367259)}):_vm._e()],1),_vm._v(" "),(_vm.showLastYValue)?_c('span',{staticClass:"gl-display-inline-flex gl-justify-content-center gl-ml-5",attrs:{"data-testid":"last-y-value"}},[_vm._v("\n    "+_vm._s(_vm.lastYValue)+"\n  ")]):_vm._e()],2)};
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
