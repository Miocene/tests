import GlToken from '../token/token';
import GlButton from '../button/button';
import { tokensValidator } from './helpers';
import __vue_normalize__ from 'vue-runtime-helpers/dist/normalize-component.js';

var script = {
  name: 'GlTokenContainer',
  components: {
    GlToken,
    GlButton
  },
  props: {
    tokens: {
      type: Array,
      // All tokens need to have an `id` key
      validator: tokensValidator,
      required: true
    },
    state: {
      type: Boolean,
      required: false,
      default: null
    },
    registerFocusOnToken: {
      type: Function,
      required: true
    },
    viewOnly: {
      type: Boolean,
      required: false,
      default: false
    },
    showClearAllButton: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      bindFocusEvent: true,
      focusedTokenIndex: null
    };
  },
  computed: {
    focusedToken() {
      return this.tokens[this.focusedTokenIndex] || null;
    }
  },
  watch: {
    focusedToken(newValue) {
      var _this$$refs$tokens;
      if (newValue === null) {
        return;
      }
      const tokenRef = (_this$$refs$tokens = this.$refs.tokens) === null || _this$$refs$tokens === void 0 ? void 0 : _this$$refs$tokens.find(ref => ref.dataset.tokenId === newValue.id.toString());
      if (tokenRef) {
        // Prevent `handleTokenFocus` from being called when we manually focus on a token
        this.bindFocusEvent = false;
        tokenRef.focus();
        this.bindFocusEvent = true;
      }
    }
  },
  created() {
    this.registerFocusOnToken(this.focusOnToken);
  },
  methods: {
    handleClose(token) {
      this.$emit('token-remove', token);
      this.focusedTokenIndex = null;
    },
    handleLeftArrow() {
      if (this.focusedTokenIndex === 0) {
        this.focusLastToken();
      } else {
        this.focusPrevToken();
      }
    },
    handleRightArrow() {
      if (this.focusedTokenIndex === this.tokens.length - 1) {
        this.focusFirstToken();
      } else {
        this.focusNextToken();
      }
    },
    handleHome() {
      this.focusFirstToken();
    },
    handleEnd() {
      this.focusLastToken();
    },
    handleDelete() {
      this.$emit('token-remove', this.focusedToken);
      if (this.focusedTokenIndex > 0) {
        this.focusPrevToken();
      }
    },
    handleEscape() {
      this.focusedTokenIndex = null;
      this.$emit('cancel-focus');
    },
    handleTab() {
      this.$emit('cancel-focus');
    },
    // Only called when a token is focused by a click/tap
    handleTokenFocus(index) {
      this.focusedTokenIndex = index;
    },
    focusLastToken() {
      this.focusedTokenIndex = this.tokens.length - 1;
    },
    focusFirstToken() {
      this.focusedTokenIndex = 0;
    },
    focusNextToken() {
      this.focusedTokenIndex += 1;
    },
    focusPrevToken() {
      this.focusedTokenIndex -= 1;
    },
    focusOnToken() {
      let tokenIndex = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      this.focusedTokenIndex = tokenIndex;
    }
  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"gl-display-flex gl-flex-nowrap gl-align-items-flex-start gl-w-full"},[_c('div',{ref:"tokenContainer",staticClass:"gl-display-flex gl-flex-wrap gl-align-items-center gl-my-n1 gl-mx-n1 gl-w-full",attrs:{"role":"listbox","aria-multiselectable":"false","aria-orientation":"horizontal","aria-invalid":_vm.state === false && 'true'},on:{"keydown":[function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"left",37,$event.key,["Left","ArrowLeft"])){ return null; }if('button' in $event && $event.button !== 0){ return null; }return _vm.handleLeftArrow.apply(null, arguments)},function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"right",39,$event.key,["Right","ArrowRight"])){ return null; }if('button' in $event && $event.button !== 2){ return null; }return _vm.handleRightArrow.apply(null, arguments)},function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"home",undefined,$event.key,undefined)){ return null; }return _vm.handleHome.apply(null, arguments)},function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"end",undefined,$event.key,undefined)){ return null; }return _vm.handleEnd.apply(null, arguments)},function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"delete",[8,46],$event.key,["Backspace","Delete","Del"])){ return null; }return _vm.handleDelete.apply(null, arguments)},function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"esc",27,$event.key,["Esc","Escape"])){ return null; }return _vm.handleEscape.apply(null, arguments)},function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"tab",9,$event.key,"Tab")){ return null; }if($event.ctrlKey||$event.shiftKey||$event.altKey||$event.metaKey){ return null; }$event.preventDefault();return _vm.handleTab.apply(null, arguments)}]}},[_vm._l((_vm.tokens),function(token,index){return _c('div',{key:token.id,ref:"tokens",refInFor:true,staticClass:"gl-token-selector-token-container gl-px-1 gl-py-2 gl-outline-none",attrs:{"data-token-id":token.id,"role":"option","tabindex":"-1"},on:{"focus":function($event){_vm.bindFocusEvent ? _vm.handleTokenFocus(index) : null;}}},[_c('gl-token',{staticClass:"gl-cursor-default",class:token.class,style:(token.style),attrs:{"view-only":_vm.viewOnly},on:{"close":function($event){return _vm.handleClose(token)}}},[_vm._t("token-content",function(){return [_c('span',[_vm._v("\n            "+_vm._s(token.name)+"\n          ")])]},{"token":token})],2)],1)}),_vm._v(" "),_vm._t("text-input")],2),_vm._v(" "),(_vm.showClearAllButton)?_c('div',{staticClass:"gl-ml-3 gl-p-1"},[_c('gl-button',{attrs:{"size":"small","aria-label":"Clear all","icon":"clear","category":"tertiary","data-testid":"clear-all-button"},on:{"click":function($event){$event.stopPropagation();return _vm.$emit('clear-all')}}})],1):_vm._e()])};
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
