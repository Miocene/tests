import { alertVariantOptions, alertVariantIconMap, buttonCategoryOptions } from '../../../utils/constants';
import CloseButton from '../../shared_components/close_button/close_button';
import GlButton from '../button/button';
import GlIcon from '../icon/icon';
import __vue_normalize__ from 'vue-runtime-helpers/dist/normalize-component.js';

//
var script = {
  name: 'GlAlert',
  components: {
    GlIcon,
    CloseButton,
    GlButton
  },
  props: {
    title: {
      type: String,
      required: false,
      default: ''
    },
    /**
     * Controls the dismiss button's visibility.
     */
    dismissible: {
      type: Boolean,
      required: false,
      default: true
    },
    /**
     * Shows icon based on variant.
     */
    showIcon: {
      type: Boolean,
      required: false,
      default: true
    },
    /**
     * Dismiss button's aria-label.
     */
    dismissLabel: {
      type: String,
      required: false,
      default: 'Dismiss'
    },
    variant: {
      type: String,
      required: false,
      default: alertVariantOptions.info,
      validator: value => Object.keys(alertVariantOptions).includes(value)
    },
    /**
     * If provided, renders the primary button as a link.
     */
    primaryButtonLink: {
      type: String,
      required: false,
      default: ''
    },
    /**
     * If provided, renders a primary action button.
     */
    primaryButtonText: {
      type: String,
      required: false,
      default: ''
    },
    /**
     * If provided, renders the secondary button as a link.
     */
    secondaryButtonLink: {
      type: String,
      required: false,
      default: ''
    },
    /**
     * If provided, renders a secondary action button.
     */
    secondaryButtonText: {
      type: String,
      required: false,
      default: ''
    },
    sticky: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    ariaLive() {
      if ([alertVariantOptions.danger, alertVariantOptions.warning].includes(this.variant)) {
        return 'assertive';
      }
      return 'polite';
    },
    role() {
      if ([alertVariantOptions.danger, alertVariantOptions.warning, alertVariantOptions.success].includes(this.variant)) {
        return 'alert';
      }
      return 'status';
    },
    iconName() {
      return alertVariantIconMap[this.variant];
    },
    shouldRenderActions() {
      // eslint-disable-next-line @gitlab/vue-prefer-dollar-scopedslots
      return Boolean(this.$slots.actions || this.actionButtons.length);
    },
    actionButtons() {
      return [{
        text: this.primaryButtonText,
        attrs: {
          href: this.primaryButtonLink,
          variant: 'confirm',
          category: buttonCategoryOptions.primary
        },
        listeners: {
          click: this.primaryButtonClicked
        }
      }, {
        text: this.secondaryButtonText,
        attrs: {
          href: this.secondaryButtonLink,
          variant: 'default',
          category: buttonCategoryOptions.secondary
        },
        listeners: {
          click: this.secondaryButtonClicked
        }
      }].reduce((acc, actionButton) => {
        if (!actionButton.text) return acc;
        const attrs = {
          ...actionButton.attrs
        };
        if (!attrs.href) {
          delete attrs.href;
        }
        acc.push({
          ...actionButton,
          attrs
        });
        return acc;
      }, []);
    },
    variantClass() {
      return `gl-alert-${this.variant}`;
    }
  },
  methods: {
    primaryButtonClicked(event) {
      /**
       * Emitted when the primary action button is clicked.
       *
       * @event primaryAction
       * @type {object}
       */
      this.$emit('primaryAction', event);
    },
    secondaryButtonClicked(event) {
      /**
       * Emitted when the secondary action button is clicked.
       *
       * @event secondaryAction
       * @type {object}
       */
      this.$emit('secondaryAction', event);
    },
    onDismiss() {
      /**
       * Emitted when the dismiss button is clicked.
       *
       * @event dismiss
       * @type {object}
       */
      this.$emit('dismiss');
    }
  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:[
    'gl-alert',
    { 'gl-alert-sticky': _vm.sticky },
    { 'gl-alert-not-dismissible': !_vm.dismissible },
    { 'gl-alert-no-icon': !_vm.showIcon },
    { 'gl-alert-has-title': !!_vm.title },
    _vm.variantClass ]},[(_vm.showIcon)?_c('div',{staticClass:"gl-alert-icon-container"},[_c('gl-icon',{staticClass:"gl-alert-icon",attrs:{"name":_vm.iconName}})],1):_vm._e(),_vm._v(" "),_c('div',{staticClass:"gl-alert-content",attrs:{"role":_vm.role,"aria-live":_vm.ariaLive}},[(_vm.title)?_c('h2',{staticClass:"gl-alert-title"},[_vm._v(_vm._s(_vm.title))]):_vm._e(),_vm._v(" "),_c('div',{staticClass:"gl-alert-body"},[_vm._t("default")],2),_vm._v(" "),(_vm.shouldRenderActions)?_c('div',{staticClass:"gl-alert-actions"},[_vm._t("actions",function(){return _vm._l((_vm.actionButtons),function(actionButton,index){return _c('gl-button',_vm._g(_vm._b({key:index,staticClass:"gl-alert-action"},'gl-button',actionButton.attrs,false),actionButton.listeners),[_vm._v("\n          "+_vm._s(actionButton.text)+"\n        ")])})})],2):_vm._e()]),_vm._v(" "),(_vm.dismissible)?_c('close-button',{ref:"dismiss",staticClass:"gl-dismiss-btn",attrs:{"label":_vm.dismissLabel},on:{"click":_vm.onDismiss}}):_vm._e()],1)};
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
