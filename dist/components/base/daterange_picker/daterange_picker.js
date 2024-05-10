import { GlTooltipDirective } from '../../../directives/tooltip';
import { getDateInPast, getDateInFuture, getDayDifference } from '../../../utils/datetime_utility';
import GlDatepicker from '../datepicker/datepicker';
import GlIcon from '../icon/icon';
import __vue_normalize__ from 'vue-runtime-helpers/dist/normalize-component.js';

const CONTAINER_CLASSES = ['gl-display-flex', 'gl-align-items-baseline', 'gl-flex-wrap', 'gl-sm-flex-nowrap', 'gl-sm-gap-3'];
var script = {
  name: 'GlDaterangePicker',
  components: {
    GlDatepicker,
    GlIcon
  },
  directives: {
    GlTooltip: GlTooltipDirective
  },
  props: {
    fromLabel: {
      type: String,
      required: false,
      default: 'From'
    },
    toLabel: {
      type: String,
      required: false,
      default: 'To'
    },
    value: {
      type: Object,
      required: false,
      default: null
    },
    i18n: {
      type: Object,
      required: false,
      default: null
    },
    defaultMinDate: {
      type: Date,
      required: false,
      default: null
    },
    defaultMaxDate: {
      type: Date,
      required: false,
      default: null
    },
    defaultStartDate: {
      type: Date,
      required: false,
      default: null
    },
    defaultEndDate: {
      type: Date,
      required: false,
      default: null
    },
    maxDateRange: {
      type: Number,
      required: false,
      default: 0
    },
    startPickerClass: {
      type: String,
      required: false,
      default: ''
    },
    startPickerTarget: {
      type: String,
      required: false,
      default: ''
    },
    startPickerContainer: {
      type: String,
      required: false,
      default: ''
    },
    endPickerClass: {
      type: String,
      required: false,
      default: ''
    },
    endPickerTarget: {
      type: String,
      required: false,
      default: ''
    },
    endPickerContainer: {
      type: String,
      required: false,
      default: ''
    },
    labelClass: {
      type: String,
      required: false,
      default: ''
    },
    theme: {
      type: String,
      required: false,
      default: ''
    },
    sameDaySelection: {
      type: Boolean,
      required: false,
      default: false
    },
    /**
     * If provided, renders an info icon with a tooltip.
     */
    tooltip: {
      type: String,
      required: false,
      default: ''
    },
    /**
     * Additional class(es) to apply to the date range indicator section.
     */
    dateRangeIndicatorClass: {
      type: [String, Object, Array],
      required: false,
      default: ''
    },
    startOpened: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      fromCalendarMaxDate: this.defaultMaxDate ? getDateInPast(this.defaultMaxDate, 1) : null,
      startDate: this.defaultStartDate,
      endDate: this.defaultEndDate,
      openToCalendar: false
    };
  },
  computed: {
    effectiveMaxDateRange() {
      return this.sameDaySelection ? this.maxDateRange - 1 : this.maxDateRange;
    },
    toCalendarMinDate() {
      if (!this.startDate) return null;
      return this.sameDaySelection ? this.startDate : getDateInFuture(this.startDate, 1);
    },
    toCalendarMaxDate() {
      if (!this.startDate || !this.maxDateRange) return this.defaultMaxDate;
      const computedMaxEndDate = getDateInFuture(this.startDate, this.effectiveMaxDateRange);
      return new Date(Math.min(computedMaxEndDate, this.defaultMaxDate));
    },
    dateRangeViolation() {
      return this.startDate >= this.endDate || this.exceedsDateRange;
    },
    exceedsDateRange() {
      if (this.numberOfDays < 0) {
        return false;
      }
      return this.maxDateRange && this.numberOfDays > this.maxDateRange;
    },
    toCalendarDefaultDate() {
      return this.endDate || this.toCalendarMinDate;
    },
    numericStartTime() {
      return this.startDate ? this.startDate.getTime() : null;
    },
    numberOfDays() {
      if (!this.startDate || !this.endDate) {
        return -1;
      }
      const numberOfDays = getDayDifference(this.startDate, this.endDate);
      return this.sameDaySelection ? numberOfDays + 1 : numberOfDays;
    },
    startContainerClasses() {
      return [this.startPickerClass, ...CONTAINER_CLASSES];
    },
    endContainerClasses() {
      return [this.endPickerClass, ...CONTAINER_CLASSES];
    },
    showIndicator() {
      return Boolean(this.$scopedSlots.default || this.tooltip);
    }
  },
  watch: {
    value(val) {
      const {
        startDate,
        endDate
      } = val;
      this.startDate = startDate;
      this.endDate = endDate;
    }
  },
  methods: {
    onStartDateSelected(startDate) {
      this.startDate = startDate;
      if (this.dateRangeViolation) {
        this.openToCalendar = true;
        this.endDate = null;
      } else this.$emit('input', {
        startDate,
        endDate: this.endDate
      });
    },
    onEndDateSelected(endDate) {
      this.openToCalendar = false;
      this.endDate = endDate;
      /**
       * Emitted when start or end date selected with {startDate, endDate} value
       *
       * @event input
       * */
      this.$emit('input', {
        startDate: this.startDate,
        endDate
      });
    },
    onStartPickerOpen() {
      /**
       * Emitted when the primary action button is clicked.
       *
       * @event start-picker-open
       * */
      this.$emit('start-picker-open');
    },
    onStartPickerClose() {
      /**
       * Emitted when the start date datepicker is hidden.
       *
       * @event start-picker-close
       * */
      this.$emit('start-picker-close');
    },
    onEndPickerOpen() {
      /**
       * Emitted when the end date datepicker becomes visible.
       *
       * @event end-picker-open
       * */
      this.$emit('end-picker-open');
    },
    onEndPickerClose() {
      /**
       * Emitted when the end date datepicker is hidden.
       *
       * @event end-picker-close
       * */
      this.$emit('end-picker-close');
    }
  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"gl-daterange-picker gl-gap-5 gl-display-flex"},[_c('div',{class:_vm.startContainerClasses,attrs:{"data-testid":"daterange-picker-start-container"}},[_c('label',{class:_vm.labelClass},[_vm._v(_vm._s(_vm.fromLabel))]),_vm._v(" "),_c('gl-datepicker',{attrs:{"min-date":_vm.defaultMinDate,"max-date":_vm.fromCalendarMaxDate,"start-range":_vm.defaultMinDate,"end-range":_vm.fromCalendarMaxDate,"theme":_vm.theme,"i18n":_vm.i18n,"target":_vm.startPickerTarget,"container":_vm.startPickerContainer,"start-opened":_vm.startOpened},on:{"input":_vm.onStartDateSelected,"open":_vm.onStartPickerOpen,"close":_vm.onStartPickerClose},model:{value:(_vm.startDate),callback:function ($$v) {_vm.startDate=$$v;},expression:"startDate"}})],1),_vm._v(" "),_c('div',{class:_vm.endContainerClasses,attrs:{"data-testid":"daterange-picker-end-container"}},[_c('label',{class:_vm.labelClass},[_vm._v(_vm._s(_vm.toLabel))]),_vm._v(" "),_c('gl-datepicker',{key:_vm.numericStartTime,attrs:{"min-date":_vm.toCalendarMinDate,"max-date":_vm.toCalendarMaxDate,"start-range":_vm.toCalendarMinDate,"end-range":_vm.toCalendarMaxDate,"theme":_vm.theme,"i18n":_vm.i18n,"target":_vm.endPickerTarget,"container":_vm.endPickerContainer,"start-opened":_vm.openToCalendar,"default-date":_vm.toCalendarDefaultDate},on:{"input":_vm.onEndDateSelected,"open":_vm.onEndPickerOpen,"close":_vm.onEndPickerClose},model:{value:(_vm.endDate),callback:function ($$v) {_vm.endDate=$$v;},expression:"endDate"}})],1),_vm._v(" "),(_vm.showIndicator)?_c('div',{staticClass:"gl-daterange-picker-indicator",class:_vm.dateRangeIndicatorClass,attrs:{"data-testid":"daterange-picker-indicator"}},[_vm._t("default",null,null,{ daysSelected: _vm.numberOfDays }),_vm._v(" "),(_vm.tooltip)?_c('gl-icon',{directives:[{name:"gl-tooltip",rawName:"v-gl-tooltip"}],attrs:{"name":"information-o","title":_vm.tooltip,"size":16}}):_vm._e()],2):_vm._e()])};
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
