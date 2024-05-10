import GlDropdownItem from '../dropdown/dropdown_item';
import { tokensValidator } from './helpers';
import __vue_normalize__ from 'vue-runtime-helpers/dist/normalize-component.js';

var script = {
  name: 'GlTokenSelectorDropdown',
  components: {
    GlDropdownItem
  },
  props: {
    show: {
      type: Boolean,
      required: true
    },
    menuClass: {
      type: [String, Array, Object],
      required: false,
      default: ''
    },
    loading: {
      type: Boolean,
      required: false,
      default: false
    },
    dropdownItems: {
      type: Array,
      // All items need to have an `id` key
      validator: tokensValidator,
      required: true
    },
    inputText: {
      type: String,
      required: true
    },
    allowUserDefinedTokens: {
      type: Boolean,
      required: true
    },
    componentId: {
      type: String,
      required: true
    },
    registerDropdownEventHandlers: {
      type: Function,
      required: true
    },
    registerResetFocusedDropdownItem: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      focusedDropdownItemIndex: 0
    };
  },
  computed: {
    focusedDropdownItem() {
      return this.dropdownItems[this.focusedDropdownItemIndex];
    }
  },
  watch: {
    focusedDropdownItem(newValue, oldValue) {
      if ((newValue === null || newValue === void 0 ? void 0 : newValue.id) !== (oldValue === null || oldValue === void 0 ? void 0 : oldValue.id)) {
        this.$emit('input', newValue);
        if (!newValue) {
          return;
        }
        const dropdownItemRef = this.getDropdownItemRef(newValue);
        if (dropdownItemRef !== null && dropdownItemRef !== void 0 && dropdownItemRef.$el) {
          dropdownItemRef.$el.scrollIntoView({
            block: 'nearest',
            inline: 'end'
          });
        }
      }
    }
  },
  created() {
    this.registerDropdownEventHandlers({
      handleUpArrow: this.handleUpArrow,
      handleDownArrow: this.handleDownArrow,
      handleHomeKey: this.handleHomeKey,
      handleEndKey: this.handleEndKey
    });
    this.registerResetFocusedDropdownItem(this.resetFocusedDropdownItem);
    this.$emit('input', this.focusedDropdownItem);
  },
  methods: {
    handleDropdownItemClick(dropdownItem) {
      this.$emit('dropdown-item-click', dropdownItem);
    },
    handleMousedown(dropdownItem) {
      // `event.relatedTarget` returns `null` on Safari because buttons are not focused on click (https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#Clicking_and_focus)
      // Because of this we need to manually focus on the button. We do this in `mousedown` because it is fired before the `blur` event
      const dropdownItemRef = dropdownItem === null ? this.$refs.userDefinedTokenDropdownItem : this.getDropdownItemRef(dropdownItem);
      if (dropdownItemRef !== null && dropdownItemRef !== void 0 && dropdownItemRef.$el) {
        dropdownItemRef.$el.querySelector('button').focus();
      }
    },
    handleUpArrow() {
      if (!this.show) {
        return;
      }

      // First dropdown item has been reached
      if (this.focusedDropdownItemIndex === 0) {
        return;
      }
      this.focusPrevDropdownItem();
    },
    handleDownArrow() {
      if (!this.show) {
        this.$emit('show');
        return;
      }

      // Last dropdown item has been reached
      if (this.focusedDropdownItemIndex === this.dropdownItems.length - 1) {
        return;
      }
      this.focusNextDropdownItem();
    },
    handleHomeKey(event) {
      event.preventDefault();
      this.focusFirstDropdownItem();
    },
    handleEndKey(event) {
      event.preventDefault();
      this.focusLastDropdownItem();
    },
    focusLastDropdownItem() {
      this.focusedDropdownItemIndex = this.dropdownItems.length - 1;
    },
    focusFirstDropdownItem() {
      this.focusedDropdownItemIndex = 0;
    },
    focusNextDropdownItem() {
      this.focusedDropdownItemIndex += 1;
    },
    focusPrevDropdownItem() {
      this.focusedDropdownItemIndex -= 1;
    },
    resetFocusedDropdownItem() {
      this.focusedDropdownItemIndex = 0;
    },
    dropdownItemIsFocused(dropdownItem) {
      if (!this.focusedDropdownItem) {
        return false;
      }
      return dropdownItem.id === this.focusedDropdownItem.id;
    },
    getDropdownItemRef(dropdownItem) {
      var _this$$refs$dropdownI;
      return (_this$$refs$dropdownI = this.$refs.dropdownItems) === null || _this$$refs$dropdownI === void 0 ? void 0 : _this$$refs$dropdownI.find(ref => ref.$attrs['data-dropdown-item-id'] === dropdownItem.id);
    },
    dropdownItemIdAttribute(dropdownItem) {
      return dropdownItem ? `${this.componentId}-dropdown-item-${dropdownItem.id}` : null;
    }
  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"dropdown b-dropdown gl-dropdown gl-relative",class:{ show: _vm.show }},[_c('ul',{ref:"dropdownMenu",staticClass:"dropdown-menu gl-absolute",class:[{ show: _vm.show }, _vm.menuClass],attrs:{"role":"menu","aria-activedescendant":_vm.dropdownItemIdAttribute(_vm.focusedDropdownItem)}},[(_vm.loading)?_c('gl-dropdown-item',{attrs:{"disabled":""}},[_vm._t("loading-content",function(){return [_vm._v("Searching...")]})],2):(_vm.dropdownItems.length)?_vm._l((_vm.dropdownItems),function(dropdownItem){return _c('gl-dropdown-item',{key:dropdownItem.id,ref:"dropdownItems",refInFor:true,attrs:{"id":_vm.dropdownItemIdAttribute(dropdownItem),"data-dropdown-item-id":dropdownItem.id,"active":_vm.dropdownItemIsFocused(dropdownItem),"active-class":"is-focused","tabindex":"-1"},on:{"click":function($event){return _vm.handleDropdownItemClick(dropdownItem)}}},[_c('div',{staticClass:"gl-mx-n4 gl-my-n3 gl-px-4 gl-py-3",on:{"mousedown":function($event){return _vm.handleMousedown(dropdownItem)}}},[_vm._t("dropdown-item-content",function(){return [_vm._v("\n            "+_vm._s(dropdownItem.name)+"\n          ")]},{"dropdownItem":dropdownItem})],2)])}):[(_vm.allowUserDefinedTokens && _vm.inputText !== '')?_c('gl-dropdown-item',{ref:"userDefinedTokenDropdownItem",attrs:{"active":"","active-class":"is-focused"},on:{"click":function($event){return _vm.handleDropdownItemClick(null)}}},[_c('div',{staticClass:"gl-mx-n4 gl-my-n3 gl-px-4 gl-py-3",on:{"mousedown":function($event){return _vm.handleMousedown(null)}}},[_vm._t("user-defined-token-content",function(){return [_vm._v("\n            Add \""+_vm._s(_vm.inputText)+"\"\n          ")]},{"inputText":_vm.inputText})],2)]):_c('gl-dropdown-item',{attrs:{"disabled":""}},[_vm._t("no-results-content",function(){return [_vm._v("No matches found")]})],2)],_vm._v(" "),_vm._t("dropdown-footer")],2)])};
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
