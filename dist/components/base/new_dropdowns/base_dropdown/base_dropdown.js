import uniqueId from 'lodash/uniqueId';
import { offset, autoPlacement, shift, size, autoUpdate, computePosition } from '@floating-ui/dom';
import { buttonCategoryOptions, dropdownVariantOptions, buttonSizeOptions, dropdownPlacements, dropdownAllowedAutoPlacements } from '../../../../utils/constants';
import { POSITION_ABSOLUTE, POSITION_FIXED, GL_DROPDOWN_HORIZONTAL_BOUNDARY_SELECTOR, GL_DROPDOWN_CONTENTS_CLASS, GL_DROPDOWN_BEFORE_CLOSE, GL_DROPDOWN_SHOWN, GL_DROPDOWN_HIDDEN, ENTER, SPACE, ARROW_DOWN, GL_DROPDOWN_FOCUS_CONTENT } from '../constants';
import { logWarning, getHorizontalBoundingClientRect, isElementFocusable, isElementTabbable } from '../../../../utils/utils';
import GlButton from '../../button/button';
import GlIcon from '../../icon/icon';
import { OutsideDirective } from '../../../../directives/outside/outside';
import { DEFAULT_OFFSET, FIXED_WIDTH_CLASS } from './constants';
import __vue_normalize__ from 'vue-runtime-helpers/dist/normalize-component.js';

