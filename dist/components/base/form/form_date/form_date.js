import uniqueId from 'lodash/uniqueId';
import GlFormInput from '../form_input/form_input';
import __vue_normalize__ from 'vue-runtime-helpers/dist/normalize-component.js';

var script = {
  name: 'GlFormDate',
  components: {
    GlFormInput
  },
  inheritAttrs: false,
  model: {
    event: 'change',
    prop: 'value'
  },
  props: {
    id: {
      type: String,
      required: false,
      default: null
    },
    min: {
      type: String,
      required: false,
      default: null
    },
    max: {
      type: String,
      required: false,
      default: null
    },
    minInvalidFeedback: {
      type: String,
      required: false,
      default: 'Must be after minimum date'
    },
    maxInvalidFeedback: {
      type: String,
      required: false,
      default: 'Must be before maximum date'
    },
    value: {
      type: String,
      required: false,
      default: null
    }
  },
  data() {
    return {
      currentValue: this.value,
      inputId: this.id || uniqueId('form-date-'),
      invalidFeedbackId: uniqueId('form-date-invalid-feedback-'),
      outputId: uniqueId('form-date-output-'),
      valueAsDate: null
    };
  },
  computed: {
    ariaDescribedBy() {
      return [this.valueAsDate && this.outputId, this.isInvalid && this.invalidFeedbackId].join(' ');
    },
    isLessThanMin() {
      return this.currentValue && this.min && this.currentValue < this.min;
    },
    isGreaterThanMax() {
      return this.currentValue && this.max && this.currentValue > this.max;
    },
    isInvalid() {
      return this.isLessThanMin || this.isGreaterThanMax;
    },
    outputValue() {
      if (!this.valueAsDate) return null;
      return new Intl.DateTimeFormat(undefined, {
        dateStyle: 'full'
      }).format(this.valueAsDate);
    },
    state() {
      return !this.isInvalid;
    }
  },
  watch: {
    value: {
      handler(newValue) {
        this.currentValue = newValue;
        this.updateValueAsDate();
      }
    }
  },
  async mounted() {
    await this.$nextTick();
    this.updateValueAsDate();
  },
  methods: {
    updateValueAsDate() {
      this.valueAsDate = this.$refs.input.$el.valueAsDate;
    },
    onChange($event) {
      /**
       * Emitted when date is changed.
       *
       * @event change
       */
      this.updateValueAsDate();
      this.$emit('change', $event);
    }
  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"gl-form-date"},[_c('gl-form-input',_vm._b({ref:"input",attrs:{"id":_vm.inputId,"aria-describedby":_vm.ariaDescribedBy,"min":_vm.min,"max":_vm.max,"pattern":"\\d{4}-\\d{2}-\\d{2}","placeholder":"yyyy-mm-dd","state":_vm.state,"type":"date"},on:{"change":_vm.onChange},model:{value:(_vm.currentValue),callback:function ($$v) {_vm.currentValue=$$v;},expression:"currentValue"}},'gl-form-input',_vm.$attrs,false)),_vm._v(" "),(_vm.outputValue)?_c('output',{ref:"output",staticClass:"gl-sr-only",attrs:{"id":_vm.outputId,"for":_vm.inputId}},[_vm._v("\n    "+_vm._s(_vm.outputValue)+"\n  ")]):_vm._e(),_vm._v(" "),(_vm.isInvalid)?_c('div',{ref:"invalidFeedback",staticClass:"invalid-feedback",attrs:{"id":_vm.invalidFeedbackId}},[(_vm.isLessThanMin)?[_vm._v("\n      "+_vm._s(_vm.minInvalidFeedback)+"\n    ")]:_vm._e(),_vm._v(" "),(_vm.isGreaterThanMax)?[_vm._v("\n      "+_vm._s(_vm.maxInvalidFeedback)+"\n    ")]:_vm._e()],2):_vm._e()],1)};
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
