import { BModal } from 'bootstrap-vue/esm/index.js';
import { modalSizeOptions, modalButtonDefaults, focusableTags, COMMA } from '../../../utils/constants';
import { logWarning, focusFirstFocusableElement } from '../../../utils/utils';
import CloseButton from '../../shared_components/close_button/close_button';
import GlButton from '../button/button';
import __vue_normalize__ from 'vue-runtime-helpers/dist/normalize-component.js';

//
function validatorHelper(obj) {
  return Object.keys(obj).every(val => val === 'text' || val === 'attributes');
}
var script = {
  name: 'GlModal',
  components: {
    BModal,
    GlButton,
    CloseButton
  },
  inheritAttrs: false,
  model: {
    prop: 'visible',
    event: 'change'
  },
  props: {
    modalId: {
      type: String,
      required: true
    },
    titleTag: {
      type: String,
      required: false,
      default: 'h4'
    },
    title: {
      type: String,
      required: false,
      default: null
    },
    modalClass: {
      type: String,
      required: false,
      default: ''
    },
    actionPrimary: {
      type: Object,
      required: false,
      default: null,
      validator: obj => validatorHelper(obj)
    },
    actionSecondary: {
      type: Object,
      required: false,
      default: null,
      validator: obj => validatorHelper(obj)
    },
    actionCancel: {
      type: Object,
      required: false,
      default: null,
      validator: obj => validatorHelper(obj)
    },
    size: {
      type: String,
      required: false,
      default: modalSizeOptions.md,
      validator: val => Object.keys(modalSizeOptions).includes(val)
    },
    dismissLabel: {
      type: String,
      required: false,
      default: 'Close'
    },
    visible: {
      type: Boolean,
      required: false,
      default: false
    },
    ariaLabel: {
      type: String,
      required: false,
      default: ''
    },
    noFocusOnShow: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    shouldRenderModalOk() {
      // eslint-disable-next-line @gitlab/vue-prefer-dollar-scopedslots
      return Boolean(this.$slots['modal-ok']);
    },
    shouldRenderModalCancel() {
      // eslint-disable-next-line @gitlab/vue-prefer-dollar-scopedslots
      return Boolean(this.$slots['modal-cancel']);
    },
    shouldRenderModalFooter() {
      return Boolean(this.actionCancel || this.actionSecondary || this.actionPrimary ||
      // eslint-disable-next-line @gitlab/vue-prefer-dollar-scopedslots
      this.$slots['modal-footer']);
    }
  },
  mounted() {
    if (!this.ariaLabel && !this.title) {
      logWarning('[gl-modal]: Accessible name for modal missing. Please add title prop or aria-label.', this.$el);
    }
  },
  methods: {
    show() {
      this.$refs.modal.show();
    },
    hide() {
      this.$refs.modal.hide();
    },
    toggle() {
      this.$refs.modal.toggle();
    },
    ok() {
      this.$refs.modal.onOk();
    },
    cancel() {
      this.$refs.modal.onCancel();
    },
    close() {
      this.$refs.modal.onClose();
    },
    primary(event) {
      this.$emit('primary', event);
    },
    canceled(event) {
      this.$emit('canceled', event);
    },
    secondary(event) {
      this.$emit('secondary', event);
      if (!(event !== null && event !== void 0 && event.defaultPrevented)) {
        this.close();
      }
    },
    // set default variant button styling
    buttonBinding(prop, name) {
      if (!prop.attributes) {
        return modalButtonDefaults[name];
      }
      return prop.attributes;
    },
    setFocus() {
      if (this.noFocusOnShow) return;
      const btnElts = [...this.$refs.modal.$refs.modal.querySelectorAll('button')];
      const modalElts = [...this.$refs.modal.$refs.body.querySelectorAll(focusableTags.join(COMMA))];

      // Iterate over the array and if you find the close button,
      // move it to the end
      const closeBtnIndex = btnElts.findIndex(elt => {
        var _this$$refs$closeBut;
        return elt === ((_this$$refs$closeBut = this.$refs['close-button']) === null || _this$$refs$closeBut === void 0 ? void 0 : _this$$refs$closeBut.$el);
      });
      if (closeBtnIndex > -1) {
        btnElts.push(...btnElts.splice(closeBtnIndex, 1));
      }

      // ModalElts are the first choice, the btnElts are a backup
      focusFirstFocusableElement([...modalElts, ...btnElts]);
    }
  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('b-modal',_vm._g(_vm._b({ref:"modal",attrs:{"id":_vm.modalId,"title-tag":_vm.titleTag,"size":_vm.size,"visible":_vm.visible,"aria-label":_vm.ariaLabel || _vm.title,"lazy":"","modal-class":['gl-modal', _vm.modalClass]},on:{"shown":_vm.setFocus,"ok":_vm.primary,"cancel":_vm.canceled,"change":function($event){return _vm.$emit('change', $event)}},scopedSlots:_vm._u([{key:"default",fn:function(){return [_vm._t("default")]},proxy:true},{key:"modal-header",fn:function(){return [_vm._t("modal-header",function(){return [_c('h2',{staticClass:"modal-title"},[_vm._t("modal-title",function(){return [_vm._v(_vm._s(_vm.title))]})],2)]}),_vm._v(" "),_c('close-button',{ref:"close-button",attrs:{"label":_vm.dismissLabel},on:{"click":_vm.close}})]},proxy:true},(_vm.shouldRenderModalOk)?{key:"modal-ok",fn:function(){return [_vm._t("modal-ok")]},proxy:true}:null,(_vm.shouldRenderModalCancel)?{key:"modal-cancel",fn:function(){return [_vm._t("modal-cancel")]},proxy:true}:null,(_vm.shouldRenderModalFooter)?{key:"modal-footer",fn:function(){return [_vm._t("modal-footer",function(){return [(_vm.actionCancel)?_c('gl-button',_vm._b({staticClass:"js-modal-action-cancel",on:{"click":_vm.cancel}},'gl-button',_vm.buttonBinding(_vm.actionCancel, 'actionCancel'),false),[_vm._v("\n        "+_vm._s(_vm.actionCancel.text)+"\n      ")]):_vm._e(),_vm._v(" "),(_vm.actionSecondary)?_c('gl-button',_vm._b({staticClass:"js-modal-action-secondary",on:{"click":_vm.secondary}},'gl-button',_vm.buttonBinding(_vm.actionSecondary, 'actionSecondary'),false),[_vm._v("\n        "+_vm._s(_vm.actionSecondary.text)+"\n      ")]):_vm._e(),_vm._v(" "),(_vm.actionPrimary)?_c('gl-button',_vm._b({staticClass:"js-modal-action-primary",on:{"click":_vm.ok}},'gl-button',_vm.buttonBinding(_vm.actionPrimary, 'actionPrimary'),false),[_vm._v("\n        "+_vm._s(_vm.actionPrimary.text)+"\n      ")]):_vm._e()]})]},proxy:true}:null],null,true)},'b-modal',_vm.$attrs,false),_vm.$listeners))};
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
