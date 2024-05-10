import { BLink } from 'bootstrap-vue/esm/index.js';
import { ENTER, SPACE } from '../constants';
import { stopEvent } from '../../../../utils/utils';
import { isItem } from './utils';
import { DISCLOSURE_DROPDOWN_ITEM_NAME } from './constants';
import __vue_normalize__ from 'vue-runtime-helpers/dist/normalize-component.js';

const ITEM_CLASS = 'gl-new-dropdown-item';
var script = {
  name: DISCLOSURE_DROPDOWN_ITEM_NAME,
  ITEM_CLASS,
  components: {
    BLink
  },
  props: {
    item: {
      type: Object,
      required: false,
      default: null,
      validator: isItem
    }
  },
  computed: {
    isLink() {
      var _this$item, _this$item2;
      return typeof ((_this$item = this.item) === null || _this$item === void 0 ? void 0 : _this$item.href) === 'string' || typeof ((_this$item2 = this.item) === null || _this$item2 === void 0 ? void 0 : _this$item2.to) === 'string';
    },
    isCustomContent() {
      return Boolean(this.$scopedSlots.default);
    },
    itemComponent() {
      const {
        item
      } = this;
      if (this.isLink) return {
        is: BLink,
        attrs: {
          href: item.href,
          to: item.to,
          ...item.extraAttrs
        },
        listeners: {
          click: this.action
        }
      };
      return {
        is: 'button',
        attrs: {
          ...(item === null || item === void 0 ? void 0 : item.extraAttrs),
          type: 'button'
        },
        listeners: {
          click: () => {
            var _item$action;
            item === null || item === void 0 ? void 0 : (_item$action = item.action) === null || _item$action === void 0 ? void 0 : _item$action.call(undefined, item);
            this.action();
          }
        }
      };
    },
    listIndex() {
      var _this$item3, _this$item3$extraAttr;
      return (_this$item3 = this.item) !== null && _this$item3 !== void 0 && (_this$item3$extraAttr = _this$item3.extraAttrs) !== null && _this$item3$extraAttr !== void 0 && _this$item3$extraAttr.disabled ? null : 0;
    },
    componentIndex() {
      var _this$item4, _this$item4$extraAttr;
      return (_this$item4 = this.item) !== null && _this$item4 !== void 0 && (_this$item4$extraAttr = _this$item4.extraAttrs) !== null && _this$item4$extraAttr !== void 0 && _this$item4$extraAttr.disabled ? null : -1;
    },
    wrapperClass() {
      var _this$item$wrapperCla, _this$item5;
      return (_this$item$wrapperCla = (_this$item5 = this.item) === null || _this$item5 === void 0 ? void 0 : _this$item5.wrapperClass) !== null && _this$item$wrapperCla !== void 0 ? _this$item$wrapperCla : '';
    },
    wrapperListeners() {
      const listeners = {
        keydown: this.onKeydown
      };
      if (this.isCustomContent) {
        listeners.click = this.action;
      }
      return listeners;
    }
  },
  methods: {
    onKeydown(event) {
      const {
        code
      } = event;
      if (code === ENTER || code === SPACE) {
        if (this.isCustomContent) {
          this.action();
        } else {
          stopEvent(event);
          /** Instead of simply navigating or calling the action, we want
           * the `a/button` to be the target of the event as it might have additional attributes.
           * E.g. `a` might have `target` attribute.
           */
          const e = new MouseEvent('click', {
            bubbles: true,
            cancelable: true
          });
          if (this.isLink) {
            this.$refs.item.$el.dispatchEvent(e);
          } else {
            var _this$$refs$item;
            (_this$$refs$item = this.$refs.item) === null || _this$$refs$item === void 0 ? void 0 : _this$$refs$item.dispatchEvent(e);
          }
        }
      }
    },
    action() {
      this.$emit('action', this.item);
    }
  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('li',_vm._g({class:[_vm.$options.ITEM_CLASS, _vm.wrapperClass],attrs:{"tabindex":_vm.listIndex,"data-testid":"disclosure-dropdown-item"}},_vm.wrapperListeners),[_vm._t("default",function(){return [_c(_vm.itemComponent.is,_vm._g(_vm._b({ref:"item",tag:"component",staticClass:"gl-new-dropdown-item-content",attrs:{"tabindex":_vm.componentIndex}},'component',_vm.itemComponent.attrs,false),_vm.itemComponent.listeners),[_c('span',{staticClass:"gl-new-dropdown-item-text-wrapper"},[_vm._t("list-item",function(){return [_vm._v("\n          "+_vm._s(_vm.item.text)+"\n        ")]})],2)])]})],2)};
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
export { ITEM_CLASS };
