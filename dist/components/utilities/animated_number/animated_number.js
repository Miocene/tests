import { formatNumberToLocale } from '../../../utils/number_utils';
import __vue_normalize__ from 'vue-runtime-helpers/dist/normalize-component.js';

var script = {
  name: 'AnimatedNumber',
  props: {
    number: {
      type: Number,
      required: true
    },
    /**
     * Controls how long it takes for the animation to complete.
     */
    duration: {
      type: Number,
      required: false,
      default: 2000
    },
    /**
     * Controls the number of decimal places displayed in the output.
     */
    decimalPlaces: {
      type: Number,
      required: false,
      default: 0
    },
    useDelimiters: {
      type: Boolean,
      required: false,
      default: false
    },
    animateOnMount: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      displayNumber: 0,
      startTime: null
    };
  },
  computed: {
    animatedNumber() {
      const number = this.displayNumber.toFixed(this.decimalPlaces);
      if (this.useDelimiters) {
        return formatNumberToLocale(number, {
          minimumFractionDigits: this.decimalPlaces
        });
      }
      return number;
    }
  },
  ready() {
    this.displayNumber = this.number ? this.number : 0;
  },
  watch: {
    number() {
      this.animate();
    }
  },
  mounted() {
    if (this.animateOnMount) {
      this.animate();
    } else {
      this.displayNumber = this.number;
    }
  },
  methods: {
    animate() {
      this.$emit('animating');
      window.requestAnimationFrame(this.count);
    },
    count(timestamp) {
      if (!this.startTime) {
        this.startTime = timestamp;
      }
      const progress = timestamp - this.startTime;
      if (progress < this.duration) {
        if (this.displayNumber !== this.number) {
          const change = (this.number - this.displayNumber) / (this.duration / 100);
          this.displayNumber += change;
        }
        window.requestAnimationFrame(this.count);
      } else {
        this.displayNumber = this.number; // Ensures that the final number is accurate.
        this.startTime = null;
        this.$emit('animated');
      }
    }
  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('span',[_vm._v(_vm._s(_vm.animatedNumber))])};
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
