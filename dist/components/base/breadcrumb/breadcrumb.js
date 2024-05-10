import { BBreadcrumb } from 'bootstrap-vue/esm/index.js';
import debounce from 'lodash/debounce';
import { translate } from '../../../utils/i18n';
import GlAvatar from '../avatar/avatar';
import GlDisclosureDropdown from '../new_dropdowns/disclosure/disclosure_dropdown';
import { GlTooltipDirective } from '../../../directives/tooltip';
import GlBreadcrumbItem from './breadcrumb_item';
import __vue_normalize__ from 'vue-runtime-helpers/dist/normalize-component.js';

//
var script = {
  name: 'GlBreadcrumb',
  components: {
    BBreadcrumb,
    GlBreadcrumbItem,
    GlAvatar,
    GlDisclosureDropdown
  },
  directives: {
    GlTooltip: GlTooltipDirective
  },
  inheritAttrs: false,
  props: {
    /**
     * The breadcrumb items to be displayed as links.
     */
    items: {
      type: Array,
      required: true,
      default: () => [{
        text: '',
        href: ''
      }],
      validator: items => {
        return items.every(item => {
          const keys = Object.keys(item);
          return keys.includes('text') && (keys.includes('href') || keys.includes('to'));
        });
      }
    },
    ariaLabel: {
      type: String,
      required: false,
      default: 'Breadcrumb'
    },
    /**
     * The label for the collapsed dropdown toggle. Screen-reader only.
     */
    showMoreLabel: {
      type: String,
      required: false,
      default: () => translate('GlBreadcrumb.showMoreLabel', 'Show more breadcrumbs')
    },
    /**
     * Allows to disable auto-resize behavior. Items will then overflow their container instead of being collapsed into a dropdown.
     */
    autoResize: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  data() {
    return {
      fittingItems: [...this.items],
      // array of items that fit on the screen
      overflowingItems: [],
      // array of items that didn't fit and were put in a dropdown instead
      totalBreadcrumbsWidth: 0,
      // the total width of all breadcrumb items combined
      widthPerItem: [],
      // array with the indivudal widths of each breadcrumb item
      resizeDone: false // to apply some CSS only during/after resizing
    };
  },
  computed: {
    hasCollapsible() {
      return this.overflowingItems.length > 0;
    },
    breadcrumbStyle() {
      return this.resizeDone ? {} : {
        opacity: 0
      };
    },
    itemStyle() {
      /**
       * If the last/only item, which is always visible, has a very long title,
       * it could overflow the breadcrumb component. This CSS makes sure it
       * shows an ellipsis instead.
       * But this CSS cannot be active while we do the size calculation, as that
       * would then not take the real unshrunk width of that item into account.
       */
      if (this.resizeDone && this.fittingItems.length === 1) {
        return {
          'flex-shrink': 1,
          'text-overflow': 'ellipsis',
          'overflow-x': 'hidden',
          'text-wrap': 'nowrap'
        };
      }
      return {};
    }
  },
  watch: {
    items: {
      handler: 'measureAndMakeBreadcrumbsFit',
      deep: true
    },
    autoResize(newValue) {
      if (newValue) this.enableAutoResize();else this.disableAutoResize();
    }
  },
  created() {
    this.debounceMakeBreadcrumbsFit = debounce(this.makeBreadcrumbsFit, 25);
  },
  mounted() {
    if (this.autoResize) {
      this.enableAutoResize();
    } else {
      this.resizeDone = true;
    }
  },
  beforeDestroy() {
    this.disableAutoResize();
  },
  methods: {
    resetItems() {
      this.fittingItems = [...this.items];
      this.overflowingItems = [];
    },
    async measureAndMakeBreadcrumbsFit() {
      this.resizeDone = false;
      this.resetItems();

      // Wait for DOM update so all items get rendered and can be measured.
      await this.$nextTick();
      this.totalBreadcrumbsWidth = 0;
      this.$refs.breadcrumbs.forEach((b, index) => {
        const width = b.$el.clientWidth;
        this.totalBreadcrumbsWidth += width;
        this.widthPerItem[index] = width;
      });
      this.makeBreadcrumbsFit();
    },
    makeBreadcrumbsFit() {
      this.resizeDone = false;
      this.resetItems();
      const containerWidth = this.$el.clientWidth;
      const buttonWidth = 40; // px

      if (this.totalBreadcrumbsWidth > containerWidth) {
        // Not all breadcrumb items fit. Start moving items over to the dropdown.
        const startSlicingAt = 0;

        // The last item will never be moved into the dropdown.
        const stopSlicingAt = this.items.length - 1;
        let widthNeeded = this.totalBreadcrumbsWidth;
        for (let index = startSlicingAt; index < stopSlicingAt; index += 1) {
          // Move one breadcrumb item into the dropdown
          this.overflowingItems.push(this.fittingItems[startSlicingAt]);
          this.fittingItems.splice(startSlicingAt, 1);
          widthNeeded -= this.widthPerItem[index];

          // Does it fit now? Then stop.
          if (widthNeeded + buttonWidth < containerWidth) break;
        }
      }
      this.resizeDone = true;
    },
    isLastItem(index) {
      return index === this.fittingItems.length - 1;
    },
    getAriaCurrentAttr(index) {
      return this.isLastItem(index) ? 'page' : false;
    },
    enableAutoResize() {
      this.resizeObserver || (this.resizeObserver = new ResizeObserver(this.debounceMakeBreadcrumbsFit));
      this.resizeObserver.observe(this.$el);
      this.measureAndMakeBreadcrumbsFit();
    },
    disableAutoResize() {
      if (this.resizeObserver) {
        this.resizeObserver.unobserve(this.$el);
        this.resizeObserver = null;
      }
      this.resetItems();
    }
  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('nav',{staticClass:"gl-breadcrumbs",style:(_vm.breadcrumbStyle),attrs:{"aria-label":_vm.ariaLabel}},[_c('b-breadcrumb',_vm._g(_vm._b({staticClass:"gl-breadcrumb-list"},'b-breadcrumb',_vm.$attrs,false),_vm.$listeners),[(_vm.hasCollapsible)?_c('li',{staticClass:"gl-breadcrumb-item"},[_c('gl-disclosure-dropdown',{staticStyle:{"height":"16px"},attrs:{"items":_vm.overflowingItems,"toggle-text":_vm.showMoreLabel,"fluid-width":"","text-sr-only":"","no-caret":"","icon":"ellipsis_h","size":"small"}})],1):_vm._e(),_vm._v(" "),_vm._l((_vm.fittingItems),function(item,index){return _c('gl-breadcrumb-item',{ref:"breadcrumbs",refInFor:true,style:(_vm.itemStyle),attrs:{"text":item.text,"href":item.href,"to":item.to,"aria-current":_vm.getAriaCurrentAttr(index)}},[(item.avatarPath)?_c('gl-avatar',{staticClass:"gl-breadcrumb-avatar-tile gl-border gl-mr-2 gl-rounded-base!",attrs:{"src":item.avatarPath,"size":16,"aria-hidden":"true","shape":"rect","data-testid":"avatar"}}):_vm._e(),_c('span',[_vm._v(_vm._s(item.text))])],1)})],2)],1)};
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
