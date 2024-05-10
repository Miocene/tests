import GlDropdownItem from '../dropdown/dropdown_item';
import __vue_normalize__ from 'vue-runtime-helpers/dist/normalize-component.js';

var script = {
  name: 'GlFilteredSearchSuggestion',
  components: {
    GlDropdownItem
  },
  inject: ['filteredSearchSuggestionListInstance'],
  inheritAttrs: false,
  props: {
    /**
     * Value that will be emitted if this suggestion is selected.
     */
    value: {
      required: true,
      validator: () => true
    }
  },
  computed: {
    isActive() {
      return this.filteredSearchSuggestionListInstance.activeItem === this;
    }
  },
  watch: {
    isActive(newValue) {
      if (newValue) {
        window.requestAnimationFrame(() => {
          var _this$$refs$item, _this$$refs$item$$el;
          (_this$$refs$item = this.$refs.item) === null || _this$$refs$item === void 0 ? void 0 : (_this$$refs$item$$el = _this$$refs$item.$el) === null || _this$$refs$item$$el === void 0 ? void 0 : _this$$refs$item$$el.scrollIntoView({
            block: 'nearest',
            inline: 'end'
          });
        });
      }
    }
  },
  created() {
    this.filteredSearchSuggestionListInstance.register(this);
  },
  beforeDestroy() {
    this.filteredSearchSuggestionListInstance.unregister(this);
  },
  methods: {
    emitValue() {
      // We use href argument for gl-dropdown-item to use <a> instead of <button>
      // due to https://bugs.webkit.org/show_bug.cgi?id=22261
      this.filteredSearchSuggestionListInstance.$emit('suggestion', this.value);
    }
  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('gl-dropdown-item',_vm._b({ref:"item",staticClass:"gl-filtered-search-suggestion",class:{ 'gl-filtered-search-suggestion-active': _vm.isActive },attrs:{"data-testid":"filtered-search-suggestion","tabindex":"-1","href":"#"},nativeOn:{"mousedown":function($event){$event.preventDefault();return _vm.emitValue.apply(null, arguments)}}},'gl-dropdown-item',_vm.$attrs,false),[_vm._t("default")],2)};
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
