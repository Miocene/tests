import { BTable } from 'bootstrap-vue/esm/index.js';
import { isDev, logWarning } from '../../../utils/utils';
import { tableFullProps, tableFullSlots, glTableLiteWarning } from './constants';
import __vue_normalize__ from 'vue-runtime-helpers/dist/normalize-component.js';

//
const shouldUseFullTable = _ref => {
  let {
    $attrs,
    $scopedSlots
  } = _ref;
  return tableFullProps.some(prop => $attrs[prop] !== undefined) || tableFullSlots.some(slot => $scopedSlots[slot] !== undefined);
};
const {
  tableClass
} = BTable.options.props;
var script = {
  name: 'GlTable',
  components: {
    BTable
  },
  inheritAttrs: false,
  props: {
    tableClass,
    fields: {
      type: Array,
      required: false,
      default: null
    },
    stickyHeader: {
      type: Boolean,
      default: false,
      required: false
    },
    sortBy: {
      type: String,
      required: false,
      default: undefined
    },
    sortDesc: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      localSortBy: this.sortBy,
      localSortDesc: this.sortDesc
    };
  },
  computed: {
    stickyHeaderClass() {
      return this.stickyHeader ? 'gl-table--sticky-header' : null;
    },
    localTableClass() {
      return ['gl-table', this.tableClass, this.stickyHeaderClass];
    },
    headSlots() {
      return ['head()', ...Object.keys(this.$scopedSlots).filter(slotName => slotName.startsWith('head('))];
    }
  },
  mounted() {
    // logWarning will call isDev before logging any message
    // this additional call to isDev is being made to exit the condition early when run in production
    if (isDev() && !shouldUseFullTable(this)) {
      logWarning(glTableLiteWarning, this.$el);
    }
  },
  methods: {
    isSortable(_ref2) {
      let {
        field
      } = _ref2;
      return field === null || field === void 0 ? void 0 : field.sortable;
    },
    activeSortingColumn(_ref3) {
      let {
        field
      } = _ref3;
      return this.localSortBy === (field === null || field === void 0 ? void 0 : field.key);
    },
    getSortingIcon(_ref4) {
      let {
        field
      } = _ref4;
      if (this.activeSortingColumn({
        field
      })) {
        if (this.localSortDesc) {
          return '↓';
        }
        return '↑';
      }
      if (this.$attrs['sort-direction'] === 'desc') {
        return '↓';
      }
      return '↑';
    }
  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('b-table',_vm._g(_vm._b({attrs:{"table-class":_vm.localTableClass,"fields":_vm.fields,"sort-by":_vm.localSortBy,"sort-desc":_vm.localSortDesc},on:{"update:sortBy":function($event){_vm.localSortBy=$event;},"update:sort-by":function($event){_vm.localSortBy=$event;},"update:sortDesc":function($event){_vm.localSortDesc=$event;},"update:sort-desc":function($event){_vm.localSortDesc=$event;}},scopedSlots:_vm._u([_vm._l((Object.keys(_vm.$scopedSlots)),function(slotName){return {key:slotName,fn:function(scope){return [_vm._t(slotName,null,null,scope)]}}}),_vm._l((_vm.headSlots),function(headSlotName){return {key:headSlotName,fn:function(scope){return [_c('div',{key:headSlotName,staticClass:"gl-display-flex"},[_vm._t(headSlotName,function(){return [_c('span',[_vm._v(_vm._s(scope.label))])]},null,scope),(_vm.isSortable(scope))?[_c('div',{staticClass:"gl-ml-2 gl-w-5 gl-text-gray-900 gl-display-flex gl-justify-content-center"},[_c('span',{class:{ 'gl-display-none': !_vm.activeSortingColumn(scope) },attrs:{"name":"sort-icon","data-testid":"sort-icon"}},[_vm._v("\n            "+_vm._s(_vm.getSortingIcon(scope))+"\n          ")])])]:_vm._e()],2)]}}})],null,true)},'b-table',_vm.$attrs,false),_vm.$listeners))};
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
