import uniqueId from 'lodash/uniqueId';
import GlDisclosureDropdownItem from './disclosure_dropdown_item';
import { isGroup } from './utils';
import { DISCLOSURE_DROPDOWN_GROUP_BORDER_POSITIONS, DISCLOSURE_DROPDOWN_GROUP_NAME } from './constants';
import __vue_normalize__ from 'vue-runtime-helpers/dist/normalize-component.js';

const BORDER_CLASSES = {
  [DISCLOSURE_DROPDOWN_GROUP_BORDER_POSITIONS.top]: 'gl-border-t gl-border-t-gray-200 gl-pt-2 gl-mt-2',
  [DISCLOSURE_DROPDOWN_GROUP_BORDER_POSITIONS.bottom]: 'gl-border-b gl-border-b-gray-200 gl-pb-2 gl-mb-2'
};
var script = {
  name: DISCLOSURE_DROPDOWN_GROUP_NAME,
  components: {
    GlDisclosureDropdownItem
  },
  props: {
    /**
     * Group of items
     */
    group: {
      type: Object,
      required: false,
      default: null,
      validator: isGroup
    },
    /**
     * If 'true', will set top border for the group
     * to separate from other groups. You can control
     * the border position using the `borderPosition`
     * property.
     */
    bordered: {
      type: Boolean,
      required: false,
      default: false
    },
    /**
     * Controls the position of the group's border. Valid
     * values are 'top' and 'bottom'.
     */
    borderPosition: {
      type: String,
      required: false,
      default: DISCLOSURE_DROPDOWN_GROUP_BORDER_POSITIONS.top,
      validator: value => Object.keys(DISCLOSURE_DROPDOWN_GROUP_BORDER_POSITIONS).includes(value)
    }
  },
  computed: {
    borderClass() {
      return this.bordered ? BORDER_CLASSES[this.borderPosition] : null;
    },
    showHeader() {
      var _this$group;
      return this.$scopedSlots['group-label'] || ((_this$group = this.group) === null || _this$group === void 0 ? void 0 : _this$group.name);
    },
    groupLabeledBy() {
      return this.showHeader ? this.nameId : null;
    }
  },
  created() {
    this.nameId = uniqueId('gl-disclosure-dropdown-group-');
  },
  methods: {
    handleAction(action) {
      this.$emit('action', action);
    },
    uniqueItemId() {
      return uniqueId(`disclosure-item-`);
    }
  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('li',{class:_vm.borderClass},[(_vm.showHeader)?_c('div',{staticClass:"gl-pl-4 gl-py-2 gl-font-sm gl-font-weight-bold",attrs:{"id":_vm.nameId,"aria-hidden":"true"}},[_vm._t("group-label",function(){return [_vm._v(_vm._s(_vm.group.name))]})],2):_vm._e(),_vm._v(" "),_c('ul',{staticClass:"gl-mb-0 gl-pl-0 gl-list-style-none",attrs:{"aria-labelledby":_vm.groupLabeledBy}},[_vm._t("default",function(){return _vm._l((_vm.group.items),function(item){return _c('gl-disclosure-dropdown-item',{key:_vm.uniqueItemId(),attrs:{"item":item},on:{"action":_vm.handleAction},scopedSlots:_vm._u([{key:"list-item",fn:function(){return [_vm._t("list-item",null,{"item":item})]},proxy:true}],null,true)})})})],2)])};
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
export { BORDER_CLASSES };
