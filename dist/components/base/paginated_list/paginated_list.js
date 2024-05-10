import GlPagination from '../pagination/pagination';
import GlSearchBoxByType from '../search_box_by_type/search_box_by_type';
import __vue_normalize__ from 'vue-runtime-helpers/dist/normalize-component.js';

var script = {
  name: 'GlPaginatedList',
  components: {
    GlSearchBoxByType,
    GlPagination
  },
  props: {
    list: {
      type: Array,
      required: true
    },
    perPage: {
      type: Number,
      required: false,
      default: 10
    },
    page: {
      type: Number,
      required: false,
      default: 1
    },
    filterable: {
      type: Boolean,
      required: false,
      default: true
    },
    itemKey: {
      type: String,
      required: false,
      default: 'id'
    },
    filter: {
      type: [String, Function],
      required: false,
      default: 'id'
    },
    emptyMessage: {
      type: String,
      required: false,
      default: 'There are currently no items in this list.'
    },
    emptySearchMessage: {
      type: String,
      required: false,
      default: 'Sorry, your filter produced no results.'
    }
  },
  data() {
    return {
      pageIndex: this.page,
      queryStr: ''
    };
  },
  computed: {
    filteredList() {
      if (typeof this.filter === 'function') {
        return this.list.filter(listItem => this.filter(listItem, this.queryStr));
      }
      return this.list.filter(listItem => listItem[this.filter].toLowerCase().includes(this.queryStr.toLowerCase()));
    },
    paginatedList() {
      const offset = (this.pageIndex - 1) * this.perPage;
      return this.filteredList.slice(offset, offset + this.perPage);
    },
    pageInfo() {
      return {
        perPage: this.perPage,
        total: this.filterTotal,
        page: this.pageIndex
      };
    },
    total() {
      return this.list.length;
    },
    filterTotal() {
      return this.filteredList.length;
    },
    /**
     * Determine if the original list had 0 items
     *
     * @return {Boolean} - If we started with an empty list
     *
     */
    zeroTotal() {
      return this.total === 0;
    },
    /**
     * Determine if our search yields an empty list
     *
     * @return {Boolean} - If we have an empty search list
     *
     */
    zeroSearchResults() {
      return this.total > 0 && this.filterTotal === 0;
    },
    /**
     * Determine if we originally had 0 results or 0 search results
     *
     * @return {Boolean} - If we have an empty search list
     *
     */
    emptyList() {
      return this.zeroTotal || this.zeroSearchResults;
    }
  },
  watch: {
    /**
     * In GitLab UI storybook, when a user changes the page knob,
     * we update the current page index.
     *
     * @param {Number}  newPage - A string param
     * @return {undefined} - Nothing is returned
     *
     */
    page(newPage) {
      this.pageIndex = newPage;
    },
    /**
     * In GitLab UI storybook, when a user changes the perPage knob,
     * we reset the paginated list to the first page.
     *
     * @return {undefined} - Nothing is returned
     *
     */
    perPage() {
      this.pageIndex = 1;
    }
  },
  methods: {
    change(page) {
      this.pageIndex = page;
    },
    query(queryStr) {
      this.pageIndex = 1;
      this.queryStr = queryStr;
    }
  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{staticClass:"row-content-block second-block d-sm-flex justify-content-between flex-row-reverse"},[_vm._t("header"),_vm._v(" "),(_vm.filterable)?_c('gl-search-box-by-type',{on:{"input":_vm.query}}):_vm._e()],2),_vm._v(" "),_vm._t("subheader"),_vm._v(" "),_c('ul',{staticClass:"list-group list-group-flush list-unstyled"},_vm._l((_vm.paginatedList),function(listItem){return _c('li',{key:listItem[_vm.itemKey],staticClass:"list-group-item"},[_vm._t("default",function(){return [_vm._v(_vm._s(listItem.id))]},{"listItem":listItem,"query":_vm.queryStr})],2)}),0),_vm._v(" "),(!_vm.emptyList)?_c('gl-pagination',_vm._b({staticClass:"d-flex justify-content-center prepend-top-default",attrs:{"per-page":_vm.pageInfo.perPage,"value":_vm.pageInfo.page,"total-items":_vm.pageInfo.total},on:{"input":_vm.change}},'gl-pagination',_vm.$attrs,false)):_vm._e(),_vm._v(" "),(_vm.emptyList)?_c('div',{staticClass:"bs-callout bs-callout-warning mt-3 empty-message",class:{ 'empty-message': _vm.zeroTotal, 'empty-search': _vm.zeroSearchResults }},[_vm._v(_vm._s(_vm.zeroTotal ? _vm.emptyMessage : _vm.emptySearchMessage))]):_vm._e()],2)};
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