const BASE_DROPDOWN_CLASS = 'gl-new-dropdown';
var script = {
  name: 'BaseDropdown',
  BASE_DROPDOWN_CLASS,
  components: {
    GlButton,
    GlIcon
  },
  directives: {
    Outside: OutsideDirective
  },
  props: {
    toggleText: {
      type: String,
      required: false,
      default: ''
    },
    textSrOnly: {
      type: Boolean,
      required: false,
      default: false
    },
    block: {
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
      default: ''
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
    noCaret: {
      type: Boolean,
      required: false,
      default: false
    },
    placement: {
      type: String,
      required: false,
      default: 'bottom-start',
      validator: value => {
        if (['left', 'center', 'right'].includes(value)) {
          logWarning(`GlDisclosureDropdown/GlCollapsibleListbox: "${value}" placement is deprecated.
            Use ${dropdownPlacements[value]} instead.`);
        }
        return Object.keys(dropdownPlacements).includes(value);
      }
    },
    // ARIA props
    ariaHaspopup: {
      type: [String, Boolean],
      required: false,
      default: false,
      validator: value => {
        return ['menu', 'listbox', 'tree', 'grid', 'dialog', true, false].includes(value);
      }
    },
    /**
     * Id that will be referenced by `aria-labelledby` attribute of the dropdown content`
     */
    toggleId: {
      type: String,
      required: true
    },
    /**
     * The `aria-labelledby` attribute value for the  toggle `button`
     */
    ariaLabelledby: {
      type: String,
      required: false,
      default: null
    },
    /**
     * Custom value to be passed to the offset middleware.
     * https://floating-ui.com/docs/offset
     */
    offset: {
      type: [Number, Object],
      required: false,
      default: () => ({
        mainAxis: DEFAULT_OFFSET
      })
    },
    fluidWidth: {
      type: Boolean,
      required: false,
      default: false
    },
    /**
     * Strategy to be applied by computePosition. If this is set to fixed, the dropdown's position
     * needs to be set to fixed in CSS as well.
     * https://floating-ui.com/docs/computePosition#strategy
     */
    positioningStrategy: {
      type: String,
      required: false,
      default: POSITION_ABSOLUTE,
      validator: strategy => [POSITION_ABSOLUTE, POSITION_FIXED].includes(strategy)
    }
  },
  data() {
    return {
      openedYet: false,
      visible: false,
      baseDropdownId: uniqueId('base-dropdown-')
    };
  },
  computed: {
    hasNoVisibleToggleText() {
      var _this$toggleText;
      return !((_this$toggleText = this.toggleText) !== null && _this$toggleText !== void 0 && _this$toggleText.length) || this.textSrOnly;
    },
    isIconOnly() {
      return Boolean(this.icon && this.hasNoVisibleToggleText);
    },
    isCaretOnly() {
      return !this.noCaret && !this.icon && this.hasNoVisibleToggleText;
    },
    ariaAttributes() {
      return {
        'aria-haspopup': this.ariaHaspopup,
        'aria-expanded': String(this.visible),
        'aria-controls': this.baseDropdownId,
        'aria-labelledby': this.toggleLabelledBy
      };
    },
    toggleButtonClasses() {
      return [this.toggleClass, {
        'gl-new-dropdown-toggle': true,
        'gl-new-dropdown-icon-only btn-icon': this.isIconOnly,
        'gl-new-dropdown-toggle-no-caret': this.noCaret,
        'gl-new-dropdown-caret-only': this.isCaretOnly
      }];
    },
    toggleButtonTextClasses() {
      return this.block ? 'gl-w-full' : '';
    },
    toggleLabelledBy() {
      return this.ariaLabelledby ? `${this.ariaLabelledby} ${this.toggleId}` : this.toggleId;
    },
    isDefaultToggle() {
      return !this.$scopedSlots.toggle;
    },
    toggleOptions() {
      if (this.isDefaultToggle) {
        return {
          is: GlButton,
          icon: this.icon,
          block: this.block,
          buttonTextClasses: this.toggleButtonTextClasses,
          category: this.category,
          variant: this.variant,
          size: this.size,
          disabled: this.disabled,
          loading: this.loading,
          class: this.toggleButtonClasses,
          ...this.ariaAttributes,
          listeners: {
            keydown: event => this.onKeydown(event),
            click: event => this.toggle(event)
          }
        };
      }
      return {
        is: 'div',
        class: 'gl-new-dropdown-custom-toggle',
        listeners: {
          keydown: event => this.onKeydown(event),
          click: event => this.toggle(event)
        }
      };
    },
    toggleListeners() {
      return this.toggleOptions.listeners;
    },
    toggleAttributes() {
      const {
        listeners,
        is,
        ...attributes
      } = this.toggleOptions;
      return attributes;
    },
    toggleComponent() {
      return this.toggleOptions.is;
    },
    toggleElement() {
      var _this$$refs$toggle;
      return this.$refs.toggle.$el || ((_this$$refs$toggle = this.$refs.toggle) === null || _this$$refs$toggle === void 0 ? void 0 : _this$$refs$toggle.firstElementChild);
    },
    panelClasses() {
      return {
        'gl-display-block!': this.visible,
        [FIXED_WIDTH_CLASS]: !this.fluidWidth,
        'gl-fixed': this.openedYet && this.isFixed,
        'gl-absolute': this.openedYet && !this.isFixed
      };
    },
    isFixed() {
      return this.positioningStrategy === POSITION_FIXED;
    },
    floatingUIConfig() {
      const placement = dropdownPlacements[this.placement];
      const [, alignment] = placement.split('-');
      return {
        placement,
        strategy: this.positioningStrategy,
        middleware: [offset(this.offset), autoPlacement(() => {
          const autoHorizontalBoundary = getHorizontalBoundingClientRect(this.$el.closest(GL_DROPDOWN_HORIZONTAL_BOUNDARY_SELECTOR));
          return {
            alignment,
            boundary: autoHorizontalBoundary || 'clippingAncestors',
            allowedPlacements: dropdownAllowedAutoPlacements[this.placement]
          };
        }), shift(), size({
          apply: _ref => {
            var _this$nonScrollableCo;
            let {
              availableHeight,
              elements
            } = _ref;
            const contentsEl = elements.floating.querySelector(`.${GL_DROPDOWN_CONTENTS_CLASS}`);
            if (!contentsEl) {
              return;
            }
            const contentsAvailableHeight = availableHeight - ((_this$nonScrollableCo = this.nonScrollableContentHeight) !== null && _this$nonScrollableCo !== void 0 ? _this$nonScrollableCo : 0) - DEFAULT_OFFSET;
            Object.assign(contentsEl.style, {
              maxHeight: `${Math.max(contentsAvailableHeight, 0)}px`
            });
          }
        })]
      };
    }
  },
  watch: {
    ariaAttributes: {
      deep: true,
      handler(ariaAttributes) {
        if (this.$scopedSlots.toggle) {
          Object.keys(ariaAttributes).forEach(key => {
            this.toggleElement.setAttribute(key, ariaAttributes[key]);
          });
        }
      }
    }
  },
  mounted() {
    this.checkToggleFocusable();
  },
  beforeDestroy() {
    this.stopFloating();
  },
  methods: {
    checkToggleFocusable() {
      if (!isElementFocusable(this.toggleElement) && !isElementTabbable(this.toggleElement)) {
        logWarning(`GlDisclosureDropdown/GlCollapsibleListbox: Toggle is missing a 'tabindex' and cannot be focused.
          Use 'a' or 'button' element instead or make sure to add 'role="button"' along with 'tabindex' otherwise.`, this.$el);
      }
    },
    async startFloating() {
      this.calculateNonScrollableAreaHeight();
      this.observer = new MutationObserver(this.calculateNonScrollableAreaHeight);
      this.observer.observe(this.$refs.content, {
        attributes: false,
        childList: true,
        subtree: true
      });
      this.stopAutoUpdate = autoUpdate(this.toggleElement, this.$refs.content, async () => {
        const {
          x,
          y
        } = await computePosition(this.toggleElement, this.$refs.content, this.floatingUIConfig);

        /**
         * Due to the asynchronous nature of computePosition, it's technically possible for the
         * component to have been destroyed by the time the promise resolves. In such case, we exit
         * early to prevent a TypeError.
         */
        if (!this.$refs.content) return;
        Object.assign(this.$refs.content.style, {
          left: `${x}px`,
          top: `${y}px`
        });
      });
    },
    stopFloating() {
      var _this$observer, _this$stopAutoUpdate;
      (_this$observer = this.observer) === null || _this$observer === void 0 ? void 0 : _this$observer.disconnect();
      (_this$stopAutoUpdate = this.stopAutoUpdate) === null || _this$stopAutoUpdate === void 0 ? void 0 : _this$stopAutoUpdate.call(this);
    },
    async toggle(event) {
      if (event && this.visible) {
        let prevented = false;
        this.$emit(GL_DROPDOWN_BEFORE_CLOSE, {
          originalEvent: event,
          preventDefault() {
            prevented = true;
          }
        });
        if (prevented) return false;
      }
      this.visible = !this.visible;
      if (this.visible) {
        // The dropdown needs to be actually visible before we compute its position with Floating UI.
        await this.$nextTick();
        this.openedYet = true;
        /**
         * We wait until the dropdown's position has been computed before emitting the `shown` event.
         * This ensures that, if the parent component attempts to focus an inner element, the dropdown
         * is already properly placed in the page. Otherwise, the page would scroll back to the top.
         */
        this.startFloating();
        this.$emit(GL_DROPDOWN_SHOWN);
      } else {
        this.stopFloating();
        this.$emit(GL_DROPDOWN_HIDDEN);
      }

      // this is to check whether `toggle` was prevented or not
      return true;
    },
    open() {
      if (this.visible) {
        return;
      }
      this.toggle();
    },
    close(event) {
      if (!this.visible) {
        return;
      }
      this.toggle(event);
    },
    /**
     * Closes the dropdown and returns the focus to the toggle unless it has has moved outside
     * of the dropdown, meaning that the consumer needed to put some other element in focus.
     *
     * @param {KeyboardEvent?} event The keyboard event that caused the dropdown to close.
     */
    async closeAndFocus(event) {
      if (!this.visible) {
        return;
      }
      const hadFocusWithin = this.$el.contains(document.activeElement);
      const hasToggled = await this.toggle(event);
      if (!hadFocusWithin) {
        return;
      }
      if (hasToggled) {
        this.focusToggle();
      }
    },
    focusToggle() {
      this.toggleElement.focus();
    },
    onKeydown(event) {
      const {
        code,
        target: {
          tagName
        }
      } = event;
      let toggleOnEnter = true;
      let toggleOnSpace = true;
      if (tagName === 'BUTTON') {
        toggleOnEnter = false;
        toggleOnSpace = false;
      } else if (tagName === 'A') {
        toggleOnEnter = false;
      }
      if (code === ENTER && toggleOnEnter || code === SPACE && toggleOnSpace) {
        this.toggle(event);
      }
      if (code === ARROW_DOWN) {
        this.$emit(GL_DROPDOWN_FOCUS_CONTENT, event);
      }
    },
    calculateNonScrollableAreaHeight() {
      var _this$$refs$content;
      const scrollableArea = (_this$$refs$content = this.$refs.content) === null || _this$$refs$content === void 0 ? void 0 : _this$$refs$content.querySelector(`.${GL_DROPDOWN_CONTENTS_CLASS}`);
      if (!scrollableArea) return;
      const floatingElementBoundingBox = this.$refs.content.getBoundingClientRect();
      const scrollableAreaBoundingBox = scrollableArea.getBoundingClientRect();
      this.nonScrollableContentHeight = floatingElementBoundingBox.height - scrollableAreaBoundingBox.height;
    }
  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{directives:[{name:"outside",rawName:"v-outside",value:(_vm.close),expression:"close"}],class:[_vm.$options.BASE_DROPDOWN_CLASS, { 'gl-display-block!': _vm.block }]},[_c(_vm.toggleComponent,_vm._g(_vm._b({ref:"toggle",tag:"component",attrs:{"id":_vm.toggleId,"data-testid":"base-dropdown-toggle"},on:{"keydown":function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"esc",27,$event.key,["Esc","Escape"])){ return null; }$event.stopPropagation();$event.preventDefault();return _vm.close.apply(null, arguments)}}},'component',_vm.toggleAttributes,false),_vm.toggleListeners),[_vm._t("toggle",function(){return [_c('span',{staticClass:"gl-new-dropdown-button-text",class:{ 'gl-sr-only': _vm.textSrOnly }},[_vm._v("\n        "+_vm._s(_vm.toggleText)+"\n      ")]),_vm._v(" "),(!_vm.noCaret)?_c('gl-icon',{staticClass:"gl-button-icon gl-new-dropdown-chevron",attrs:{"name":"chevron-down"}}):_vm._e()]})],2),_vm._v(" "),_c('div',{ref:"content",staticClass:"gl-new-dropdown-panel",class:_vm.panelClasses,attrs:{"id":_vm.baseDropdownId,"data-testid":"base-dropdown-menu"},on:{"keydown":function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"esc",27,$event.key,["Esc","Escape"])){ return null; }$event.stopPropagation();$event.preventDefault();return _vm.closeAndFocus.apply(null, arguments)}}},[_c('div',{staticClass:"gl-new-dropdown-inner"},[_vm._t("default")],2)])],1)};
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
export { BASE_DROPDOWN_CLASS };
