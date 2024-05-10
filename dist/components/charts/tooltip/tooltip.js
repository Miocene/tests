import * as echarts from 'echarts';
import { uid, debounceByAnimationFrame } from '../../../utils/utils';
import GlPopover from '../../base/popover/popover';
import { popoverPlacements } from '../../../utils/constants';
import { TOOLTIP_LEFT_OFFSET, TOOLTIP_TOP_OFFSET } from '../../../utils/charts/constants';
import { getTooltipTitle, getTooltipContent } from '../../../utils/charts/config';
import TooltipDefaultFormat from '../../shared_components/charts/tooltip_default_format';
import __vue_normalize__ from 'vue-runtime-helpers/dist/normalize-component.js';

//
var script = {
  name: 'GlChartTooltip',
  components: {
    GlPopover,
    TooltipDefaultFormat
  },
  inheritAttrs: false,
  props: {
    chart: {
      type: Object,
      required: true,
      validator(chart) {
        return Object.is(chart, echarts.getInstanceByDom(chart.getDom()));
      }
    },
    id: {
      type: String,
      required: false,
      default: () => uid()
    },
    /**
     * Position of the popover respective to the chart.
     * Sets the `top` style property.
     */
    top: {
      type: String,
      required: false,
      default: null
    },
    /**
     * Position of the popover respective to the chart.
     * Sets the `bottom` style property.
     */
    bottom: {
      type: String,
      required: false,
      default: null
    },
    /**
     * Position of the popover respective to the chart.
     * Sets the `left` style property.
     */
    left: {
      type: String,
      required: false,
      default: null
    },
    /**
     * Position of the popover respective to the chart.
     * Sets the `right` style property.
     */
    right: {
      type: String,
      required: false,
      default: null
    },
    /**
     * Set to `true` to show, set to `false` to not show.
     * Set to `null` to show only when the mouse is in the chart.
     */
    show: {
      type: Boolean,
      required: false,
      default: null
    },
    /**
     * Popover placement
     */
    placement: {
      type: String,
      required: false,
      default: popoverPlacements.right
    },
    /**
     * Distance between the popover and the pointer when
     * no position is defined
     */
    xOffset: {
      type: Number,
      required: false,
      default: TOOLTIP_LEFT_OFFSET,
      validator(value) {
        // popover target must have a size of at least 1
        return value >= 1;
      }
    },
    /**
     * Distance between the popover and the pointer when
     * no position is defined
     */
    yOffset: {
      type: Number,
      required: false,
      default: TOOLTIP_TOP_OFFSET,
      validator(value) {
        // popover target must have a size of at least 1
        return value >= 1;
      }
    },
    /**
     * Set to true to use the default tooltip formatter.
     */
    useDefaultTooltipFormatter: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      pointerPosition: null,
      isPointerInChart: false,
      debouncedMouseHandler: debounceByAnimationFrame(this.mouseHandler),
      title: null,
      content: {},
      params: null
    };
  },
  computed: {
    targetId() {
      // if multiple tooltips are used in a chart component,
      // `this.id` can be used to uniquely identify them
      return `${this.chart.getDom().getAttribute('_echarts_instance_')}-tooltip-${this.id}`;
    },
    targetStyle() {
      // the target is a rectangular space between cursor and popover
      return {
        marginTop: `${-this.yOffset}px`,
        height: `${this.yOffset * 2}px`,
        marginLeft: `${-this.xOffset}px`,
        width: `${this.xOffset * 2}px`
      };
    },
    fixedPosition() {
      const {
        top,
        left,
        bottom,
        right
      } = this;
      if (top || left || bottom || right) {
        return {
          top,
          left,
          bottom,
          right
        };
      }
      return null;
    },
    shouldShowPopover() {
      if (this.show !== null) {
        return this.show;
      }
      return this.isPointerInChart;
    }
  },
  created() {
    this.chart.getZr().on('mousemove', this.debouncedMouseHandler);
    this.chart.getZr().on('mouseout', this.debouncedMouseHandler);
    if (this.useDefaultTooltipFormatter) {
      this.chart.setOption({
        xAxis: {
          axisPointer: {
            show: true,
            label: {
              formatter: params => {
                var _options$xAxis, _options$xAxis$, _options$yAxis, _options$yAxis$;
                const options = this.chart.getOption();
                const titleAxisName = (_options$xAxis = options.xAxis) === null || _options$xAxis === void 0 ? void 0 : (_options$xAxis$ = _options$xAxis[0]) === null || _options$xAxis$ === void 0 ? void 0 : _options$xAxis$.name;
                const valueAxisName = (_options$yAxis = options.yAxis) === null || _options$yAxis === void 0 ? void 0 : (_options$yAxis$ = _options$yAxis[0]) === null || _options$yAxis$ === void 0 ? void 0 : _options$yAxis$.name;
                this.title = getTooltipTitle(params, titleAxisName);
                this.content = getTooltipContent(params, valueAxisName);
                this.params = params;
              }
            }
          }
        }
      });
    }
  },
  beforeDestroy() {
    this.chart.getZr().off('mousemove', this.debouncedMouseHandler);
    this.chart.getZr().off('mouseout', this.debouncedMouseHandler);
  },
  methods: {
    mouseHandler(event) {
      let {
        zrX: x,
        zrY: y
      } = event.event;
      if (Number.isFinite(x) && Number.isFinite(y)) {
        x = Math.round(x);
        y = Math.round(y);
        this.pointerPosition = {
          left: `${x}px`,
          top: `${y}px`
        };
        this.isPointerInChart = this.chart.containPixel('grid', [x, y]);
      }
    }
  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.chart)?_c('div',{staticClass:"gl-pointer-events-none"},[_c('div',{staticClass:"gl-chart-tooltip",style:(Object.assign({}, (_vm.fixedPosition || _vm.pointerPosition), _vm.targetStyle)),attrs:{"id":_vm.targetId}}),_vm._v(" "),_c('gl-popover',_vm._b({attrs:{"show":_vm.shouldShowPopover,"target":_vm.targetId,"container":_vm.targetId,"placement":_vm.placement,"triggers":""},scopedSlots:_vm._u([{key:"title",fn:function(){return [_vm._t("title",function(){return [_vm._v(_vm._s(_vm.title))]},null,{ title: _vm.title, params: _vm.params })]},proxy:true}],null,true)},'gl-popover',_vm.$attrs,false),[_vm._v(" "),_vm._t("default",function(){return [_c('tooltip-default-format',{attrs:{"tooltip-content":_vm.content},scopedSlots:_vm._u([(_vm.$scopedSlots['tooltip-value'])?{key:"tooltip-value",fn:function(scope){return [_vm._t("tooltip-value",null,null,scope)]}}:null],null,true)})]},null,{ content: _vm.content, params: _vm.params })],2)],1):_vm._e()};
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
