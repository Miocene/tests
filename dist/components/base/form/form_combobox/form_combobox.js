import uniqueId from 'lodash/uniqueId';
import GlDropdownItem from '../../dropdown/dropdown_item';
import GlDropdownDivider from '../../dropdown/dropdown_divider';
import GlFormGroup from '../form_group/form_group';
import GlFormInput from '../form_input/form_input';
import __vue_normalize__ from 'vue-runtime-helpers/dist/normalize-component.js';

var script = {
  name: 'GlFormCombobox',
  components: {
    GlDropdownItem,
    GlDropdownDivider,
    GlFormGroup,
    GlFormInput
  },
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    labelText: {
      type: String,
      required: true
    },
    labelSrOnly: {
      type: Boolean,
      required: false,
      default: false
    },
    tokenList: {
      type: Array,
      required: true
    },
    /**
     * List of action functions to display at the bottom of the dropdown
     */
    actionList: {
      type: Array,
      required: false,
      default: () => []
    },
    value: {
      type: [String, Object],
      required: true
    },
    matchValueToAttr: {
      type: String,
      required: false,
      default: undefined
    },
    autofocus: {
      type: Boolean,
      required: false,
      default: false
    },
    /**
     * Placeholder text for input field
     */
    placeholder: {
      type: String,
      required: false,
      default: undefined
    }
  },
  data() {
    return {
      results: [],
      arrowCounter: -1,
      userDismissedResults: false,
      suggestionsId: uniqueId('token-suggestions-'),
      inputId: uniqueId('token-input-')
    };
  },
  computed: {
    ariaExpanded() {
      return this.showSuggestions.toString();
    },
    showAutocomplete() {
      return this.showSuggestions ? 'off' : 'on';
    },
    showSuggestions() {
      return this.value.length > 0 && this.allItems.length > 0;
    },
    displayedValue() {
      return this.matchValueToAttr && this.value[this.matchValueToAttr] ? this.value[this.matchValueToAttr] : this.value;
    },
    resultsLength() {
      return this.results.length;
    },
    allItems() {
      return [...this.results, ...this.actionList];
    }
  },
  watch: {
    tokenList(newList) {
      if (newList.length) {
        this.openSuggestions(newList);
      } else {
        this.results = [];
        this.arrowCounter = -1;
      }
    }
  },
  mounted() {
    document.addEventListener('click', this.handleClickOutside);
  },
  destroyed() {
    document.removeEventListener('click', this.handleClickOutside);
  },
  methods: {
    closeSuggestions() {
      this.results = [];
      this.arrowCounter = -1;
      this.userDismissedResults = true;
    },
    handleClickOutside(event) {
      if (!this.$el.contains(event.target)) {
        this.closeSuggestions();
      }
    },
    focusItem(index) {
      var _this$$refs$suggestio;
      (_this$$refs$suggestio = this.$refs.suggestionsMenu.querySelectorAll('.gl-dropdown-item')[index]) === null || _this$$refs$suggestio === void 0 ? void 0 : _this$$refs$suggestio.querySelector('button').focus();
    },
    onArrowDown(e) {
      e.preventDefault();
      let newCount = this.arrowCounter + 1;
      if (newCount >= this.allItems.length) {
        newCount = 0;
      }
      this.arrowCounter = newCount;
      this.focusItem(newCount);
    },
    onArrowUp(e) {
      e.preventDefault();
      let newCount = this.arrowCounter - 1;
      if (newCount < 0) {
        newCount = this.allItems.length - 1;
      }
      this.arrowCounter = newCount;
      this.focusItem(newCount);
    },
    onEsc() {
      if (!this.showSuggestions) {
        this.$emit('input', '');
      }
      this.closeSuggestions();
    },
    onEntry(value) {
      this.$emit('input', value);
      this.userDismissedResults = false;

      // short circuit so that we don't false match on empty string
      if (value.length < 1) {
        this.closeSuggestions();
        return;
      }
      const filteredTokens = this.tokenList.filter(token => {
        if (this.matchValueToAttr) {
          return token[this.matchValueToAttr].toLowerCase().includes(value.toLowerCase());
        }
        return token.toLowerCase().includes(value.toLowerCase());
      });
      if (filteredTokens.length) {
        this.openSuggestions(filteredTokens);
      } else {
        this.results = [];
        this.arrowCounter = -1;
      }
    },
    openSuggestions(filteredResults) {
      this.results = filteredResults;
    },
    selectToken(value) {
      this.$emit('input', value);
      this.closeSuggestions();
      /**
       * Emitted when a value is selected.
       * @event value-selected
       */
      this.$emit('value-selected', value);
    },
    selectAction(value) {
      value.fn();
      this.$emit('input', this.value);
      this.closeSuggestions();
    },
    resetCounter() {
      this.arrowCounter = -1;
    }
  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"gl-form-combobox dropdown",attrs:{"role":"combobox","aria-owns":_vm.suggestionsId,"aria-expanded":_vm.ariaExpanded}},[_c('gl-form-group',{attrs:{"label":_vm.labelText,"label-for":_vm.inputId,"label-sr-only":_vm.labelSrOnly}},[_c('gl-form-input',{attrs:{"id":_vm.inputId,"value":_vm.displayedValue,"type":"text","role":"searchbox","autocomplete":_vm.showAutocomplete,"aria-autocomplete":"list","aria-controls":_vm.suggestionsId,"aria-haspopup":"listbox","autofocus":_vm.autofocus,"placeholder":_vm.placeholder},on:{"input":_vm.onEntry,"focus":_vm.resetCounter,"keydown":[function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"down",40,$event.key,["Down","ArrowDown"])){ return null; }return _vm.onArrowDown.apply(null, arguments)},function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"up",38,$event.key,["Up","ArrowUp"])){ return null; }return _vm.onArrowUp.apply(null, arguments)},function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"esc",27,$event.key,["Esc","Escape"])){ return null; }$event.stopPropagation();return _vm.onEsc.apply(null, arguments)},function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"tab",9,$event.key,"Tab")){ return null; }return _vm.closeSuggestions.apply(null, arguments)}]}})],1),_vm._v(" "),_c('ul',{directives:[{name:"show",rawName:"v-show",value:(_vm.showSuggestions && !_vm.userDismissedResults),expression:"showSuggestions && !userDismissedResults"}],ref:"suggestionsMenu",staticClass:"dropdown-menu gl-w-full gl-form-combobox-inner gl-list-style-none gl-pl-0 gl-mb-0 gl-display-flex gl-flex-direction-column",attrs:{"id":_vm.suggestionsId,"data-testid":"combobox-dropdown"},on:{"keydown":[function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"down",40,$event.key,["Down","ArrowDown"])){ return null; }return _vm.onArrowDown.apply(null, arguments)},function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"up",38,$event.key,["Up","ArrowUp"])){ return null; }return _vm.onArrowUp.apply(null, arguments)},function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"esc",27,$event.key,["Esc","Escape"])){ return null; }$event.stopPropagation();return _vm.onEsc.apply(null, arguments)}]}},[_c('li',{staticClass:"gl-overflow-y-auto show-dropdown"},[_c('ul',{staticClass:"gl-list-style-none gl-pl-0 gl-mb-0"},_vm._l((_vm.results),function(result,i){return _c('gl-dropdown-item',{key:i,ref:"results",refInFor:true,attrs:{"role":"option","aria-selected":i === _vm.arrowCounter,"tabindex":"-1"},on:{"click":function($event){return _vm.selectToken(result)}},nativeOn:{"keydown":function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"enter",13,$event.key,"Enter")){ return null; }return _vm.selectToken(result)}}},[_vm._t("result",function(){return [_vm._v(_vm._s(result))]},{"item":result})],2)}),1)]),_vm._v(" "),(_vm.resultsLength > 0 && _vm.actionList.length > 0)?_c('gl-dropdown-divider'):_vm._e(),_vm._v(" "),_c('li',[_c('ul',{staticClass:"gl-list-style-none gl-pl-0 gl-mb-0"},_vm._l((_vm.actionList),function(action,i){return _c('gl-dropdown-item',{key:i + _vm.resultsLength,attrs:{"role":"option","aria-selected":i + _vm.resultsLength === _vm.arrowCounter,"tabindex":"-1","data-testid":"combobox-action"},on:{"click":function($event){return _vm.selectAction(action)}},nativeOn:{"keydown":function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"enter",13,$event.key,"Enter")){ return null; }return _vm.selectAction(action)}}},[_vm._t("action",function(){return [_vm._v(_vm._s(action.label))]},{"item":action})],2)}),1)])],1)],1)};
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
