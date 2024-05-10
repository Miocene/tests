import clamp from 'lodash/clamp';
import uniqueId from 'lodash/uniqueId';
import isNil from 'lodash/isNil';
import { stopEvent } from '../../../../utils/utils';
import { GL_DROPDOWN_SHOWN, GL_DROPDOWN_HIDDEN, POSITION_ABSOLUTE, POSITION_FIXED, GL_DROPDOWN_CONTENTS_CLASS, HOME, END, ARROW_UP, ARROW_DOWN } from '../constants';
import { buttonCategoryOptions, dropdownVariantOptions, buttonSizeOptions, dropdownPlacements } from '../../../../utils/constants';
import GlButton from '../../button/button';
import GlLoadingIcon from '../../loading_icon/loading_icon';
import GlIntersectionObserver from '../../../utilities/intersection_observer/intersection_observer';
import GlSearchBoxByType from '../../search_box_by_type/search_box_by_type';
import GlBaseDropdown from '../base_dropdown/base_dropdown';
import { translate } from '../../../../utils/i18n';
import GlListboxItem from './listbox_item';
import GlListboxSearchInput from './listbox_search_input';
import GlListboxGroup from './listbox_group';
import { itemsValidator, isOption, flattenedOptions } from './utils';
import __vue_normalize__ from 'vue-runtime-helpers/dist/normalize-component.js';

