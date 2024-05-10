import isFunction from 'lodash/isFunction';
import mapValues from 'lodash/mapValues';
import uniqueId from 'lodash/uniqueId';
import GlFormGroup from '../form_group/form_group';
import GlFormInput from '../form_input/form_input';
import GlFormFieldValidator from './form_field_validator';
import __vue_normalize__ from 'vue-runtime-helpers/dist/normalize-component.js';

var script = {
  name: 'GlFormFields',
  components: {
    GlFormGroup,
    GlFormInput,
    GlFormFieldValidator
  },
  model: {
    prop: 'values',
    event: 'input'
  },
  props: {
    /**
     * Object of keys to FieldDefinitions.
     * The shape of the keys will be the same for `values` and what's emitted by the `input` event.
     *
     * @typedef {object} FieldDefinition
     * @template TValue=string
     * @property {string} label - Label text to show for this field.
     * @property {undefined | Object} groupAttrs - Properties that are passed to the group wrapping this field.
     * @property {undefined | Object} inputAttrs - Properties that are passed to the actual input for this field.
     * @property {undefined | function(string): TValue} mapValue - Function that maps the inputted string value to the field's actual value (e.g. a Number).
     * @property {undefined | Array<function(TValue): string | undefined>=} validators - Collection of validator functions.
     *
     * @type {{ [key: string]: FieldDefinition }}
     */
    fields: {
      type: Object,
      required: true
    },
    /**
     * The current value for each field, by key.
     * Keys should match between `values` and `fields`.
     */
    values: {
      type: Object,
      required: true
    },
    /**
     * The id of the form element to handle "submit" listening.
     */
    formId: {
      type: String,
      required: true
    },
    /**
     * Validation errors from the server. Generally passed to the component after making an API call.
     */
    serverValidations: {
      type: Object,
      required: false,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      fieldDirtyStatuses: {},
      fieldValidations: {}
    };
  },
  computed: {
    formElement() {
      return document.getElementById(this.formId);
    },
    fieldValidationProps() {
      return mapValues(this.fields, (_, fieldName) => {
        const invalidFeedback = this.serverValidations[fieldName] || this.fieldValidations[fieldName] || '';
        return {
          invalidFeedback,
          state: invalidFeedback ? false : null
        };
      });
    },
    fieldValues() {
      return mapValues(this.fields, (_, fieldName) => {
        if (fieldName in this.values) {
          return this.values[fieldName];
        }
        return this.getMappedValue(fieldName, undefined);
      });
    },
    fieldNames() {
      return Object.keys(this.fields);
    },
    fieldsToRender() {
      return mapValues(this.fields, (field, fieldName) => {
        const id = uniqueId('gl-form-field-');
        const inputSlotName = `input(${fieldName})`;
        const groupPassthroughSlotName = `group(${fieldName})-`;
        const afterSlotName = `after(${fieldName})`;
        const inputSlot = {
          slotName: inputSlotName,
          attrs: {
            value: this.fieldValues[fieldName],
            input: val => this.onFieldInput(fieldName, val),
            blur: () => this.onFieldBlur(fieldName),
            validation: this.fieldValidationProps[fieldName],
            id
          }
        };
        const groupPassthroughSlots = Object.keys(this.$scopedSlots).filter(slotName => slotName.startsWith(groupPassthroughSlotName)).map(slotName => {
          const childSlotName = slotName.replace(groupPassthroughSlotName, '');
          return {
            slotName,
            childSlotName
          };
        });
        return {
          ...field,
          id,
          label: field.label || fieldName,
          inputSlot,
          groupPassthroughSlots,
          afterSlotName
        };
      });
    }
  },
  mounted() {
    var _this$formElement;
    // why: We emit initial values as a convenience so that `v-model="values"` can be easily initialized.
    this.$emit('input', this.fieldValues);
    (_this$formElement = this.formElement) === null || _this$formElement === void 0 ? void 0 : _this$formElement.addEventListener('submit', this.onFormSubmission);
  },
  destroyed() {
    var _this$formElement2;
    (_this$formElement2 = this.formElement) === null || _this$formElement2 === void 0 ? void 0 : _this$formElement2.removeEventListener('submit', this.onFormSubmission);
  },
  methods: {
    setFieldDirty(fieldName) {
      this.$set(this.fieldDirtyStatuses, fieldName, true);
    },
    setAllFieldsDirty() {
      this.fieldNames.forEach(fieldName => this.setFieldDirty(fieldName));
    },
    hasAllFieldsValid() {
      // note: Only check "fieldNames" since "fields" could have changed since the life of "fieldValidations"
      return this.fieldNames.every(fieldName => !this.fieldValidations[fieldName]);
    },
    async checkBeforeSubmission() {
      this.setAllFieldsDirty();
      await this.$nextTick();
      return this.hasAllFieldsValid();
    },
    getMappedValue(fieldName, val) {
      const field = this.fields[fieldName];
      if (isFunction(field === null || field === void 0 ? void 0 : field.mapValue)) {
        return field.mapValue(val);
      }
      return val;
    },
    onFieldValidationUpdate(fieldName, invalidFeedback) {
      this.$set(this.fieldValidations, fieldName, invalidFeedback);
    },
    onFieldBlur(fieldName) {
      this.setFieldDirty(fieldName);
    },
    onFieldInput(fieldName, inputValue) {
      const val = this.getMappedValue(fieldName, inputValue);

      /**
       * Emitted when any of the form values change. Used by `v-model`.
       */
      this.$emit('input', {
        ...this.values,
        [fieldName]: val
      });

      /**
       * Emitted when a form input emits the `input` event.
       */
      this.$emit('input-field', {
        name: fieldName,
        value: val
      });
    },
    async onFormSubmission(e) {
      e.preventDefault();
      const isValid = await this.checkBeforeSubmission();
      if (isValid) {
        /**
         * Emitted when the form is submitted and all of the form fields are valid.
         */
        this.$emit('submit', e);
      }
    }
  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_vm._l((_vm.fieldsToRender),function(field,fieldName){return [_c('gl-form-group',_vm._b({attrs:{"label":field.label,"label-for":field.id,"invalid-feedback":_vm.fieldValidationProps[fieldName].invalidFeedback,"state":_vm.fieldValidationProps[fieldName].state},scopedSlots:_vm._u([_vm._l((field.groupPassthroughSlots),function(ref){
var slotName = ref.slotName;
var childSlotName = ref.childSlotName;
return {key:childSlotName,fn:function(){return [_vm._t(slotName)]},proxy:true}})],null,true)},'gl-form-group',field.groupAttrs,false),[_c('gl-form-field-validator',{attrs:{"value":_vm.fieldValues[fieldName],"validators":field.validators,"should-validate":_vm.fieldDirtyStatuses[fieldName]},on:{"update":function($event){return _vm.onFieldValidationUpdate(fieldName, $event)}}}),_vm._v(" "),_vm._v(" "),_vm._t(field.inputSlot.slotName,function(){return [_c('gl-form-input',_vm._b({attrs:{"id":field.id,"value":_vm.fieldValues[fieldName],"state":_vm.fieldValidationProps[fieldName].state},on:{"input":function($event){return _vm.onFieldInput(fieldName, $event)},"blur":function($event){return _vm.onFieldBlur(fieldName)}}},'gl-form-input',field.inputAttrs,false))]},null,field.inputSlot.attrs)],2),_vm._v(" "),_vm._t(field.afterSlotName)]})],2)};
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
