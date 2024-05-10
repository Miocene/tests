import { BTabs } from 'bootstrap-vue/esm/index.js';
import { tabsButtonDefaults } from '../../../../utils/constants';
import GlButton from '../../button/button';
import __vue_normalize__ from 'vue-runtime-helpers/dist/normalize-component.js';

//
const validatorHelper = obj => Object.keys(obj).every(val => val === 'text' || val === 'attributes');
var script = {
  name: 'GlTabs',
  components: {
    BTabs,
    GlButton
  },
  inheritAttrs: false,
  props: {
    actionPrimary: {
      type: Object,
      required: false,
      default: null,
      validator: obj => validatorHelper(obj)
    },
    actionSecondary: {
      type: Object,
      required: false,
      default: null,
      validator: obj => validatorHelper(obj)
    },
    actionTertiary: {
      type: Object,
      required: false,
      default: null,
      validator: obj => validatorHelper(obj)
    },
    contentClass: {
      type: [String, Array, Object],
      required: false,
      default: null
    },
    navClass: {
      type: [String, Array, Object],
      required: false,
      default: null
    },
    justified: {
      type: Boolean,
      required: false,
      default: false
    },
    /**
     * Sync active tab with query string parameters. Allows for deep linking into specific tabs.
     */
    syncActiveTabWithQueryParams: {
      type: Boolean,
      required: false,
      default: false
    },
    /**
     * Name to use for query string parameter.
     */
    queryParamName: {
      type: String,
      required: false,
      default: 'tab'
    },
    value: {
      type: Number,
      required: false,
      default: 0
    }
  },
  data() {
    return {
      activeTabIndex: 0
    };
  },
  computed: {
    hasActions() {
      return [this.actionPrimary, this.actionSecondary, this.actionTertiary].some(Boolean);
    },
    listeners() {
      return {
        ...this.$listeners,
        input: this.handleInput
      };
    }
  },
  watch: {
    value: {
      handler(newValue) {
        if (this.activeTabIndex !== newValue) {
          this.activeTabIndex = newValue;
        }
      },
      immediate: true
    }
  },
  mounted() {
    if (this.syncActiveTabWithQueryParams) {
      this.syncActiveTabFromQueryParams();
      window.addEventListener('popstate', this.syncActiveTabFromQueryParams);
    }

    // Because we are manually binding `value` attribute to `b-tabs` the `input`
    // event is no longer automatically fired when the component is mounted.
    // To maintain parity with original `b-tabs` functionality
    // we manually fire the `input` event when the component is mounted.
    this.$emit('input', this.activeTabIndex);
  },
  destroyed() {
    window.removeEventListener('popstate', this.syncActiveTabFromQueryParams);
  },
  methods: {
    buttonBinding(prop, name) {
      if (!prop.attributes) {
        return tabsButtonDefaults[name];
      }
      return prop.attributes;
    },
    primary() {
      this.$emit('primary');
    },
    secondary() {
      this.$emit('secondary');
    },
    tertiary() {
      this.$emit('tertiary');
    },
    /**
     * When the query parameter is updated, update the active tab to match.
     */
    async syncActiveTabFromQueryParams() {
      await this.$nextTick();
      const queryParamValue = this.getQueryParamValue();
      const tabIndexToActivate = this.getTabs().findIndex((tab, tabIndex) => this.getTabQueryParamValue(tabIndex) === queryParamValue);
      this.activeTabIndex = tabIndexToActivate !== -1 ? tabIndexToActivate : 0;
    },
    /**
     * Returns a list of all <b-tab> instances associated with this tab control.
     */
    getTabs() {
      return this.$refs.bTabs.getTabs();
    },
    /**
     * Get the value of the query param as defined by the `queryParamName` prop.
     */
    getQueryParamValue() {
      const searchParams = new URLSearchParams(window.location.search);
      return searchParams.get(this.queryParamName);
    },
    /**
     * Set the value of the query param as defined by the `queryParamName` prop.
     * This method does nothing if the query param is already up to date.
     */
    setQueryParamValueIfNecessary(tabIndex) {
      const currentQueryParamValue = this.getQueryParamValue();
      const newQueryParamValue = this.getTabQueryParamValue(tabIndex);

      // If the current query parameter is already up-to-date,
      // avoid creating a duplicate history entry.
      if (tabIndex === 0 && !currentQueryParamValue || tabIndex !== 0 && currentQueryParamValue === newQueryParamValue) {
        return;
      }
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.set(this.queryParamName, newQueryParamValue);
      window.history.pushState({}, '', `${window.location.pathname}?${searchParams.toString()}`);
    },
    /**
     * Returns the query param value for a tab.
     * Defaults to the tab index unless the `query-param-value` attribute is set.
     */
    getTabQueryParamValue(tabIndex) {
      const tab = this.getTabs()[tabIndex];
      return (tab === null || tab === void 0 ? void 0 : tab.$attrs['query-param-value']) || tabIndex.toString();
    },
    /**
     * Event handler for `input` event.
     */
    handleInput(tabIndex) {
      this.$emit('input', tabIndex);
      this.activeTabIndex = tabIndex;
      if (this.syncActiveTabWithQueryParams) {
        this.setQueryParamValueIfNecessary(tabIndex);
      }
    }
  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('b-tabs',_vm._g(_vm._b({ref:"bTabs",staticClass:"gl-tabs",attrs:{"no-nav-style":true,"no-fade":true,"active-nav-item-class":"gl-tab-nav-item-active","content-class":[_vm.contentClass, 'gl-tab-content'],"nav-class":[_vm.navClass, 'gl-tabs-nav'],"justified":_vm.justified,"value":_vm.activeTabIndex},scopedSlots:_vm._u([_vm._l((Object.keys(_vm.$slots)),function(slot){return {key:slot,fn:function(){return [_vm._t(slot)]},proxy:true}}),(_vm.hasActions)?{key:"tabs-start",fn:function(){return [_c('div',{staticClass:"gl-actions-tabs-start",attrs:{"data-testid":"actions-tabs-start"}},[(_vm.actionPrimary)?_c('gl-button',_vm._b({attrs:{"data-testid":"action-primary"},on:{"click":_vm.primary}},'gl-button',_vm.buttonBinding(_vm.actionPrimary, 'actionPrimary'),false),[_vm._v("\n        "+_vm._s(_vm.actionPrimary.text)+"\n      ")]):_vm._e(),_vm._v(" "),(_vm.actionSecondary)?_c('gl-button',_vm._b({attrs:{"data-testid":"action-secondary"},on:{"click":_vm.secondary}},'gl-button',_vm.buttonBinding(_vm.actionSecondary, 'actionSecondary'),false),[_vm._v("\n        "+_vm._s(_vm.actionSecondary.text)+"\n      ")]):_vm._e(),_vm._v(" "),(_vm.actionTertiary)?_c('gl-button',_vm._b({attrs:{"data-testid":"action-tertiary"},on:{"click":_vm.tertiary}},'gl-button',_vm.buttonBinding(_vm.actionTertiary, 'actionTertiary'),false),[_vm._v("\n        "+_vm._s(_vm.actionTertiary.text)+"\n      ")]):_vm._e()],1)]},proxy:true}:null,(_vm.hasActions)?{key:"tabs-end",fn:function(){return [_c('div',{staticClass:"gl-actions-tabs-end",attrs:{"data-testid":"actions-tabs-end"}},[(_vm.actionPrimary)?_c('gl-button',_vm._b({attrs:{"data-testid":"action-primary"},on:{"click":_vm.primary}},'gl-button',_vm.buttonBinding(_vm.actionPrimary, 'actionPrimary'),false),[_vm._v("\n        "+_vm._s(_vm.actionPrimary.text)+"\n      ")]):_vm._e(),_vm._v(" "),(_vm.actionSecondary)?_c('gl-button',_vm._b({attrs:{"data-testid":"action-secondary"},on:{"click":_vm.secondary}},'gl-button',_vm.buttonBinding(_vm.actionSecondary, 'actionSecondary'),false),[_vm._v("\n        "+_vm._s(_vm.actionSecondary.text)+"\n      ")]):_vm._e(),_vm._v(" "),(_vm.actionTertiary)?_c('gl-button',_vm._b({attrs:{"data-testid":"action-tertiary"},on:{"click":_vm.tertiary}},'gl-button',_vm.buttonBinding(_vm.actionTertiary, 'actionTertiary'),false),[_vm._v("\n        "+_vm._s(_vm.actionTertiary.text)+"\n      ")]):_vm._e()],1)]},proxy:true}:null],null,true)},'b-tabs',_vm.$attrs,false),_vm.listeners))};
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
