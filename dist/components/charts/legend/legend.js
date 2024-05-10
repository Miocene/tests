import * as echarts from 'echarts';
import { GRAY_200 } from '../../../../dist/tokens/js/tokens';
import { defaultFontSize } from '../../../utils/charts/config';
import { LEGEND_AVERAGE_TEXT, LEGEND_CURRENT_TEXT, LEGEND_MIN_TEXT, LEGEND_MAX_TEXT, LEGEND_LAYOUT_INLINE, LEGEND_LAYOUT_TABLE } from '../../../utils/charts/constants';
import { engineeringNotation, average } from '../../../utils/number_utils';
import GlTruncate from '../../utilities/truncate/truncate';
import GlChartSeriesLabel from '../series_label/series_label';
import __vue_normalize__ from 'vue-runtime-helpers/dist/normalize-component.js';

//
var script = {
  name: 'GlChartLegend',
  components: {
    GlChartSeriesLabel,
    GlTruncate
  },
  props: {
    chart: {
      type: Object,
      required: true,
      validator(chart) {
        return Object.is(chart, echarts.getInstanceByDom(chart.getDom()));
      }
    },
    seriesInfo: {
      type: Array,
      required: true,
      validator(seriesInfo) {
        return seriesInfo.every(series => series.type && series.name && series.color);
      }
    },
    textStyle: {
      type: Object,
      required: false,
      default: () => ({})
    },
    /**
     * Text for data average (overridden by prop if needed for internationalization)
     */
    averageText: {
      type: String,
      required: false,
      default: LEGEND_AVERAGE_TEXT
    },
    currentText: {
      type: String,
      required: false,
      default: LEGEND_CURRENT_TEXT
    },
    minText: {
      type: String,
      required: false,
      default: LEGEND_MIN_TEXT
    },
    /**
     * Text for max amount (overridden by prop if needed for internationalization)
     */
    maxText: {
      type: String,
      required: false,
      default: LEGEND_MAX_TEXT
    },
    /**
     * Sets the display layout
     */
    layout: {
      type: String,
      required: false,
      default: LEGEND_LAYOUT_INLINE,
      validator(layout) {
        return [LEGEND_LAYOUT_INLINE, LEGEND_LAYOUT_TABLE].indexOf(layout) !== -1;
      }
    }
  },
  data() {
    return {
      disabledSeries: {},
      lastActiveSeriesLabel: null
    };
  },
  computed: {
    fontStyle() {
      return {
        fontFamily: this.textStyle.fontFamily || 'sans-serif',
        fontSize: `${this.textStyle.fontSize || defaultFontSize}px`
      };
    },
    hasOneSeriesElement() {
      return this.seriesInfo.length === 1;
    }
  },
  created() {
    this.chart.on('legendselectchanged', this.suppressLastActiveSeriesLabelToggle);
  },
  beforeDestroy() {
    this.chart.off('legendselectchanged', this.suppressLastActiveSeriesLabelToggle);
  },
  methods: {
    sanitizeSeriesData(seriesData) {
      var _seriesData$filter;
      return (_seriesData$filter = seriesData === null || seriesData === void 0 ? void 0 : seriesData.filter(d => !Number.isNaN(d))) !== null && _seriesData$filter !== void 0 ? _seriesData$filter : [];
    },
    seriesAverage(seriesData) {
      const sanitized = this.sanitizeSeriesData(seriesData);
      return engineeringNotation(average(...sanitized));
    },
    seriesMax(seriesData) {
      const sanitized = this.sanitizeSeriesData(seriesData);
      return engineeringNotation(Math.max(...sanitized));
    },
    seriesMin(seriesData) {
      const sanitized = this.sanitizeSeriesData(seriesData);
      return engineeringNotation(Math.min(...sanitized));
    },
    seriesLast(seriesData) {
      const sanitized = this.sanitizeSeriesData(seriesData);
      return engineeringNotation(sanitized[sanitized.length - 1]);
    },
    seriesNameIsLong(seriesName) {
      return seriesName.length > 120;
    },
    handleClick(_ref, key) {
      let {
        name,
        disabled
      } = _ref;
      if (this.hasOneSeriesElement || this.isToggleDisabled(name, disabled)) return;
      this.chart.dispatchAction({
        type: 'legendToggleSelect',
        name
      });
      this.disabledSeries = {
        ...this.disabledSeries,
        [key]: !this.disabledSeries[key]
      };
    },
    handleMouseEnter(name) {
      this.chart.dispatchAction({
        type: 'highlight',
        seriesName: name
      });
    },
    handleMouseLeave(name) {
      this.chart.dispatchAction({
        type: 'downplay',
        seriesName: name
      });
    },
    getColor(color, key) {
      return this.disabledSeries[key] ? GRAY_200 : color;
    },
    suppressLastActiveSeriesLabelToggle(_ref2) {
      let {
        selected
      } = _ref2;
      const selectedSeriesLabels = Object.entries(selected).filter(_ref3 => {
        let [, isSelected] = _ref3;
        return Boolean(isSelected);
      });
      this.lastActiveSeriesLabel = null;
      if (selectedSeriesLabels.length === 1) {
        const [lastActiveSeriesLabelName] = selectedSeriesLabels[0];
        this.lastActiveSeriesLabel = lastActiveSeriesLabelName;
      }
    },
    /**
     * Disables toggling legend if it is the last active one or if its data series
     * has a disabled property set to true
     * @param {String} name Series name
     * @param {Boolean} isDisabled Value of the series element's disabled property
     * @returns {boolean}
     */
    isToggleDisabled(name, isDisabled) {
      return name === this.lastActiveSeriesLabel || isDisabled;
    }
  },
  legendLayoutTypes: {
    LEGEND_LAYOUT_INLINE,
    LEGEND_LAYOUT_TABLE
  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"gl-legend",attrs:{"data-testid":"gl-chart-legend"}},[(_vm.layout === _vm.$options.legendLayoutTypes.LEGEND_LAYOUT_INLINE)?[_c('div',{staticClass:"gl-legend-inline"},_vm._l((_vm.seriesInfo),function(series,key){return _c('div',{key:key,staticClass:"gl-legend-inline-series",class:{
          'text-muted': _vm.disabledSeries[key],
          'w-100': _vm.seriesNameIsLong(series.name),
          'gl-hover-cursor-not-allowed!':
            _vm.hasOneSeriesElement || _vm.isToggleDisabled(series.name, series.disabled),
        },style:(_vm.fontStyle),attrs:{"aria-disabled":_vm.hasOneSeriesElement || _vm.isToggleDisabled(series.name, series.disabled),"role":"button"},on:{"click":function($event){return _vm.handleClick(series, key)},"mouseenter":function($event){return _vm.handleMouseEnter(series.name)},"mouseleave":function($event){return _vm.handleMouseLeave(series.name)}}},[_c('gl-chart-series-label',{staticClass:"gl-legend-inline-series-label",class:{ 'w-75': _vm.seriesNameIsLong(series.name) },attrs:{"color":_vm.getColor(series.color, key),"type":series.type}},[_c('gl-truncate',{staticClass:"gl-font-weight-bold",attrs:{"text":series.name}})],1),_vm._v(" "),(series.data && series.data.length)?_c('span',{class:{ 'gl-white-space-nowrap': _vm.seriesNameIsLong(series.name) }},[_vm._v("\n          "+_vm._s(_vm.averageText)+": "+_vm._s(_vm.seriesAverage(series.data))+" · "+_vm._s(_vm.maxText)+":\n          "+_vm._s(_vm.seriesMax(series.data))+"\n        ")]):_vm._e()],1)}),0)]:_vm._e(),_vm._v(" "),(_vm.layout === _vm.$options.legendLayoutTypes.LEGEND_LAYOUT_TABLE)?[_c('div',{staticClass:"gl-legend-tabular",style:(_vm.fontStyle)},[_c('header',{staticClass:"gl-legend-tabular-header"},[_c('div',{staticClass:"gl-legend-tabular-header-cell"},[_vm._v(_vm._s(_vm.minText))]),_vm._v(" "),_c('div',{staticClass:"gl-legend-tabular-header-cell"},[_vm._v(_vm._s(_vm.maxText))]),_vm._v(" "),_c('div',{staticClass:"gl-legend-tabular-header-cell"},[_vm._v(_vm._s(_vm.averageText))]),_vm._v(" "),_c('div',{staticClass:"gl-legend-tabular-header-cell"},[_vm._v(_vm._s(_vm.currentText))])]),_vm._v(" "),_c('section',{staticClass:"gl-legend-tabular-body"},_vm._l((_vm.seriesInfo),function(series,key){return _c('div',{key:key,staticClass:"gl-legend-tabular-row",class:{
            'text-muted': _vm.disabledSeries[key],
            'gl-hover-cursor-not-allowed!':
              _vm.hasOneSeriesElement || _vm.isToggleDisabled(series.name, series.disabled),
          },style:(_vm.fontStyle),attrs:{"aria-disabled":_vm.isToggleDisabled(series.name, series.disabled),"role":"button"},on:{"click":function($event){return _vm.handleClick(series, key)},"mouseenter":function($event){return _vm.handleMouseEnter(series.name)},"mouseleave":function($event){return _vm.handleMouseLeave(series.name)}}},[_c('div',{staticClass:"gl-legend-tabular-title-cell"},[_c('gl-chart-series-label',{style:(_vm.fontStyle),attrs:{"color":_vm.getColor(series.color, key),"type":series.type}},[_c('gl-truncate',{staticClass:"gl-font-weight-bold",attrs:{"text":series.name}})],1)],1),_vm._v(" "),(_vm.sanitizeSeriesData(series.data).length)?[_c('div',{staticClass:"gl-legend-tabular-details-cell"},[_vm._v(_vm._s(_vm.seriesMin(series.data)))]),_vm._v(" "),_c('div',{staticClass:"gl-legend-tabular-details-cell"},[_vm._v(_vm._s(_vm.seriesMax(series.data)))]),_vm._v(" "),_c('div',{staticClass:"gl-legend-tabular-details-cell"},[_vm._v(_vm._s(_vm.seriesAverage(series.data)))]),_vm._v(" "),_c('div',{staticClass:"gl-legend-tabular-details-cell"},[_vm._v(_vm._s(_vm.seriesLast(series.data)))])]:[_c('div',{staticClass:"gl-legend-tabular-details-cell"},[_vm._v("-")]),_vm._v(" "),_c('div',{staticClass:"gl-legend-tabular-details-cell"},[_vm._v("-")]),_vm._v(" "),_c('div',{staticClass:"gl-legend-tabular-details-cell"},[_vm._v("-")]),_vm._v(" "),_c('div',{staticClass:"gl-legend-tabular-details-cell"},[_vm._v("-")])]],2)}),0)])]:_vm._e()],2)};
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
