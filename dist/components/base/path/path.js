import iconSpriteInfo from '@gitlab/svgs/dist/icons.json';
import uniqueId from 'lodash/uniqueId';
import findLast from 'lodash/findLast';
import { GlResizeObserverDirective } from '../../../directives/resize_observer/resize_observer';
import { glThemes } from '../../../utils/constants';
import GlIcon from '../icon/icon';
import __vue_normalize__ from 'vue-runtime-helpers/dist/normalize-component.js';

//
const BOUNDARY_WIDTH = 40;
const PATH_ITEM_CLASS = 'gl-path-button';
const PATH_ACTIVE_ITEM_PREFIX = 'gl-path-active-item';
var script = {
  name: 'GlPath',
  components: {
    GlIcon
  },
  directives: {
    GlResizeObserverDirective
  },
  props: {
    /**
     * A list of path items in the form:
     * ```
     * {
     *   title:    String, required
     *   metric:   Any, optional
     *   icon:     String, optional
     *   disabled: Boolean, optional
     * }
     * ```
     */
    items: {
      type: Array,
      required: false,
      default: () => []
    },
    /**
     * The color theme to be used.
     */
    theme: {
      type: String,
      required: false,
      default: 'indigo',
      validator: theme => glThemes.includes(theme)
    },
    /**
     * The items' background color.
     */
    backgroundColor: {
      type: String,
      required: false,
      default: 'rgba(0,0,0,0)'
    }
  },
  data() {
    return {
      selectedIndex: 0,
      width: 0,
      scrollLeft: 0
    };
  },
  computed: {
    activeClass() {
      return `${PATH_ACTIVE_ITEM_PREFIX}-${this.theme}`;
    },
    entireListVisible() {
      return this.width >= this.getScrollWidth();
    },
    displayScrollLeft() {
      return !this.entireListVisible && this.scrollLeft;
    },
    displayScrollRight() {
      const scrollOffset = this.getScrollWidth() - this.width;
      return !this.entireListVisible && scrollOffset !== this.scrollLeft;
    },
    rightHandBoundary() {
      return this.width - BOUNDARY_WIDTH + this.scrollLeft;
    },
    leftHandBoundary() {
      return this.scrollLeft + BOUNDARY_WIDTH;
    }
  },
  watch: {
    items: {
      immediate: true,
      handler(items) {
        const selectedIndex = items.findIndex(item => item.selected);
        this.selectedIndex = selectedIndex > 0 ? selectedIndex : 0;
      }
    }
  },
  beforeCreate() {
    this.pathUuid = uniqueId('path-');
  },
  methods: {
    pathItemClass(index) {
      return index === this.selectedIndex ? `${PATH_ITEM_CLASS} ${this.activeClass}` : PATH_ITEM_CLASS;
    },
    onItemClicked(selectedIndex) {
      this.selectedIndex = selectedIndex;
      /**
       * Emitted when an item is selected.
       */
      this.$emit('selected', this.items[this.selectedIndex]);
    },
    handleResize(_ref) {
      let {
        contentRect: {
          width
        }
      } = _ref;
      this.width = width;
    },
    scrollPathLeft() {
      const previousItemToScollTo = findLast(this.$refs.pathListItems, listItem => {
        return listItem.offsetLeft < this.leftHandBoundary;
      });
      const availableWidth = this.width - previousItemToScollTo.offsetWidth - BOUNDARY_WIDTH - BOUNDARY_WIDTH;
      let scrollTo = previousItemToScollTo.offsetLeft - BOUNDARY_WIDTH - availableWidth;
      if (scrollTo < 0) {
        scrollTo = 0;
      }
      this.scrollPath(scrollTo);
    },
    scrollPathRight() {
      const nextItemToScollTo = this.$refs.pathListItems.find(listItem => listItem.offsetLeft + listItem.offsetWidth > this.rightHandBoundary);
      let scrollTo = nextItemToScollTo.offsetLeft - BOUNDARY_WIDTH;
      if (scrollTo > this.getScrollWidth() - this.width) {
        scrollTo = this.getScrollWidth() - this.width;
      }
      this.scrollPath(scrollTo);
    },
    scrollPath(scrollTo) {
      this.$refs.pathNavList.scrollTo({
        left: scrollTo,
        behavior: 'smooth'
      });
      this.scrollLeft = scrollTo;
    },
    getScrollWidth() {
      return this.$refs.pathNavList ? this.$refs.pathNavList.scrollWidth : 0;
    },
    shouldDisplayIcon(icon) {
      return icon && iconSpriteInfo.icons.includes(icon);
    },
    pathId(index) {
      return `${this.pathUuid}-item-${index}`;
    }
  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{directives:[{name:"gl-resize-observer-directive",rawName:"v-gl-resize-observer-directive",value:(_vm.handleResize),expression:"handleResize"}],staticClass:"gl-path-nav",style:({ '--path-bg-color': _vm.backgroundColor }),attrs:{"data-testid":"gl-path-nav"}},[_c('span',{directives:[{name:"show",rawName:"v-show",value:(_vm.displayScrollLeft),expression:"displayScrollLeft"}],staticClass:"gl-path-fade gl-path-fade-left"},[_c('button',{staticClass:"gl-clear-icon-button",attrs:{"aria-label":"Scroll left"},on:{"click":_vm.scrollPathLeft}},[_c('gl-icon',{attrs:{"size":32,"name":"chevron-left"}})],1)]),_vm._v(" "),_c('ul',{ref:"pathNavList",staticClass:"gl-path-nav-list"},_vm._l((_vm.items),function(item,index){return _c('li',{key:index,ref:"pathListItems",refInFor:true,staticClass:"gl-path-nav-list-item",attrs:{"id":_vm.pathId(index)}},[_c('button',{class:_vm.pathItemClass(index),attrs:{"category":item.disabled ? 'tertiary' : undefined,"disabled":item.disabled},on:{"click":function($event){return _vm.onItemClicked(index)}}},[(_vm.shouldDisplayIcon(item.icon))?_c('gl-icon',{staticClass:"gl-mr-2",attrs:{"name":item.icon,"data-testid":"gl-path-item-icon"}}):_vm._e(),_vm._v(_vm._s(item.title)),(item.metric)?_c('span',{staticClass:"gl-font-weight-normal gl-pl-2"},[_vm._v(_vm._s(item.metric))]):_vm._e()],1),_vm._v(" "),_vm._t("default",null,{"pathItem":item,"pathId":_vm.pathId(index)})],2)}),0),_vm._v(" "),_c('span',{directives:[{name:"show",rawName:"v-show",value:(_vm.displayScrollRight),expression:"displayScrollRight"}],staticClass:"gl-path-fade gl-path-fade-right"},[_c('button',{staticClass:"gl-clear-icon-button",attrs:{"aria-label":"Scroll right"},on:{"click":_vm.scrollPathRight}},[_c('gl-icon',{attrs:{"size":32,"name":"chevron-right"}})],1)])])};
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
