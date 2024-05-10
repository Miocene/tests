import debounce from 'lodash/debounce';
import { GlResizeObserverDirective } from '../../../../directives/resize_observer/resize_observer';
import GlIcon from '../../icon/icon';
import GlTabs from './tabs';
import __vue_normalize__ from 'vue-runtime-helpers/dist/normalize-component.js';

const NAV_CLASS = 'gl-scrollable-tabs-nav';
var script = {
  name: 'GlScrollableTabs',
  components: {
    GlTabs,
    GlIcon
  },
  directives: {
    GlResizeObserverDirective
  },
  inheritAttrs: false,
  data() {
    return {
      width: 0,
      // This is a reactive value of a child element's scrollLeft. It is not two-way bound.
      // Do not set manually outside of "scroll" callback.
      scrollLeft: 0,
      navScrollWidth: 0
    };
  },
  computed: {
    navClass() {
      const attrsNavClass = this.$attrs.navClass;
      if (!attrsNavClass) {
        return [NAV_CLASS];
      }
      if (Array.isArray(attrsNavClass)) {
        return [NAV_CLASS, ...attrsNavClass];
      }
      return [NAV_CLASS, attrsNavClass];
    },
    displayScrollLeft() {
      // if we have scrolled && there's overflow
      return this.scrollLeft && this.width < this.navScrollWidth;
    },
    displayScrollRight() {
      // if there's more overflow to the right
      return this.scrollLeft + this.width < this.navScrollWidth;
    },
    passthroughAttrs() {
      return Object.keys(this.$attrs).filter(key => !key.startsWith('action')).reduce((acc, key) => Object.assign(acc, {
        [key]: this.$attrs[key]
      }), {});
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.navScrollWidth = this.getScrollWidth();
    });
    this.handleNavScroll = debounce(e => {
      this.scrollLeft = e.target.scrollLeft;
    }, 100);
    this.getNavContainer().addEventListener('scroll', this.handleNavScroll);
  },
  beforeDestroy() {
    this.getNavContainer().removeEventListener('scroll', this.handleNavScroll);
  },
  updated() {
    // Whenever tabs are added or removed we need to recalculate the reactive scrollWidth
    this.$nextTick(() => {
      this.navScrollWidth = this.getScrollWidth();
    });
  },
  methods: {
    handleResize(_ref) {
      let {
        contentRect: {
          width
        }
      } = _ref;
      this.width = width;
      this.navScrollWidth = this.getScrollWidth();
    },
    scrollTabsLeft() {
      const scrollTo = this.scrollLeft - this.width;
      this.scrollTabs(Math.max(scrollTo, 0));
    },
    scrollTabsRight() {
      const scrollTo = this.scrollLeft + this.width;
      this.scrollTabs(Math.min(scrollTo, this.getScrollWidth() - this.width));
    },
    scrollTabs(scrollTo) {
      this.getNavContainer().scrollTo({
        left: scrollTo,
        behavior: 'smooth'
      });
      this.scrollLeft = scrollTo;
    },
    getScrollWidth() {
      var _this$getNavContainer;
      return ((_this$getNavContainer = this.getNavContainer()) === null || _this$getNavContainer === void 0 ? void 0 : _this$getNavContainer.scrollWidth) || 0;
    },
    getNavContainer() {
      var _this$$el;
      return (_this$$el = this.$el) === null || _this$$el === void 0 ? void 0 : _this$$el.querySelector(`.${NAV_CLASS}`);
    }
  },
  NAV_CLASS
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('gl-tabs',_vm._g(_vm._b({directives:[{name:"gl-resize-observer-directive",rawName:"v-gl-resize-observer-directive",value:(_vm.handleResize),expression:"handleResize"}],attrs:{"nav-class":_vm.navClass},scopedSlots:_vm._u([_vm._l((Object.keys(_vm.$slots)),function(slot){return {key:slot,fn:function(){return [_vm._t(slot)]},proxy:true}}),{key:"tabs-start",fn:function(){return [_c('li',{directives:[{name:"show",rawName:"v-show",value:(_vm.displayScrollLeft),expression:"displayScrollLeft"}],staticClass:"gl-tabs-fade gl-tabs-fade-left"},[_c('button',{staticClass:"gl-tabs-fade-icon-button",attrs:{"aria-label":"Scroll left","tabindex":"-1"},on:{"click":_vm.scrollTabsLeft}},[_c('gl-icon',{attrs:{"size":16,"name":"chevron-lg-left"}})],1)])]},proxy:true},{key:"tabs-end",fn:function(){return [_c('li',{directives:[{name:"show",rawName:"v-show",value:(_vm.displayScrollRight),expression:"displayScrollRight"}],staticClass:"gl-tabs-fade gl-tabs-fade-right"},[_c('button',{staticClass:"gl-tabs-fade-icon-button",attrs:{"aria-label":"Scroll right","tabindex":"-1"},on:{"click":_vm.scrollTabsRight}},[_c('gl-icon',{attrs:{"size":16,"name":"chevron-lg-right"}})],1)])]},proxy:true}],null,true)},'gl-tabs',_vm.passthroughAttrs,false),_vm.$listeners))};
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
