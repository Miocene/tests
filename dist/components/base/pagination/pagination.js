import debounce from 'lodash/debounce';
import isFunction from 'lodash/isFunction';
import range from 'lodash/range';
import { breakpoints, GlBreakpointInstance } from '../../../utils/breakpoints';
import { alignOptions, resizeDebounceTime } from '../../../utils/constants';
import GlIcon from '../icon/icon';
import GlLink from '../link/link';
import __vue_normalize__ from 'vue-runtime-helpers/dist/normalize-component.js';

//
const pageRange = (from, to) => range(from, to + 1, 1);
var script = {
  name: 'Pagination',
  components: {
    GlLink,
    GlIcon
  },
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    value: {
      type: Number,
      required: false,
      default: 1,
      validator: x => x > 0
    },
    /**
     * Number of items per page
     */
    perPage: {
      type: Number,
      required: false,
      default: 20,
      validator: x => x > 0
    },
    /**
     * Total number of items
     */
    totalItems: {
      type: Number,
      required: false,
      default: 0
    },
    /**
     * The object must contain the xs, sm, md and default keys
     */
    limits: {
      type: Object,
      required: false,
      default: () => ({
        xs: 0,
        sm: 3,
        md: 9,
        default: 9
      }),
      validator: value => {
        const missingSizes = Object.keys(breakpoints).filter(size => !value[size]).length;
        return missingSizes === 0 ? true : value.default;
      }
    },
    /**
     * A function that receives the page number and that returns a string representing the page URL
     */
    linkGen: {
      type: Function,
      required: false,
      default: null
    },
    /**
     * When using the compact pagination, use this prop to pass the previous page number
     */
    prevPage: {
      type: Number,
      required: false,
      default: null
    },
    /**
     * Text for the previous button (overridden by "previous" slot)
     */
    prevText: {
      type: String,
      required: false,
      default: 'Previous'
    },
    /**
     * When using the compact pagination, use this prop to pass the next page number
     */
    nextPage: {
      type: Number,
      required: false,
      default: null
    },
    /**
     * Text for the next button (overridden by "next" slot)
     */
    nextText: {
      type: String,
      required: false,
      default: 'Next'
    },
    /**
     * Text for the ellipsis (overridden by "ellipsis-left" and "ellipsis-right" slots)
     */
    ellipsisText: {
      type: String,
      required: false,
      default: '…'
    },
    /**
     * aria-label for the first page item
     */
    labelFirstPage: {
      type: String,
      required: false,
      default: 'Go to first page'
    },
    /**
     * aria-label for the previous page item
     */
    labelPrevPage: {
      type: String,
      required: false,
      default: 'Go to previous page'
    },
    /**
     * aria-label for the next page item
     */
    labelNextPage: {
      type: String,
      required: false,
      default: 'Go to next page'
    },
    /**
     * aria-label for the last page item
     */
    labelLastPage: {
      type: String,
      required: false,
      default: 'Go to last page'
    },
    /**
     * aria-label getter for numbered page items, defaults to "Go to page <page_number>"
     */
    labelPage: {
      type: Function,
      required: false,
      default: page => `Go to page ${page}`
    },
    /**
     * Controls the component\'s horizontal alignment, value should be one of "left", "center", "right" or "fill"
     */
    align: {
      type: String,
      required: false,
      default: alignOptions.left,
      validator: value => Object.keys(alignOptions).includes(value)
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      breakpoint: GlBreakpointInstance.getBreakpointSize(),
      // If total pages count is below or equal to minTotalPagesToCollapse, collapsing is disabled
      minTotalPagesToCollapse: 4
    };
  },
  computed: {
    isVisible() {
      return this.totalPages > 1 || this.isCompactPagination;
    },
    isLinkBased() {
      return isFunction(this.linkGen);
    },
    paginationLimit() {
      return typeof this.limits[this.breakpoint] !== 'undefined' ? this.limits[this.breakpoint] : this.limits.default;
    },
    maxAdjacentPages() {
      return Math.max(Math.ceil((this.paginationLimit - 1) / 2), 0);
    },
    totalPages() {
      return Math.ceil(this.totalItems / this.perPage);
    },
    isFillAlign() {
      return this.align === alignOptions.fill;
    },
    wrapperClasses() {
      const classes = [];
      if (this.align === alignOptions.center) {
        classes.push('justify-content-center');
      }
      if (this.align === alignOptions.right) {
        classes.push('justify-content-end');
      }
      if (this.isFillAlign) {
        classes.push('text-center');
      }
      return classes;
    },
    shouldCollapseLeftSide() {
      const diff = this.value - this.maxAdjacentPages;

      // Magic 3: prevents collapsing a single page on the left side
      return diff >= this.maxAdjacentPages && diff > 3 && this.totalPages > this.minTotalPagesToCollapse;
    },
    shouldCollapseRightSide() {
      // Magic 2: prevents collapsing a single page on the right side
      const diff = this.totalPages - 2 - this.value;
      return diff > this.maxAdjacentPages && this.totalPages > this.minTotalPagesToCollapse;
    },
    visibleItems() {
      let items = [];
      if (!this.isCompactPagination) {
        let firstPage = this.shouldCollapseLeftSide ? this.value - this.maxAdjacentPages : 1;
        // If we're on last page, show at least one page to the left
        firstPage = Math.min(firstPage, this.totalPages - 1);
        let lastPage = this.shouldCollapseRightSide ? this.value + this.maxAdjacentPages : this.totalPages;
        // If we're on first page, show at least one page to the right
        lastPage = Math.max(lastPage, 2);

        // Default numbered items
        items = pageRange(firstPage, lastPage).map(page => this.getPageItem(page));
        if (this.shouldCollapseLeftSide) {
          items.splice(0, 0, this.getPageItem(1, this.labelFirstPage), this.getEllipsisItem('left'));
        }
        if (this.shouldCollapseRightSide) {
          items.push(this.getEllipsisItem('right'), this.getPageItem(this.totalPages, this.labelLastPage));
        }
      }
      return items;
    },
    isCompactPagination() {
      return Boolean(!this.totalItems && (this.prevPage || this.nextPage));
    },
    prevPageIsDisabled() {
      return this.pageIsDisabled(this.value - 1);
    },
    nextPageIsDisabled() {
      return this.pageIsDisabled(this.value + 1);
    },
    prevPageAriaLabel() {
      return this.prevPageIsDisabled ? false : this.labelPrevPage || this.labelPage(this.value - 1);
    },
    nextPageAriaLabel() {
      return this.nextPageIsDisabled ? false : this.labelNextPage || this.labelPage(this.value + 1);
    },
    prevPageHref() {
      if (this.prevPageIsDisabled) return false;
      if (this.isLinkBased) return this.linkGen(this.value - 1);
      return '#';
    },
    nextPageHref() {
      if (this.nextPageIsDisabled) return false;
      if (this.isLinkBased) return this.linkGen(this.value + 1);
      return '#';
    }
  },
  created() {
    window.addEventListener('resize', debounce(this.setBreakpoint, resizeDebounceTime));
  },
  beforeDestroy() {
    window.removeEventListener('resize', debounce(this.setBreakpoint, resizeDebounceTime));
  },
  methods: {
    setBreakpoint() {
      this.breakpoint = GlBreakpointInstance.getBreakpointSize();
    },
    pageIsDisabled(page) {
      return this.disabled || page < 1 || this.isCompactPagination && page > this.value && !this.nextPage || !this.isCompactPagination && page > this.totalPages;
    },
    getPageItem(page) {
      let label = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      const commonAttrs = {
        'aria-label': label || this.labelPage(page),
        href: '#',
        class: []
      };
      const isActivePage = page === this.value;
      const isDisabled = this.pageIsDisabled(page);
      const attrs = {
        ...commonAttrs
      };
      const listeners = {};
      if (isActivePage) {
        attrs.class.push('active');
        attrs['aria-current'] = 'page';
      }
      // Disable previous and/or next buttons if needed
      if (this.isLinkBased) {
        attrs.href = this.linkGen(page);
      }
      listeners.click = e => this.handleClick(e, page);
      return {
        content: page,
        component: isDisabled ? 'span' : GlLink,
        disabled: isDisabled,
        key: `page_${page}`,
        slot: 'page-number',
        slotData: {
          page,
          active: isActivePage,
          disabled: isDisabled
        },
        attrs,
        listeners
      };
    },
    getEllipsisItem(side) {
      return {
        content: this.ellipsisText,
        key: `ellipsis_${side}`,
        slot: `ellipsis-${side}`,
        component: 'span',
        disabled: true,
        slotData: {},
        listeners: {}
      };
    },
    handleClick(event, value) {
      if (!this.isLinkBased) {
        event.preventDefault();
        /**
         * Emitted when the page changes
         * @event input
         * @arg {number} value The page that just got loaded
         */
        this.$emit('input', value);
      }
    },
    handlePrevious(event, value) {
      this.handleClick(event, value);
      /**
       * Emitted when the "previous" button is clicked
       * @event previous
       */
      this.$emit('previous');
    },
    handleNext(event, value) {
      this.handleClick(event, value);
      /**
       * Emitted when the "next" button is clicked
       * @event next
       */
      this.$emit('next');
    }
  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.isVisible)?_c('nav',{staticClass:"gl-pagination text-nowrap",attrs:{"aria-label":"Pagination"}},[_c('ul',{staticClass:"pagination",class:_vm.wrapperClasses},[_c('li',{staticClass:"page-item",class:{
        disabled: _vm.prevPageIsDisabled,
        'flex-fill': _vm.isFillAlign,
      },attrs:{"data-testid":"page-item","aria-hidden":_vm.prevPageIsDisabled}},[_c(_vm.prevPageIsDisabled ? 'span' : 'a',{tag:"component",staticClass:"gl-link page-link prev-page-item gl-display-flex",attrs:{"data-testid":"page-link","aria-label":_vm.prevPageAriaLabel,"href":_vm.prevPageHref},on:{"click":function($event){return _vm.handlePrevious($event, _vm.value - 1)}}},[_vm._t("previous",function(){return [_c('gl-icon',{attrs:{"name":"chevron-left"}}),_vm._v(" "),_c('span',[_vm._v(_vm._s(_vm.prevText))])]},null,{ page: _vm.value - 1, disabled: _vm.prevPageIsDisabled })],2)],1),_vm._v(" "),_vm._l((_vm.visibleItems),function(item){return _c('li',{key:item.key,staticClass:"page-item",class:{
        disabled: item.disabled,
        'flex-fill': _vm.isFillAlign,
      },attrs:{"data-testid":"page-item"}},[_c(item.component,_vm._g(_vm._b({tag:"component",staticClass:"page-link",attrs:{"data-testid":"page-link","size":"md","aria-disabled":item.disabled}},'component',item.attrs,false),item.listeners),[_vm._t(item.slot,function(){return [_vm._v(_vm._s(item.content))]},null,item.slotData)],2)],1)}),_vm._v(" "),_c('li',{staticClass:"page-item",class:{
        disabled: _vm.nextPageIsDisabled,
        'flex-fill': _vm.isFillAlign,
      },attrs:{"data-testid":"page-item","aria-hidden":_vm.nextPageIsDisabled}},[_c(_vm.nextPageIsDisabled ? 'span' : 'a',{tag:"component",staticClass:"gl-link page-link next-page-item gl-display-flex",attrs:{"data-testid":"page-link","aria-label":_vm.nextPageAriaLabel,"href":_vm.nextPageHref},on:{"click":function($event){return _vm.handleNext($event, _vm.value + 1)}}},[_vm._t("next",function(){return [_c('span',[_vm._v(_vm._s(_vm.nextText))]),_vm._v(" "),_c('gl-icon',{attrs:{"name":"chevron-right"}})]},null,{ page: _vm.value + 1, disabled: _vm.nextPageIsDisabled })],2)],1)],2)]):_vm._e()};
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
