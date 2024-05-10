import { GlTooltipDirective } from '../../../directives/tooltip';
import GlClearIconButton from '../../shared_components/clear_icon_button/clear_icon_button';
import GlButton from '../button/button';
import GlDisclosureDropdown from '../new_dropdowns/disclosure/disclosure_dropdown';
import GlDisclosureDropdownItem from '../new_dropdowns/disclosure/disclosure_dropdown_item';
import GlFormInput from '../form/form_input/form_input';
import GlFormInputGroup from '../form/form_input_group/form_input_group';
import __vue_normalize__ from 'vue-runtime-helpers/dist/normalize-component.js';

var script = {
  name: 'GlSearchboxByClick',
  components: {
    GlClearIconButton,
    GlButton,
    GlFormInput,
    GlDisclosureDropdown,
    GlDisclosureDropdownItem,
    GlFormInputGroup
  },
  directives: {
    GlTooltip: GlTooltipDirective
  },
  props: {
    /**
     * If provided, used as value of search input
     */
    value: {
      required: false,
      default: '',
      // SearchBoxByClick could serve as a container for complex fields (see GlFilteredSearch)
      // so we should not force any specific type for value here
      validator: () => true
    },
    /**
     * If provided, used as history items for this component
     */
    historyItems: {
      type: Array,
      required: false,
      default: null
    },
    /**
     * If provided, used as a placeholder for this component
     */
    placeholder: {
      type: String,
      required: false,
      default: 'Search'
    },
    clearable: {
      type: Boolean,
      required: false,
      default: true
    },
    /**
     * If provided and true, disables the input and controls
     */
    disabled: {
      type: Boolean,
      required: false,
      default: false
    },
    /**
     * i18n for recent searches title within history dropdown
     */
    recentSearchesHeader: {
      type: String,
      required: false,
      default: 'Recent searches'
    },
    /**
     * i18n for clear button title
     */
    clearButtonTitle: {
      type: String,
      required: false,
      default: 'Clear'
    },
    /**
     * i18n for close button title within history dropdown
     */
    closeButtonTitle: {
      type: String,
      required: false,
      default: 'Close'
    },
    /**
     * i18n for recent searches clear text
     */
    clearRecentSearchesText: {
      type: String,
      required: false,
      default: 'Clear recent searches'
    },
    noRecentSearchesText: {
      type: String,
      required: false,
      default: "You don't have any recent searches"
    },
    /**
     * Container for tooltip. Valid values: DOM node, selector string or `false` for default
     */
    tooltipContainer: {
      required: false,
      default: false,
      validator: value => value === false || typeof value === 'string' || value instanceof HTMLElement
    },
    /**
     * HTML attributes to add to the search button
     */
    searchButtonAttributes: {
      type: Object,
      required: false,
      default: () => ({})
    },
    /**
     * Display search button to perform a search.
     *
     * Note: it is required to ensure accessibility for WCAG 2.1 3.2.2: On Input.
     * If the search button is hidden, a separate button should be provided for the same context.
     */
    showSearchButton: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  data() {
    return {
      currentValue: null,
      isFocused: false
    };
  },
  computed: {
    inputAttributes() {
      const attributes = {
        type: 'search',
        placeholder: this.placeholder,
        ...this.$attrs
      };
      if (!attributes['aria-label']) {
        attributes['aria-label'] = attributes.placeholder;
      }
      return attributes;
    },
    hasValue() {
      return Boolean(this.currentValue);
    }
  },
  watch: {
    value: {
      handler(newValue) {
        this.currentValue = newValue;
      },
      immediate: true
    },
    currentValue(newValue) {
      if (newValue === this.value) return;
      this.$emit('input', newValue);
    }
  },
  methods: {
    search(value) {
      /**
       * Emitted when search is submitted
       * @property {*} value Search value
       */
      this.$emit('submit', value);
    },
    selectHistoryItem(item) {
      this.currentValue = item;

      /**
       * Emitted when item from history is selected
       * @property {*} item History item
       */
      this.$emit('history-item-selected', item);
      setTimeout(() => {
        document.activeElement.blur();
      });
    },
    clearInput() {
      this.currentValue = '';
      /**
       * Emitted when search is cleared
       */
      this.$emit('clear');
      if (this.$refs.input) {
        this.$refs.input.$el.focus();
      }
    },
    emitClearHistory() {
      /**
       * Emitted when clear history button is clicked
       */
      this.$emit('clear-history');
    }
  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('gl-form-input-group',{staticClass:"gl-search-box-by-click",class:{ 'gl-search-box-by-click-with-search-button': _vm.showSearchButton },scopedSlots:_vm._u([(_vm.historyItems)?{key:"prepend",fn:function(){return [_c('gl-disclosure-dropdown',{ref:"historyDropdown",staticClass:"gl-search-box-by-click-history",attrs:{"icon":"history","toggle-text":"Toggle history","text-sr-only":"","fluid-width":"","disabled":_vm.disabled},scopedSlots:_vm._u([{key:"header",fn:function(){return [_c('div',{staticClass:"gl-search-box-by-click-history-header gl-display-flex gl-align-items-center gl-p-4! gl-min-h-8 gl-border-b-1 gl-border-b-solid gl-border-b-gray-200 gl-flex-grow-1 gl-font-weight-bold gl-font-sm"},[_vm._v("\n          "+_vm._s(_vm.recentSearchesHeader)+"\n        ")])]},proxy:true},(_vm.historyItems.length)?{key:"footer",fn:function(){return [_c('div',{staticClass:"gl-border-t-solid gl-border-t-1 gl-border-t-gray-200 gl-display-flex gl-flex-direction-column gl-p-2"},[_c('gl-button',{ref:"clearHistory",staticClass:"gl-justify-content-start!",attrs:{"category":"tertiary"},on:{"click":_vm.emitClearHistory}},[_vm._v("\n            "+_vm._s(_vm.clearRecentSearchesText)+"\n          ")])],1)]},proxy:true}:null],null,true)},[_vm._v(" "),(_vm.historyItems.length)?_vm._l((_vm.historyItems),function(item,idx){return _c('gl-disclosure-dropdown-item',{key:idx,staticClass:"gl-search-box-by-click-history-item",on:{"action":function($event){return _vm.selectHistoryItem(item)}},scopedSlots:_vm._u([{key:"list-item",fn:function(){return [_vm._t("history-item",function(){return [_vm._v(_vm._s(item))]},{"historyItem":item})]},proxy:true}],null,true)})}):_c('div',{staticClass:"gl-font-sm gl-text-secondary gl-py-2 gl-px-4"},[_vm._v("\n        "+_vm._s(_vm.noRecentSearchesText)+"\n      ")])],2)]},proxy:true}:null,(_vm.showSearchButton)?{key:"append",fn:function(){return [_c('gl-button',_vm._b({ref:"searchButton",staticClass:"gl-search-box-by-click-search-button",attrs:{"icon":"search","disabled":_vm.disabled,"aria-label":"Search","data-testid":"search-button"},on:{"click":function($event){return _vm.search(_vm.currentValue)}}},'gl-button',_vm.searchButtonAttributes,false))]},proxy:true}:null],null,true)},[_vm._v(" "),_vm._t("input",function(){return [_c('gl-form-input',_vm._b({ref:"input",staticClass:"gl-search-box-by-click-input",class:{ 'gl-rounded-base!': !_vm.showSearchButton },attrs:{"disabled":_vm.disabled},on:{"focus":function($event){_vm.isFocused = true;},"blur":function($event){_vm.isFocused = false;}},nativeOn:{"keydown":function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"enter",13,$event.key,"Enter")){ return null; }return _vm.search(_vm.currentValue)}},model:{value:(_vm.currentValue),callback:function ($$v) {_vm.currentValue=$$v;},expression:"currentValue"}},'gl-form-input',_vm.inputAttributes,false))]}),_vm._v(" "),(_vm.clearable && _vm.hasValue && !_vm.disabled)?_c('gl-clear-icon-button',{staticClass:"gl-search-box-by-click-icon-button gl-search-box-by-click-clear-button gl-clear-icon-button",attrs:{"title":_vm.clearButtonTitle,"tooltip-container":_vm.tooltipContainer,"data-testid":"filtered-search-clear-button"},on:{"click":_vm.clearInput}}):_vm._e()],2)};
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
