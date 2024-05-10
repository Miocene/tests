import Vue from 'vue';
import { BDropdown } from 'bootstrap-vue/esm/index.js';
import { selectAll } from 'bootstrap-vue/esm/utils/dom';
import merge from 'lodash/merge';
import { buttonCategoryOptions, dropdownVariantOptions, buttonSizeOptions } from '../../../utils/constants';
import { filterVisible } from '../../../utils/utils';
import { ButtonMixin } from '../../mixins/button_mixin';
import GlButton from '../button/button';
import GlIcon from '../icon/icon';
import GlLoadingIcon from '../loading_icon/loading_icon';
import GlDropdownDivider from './dropdown_divider';
import __vue_normalize__ from 'vue-runtime-helpers/dist/normalize-component.js';

//
const Selector = {
  ITEM_SELECTOR: '.dropdown-item:not(.disabled):not([disabled]),.form-control:not(.disabled):not([disabled])'
};

// see https://gitlab.com/gitlab-org/gitlab-ui/merge_requests/130#note_126406721
const ExtendedBDropdown = Vue.extend(BDropdown, {
  name: 'ExtendedBDropdown',
  methods: {
    getItems() {
      return filterVisible(selectAll(Selector.ITEM_SELECTOR, this.$refs.menu));
    }
  }
});
const DefaultPopperOptions = {
  modifiers: {
    flip: {
      flipVariationsByContent: true,
      padding: 28
    }
  }
};
var script = {
  name: 'GlDropdown',
  components: {
    BDropdown: ExtendedBDropdown,
    GlButton,
    GlDropdownDivider,
    GlIcon,
    GlLoadingIcon
  },
  mixins: [ButtonMixin],
  inheritAttrs: false,
  props: {
    headerText: {
      type: String,
      required: false,
      default: ''
    },
    hideHeaderBorder: {
      type: Boolean,
      required: false,
      default: true
    },
    showClearAll: {
      type: Boolean,
      required: false,
      default: false
    },
    clearAllText: {
      type: String,
      required: false,
      default: 'Clear all'
    },
    clearAllTextClass: {
      type: String,
      required: false,
      default: 'gl-px-5'
    },
    text: {
      type: String,
      required: false,
      default: ''
    },
    showHighlightedItemsTitle: {
      type: Boolean,
      required: false,
      default: false
    },
    highlightedItemsTitle: {
      type: String,
      required: false,
      default: 'Selected'
    },
    highlightedItemsTitleClass: {
      type: String,
      required: false,
      default: 'gl-px-5'
    },
    textSrOnly: {
      type: Boolean,
      required: false,
      default: false
    },
    split: {
      type: Boolean,
      required: false,
      default: false
    },
    category: {
      type: String,
      required: false,
      default: buttonCategoryOptions.primary,
      validator: value => Object.keys(buttonCategoryOptions).includes(value)
    },
    variant: {
      type: String,
      required: false,
      default: dropdownVariantOptions.default,
      validator: value => Object.keys(dropdownVariantOptions).includes(value)
    },
    size: {
      type: String,
      required: false,
      default: 'medium',
      validator: value => Object.keys(buttonSizeOptions).includes(value)
    },
    icon: {
      type: String,
      required: false,
      default: null
    },
    block: {
      type: Boolean,
      required: false,
      default: false
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    },
    loading: {
      type: Boolean,
      required: false,
      default: false
    },
    toggleClass: {
      type: [String, Array, Object],
      required: false,
      default: null
    },
    right: {
      type: Boolean,
      required: false,
      default: false
    },
    popperOpts: {
      type: Object,
      required: false,
      default: null
    },
    noFlip: {
      type: Boolean,
      required: false,
      default: false
    },
    splitHref: {
      type: String,
      required: false,
      default: ''
    }
  },
  computed: {
    renderCaret() {
      return !this.split;
    },
    isIconOnly() {
      var _this$text;
      return Boolean(this.icon && (!((_this$text = this.text) !== null && _this$text !== void 0 && _this$text.length) || this.textSrOnly) && !this.hasSlotContents('button-text'));
    },
    isIconWithText() {
      var _this$text2;
      return Boolean(this.icon && ((_this$text2 = this.text) === null || _this$text2 === void 0 ? void 0 : _this$text2.length) && !this.textSrOnly);
    },
    toggleButtonClasses() {
      return [this.toggleClass, {
        'gl-button': true,
        'gl-dropdown-toggle': true,
        [`btn-${this.variant}-secondary`]: this.category === buttonCategoryOptions.secondary || this.category === buttonCategoryOptions.tertiary && this.split,
        [`btn-${this.variant}-tertiary`]: this.category === buttonCategoryOptions.tertiary && !this.split,
        'dropdown-icon-only': this.isIconOnly,
        'dropdown-icon-text': this.isIconWithText
      }];
    },
    splitButtonClasses() {
      return [this.toggleClass, {
        'gl-button': true,
        'split-content-button': Boolean(this.text),
        'icon-split-content-button': Boolean(this.icon),
        [`btn-${this.variant}-secondary`]: this.category === buttonCategoryOptions.secondary || this.category === buttonCategoryOptions.tertiary
      }];
    },
    buttonText() {
      return this.split && this.icon ? null : this.text;
    },
    hasHighlightedItemsContent() {
      return this.hasSlotContents('highlighted-items');
    },
    hasHighlightedItemsOrClearAll() {
      return this.hasHighlightedItemsContent && this.showHighlightedItemsTitle || this.showClearAll;
    },
    popperOptions() {
      return merge({}, DefaultPopperOptions, this.popperOpts);
    }
  },
  methods: {
    hasSlotContents(slotName) {
      var _this$$scopedSlots$sl, _this$$scopedSlots;
      return Boolean((_this$$scopedSlots$sl = (_this$$scopedSlots = this.$scopedSlots)[slotName]) === null || _this$$scopedSlots$sl === void 0 ? void 0 : _this$$scopedSlots$sl.call(_this$$scopedSlots));
    },
    show() {
      this.$refs.dropdown.show(...arguments);
    },
    hide() {
      this.$refs.dropdown.hide(...arguments);
    }
  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('b-dropdown',_vm._g(_vm._b({ref:"dropdown",staticClass:"gl-dropdown",attrs:{"split":_vm.split,"variant":_vm.variant,"size":_vm.buttonSize,"toggle-class":[_vm.toggleButtonClasses],"split-class":_vm.splitButtonClasses,"block":_vm.block,"disabled":_vm.disabled || _vm.loading,"right":_vm.right,"popper-opts":_vm.popperOptions,"no-flip":_vm.noFlip,"split-href":_vm.splitHref},scopedSlots:_vm._u([{key:"button-content",fn:function(){return [_vm._t("button-content",function(){return [(_vm.loading)?_c('gl-loading-icon',{class:{ 'gl-mr-2': !_vm.isIconOnly }}):_vm._e(),_vm._v(" "),(_vm.icon && !(_vm.isIconOnly && _vm.loading))?_c('gl-icon',{staticClass:"dropdown-icon",attrs:{"name":_vm.icon}}):_vm._e(),_vm._v(" "),_c('span',{staticClass:"gl-dropdown-button-text",class:{ 'gl-sr-only': _vm.textSrOnly }},[_vm._t("button-text",function(){return [_vm._v(_vm._s(_vm.buttonText))]})],2),_vm._v(" "),(_vm.renderCaret)?_c('gl-icon',{staticClass:"gl-button-icon dropdown-chevron",attrs:{"name":"chevron-down"}}):_vm._e()]})]},proxy:true}],null,true)},'b-dropdown',_vm.$attrs,false),_vm.$listeners),[_c('div',{staticClass:"gl-dropdown-inner"},[(_vm.hasSlotContents('header') || _vm.headerText)?_c('div',{staticClass:"gl-dropdown-header",class:{ 'gl-border-b-0!': _vm.hideHeaderBorder }},[(_vm.headerText)?_c('p',{staticClass:"gl-dropdown-header-top"},[_vm._v("\n        "+_vm._s(_vm.headerText)+"\n      ")]):_vm._e(),_vm._v(" "),_vm._t("header")],2):_vm._e(),_vm._v(" "),(_vm.hasHighlightedItemsOrClearAll)?_c('div',{staticClass:"gl-display-flex gl-flex-direction-row gl-justify-content-space-between gl-align-items-center"},[(_vm.hasHighlightedItemsContent && _vm.showHighlightedItemsTitle)?_c('div',{staticClass:"gl-display-flex gl-flex-grow-1 gl-justify-content-flex-start",class:_vm.highlightedItemsTitleClass},[_c('span',{staticClass:"gl-font-weight-bold",attrs:{"data-testid":"highlighted-items-title"}},[_vm._v(_vm._s(_vm.highlightedItemsTitle))])]):_vm._e(),_vm._v(" "),(_vm.showClearAll)?_c('div',{staticClass:"gl-display-flex gl-flex-grow-1 gl-justify-content-end",class:_vm.clearAllTextClass},[_c('gl-button',{attrs:{"size":"small","category":"tertiary","variant":"link","data-testid":"clear-all-button"},on:{"click":function($event){return _vm.$emit('clear-all', $event)}}},[_vm._v(_vm._s(_vm.clearAllText))])],1):_vm._e()]):_vm._e(),_vm._v(" "),_c('div',{staticClass:"gl-dropdown-contents"},[(_vm.hasHighlightedItemsContent)?_c('div',{staticClass:"gl-overflow-visible",attrs:{"data-testid":"highlighted-items"}},[_vm._t("highlighted-items"),_vm._v(" "),_c('gl-dropdown-divider')],2):_vm._e(),_vm._v(" "),_vm._t("default")],2),_vm._v(" "),(_vm.hasSlotContents('footer'))?_c('div',{staticClass:"gl-dropdown-footer"},[_vm._t("footer")],2):_vm._e()])])};
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
export { DefaultPopperOptions };
