import { stepIndexAndWrap } from './filtered_search_utils';
import __vue_normalize__ from 'vue-runtime-helpers/dist/normalize-component.js';

const DEFER_TO_INITIAL_VALUE = -1;
const NO_ACTIVE_ITEM = -2;
var script = {
  name: 'GlFilteredSearchSuggestionList',
  inject: ['suggestionsListClass', 'termsAsTokens'],
  provide() {
    return {
      filteredSearchSuggestionListInstance: this
    };
  },
  props: {
    /**
     * Value to be initially selected in list.
     */
    initialValue: {
      required: false,
      validator: () => true,
      default: null
    }
  },
  data() {
    return {
      activeIdx: DEFER_TO_INITIAL_VALUE,
      registeredItems: []
    };
  },
  computed: {
    initialActiveIdx() {
      return this.registeredItems.findIndex(item => this.valuesMatch(item.value, this.initialValue));
    },
    initialActiveItem() {
      return this.registeredItems[this.initialActiveIdx];
    },
    activeItem() {
      if (!this.termsAsTokens() && this.activeIdx === NO_ACTIVE_ITEM) return null;
      if (this.activeIdx === DEFER_TO_INITIAL_VALUE) return this.initialActiveItem;
      return this.registeredItems[this.activeIdx];
    },
    listClasses() {
      return [this.suggestionsListClass(), 'dropdown-menu gl-filtered-search-suggestion-list'];
    }
  },
  watch: {
    initialValue() {
      this.activeIdx = DEFER_TO_INITIAL_VALUE;
    }
  },
  methods: {
    valuesMatch(firstValue, secondValue) {
      if (firstValue == null || secondValue == null) return false;
      return typeof firstValue === 'string' && typeof secondValue === 'string' ? firstValue.toLowerCase() === secondValue.toLowerCase() : firstValue === secondValue;
    },
    register(item) {
      this.registeredItems.push(item);
    },
    unregister(item) {
      const idx = this.registeredItems.indexOf(item);
      if (idx !== -1) {
        this.registeredItems.splice(idx, 1);
        if (idx === this.activeIdx) {
          this.activeIdx = DEFER_TO_INITIAL_VALUE;
        }
      }
    },
    nextItem() {
      if (this.termsAsTokens()) {
        this.stepItem(1);
      } else {
        this.stepItem(1, this.registeredItems.length - 1);
      }
    },
    prevItem() {
      if (this.termsAsTokens()) {
        this.stepItem(-1);
      } else {
        this.stepItem(-1, 0);
      }
    },
    stepItem(direction, endIdx) {
      if (!this.termsAsTokens() && (this.activeIdx === endIdx || this.activeIdx === DEFER_TO_INITIAL_VALUE && this.initialActiveIdx === endIdx)) {
        // The user wants to move past the end of the list, so ensure nothing is selected.
        this.activeIdx = NO_ACTIVE_ITEM;
      } else {
        const index = this.activeIdx === DEFER_TO_INITIAL_VALUE ?
        // Currently active item is set by initialValue (i.e., text input matching),
        // so step relative to that.
        this.initialActiveIdx :
        // Otherwise, step relative to the explicitly (via up/down arrows) activated item.
        this.activeIdx;
        this.activeIdx = stepIndexAndWrap(index, direction, this.registeredItems.length);
      }
    },
    getValue() {
      return this.activeItem ? this.activeItem.value : null;
    }
  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('ul',{class:_vm.listClasses},[_vm._t("default")],2)};
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
