import __vue_normalize__ from 'vue-runtime-helpers/dist/normalize-component.js';

/**
 * FormFieldValidator
 *
 * This is an internal component which is used to watch on specific field/value
 * pairs and emits changes to `invalidFeedback`.
 *
 * **why:** Without this separate component, *any* change to *any* value
 * was causing *all* validators to run. A separate renderless component
 * helps us isolate this logic *and* react only to what we need to.
 */
var script = {
  name: 'GlFormFieldValidator',
  props: {
    value: {
      required: true,
      // ESLint requires "validator" or "type". Any kind of value is valid.
      validator: () => true
    },
    validators: {
      type: Array,
      required: false,
      default: () => []
    },
    shouldValidate: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    invalidFeedback() {
      if (!this.shouldValidate) {
        return '';
      }
      const result = this.validators.reduce((acc, validateFn) => {
        // If we already have an invalid message, let's just use that one.
        if (acc) {
          return acc;
        }
        return validateFn(this.value);
      }, '');

      // Force falsey string for type consistency.
      return result || '';
    }
  },
  watch: {
    invalidFeedback(newVal) {
      this.$emit('update', newVal);
    }
  },
  render() {
    return null;
  }
};

/* script */
const __vue_script__ = script;

/* template */

  /* style */
  const __vue_inject_styles__ = undefined;
  /* scoped */
  const __vue_scope_id__ = undefined;
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = undefined;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__ = __vue_normalize__(
    {},
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
