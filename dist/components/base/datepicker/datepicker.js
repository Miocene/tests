import isString from 'lodash/isString';
import Pikaday from 'pikaday';
import { defaultDateFormat, datepickerWidthOptionsMap } from '../../../utils/constants';
import { areDatesEqual } from '../../../utils/datetime_utility';
import GlButton from '../button/button';
import GlFormInput from '../form/form_input/form_input';
import GlIcon from '../icon/icon';
import __vue_normalize__ from 'vue-runtime-helpers/dist/normalize-component.js';

//
const pad = function (val) {
  let len = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
  return `0${val}`.slice(-len);
};

/**
 * Used `onSelect` method in pickaday
 * @param {Date} date UTC format
 * @return {String} Date formated in yyyy-mm-dd
 */
const defaultDateFormatter = date => {
  const day = pad(date.getDate());
  const month = pad(date.getMonth() + 1);
  const year = date.getFullYear();
  return `${year}-${month}-${day}`;
};
const isBefore = (compareTo, date) => compareTo && date && date.getTime() < compareTo.getTime();
const highlightPastDates = pikaday => {
  const pikaButtons = pikaday.el.querySelectorAll('.pika-button');
  const today = new Date();
  pikaButtons.forEach(pikaButton => {
    const {
      pikaYear,
      pikaMonth,
      pikaDay
    } = pikaButton.dataset;
    const pikaButtonDate = new Date(pikaYear, pikaMonth, pikaDay);
    if (isBefore(today, pikaButtonDate)) {
      pikaButton.classList.add('is-past-date');
    }
  });
};
var script = {
  name: 'GlDatepicker',
  components: {
    GlFormInput,
    GlIcon,
    GlButton
  },
  props: {
    /**
     * Selector of element that triggers the datepicker. Defaults to the calendar icon. Pass `null` to trigger on input focus.
     */
    target: {
      type: String,
      required: false,
      default: ''
    },
    /**
     * DOM node to render calendar into. Defaults to the datepicker container. Pass `null` to use Pikaday default.
     */
    container: {
      type: String,
      required: false,
      default: ''
    },
    value: {
      type: Date,
      required: false,
      default: null
    },
    minDate: {
      type: Date,
      required: false,
      default: null
    },
    maxDate: {
      type: Date,
      required: false,
      default: null
    },
    startRange: {
      type: Date,
      required: false,
      default: null
    },
    endRange: {
      type: Date,
      required: false,
      default: null
    },
    /**
     * Accepts a function that accepts a date as argument and returns true if the date is disabled.
     */
    disableDayFn: {
      type: Function,
      required: false,
      default: null
    },
    firstDay: {
      type: Number,
      required: false,
      default: 0
    },
    ariaLabel: {
      type: String,
      required: false,
      default: ''
    },
    placeholder: {
      type: String,
      required: false,
      default: defaultDateFormat
    },
    /**
     * Defaults to `off` when datepicker opens on focus, otherwise defaults to `null`.
     */
    autocomplete: {
      type: String,
      required: false,
      default: ''
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    },
    displayField: {
      type: Boolean,
      required: false,
      default: true
    },
    startOpened: {
      type: Boolean,
      required: false,
      default: false
    },
    /**
     * Use this prop to set the initial date for the datepicker.
     */
    defaultDate: {
      type: Date,
      required: false,
      default: null
    },
    i18n: {
      type: Object,
      required: false,
      default: null
    },
    theme: {
      type: String,
      required: false,
      default: ''
    },
    showClearButton: {
      type: Boolean,
      required: false,
      default: false
    },
    inputId: {
      type: String,
      required: false,
      default: null
    },
    inputLabel: {
      type: String,
      required: false,
      default: 'Enter date'
    },
    inputName: {
      type: String,
      required: false,
      default: null
    },
    /**
     * Maximum width of the Datepicker
     */
    width: {
      type: String,
      required: false,
      default: null,
      validator: value => Object.keys(datepickerWidthOptionsMap).includes(value)
    }
  },
  data() {
    return {
      textInput: ''
    };
  },
  computed: {
    formattedDate() {
      return 'calendar' in this ? this.calendar.toString() : '';
    },
    customTrigger() {
      return isString(this.target) && this.target !== '';
    },
    triggerOnFocus() {
      return this.target === null;
    },
    showDefaultField() {
      return !this.customTrigger || this.triggerOnFocus;
    },
    renderClearButton() {
      return this.showClearButton && this.textInput !== '' && !this.disabled;
    },
    inputAutocomplete() {
      if (this.autocomplete !== '') {
        return this.autocomplete;
      }
      if (this.triggerOnFocus) {
        return 'off';
      }
      return null;
    },
    datepickerClasses() {
      return ['gl-datepicker', 'd-inline-block', 'gl-w-full', `gl-form-input-${this.computedWidth}`];
    },
    computedWidth() {
      if (this.width) {
        return this.width;
      }
      return 'md';
    }
  },
  watch: {
    value(val) {
      if (!areDatesEqual(val, this.calendar.getDate())) {
        this.calendar.setDate(val, true);
      }
    },
    minDate(minDate) {
      this.calendar.setMinDate(minDate);
    },
    maxDate(maxDate) {
      this.calendar.setMaxDate(maxDate);
    },
    startRange(startRange) {
      this.calendar.setStartRange(startRange);
    },
    endRange(endRange) {
      this.calendar.setEndRange(endRange);
    }
  },
  mounted() {
    const $parentEl = this.$parent.$el;
    const drawEvent = this.draw.bind(this);
    const pikadayConfig = {
      field: this.$el.querySelector('input[type="text"]'),
      // `position-absolute` is needed because of this bug: https://github.com/Pikaday/Pikaday/issues/840
      theme: `gl-datepicker-theme position-absolute ${this.theme}`,
      defaultDate: this.defaultDate || this.value,
      setDefaultDate: Boolean(this.value) || Boolean(this.defaultDate),
      minDate: this.minDate,
      maxDate: this.maxDate,
      // Only supports default gitlab format YYYY-MM-DD. We have to decide if we want to support other formats.
      format: defaultDateFormat,
      parse: dateString => {
        const parsedDate = Date.parse(dateString.replace(/-/g, '/'));
        return Number.isNaN(parsedDate) ? new Date() : new Date(parsedDate);
      },
      disableDayFn: this.disableDayFn,
      firstDay: this.firstDay,
      ariaLabel: this.ariaLabel,
      toString: date => defaultDateFormatter(date),
      onSelect: this.selected.bind(this),
      onClose: this.closed.bind(this),
      onOpen: this.opened.bind(this),
      onDraw: pikaday => {
        highlightPastDates(pikaday);
        drawEvent();
      }
    };

    // Pass `null` as `target` prop to use the `field` as the trigger (open on focus)
    if (!this.triggerOnFocus && !this.disabled) {
      const trigger = this.customTrigger ? $parentEl.querySelector(this.target) : this.$refs.calendarTriggerBtn.$el;
      pikadayConfig.trigger = trigger;

      // Set `trigger` as the `field` if `field` element doesn't exist (not passed via the slot)
      if (!pikadayConfig.field && this.customTrigger) {
        pikadayConfig.field = trigger;
      }
    }

    // Pass `null` as `container` prop to prevent passing the `container` option to Pikaday
    if (this.container !== null) {
      const container = this.container ? $parentEl.querySelector(this.container) : this.$el;
      pikadayConfig.container = container;
    }
    if (this.i18n) {
      pikadayConfig.i18n = this.i18n;
    }
    this.calendar = new Pikaday(pikadayConfig);
    if (this.startOpened) {
      this.calendar.show();
    }
  },
  beforeDestroy() {
    this.calendar.destroy();
  },
  methods: {
    // is used to open datepicker programmatically
    show() {
      this.calendar.show();
    },
    selected(date) {
      /**
       * Emitted when a new date has been selected.
       * @property {Date} date The selected date
       */
      this.$emit('input', date);
    },
    closed() {
      /**
       * Emitted when the datepicker is hidden.
       */
      this.$emit('close');
    },
    opened() {
      /**
       * Emitted when the datepicker becomes visible.
       */
      this.$emit('open');
    },
    cleared() {
      this.textInput = '';
      /**
       * Emitted when the clear button is clicked.
       */
      this.$emit('clear');
    },
    draw() {
      /**
       * Emitted when the datepicker draws a new month.
       */
      this.$emit('monthChange');
    },
    onKeydown() {
      if (this.textInput === '') {
        const resetDate = this.minDate || null;
        this.calendar.setDate(resetDate);
        this.selected(resetDate);
      }
    }
  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:_vm.datepickerClasses},[(_vm.showDefaultField)?_c('div',{staticClass:"gl-relative"},[_vm._t("default",function(){return [_c('gl-form-input',{staticClass:"gl-w-full",class:_vm.renderClearButton ? 'gl-pr-9!' : 'gl-pr-7!',attrs:{"id":_vm.inputId,"name":_vm.inputName,"data-testid":"gl-datepicker-input","value":_vm.formattedDate,"placeholder":_vm.placeholder,"autocomplete":_vm.inputAutocomplete,"disabled":_vm.disabled,"aria-label":_vm.inputLabel},on:{"keydown":function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"enter",13,$event.key,"Enter")){ return null; }return _vm.onKeydown.apply(null, arguments)}},model:{value:(_vm.textInput),callback:function ($$v) {_vm.textInput=$$v;},expression:"textInput"}})]},{"formattedDate":_vm.formattedDate}),_vm._v(" "),_c('div',{staticClass:"gl-datepicker-actions"},[(_vm.renderClearButton)?_c('gl-button',{staticClass:"gl-pointer-events-auto",attrs:{"data-testid":"clear-button","aria-label":"Clear date","category":"tertiary","size":"small","icon":"clear"},on:{"click":_vm.cleared}}):_vm._e(),_vm._v(" "),(_vm.triggerOnFocus || _vm.disabled)?_c('span',{staticClass:"gl-px-2",class:_vm.disabled ? 'gl-text-gray-400' : 'gl-text-gray-500',attrs:{"data-testid":"datepicker-calendar-icon"}},[_c('gl-icon',{staticClass:"gl-display-block",attrs:{"name":"calendar","size":16}})],1):_c('gl-button',{ref:"calendarTriggerBtn",staticClass:"gl-pointer-events-auto",attrs:{"aria-label":"Open datepicker","category":"tertiary","size":"small","icon":"calendar"}})],1)],2):_vm._t("default",null,{"formattedDate":_vm.formattedDate})],2)};
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
export { defaultDateFormatter, pad };