//
const ITEM_SELECTOR = '[role="option"]';
const HEADER_ITEMS_BORDER_CLASSES = ['gl-border-b-1', 'gl-border-b-solid', 'gl-border-b-gray-200'];
const GROUP_TOP_BORDER_CLASSES = ['gl-border-t', 'gl-border-t-gray-200', 'gl-pt-1', 'gl-mt-2'];
const SEARCH_INPUT_SELECTOR = '.gl-listbox-search-input';
var script = {
  name: 'GlCollapsibleListbox',
  HEADER_ITEMS_BORDER_CLASSES,
  events: {
    GL_DROPDOWN_SHOWN,
    GL_DROPDOWN_HIDDEN
  },
  components: {
    GlBaseDropdown,
    GlListboxItem,
    GlListboxGroup,
    GlButton,
    GlSearchBoxByType,
    GlListboxSearchInput,
    GlLoadingIcon,
    GlIntersectionObserver
  },
  model: {
    prop: 'selected',
    event: 'select'
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
     * Array of selected items values for multi-select and selected item value for single-select
     */
    selected: {
      type: [Array, String, Number],
      required: false,
      default: () => []
    },
    /**
     * Allow multi-selection
     */
    multiple: {
      type: Boolean,
      required: false,
      default: false
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
    /** The header text */
    headerText: {
      type: String,
      required: false,
      default: ''
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
     * Align listbox menu with respect to the toggle button
     */
    placement: {
      type: String,
      required: false,
      default: 'bottom-start',
      validator: value => Object.keys(dropdownPlacements).includes(value)
    },
    /**
     * Center selected item checkmark
     */
    isCheckCentered: {
      type: Boolean,
      required: false,
      default: false
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
     * Enable search
     */
    searchable: {
      type: Boolean,
      required: false,
      default: false
    },
    /**
     * Set to "true" when items search is in progress.
     * It will display loading icon below the search input
     */
    searching: {
      type: Boolean,
      required: false,
      default: false
    },
    /**
     * Enables infinite scroll.
     * When set to `true`, the `@bottom-reached` event will be fired when
     * the bottom of the listbox is scrolled to.
     * Does not support groups.
     */
    infiniteScroll: {
      type: Boolean,
      required: false,
      default: false
    },
    /**
     * This prop is used for infinite scroll.
     * It represents the total number of items that exist,
     * even if they have not yet been loaded.
     * Do not set this prop if the total number of items is unknown.
     */
    totalItems: {
      type: Number,
      required: false,
      default: null
    },
    /**
     * This prop is used for infinite scroll.
     * Set to `true` when more items are being loaded.
     */
    infiniteScrollLoading: {
      type: Boolean,
      required: false,
      default: false
    },
    /**
     * Message to be displayed when filtering produced no results
     */
    noResultsText: {
      type: String,
      required: false,
      default: 'No results found'
    },
    /**
     * Search input placeholder text and aria-label
     */
    searchPlaceholder: {
      type: String,
      required: false,
      default: 'Search'
    },
    /**
     * The reset button's label, to be rendered in the header. If this is omitted, the button is not
     * rendered.
     * The reset button requires a header to be set, so this prop should be used in conjunction with
     * headerText.
     */
    resetButtonLabel: {
      type: String,
      required: false,
      default: ''
    },
    /**
     * The select all button's label, to be rendered in the header. If this is omitted, the button is not
     * rendered.
     * The select all button requires a header to be set, so this prop should be used in conjunction with
     * headerText.
     */
    showSelectAllButtonLabel: {
      type: String,
      required: false,
      default: ''
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
    },
    srOnlyResultsLabel: {
      type: Function,
      required: false,
      default: count => {
        const fn = translate('GlCollapsibleListbox.srOnlyResultsLabel', 'Results count');
        if (typeof fn === 'function') {
          return fn(count);
        }
        return `${count} result${count > 1 ? 's' : ''}`;
      }
    }
  },
  data() {
    return {
      selectedValues: [],
      toggleId: uniqueId('dropdown-toggle-btn-'),
      listboxId: uniqueId('listbox-'),
      nextFocusedItemIndex: null,
      searchStr: '',
      topBoundaryVisible: true,
      bottomBoundaryVisible: true
    };
  },
  computed: {
    listboxTag() {
      if (!this.hasItems || isOption(this.items[0])) return 'ul';
      return 'div';
    },
    listboxClasses() {
      return {
        'top-scrim-visible': !this.topBoundaryVisible,
        'bottom-scrim-visible': !this.bottomBoundaryVisible,
        [GL_DROPDOWN_CONTENTS_CLASS]: true
      };
    },
    itemTag() {
      return this.listboxTag === 'ul' ? 'li' : 'div';
    },
    flattenedOptions() {
      return flattenedOptions(this.items);
    },
    hasItems() {
      return this.items.length > 0;
    },
    listboxToggleText() {
      if (!this.toggleText) {
        if (!this.multiple && this.selectedValues.length) {
          var _this$flattenedOption;
          return (_this$flattenedOption = this.flattenedOptions.find(_ref => {
            let {
              value
            } = _ref;
            return value === this.selectedValues[0];
          })) === null || _this$flattenedOption === void 0 ? void 0 : _this$flattenedOption.text;
        }
        return '';
      }
      return this.toggleText;
    },
    selectedIndices() {
      return this.selectedValues.map(selected => this.flattenedOptions.findIndex(_ref2 => {
        let {
          value
        } = _ref2;
        return value === selected;
      })).sort();
    },
    showList() {
      return this.flattenedOptions.length && !this.searching;
    },
    showNoResultsText() {
      return !this.flattenedOptions.length && !this.searching;
    },
    announceSRSearchResults() {
      return this.searchable && !this.showNoResultsText;
    },
    headerId() {
      return this.headerText && uniqueId('listbox-header-');
    },
    showResetButton() {
      if (!this.resetButtonLabel) {
        return false;
      }

      /**
       * if dropdown has no items
       * reset all should be hidden
       */
      if (!this.hasItems) {
        return false;
      }

      // hide if no selection
      if (!this.selected || this.selected.length === 0) {
        return false;
      }

      // only show reset button if show all button is not there
      return !this.showSelectAllButton;
    },
    showSelectAllButton() {
      if (!this.showSelectAllButtonLabel) {
        return false;
      }
      if (!this.multiple) {
        return false;
      }

      /**
       * if dropdown has no items
       * select all should be hidden
       */
      if (!this.hasItems) {
        return false;
      }
      return this.selected.length !== this.flattenedOptions.length;
    },
    showIntersectionObserver() {
      return this.infiniteScroll && !this.infiniteScrollLoading && !this.loading && !this.searching;
    },
    hasCustomToggle() {
      return Boolean(this.$scopedSlots.toggle);
    },
    hasSelection() {
      return Boolean(this.selectedValues.length);
    },
    toggleButtonClasses() {
      const toggleClasses = [this.toggleClass];
      if (!this.hasSelection) {
        toggleClasses.push('gl-text-gray-500!');
      }
      return toggleClasses;
    },
    hasHeader() {
      return this.headerText || this.searchable;
    },
    hasFooter() {
      return Boolean(this.$scopedSlots.footer);
    }
  },
  watch: {
    selected: {
      immediate: true,
      handler(newSelected) {
        if (Array.isArray(newSelected)) {
          if (process.env.NODE_ENV !== 'production' && !this.multiple && newSelected.length) {
            throw new Error('To allow multi-selection, please, set "multiple" property to "true"');
          }
          this.selectedValues = [...newSelected];
        } else {
          this.selectedValues = isNil(newSelected) ? [] : [newSelected];
        }
      }
    },
    items: {
      handler() {
        this.$nextTick(() => {
          /* Every time the list of items changes (on search),
           * the observed elements are recreated, thus we need to start obesrving them again */
          this.observeScroll();
        });
      }
    },
    ...(process.env.NODE_ENV !== 'production' ? {
      resetButtonLabel: {
        immediate: true,
        handler(newResetButtonLabel) {
          if (newResetButtonLabel && !this.headerText) {
            throw new Error('The reset button cannot be rendered without a header. Either provide a header via the headerText prop, or do not provide the resetButtonLabel prop.');
          }
        }
      },
      showSelectAllButtonLabel: {
        immediate: true,
        handler(showSelectAllButtonLabel) {
          if (showSelectAllButtonLabel && !this.headerText) {
            throw new Error('The select all button cannot be rendered without a header. Either provide a header via the headerText prop, or do not provide the showSelectAllButtonLabel prop.');
          }
        }
      },
      infiniteScroll: {
        immediate: true,
        handler(newValue) {
          if (newValue && this.items.some(item => !isOption(item))) {
            throw new Error('Infinite scroll does not support groups. Please set the "infiniteScroll" prop to "false"');
          }
        }
      }
    } : {})
  },
  mounted() {
    if (this.startOpened) {
      this.open();
    }
    this.observeScroll();
  },
  beforeDestroy() {
    var _this$scrollObserver;
    (_this$scrollObserver = this.scrollObserver) === null || _this$scrollObserver === void 0 ? void 0 : _this$scrollObserver.disconnect();
  },
  methods: {
    open() {
      this.$refs.baseDropdown.open();
    },
    close() {
      this.$refs.baseDropdown.close();
    },
    groupClasses(index) {
      return index === 0 ? null : GROUP_TOP_BORDER_CLASSES;
    },
    onShow() {
      if (this.searchable) {
        this.focusSearchInput();
      } else {
        var _this$selectedIndices;
        this.focusItem((_this$selectedIndices = this.selectedIndices[0]) !== null && _this$selectedIndices !== void 0 ? _this$selectedIndices : 0, this.getFocusableListItemElements());
      }
      /**
       * Emitted when dropdown is shown
       *
       * @event shown
       */
      this.$emit(GL_DROPDOWN_SHOWN);
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
        code,
        target
      } = event;
      const elements = this.getFocusableListItemElements();
      if (elements.length < 1) return;
      let stop = true;
      const isSearchInput = target.matches(SEARCH_INPUT_SELECTOR);
      if (code === HOME) {
        if (isSearchInput) {
          return;
        }
        this.focusItem(0, elements);
      } else if (code === END) {
        if (isSearchInput) {
          return;
        }
        this.focusItem(elements.length - 1, elements);
      } else if (code === ARROW_UP) {
        if (isSearchInput) {
          return;
        }
        if (this.searchable && elements.indexOf(target) === 0) {
          this.focusSearchInput();
        } else {
          this.focusNextItem(event, elements, -1);
        }
      } else if (code === ARROW_DOWN) {
        if (isSearchInput) {
          this.focusItem(0, elements);
        } else {
          this.focusNextItem(event, elements, 1);
        }
      } else {
        stop = false;
      }
      if (stop) {
        stopEvent(event);
      }
    },
    getFocusableListItemElements() {
      var _this$$refs$list;
      const items = (_this$$refs$list = this.$refs.list) === null || _this$$refs$list === void 0 ? void 0 : _this$$refs$list.querySelectorAll(ITEM_SELECTOR);
      return Array.from(items || []);
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
    focusSearchInput() {
      this.$refs.searchBox.focusInput();
    },
    onSelect(item, isSelected) {
      if (this.multiple) {
        this.onMultiSelect(item.value, isSelected);
      } else {
        this.onSingleSelect(item.value, isSelected);
      }
    },
    isSelected(item) {
      return this.selectedValues.some(value => value === item.value);
    },
    isFocused(item) {
      return this.nextFocusedItemIndex === this.flattenedOptions.indexOf(item);
    },
    onSingleSelect(value, isSelected) {
      if (isSelected) {
        /**
         * Emitted when selection is changed
         *
         * @event select
         */
        this.$emit('select', value);
      }
      this.closeAndFocus();
    },
    onMultiSelect(value, isSelected) {
      if (isSelected) {
        this.$emit('select', [...this.selectedValues, value]);
      } else {
        this.$emit('select', this.selectedValues.filter(selectedValue => selectedValue !== value));
      }
    },
    search(searchTerm) {
      /**
       * Emitted when the search query string is changed
       *
       * @event search
       * @type {string}
       */
      this.$emit('search', searchTerm);
    },
    onResetButtonClicked() {
      /**
       * Emitted when the reset button is clicked
       *
       * @event reset
       */
      this.$emit('reset');
    },
    onSelectAllButtonClicked() {
      /**
       * Emitted when the select all button is clicked
       *
       * @event select-all
       */
      this.$emit('select-all');
    },
    closeAndFocus() {
      this.$refs.baseDropdown.closeAndFocus();
    },
    onIntersectionObserverAppear() {
      /**
       * Emitted when bottom of listbox has been scrolled to.
       * Used for infinite scroll.
       *
       * @event bottom-reached
       */
      this.$emit('bottom-reached');
    },
    listboxItemMoreItemsAriaAttributes(index) {
      if (this.totalItems === null) {
        return {};
      }
      return {
        'aria-setsize': this.totalItems,
        'aria-posinset': index + 1
      };
    },
    observeScroll() {
      var _this$scrollObserver2;
      const root = this.$refs.list;
      const options = {
        rootMargin: '8px',
        root,
        threshold: 1.0
      };
      (_this$scrollObserver2 = this.scrollObserver) === null || _this$scrollObserver2 === void 0 ? void 0 : _this$scrollObserver2.disconnect();
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          var _entry$target;
          this[(_entry$target = entry.target) === null || _entry$target === void 0 ? void 0 : _entry$target.$__visibilityProp] = entry.isIntersecting;
        });
      }, options);
      const topBoundary = this.$refs['top-boundary'];
      const bottomBoundary = this.$refs['bottom-boundary'];
      if (topBoundary) {
        topBoundary.$__visibilityProp = 'topBoundaryVisible';
        observer.observe(topBoundary);
      }
      if (bottomBoundary) {
        bottomBoundary.$__visibilityProp = 'bottomBoundaryVisible';
        observer.observe(bottomBoundary);
      }
      this.scrollObserver = observer;
    },
    isOption
  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('gl-base-dropdown',{ref:"baseDropdown",attrs:{"aria-haspopup":"listbox","aria-labelledby":_vm.toggleAriaLabelledBy,"block":_vm.block,"toggle-id":_vm.toggleId,"toggle-text":_vm.listboxToggleText,"toggle-class":_vm.toggleButtonClasses,"text-sr-only":_vm.textSrOnly,"category":_vm.category,"variant":_vm.variant,"size":_vm.size,"icon":_vm.icon,"disabled":_vm.disabled,"loading":_vm.loading,"no-caret":_vm.noCaret,"placement":_vm.placement,"offset":_vm.dropdownOffset,"fluid-width":_vm.fluidWidth,"positioning-strategy":_vm.positioningStrategy},on:_vm._d({},[_vm.$options.events.GL_DROPDOWN_SHOWN,_vm.onShow,_vm.$options.events.GL_DROPDOWN_HIDDEN,_vm.onHide]),scopedSlots:_vm._u([(_vm.hasCustomToggle)?{key:"toggle",fn:function(){return [_vm._t("toggle")]},proxy:true}:null],null,true)},[_vm._v(" "),(_vm.headerText)?_c('div',{staticClass:"gl-display-flex gl-align-items-center gl-p-4! gl-min-h-8",class:_vm.$options.HEADER_ITEMS_BORDER_CLASSES},[_c('div',{staticClass:"gl-flex-grow-1 gl-font-weight-bold gl-font-sm gl-pr-2",attrs:{"id":_vm.headerId,"data-testid":"listbox-header-text"}},[_vm._v("\n      "+_vm._s(_vm.headerText)+"\n    ")]),_vm._v(" "),(_vm.showResetButton)?_c('gl-button',{staticClass:"gl-focus-inset-border-2-blue-400! gl-flex-shrink-0 gl-font-sm! gl-px-2! gl-py-2! gl-w-auto! gl-m-0! gl-max-w-50p gl-text-overflow-ellipsis",attrs:{"category":"tertiary","data-testid":"listbox-reset-button"},on:{"click":_vm.onResetButtonClicked}},[_vm._v("\n      "+_vm._s(_vm.resetButtonLabel)+"\n    ")]):_vm._e(),_vm._v(" "),(_vm.showSelectAllButton)?_c('gl-button',{staticClass:"gl-focus-inset-border-2-blue-400! gl-flex-shrink-0 gl-font-sm! gl-px-2! gl-py-2! gl-w-auto! gl-m-0! gl-max-w-50p gl-text-overflow-ellipsis",attrs:{"category":"tertiary","data-testid":"listbox-select-all-button"},on:{"click":_vm.onSelectAllButtonClicked}},[_vm._v("\n      "+_vm._s(_vm.showSelectAllButtonLabel)+"\n    ")]):_vm._e()],1):_vm._e(),_vm._v(" "),(_vm.searchable)?_c('div',{class:_vm.$options.HEADER_ITEMS_BORDER_CLASSES},[_c('gl-listbox-search-input',{ref:"searchBox",class:{ 'gl-listbox-topmost': !_vm.headerText },attrs:{"data-testid":"listbox-search-input","placeholder":_vm.searchPlaceholder},on:{"input":_vm.search,"keydown":[function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"enter",13,$event.key,"Enter")){ return null; }$event.preventDefault();},_vm.onKeydown]},model:{value:(_vm.searchStr),callback:function ($$v) {_vm.searchStr=$$v;},expression:"searchStr"}}),_vm._v(" "),(_vm.searching)?_c('gl-loading-icon',{staticClass:"gl-my-3",attrs:{"data-testid":"listbox-search-loader","size":"md"}}):_vm._e()],1):_vm._e(),_vm._v(" "),(_vm.showList)?_c(_vm.listboxTag,{ref:"list",tag:"component",staticClass:"gl-new-dropdown-contents gl-new-dropdown-contents-with-scrim-overlay",class:_vm.listboxClasses,attrs:{"id":_vm.listboxId,"aria-labelledby":_vm.listAriaLabelledBy || _vm.headerId || _vm.toggleId,"role":"listbox","tabindex":"0"},on:{"keydown":_vm.onKeydown}},[_c(_vm.itemTag,{tag:"component",staticClass:"top-scrim-wrapper",attrs:{"aria-hidden":"true","data-testid":"top-scrim"}},[_c('div',{staticClass:"top-scrim",class:{ 'top-scrim-light': !_vm.hasHeader, 'top-scrim-dark': _vm.hasHeader }})]),_vm._v(" "),_c(_vm.itemTag,{ref:"top-boundary",tag:"component",attrs:{"aria-hidden":"true"}}),_vm._v(" "),_vm._l((_vm.items),function(item,index){return [(_vm.isOption(item))?[_c('gl-listbox-item',_vm._b({key:item.value,attrs:{"data-testid":("listbox-item-" + (item.value)),"is-selected":_vm.isSelected(item),"is-focused":_vm.isFocused(item),"is-check-centered":_vm.isCheckCentered},on:{"select":function($event){return _vm.onSelect(item, $event)}}},'gl-listbox-item',_vm.listboxItemMoreItemsAriaAttributes(index),false),[_vm._t("list-item",function(){return [_vm._v("\n            "+_vm._s(item.text)+"\n          ")]},{"item":item})],2)]:[_c('gl-listbox-group',{key:item.text,class:_vm.groupClasses(index),attrs:{"name":item.text,"text-sr-only":item.textSrOnly},scopedSlots:_vm._u([(_vm.$scopedSlots['group-label'])?{key:"group-label",fn:function(){return [_vm._t("group-label",null,{"group":item})]},proxy:true}:null],null,true)},[_vm._v(" "),_vm._l((item.options),function(option){return _c('gl-listbox-item',{key:option.value,attrs:{"data-testid":("listbox-item-" + (option.value)),"is-selected":_vm.isSelected(option),"is-focused":_vm.isFocused(option),"is-check-centered":_vm.isCheckCentered},on:{"select":function($event){return _vm.onSelect(option, $event)}}},[_vm._t("list-item",function(){return [_vm._v("\n              "+_vm._s(option.text)+"\n            ")]},{"item":option})],2)})],2)]]}),_vm._v(" "),(_vm.infiniteScrollLoading)?_c(_vm.itemTag,{tag:"component"},[_c('gl-loading-icon',{staticClass:"gl-my-3",attrs:{"data-testid":"listbox-infinite-scroll-loader","size":"md"}})],1):_vm._e(),_vm._v(" "),(_vm.showIntersectionObserver)?_c('gl-intersection-observer',{on:{"appear":_vm.onIntersectionObserverAppear}}):_vm._e(),_vm._v(" "),_c(_vm.itemTag,{ref:"bottom-boundary",tag:"component",attrs:{"aria-hidden":"true"}}),_vm._v(" "),_c(_vm.itemTag,{tag:"component",staticClass:"bottom-scrim-wrapper",attrs:{"aria-hidden":"true","data-testid":"bottom-scrim"}},[_c('div',{staticClass:"bottom-scrim",class:{ 'gl-rounded-0!': _vm.hasFooter }})])],2):_vm._e(),_vm._v(" "),(_vm.announceSRSearchResults)?_c('span',{staticClass:"gl-sr-only",attrs:{"data-testid":"listbox-number-of-results","aria-live":"assertive"}},[_vm._t("search-summary-sr-only",function(){return [_vm._v("\n      "+_vm._s(_vm.srOnlyResultsLabel(_vm.flattenedOptions.length))+"\n    ")]})],2):(_vm.showNoResultsText)?_c('div',{staticClass:"gl-pl-7 gl-pr-5 gl-py-3 gl-font-base gl-text-gray-600",attrs:{"aria-live":"assertive","data-testid":"listbox-no-results-text"}},[_vm._v("\n    "+_vm._s(_vm.noResultsText)+"\n  ")]):_vm._e(),_vm._v(" "),_vm._t("footer")],2)};
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
export { ITEM_SELECTOR, SEARCH_INPUT_SELECTOR };
