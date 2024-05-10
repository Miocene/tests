import uniqueId from 'lodash/uniqueId';
import { tokensValidator } from './helpers';
import GlTokenContainer from './token_container';
import GlTokenSelectorDropdown from './token_selector_dropdown';
import __vue_normalize__ from 'vue-runtime-helpers/dist/normalize-component.js';

var script = {
  name: 'GlTokenSelector',
  componentId: uniqueId('token-selector'),
  components: {
    GlTokenContainer,
    GlTokenSelectorDropdown
  },
  model: {
    prop: 'selectedTokens',
    event: 'input'
  },
  props: {
    /**
     * Items to display in dropdown
     */
    dropdownItems: {
      type: Array,
      // All items need to have an `id` key
      validator: tokensValidator,
      required: false,
      default: () => []
    },
    /**
     * Should users be allowed to add tokens that are not in `dropdown-items`
     */
    allowUserDefinedTokens: {
      type: Boolean,
      required: false,
      default: false
    },
    /**
     * Dropdown items are loading, can be used when requesting new dropdown items
     */
    loading: {
      type: Boolean,
      required: false,
      default: false
    },
    /**
     * Hide the dropdown if `dropdown-items` is empty. Will show `no-results-content` slot if this is `false`
     */
    hideDropdownWithNoItems: {
      type: Boolean,
      required: false,
      default: false
    },
    /**
     * CSS classes to add to the main token selector container (`.gl-token-selector`)
     */
    containerClass: {
      type: String,
      required: false,
      default: ''
    },
    /**
     * CSS classes to add to dropdown menu `ul` element
     */
    menuClass: {
      type: [String, Array, Object],
      required: false,
      default: ''
    },
    /**
     * The autocomplete attribute value for the underlying `input` element
     */
    autocomplete: {
      type: String,
      required: false,
      default: 'off'
    },
    /**
     * The `aria-labelledby` attribute value for the underlying `input` element
     */
    ariaLabelledby: {
      type: String,
      required: false,
      default: null
    },
    /**
     * The `placeholder` attribute value for the underlying `input` element
     */
    placeholder: {
      type: String,
      required: false,
      default: null
    },
    /**
     * HTML attributes to add to the text input. Helpful for adding `data-testid` attributes
     */
    textInputAttrs: {
      type: Object,
      required: false,
      default: null
    },
    /**
     * Controls the validation state appearance of the component. `true` for valid, `false` for invalid, or `null` for no validation state
     */
    state: {
      type: Boolean,
      required: false,
      default: null
    },
    /**
     * Tokens that are selected. This prop will automatically be added when using `v-model`
     */
    selectedTokens: {
      type: Array,
      // All tokens need to have an `id` key
      validator: tokensValidator,
      required: true
    },
    /**
     * Controls the `view-only` mode for the tokens
     */
    viewOnly: {
      type: Boolean,
      required: false,
      default: false
    },
    /**
     * Allows user to bulk delete tokens when enabled
     */
    allowClearAll: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      inputText: '',
      inputFocused: false,
      dropdownIsOpen: false,
      focusedDropdownItem: null,
      triggerTokenFocusNextBackspace: true,
      rootElClasses: '',
      dropdownEventHandlers: {
        handleUpArrow: () => {},
        handleDownArrow: () => {},
        handleHomeKey: () => {},
        handleEndKey: () => {}
      },
      resetFocusedDropdownItem: () => {},
      focusOnToken: () => {}
    };
  },
  computed: {
    filteredDropdownItems() {
      return this.dropdownItems.filter(dropdownItem => this.selectedTokens.findIndex(token => token.id === dropdownItem.id) === -1);
    },
    dropdownHasNoItems() {
      return !this.filteredDropdownItems.length;
    },
    userDefinedTokenCanBeAdded() {
      return this.allowUserDefinedTokens && this.dropdownHasNoItems && this.inputText !== '';
    },
    hideDropdown() {
      if (this.userDefinedTokenCanBeAdded) {
        return false;
      }
      if (this.hideDropdownWithNoItems && this.dropdownHasNoItems) {
        return true;
      }
      return false;
    },
    stateClass() {
      if (this.state === null) {
        return 'gl-inset-border-1-gray-400!';
      }
      return this.state ? 'is-valid gl-inset-border-1-gray-400!' : 'is-invalid gl-inset-border-1-red-500!';
    },
    hasSelectedTokens() {
      return this.selectedTokens.length > 0;
    },
    showEmptyPlaceholder() {
      return !this.hasSelectedTokens && !this.inputFocused;
    },
    showClearAllButton() {
      return this.hasSelectedTokens && this.allowClearAll;
    }
  },
  watch: {
    inputText(newValue, oldValue) {
      if (newValue !== oldValue) {
        /**
         * Fired when user types in the token selector
         *
         * @property {string} inputText
         */
        this.$emit('text-input', newValue);
        this.resetFocusedDropdownItem();
        if (newValue !== '') {
          this.triggerTokenFocusNextBackspace = false;
        } else {
          this.triggerTokenFocusNextBackspace = true;
        }

        // Wait a tick so `text-input` event can be used to validate
        // the value and change the `allowUserDefinedTokens` and/or
        // `hideDropdownWithNoItems` props
        this.$nextTick(() => {
          if (this.hideDropdown) {
            this.closeDropdown();
          } else if (newValue !== '') {
            this.openDropdown();
          }
        });
      }
    }
  },
  methods: {
    handleFocus(event) {
      /**
       * Fired when the token selector is focused
       *
       * @property {FocusEvent} event
       */
      this.$emit('focus', event);
      this.openDropdown();
      this.inputFocused = true;
      this.focusOnToken();
      if (this.inputText === '') {
        this.triggerTokenFocusNextBackspace = true;
      }
    },
    handleBlur(event) {
      /**
       * Fired when the token selector is blurred
       *
       * @property {FocusEvent} event
       */
      this.$emit('blur', event);
      this.inputFocused = false;

      // `event.relatedTarget` returns `null` on Safari because buttons are not focused on click (https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#Clicking_and_focus)
      // Workaround is to:
      // 1. Explicitly focus the dropdown menu item button on `mousedown` event. (see './token_selector_dropdown.vue')
      // 2. Use `nextTick` so `blur` event is fired after the `mousedown` event
      this.$nextTick(() => {
        var _event$relatedTarget, _event$relatedTarget$;
        if (!((_event$relatedTarget = event.relatedTarget) !== null && _event$relatedTarget !== void 0 && (_event$relatedTarget$ = _event$relatedTarget.closest) !== null && _event$relatedTarget$ !== void 0 && _event$relatedTarget$.call(_event$relatedTarget, '.dropdown-item'))) {
          this.closeDropdown();
        }
      });
    },
    handleEnter() {
      if (this.userDefinedTokenCanBeAdded) {
        this.addToken();
      } else if (this.focusedDropdownItem && this.dropdownIsOpen) {
        this.addToken(this.focusedDropdownItem);
      }
    },
    handleEscape() {
      this.inputText = '';
      this.closeDropdown();
    },
    handleBackspace(event) {
      if (this.inputText !== '' || !this.selectedTokens.length) {
        return;
      }

      // Prevent triggering the browser back button
      event.preventDefault();
      if (this.triggerTokenFocusNextBackspace) {
        this.$refs.textInput.blur();
        this.focusOnToken(this.selectedTokens.length - 1);
      } else {
        this.triggerTokenFocusNextBackspace = true;
      }
    },
    handleInputClick() {
      // Open the dropdown if the user clicks an already focused input
      if (this.inputFocused && this.inputText === '' && !this.dropdownIsOpen) {
        this.openDropdown();
      }
    },
    handleContainerClick(event) {
      // Bail if token is clicked
      const {
        target
      } = event;
      if ((target === null || target === void 0 ? void 0 : target.closest('.gl-token')) !== null || this.inputFocused) {
        return;
      }
      this.focusTextInput();
    },
    addToken() {
      let dropdownItem = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      const token = dropdownItem !== null ? dropdownItem : {
        id: uniqueId('user-defined-token'),
        name: this.inputText
      };

      /**
       * Fired when a token is added or removed
       *
       * @property {array} selectedTokens
       */
      this.$emit('input', [...this.selectedTokens, token]);
      this.inputText = '';
      this.closeDropdown();

      /**
       * Fired when a token is added
       *
       * @property {object} token
       */
      this.$emit('token-add', token);
    },
    removeToken(token) {
      /**
       * Fired when user types in the token selector
       *
       * @property {string} inputText
       */
      this.$emit('input', this.selectedTokens.filter(selectedToken => selectedToken.id !== token.id));
      /**
       * Fired when a token is removed
       *
       * @property {object} token
       */
      this.$emit('token-remove', token);
    },
    cancelTokenFocus() {
      this.focusTextInput();
    },
    closeDropdown() {
      this.dropdownIsOpen = false;
      this.resetFocusedDropdownItem();
    },
    openDropdown() {
      if (this.hideDropdown) {
        return;
      }
      this.dropdownIsOpen = true;
    },
    focusTextInput() {
      this.$refs.textInput.focus();
    },
    // Register methods passed as props from child components
    registerDropdownEventHandlers(dropdownEventHandlers) {
      this.dropdownEventHandlers = dropdownEventHandlers;
    },
    registerResetFocusedDropdownItem(resetFocusedDropdownItem) {
      this.resetFocusedDropdownItem = resetFocusedDropdownItem;
    },
    registerFocusOnToken(focusOnToken) {
      this.focusOnToken = focusOnToken;
    },
    clearAll() {
      this.$emit('input', []);
      this.focusTextInput();
    }
  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{ref:"container",staticClass:"gl-token-selector gl-form-input gl-display-flex gl-align-items-center form-control form-control-plaintext gl-cursor-text! gl-py-2! gl-px-3!",class:[_vm.inputFocused ? 'gl-token-selector-focus-glow' : '', _vm.containerClass, _vm.stateClass],on:{"click":_vm.handleContainerClick}},[(_vm.showEmptyPlaceholder)?_vm._t("empty-placeholder"):_vm._e(),_vm._v(" "),_c('gl-token-container',{attrs:{"tokens":_vm.selectedTokens,"state":_vm.state,"register-focus-on-token":_vm.registerFocusOnToken,"view-only":_vm.viewOnly,"show-clear-all-button":_vm.showClearAllButton},on:{"token-remove":_vm.removeToken,"cancel-focus":_vm.cancelTokenFocus,"clear-all":_vm.clearAll},scopedSlots:_vm._u([{key:"token-content",fn:function(ref){
var token = ref.token;
return [_vm._t("token-content",null,{"token":token})]}},{key:"text-input",fn:function(){return [_c('input',_vm._b({ref:"textInput",staticClass:"gl-token-selector-input gl-bg-none gl-font-regular gl-font-base gl-line-height-normal gl-px-1 gl-h-auto gl-text-gray-900 gl-border-none gl-outline-none gl-flex-grow-1 gl-w-40p",attrs:{"type":"text","autocomplete":_vm.autocomplete,"aria-labelledby":_vm.ariaLabelledby,"placeholder":_vm.placeholder,"disabled":_vm.viewOnly},domProps:{"value":_vm.inputText},on:{"input":function($event){_vm.inputText = $event.target.value;},"focus":_vm.handleFocus,"blur":_vm.handleBlur,"keydown":[function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"enter",13,$event.key,"Enter")){ return null; }return _vm.handleEnter.apply(null, arguments)},function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"esc",27,$event.key,["Esc","Escape"])){ return null; }return _vm.handleEscape.apply(null, arguments)},function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"delete",[8,46],$event.key,["Backspace","Delete","Del"])){ return null; }return _vm.handleBackspace.apply(null, arguments)},function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"up",38,$event.key,["Up","ArrowUp"])){ return null; }$event.preventDefault();return _vm.dropdownEventHandlers.handleUpArrow.apply(null, arguments)},function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"down",40,$event.key,["Down","ArrowDown"])){ return null; }$event.preventDefault();return _vm.dropdownEventHandlers.handleDownArrow.apply(null, arguments)},function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"home",undefined,$event.key,undefined)){ return null; }return _vm.dropdownEventHandlers.handleHomeKey.apply(null, arguments)},function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"end",undefined,$event.key,undefined)){ return null; }return _vm.dropdownEventHandlers.handleEndKey.apply(null, arguments)},function($event){$event.stopPropagation();return _vm.$emit('keydown', $event)}],"click":_vm.handleInputClick}},'input',_vm.textInputAttrs,false))]},proxy:true}],null,true)})],2),_vm._v(" "),_c('gl-token-selector-dropdown',{attrs:{"menu-class":_vm.menuClass,"show":_vm.dropdownIsOpen,"loading":_vm.loading,"dropdown-items":_vm.filteredDropdownItems,"selected-tokens":_vm.selectedTokens,"input-text":_vm.inputText,"allow-user-defined-tokens":_vm.allowUserDefinedTokens,"component-id":_vm.$options.componentId,"register-dropdown-event-handlers":_vm.registerDropdownEventHandlers,"register-reset-focused-dropdown-item":_vm.registerResetFocusedDropdownItem},on:{"dropdown-item-click":_vm.addToken,"show":_vm.openDropdown},scopedSlots:_vm._u([{key:"loading-content",fn:function(){return [_vm._t("loading-content")]},proxy:true},{key:"user-defined-token-content",fn:function(){return [_vm._t("user-defined-token-content",null,{"inputText":_vm.inputText})]},proxy:true},{key:"no-results-content",fn:function(){return [_vm._t("no-results-content")]},proxy:true},{key:"dropdown-item-content",fn:function(ref){
var dropdownItem = ref.dropdownItem;
return [_vm._t("dropdown-item-content",null,{"dropdownItem":dropdownItem})]}},{key:"dropdown-footer",fn:function(){return [_vm._t("dropdown-footer")]},proxy:true}],null,true),model:{value:(_vm.focusedDropdownItem),callback:function ($$v) {_vm.focusedDropdownItem=$$v;},expression:"focusedDropdownItem"}})],1)};
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
