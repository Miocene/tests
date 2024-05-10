import clamp from 'lodash/clamp';
import uniqueId from 'lodash/uniqueId';
import { stopEvent, filterVisible } from '../../../../utils/utils';
import { GL_DROPDOWN_SHOWN, GL_DROPDOWN_HIDDEN, GL_DROPDOWN_BEFORE_CLOSE, GL_DROPDOWN_FOCUS_CONTENT, POSITION_ABSOLUTE, POSITION_FIXED, HOME, END, ARROW_UP, ARROW_DOWN, ENTER, SPACE, GL_DROPDOWN_CONTENTS_CLASS } from '../constants';
import { buttonCategoryOptions, dropdownVariantOptions, buttonSizeOptions, dropdownPlacements } from '../../../../utils/constants';
import GlBaseDropdown, { BASE_DROPDOWN_CLASS } from '../base_dropdown/base_dropdown';
import GlDisclosureDropdownItem, { ITEM_CLASS } from './disclosure_dropdown_item';
import GlDisclosureDropdownGroup from './disclosure_dropdown_group';
import { itemsValidator, hasOnlyListItems, isItem } from './utils';
import __vue_normalize__ from 'vue-runtime-helpers/dist/normalize-component.js';

//
const DROPDOWN_SELECTOR = `.${BASE_DROPDOWN_CLASS}`;
const ITEM_SELECTOR = `.${ITEM_CLASS}`;
var script = {
  name: 'GlDisclosureDropdown',
  events: {
    GL_DROPDOWN_SHOWN,
    GL_DROPDOWN_HIDDEN,
    GL_DROPDOWN_BEFORE_CLOSE,
    GL_DROPDOWN_FOCUS_CONTENT
  },
  components: {
    GlBaseDropdown,
    GlDisclosureDropdownItem,
    GlDisclosureDropdownGroup
  },
  props: {
    /**
     * Items to display in the dropdown
     */
    items: {
      type: Array,
      required: false,
      default: () => [],
      validator: itemsValidator
    },
    /**
     * Toggle button text
     */
    toggleText: {
      type: String,
      required: false,
      default: ''
    },
    /**
     * Toggle text to be read by screen readers only
     */
    textSrOnly: {
      type: Boolean,
      required: false,
      default: false
    },
    /**
     * Styling option - dropdown's toggle category
     */
    category: {
      type: String,
      required: false,
      default: buttonCategoryOptions.primary,
      validator: value => value in buttonCategoryOptions
    },
    /**
     * Styling option - dropdown's toggle variant
     */
    variant: {
      type: String,
      required: false,
      default: dropdownVariantOptions.default,
      validator: value => value in dropdownVariantOptions
    },
    /**
     * The size of the dropdown toggle
     */
    size: {
      type: String,
      required: false,
      default: 'medium',
      validator: value => value in buttonSizeOptions
    },
    /**
     * Icon name that will be rendered in the toggle button
     */
    icon: {
      type: String,
      required: false,
      default: ''
    },
    /**
     * Set to "true" to disable the dropdown
     */
    disabled: {
      type: Boolean,
      required: false,
      default: false
    },
    /**
     * Set to "true" when dropdown content (items) is loading
     * It will render a small loader in the dropdown toggle and make it disabled
     */
    loading: {
      type: Boolean,
      required: false,
      default: false
    },
    /**
     * Custom toggle id.
     * For instance, it can be referenced by tooltip or popover
     */
    toggleId: {
      type: String,
      required: false,
      default: () => uniqueId('dropdown-toggle-btn-')
    },
    /**
     * Additional CSS classes to customize toggle appearance
     */
    toggleClass: {
      type: [String, Array, Object],
      required: false,
      default: null
    },
    /**
     * Set to "true" to hide the caret
     */
    noCaret: {
      type: Boolean,
      required: false,
      default: false
    },
    /**
     * Align disclosure dropdown with respect to the toggle button
     */
    placement: {
      type: String,
      required: false,
      default: 'bottom-start',
      validator: value => Object.keys(dropdownPlacements).includes(value)
    },
    /**
     * The `aria-labelledby` attribute value for the toggle button
     * Provide the string of ids seperated by space
     */
    toggleAriaLabelledBy: {
      type: String,
      required: false,
      default: null
    },
    /**
     * The `aria-labelledby` attribute value for the list of options
     * Provide the string of ids seperated by space
     */
    listAriaLabelledBy: {
      type: String,
      required: false,
      default: null
    },
    /**
     * Render the toggle button as a block element
     */
    block: {
      type: Boolean,
      required: false,
      default: false
    },
    /**
     * Custom offset to be applied to Floating UI's offset middleware.
     * https://floating-ui.com/docs/offset
     */
    dropdownOffset: {
      type: [Number, Object],
      required: false,
      default: undefined
    },
    /**
     * Lets the dropdown extend to match its content's width, up to a maximum width
     * defined by the `$gl-new-dropdown-max-width` variable.
     */
    fluidWidth: {
      type: Boolean,
      required: false,
      default: false
    },
    /**
     * Close the dropdown on item click (action)
     */
    autoClose: {
      type: Boolean,
      required: false,
      default: true
    },
    /**
     * Strategy to be applied by computePosition. If the dropdown's container is too short for it to
     * fit in, setting this to fixed will let it position itself above its container.
     * https://floating-ui.com/docs/computePosition#strategy
     */
    positioningStrategy: {
      type: String,
      required: false,
      default: POSITION_ABSOLUTE,
      validator: strategy => [POSITION_ABSOLUTE, POSITION_FIXED].includes(strategy)
    },
    /**
     * Opens dropdown on render
     */
    startOpened: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      disclosureId: uniqueId('disclosure-'),
      nextFocusedItemIndex: null
    };
  },
  computed: {
    disclosureTag() {
      var _this$items;
      if ((_this$items = this.items) !== null && _this$items !== void 0 && _this$items.length ||
      // eslint-disable-next-line @gitlab/vue-prefer-dollar-scopedslots
      hasOnlyListItems(this.$scopedSlots.default || this.$slots.default)) {
        return 'ul';
      }
      return 'div';
    },
    hasCustomToggle() {
      return Boolean(this.$scopedSlots.toggle);
    }
  },
  mounted() {
    if (this.startOpened) {
      this.open();
    }
  },
  methods: {
    open() {
      this.$refs.baseDropdown.open();
    },
    close() {
      this.$refs.baseDropdown.close();
    },
    onShow() {
      /**
       * Emitted when dropdown is shown
       *
       * @event shown
       */
      this.$emit(GL_DROPDOWN_SHOWN);
    },
    onBeforeClose(event) {
      /**
       * Emitted when dropdown is about to be closed
       *
       * @event beforeClose
       */
      this.$emit(GL_DROPDOWN_BEFORE_CLOSE, event);
    },
    onHide() {
      /**
       * Emitted when dropdown is hidden
       *
       * @event hidden
       */
      this.$emit(GL_DROPDOWN_HIDDEN);
      this.nextFocusedItemIndex = null;
    },
    onKeydown(event) {
      const {
        code
      } = event;
      const elements = this.getFocusableListItemElements();
      if (elements.length < 1) return;
      let stop = true;
      if (code === HOME) {
        this.focusItem(0, elements);
      } else if (code === END) {
        this.focusItem(elements.length - 1, elements);
      } else if (code === ARROW_UP) {
        this.focusNextItem(event, elements, -1);
      } else if (code === ARROW_DOWN) {
        this.focusNextItem(event, elements, 1);
      } else if (code === ENTER || code === SPACE) {
        this.handleAutoClose(event);
      } else {
        stop = false;
      }
      if (stop) {
        stopEvent(event);
      }
    },
    getFocusableListItemElements() {
      var _this$$refs$content;
      const items = (_this$$refs$content = this.$refs.content) === null || _this$$refs$content === void 0 ? void 0 : _this$$refs$content.querySelectorAll(ITEM_SELECTOR);
      return filterVisible(Array.from(items || []));
    },
    focusNextItem(event, elements, offset) {
      const {
        target
      } = event;
      const currentIndex = elements.indexOf(target);
      const nextIndex = clamp(currentIndex + offset, 0, elements.length - 1);
      this.focusItem(nextIndex, elements);
    },
    focusItem(index, elements) {
      var _elements$index;
      this.nextFocusedItemIndex = index;
      (_elements$index = elements[index]) === null || _elements$index === void 0 ? void 0 : _elements$index.focus();
    },
    closeAndFocus() {
      this.$refs.baseDropdown.closeAndFocus();
    },
    handleAction(action) {
      /**
       * Emitted when one of disclosure dropdown items is clicked
       *
       * @event action
       */
      this.$emit('action', action);
    },
    handleAutoClose(e) {
      if (this.autoClose && e.target.closest(ITEM_SELECTOR) && e.target.closest(DROPDOWN_SELECTOR) === this.$refs.baseDropdown.$el) {
        this.closeAndFocus();
      }
    },
    uniqueItemId() {
      return uniqueId(`disclosure-item-`);
    },
    isItem
  },
  GL_DROPDOWN_CONTENTS_CLASS
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('gl-base-dropdown',{ref:"baseDropdown",staticClass:"gl-disclosure-dropdown",attrs:{"aria-labelledby":_vm.toggleAriaLabelledBy,"toggle-id":_vm.toggleId,"toggle-text":_vm.toggleText,"toggle-class":_vm.toggleClass,"text-sr-only":_vm.textSrOnly,"category":_vm.category,"variant":_vm.variant,"size":_vm.size,"icon":_vm.icon,"disabled":_vm.disabled,"loading":_vm.loading,"no-caret":_vm.noCaret,"placement":_vm.placement,"block":_vm.block,"offset":_vm.dropdownOffset,"fluid-width":_vm.fluidWidth,"positioning-strategy":_vm.positioningStrategy},on:_vm._d({},[_vm.$options.events.GL_DROPDOWN_SHOWN,_vm.onShow,_vm.$options.events.GL_DROPDOWN_HIDDEN,_vm.onHide,_vm.$options.events.GL_DROPDOWN_BEFORE_CLOSE,_vm.onBeforeClose,_vm.$options.events.GL_DROPDOWN_FOCUS_CONTENT,_vm.onKeydown]),scopedSlots:_vm._u([(_vm.hasCustomToggle)?{key:"toggle",fn:function(){return [_vm._t("toggle")]},proxy:true}:null],null,true)},[_vm._v(" "),_vm._t("header"),_vm._v(" "),_c(_vm.disclosureTag,{ref:"content",tag:"component",class:_vm.$options.GL_DROPDOWN_CONTENTS_CLASS,attrs:{"id":_vm.disclosureId,"aria-labelledby":_vm.listAriaLabelledBy || _vm.toggleId,"data-testid":"disclosure-content","tabindex":"-1"},on:{"keydown":_vm.onKeydown,"click":_vm.handleAutoClose}},[_vm._t("default",function(){return [_vm._l((_vm.items),function(item,index){return [(_vm.isItem(item))?[_c('gl-disclosure-dropdown-item',{key:_vm.uniqueItemId(),attrs:{"item":item},on:{"action":_vm.handleAction},scopedSlots:_vm._u([('list-item' in _vm.$scopedSlots)?{key:"list-item",fn:function(){return [_vm._t("list-item",null,{"item":item})]},proxy:true}:null],null,true)})]:[_c('gl-disclosure-dropdown-group',{key:item.name,attrs:{"bordered":index !== 0,"group":item},on:{"action":_vm.handleAction},scopedSlots:_vm._u([(_vm.$scopedSlots['group-label'])?{key:"group-label",fn:function(){return [_vm._t("group-label",null,{"group":item})]},proxy:true}:null],null,true)},[_vm._v(" "),(_vm.$scopedSlots['list-item'])?_vm._l((item.items),function(groupItem){return _c('gl-disclosure-dropdown-item',{key:_vm.uniqueItemId(),attrs:{"item":groupItem},on:{"action":_vm.handleAction},scopedSlots:_vm._u([{key:"list-item",fn:function(){return [_vm._t("list-item",null,{"item":groupItem})]},proxy:true}],null,true)})}):_vm._e()],2)]]})]})],2),_vm._v(" "),_vm._t("footer")],2)};
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
export { DROPDOWN_SELECTOR, ITEM_SELECTOR };
