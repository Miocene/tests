import { BCollapse } from 'bootstrap-vue/esm/index.js';
import uniqueId from 'lodash/uniqueId';
import { GlCollapseToggleDirective } from '../../../directives/collapse_toggle';
import GlButton from '../button/button';
import __vue_normalize__ from 'vue-runtime-helpers/dist/normalize-component.js';

var script = {
  name: 'GlAccordionItem',
  components: {
    BCollapse,
    GlButton
  },
  directives: {
    GlCollapseToggle: GlCollapseToggleDirective
  },
  inject: ['accordionSetId', 'defaultHeaderLevel'],
  inheritAttrs: false,
  model: {
    prop: 'visible',
    event: 'input'
  },
  props: {
    /**
     * Used to set the title of accordion link
     */
    title: {
      type: String,
      required: true
    },
    /**
     * Used to set the title of accordion link when the content is visible
     * */
    titleVisible: {
      type: String,
      default: null,
      required: false
    },
    /**
     * When set, it will ensure the accordion item is initially visible
     */
    visible: {
      type: Boolean,
      default: false,
      required: false
    },
    /**
     * The header tag used in the accordion (h1/h2/h3/h4/h5/h6). This overrides the value provided by GlAccordion. For accessibility this should be set to an appropriate value in the context where the accordion is used.,
     */
    headerLevel: {
      type: Number,
      required: false,
      default: null,
      validator(value) {
        return value > 0 && value <= 6;
      }
    },
    /**
     * Additional CSS class(es) to be applied to the header
     */
    headerClass: {
      type: [String, Object, Array],
      required: false,
      default: ''
    }
  },
  data() {
    return {
      accordionItemId: uniqueId('accordion-item-'),
      isVisible: this.visible
    };
  },
  computed: {
    headerComponent() {
      const level = this.headerLevel || this.defaultHeaderLevel();
      return `h${level}`;
    },
    accordion() {
      return this.accordionSetId() || undefined;
    },
    icon() {
      return this.isVisible ? 'chevron-down' : 'chevron-right';
    },
    buttonTitle() {
      return this.isVisible && this.titleVisible ? this.titleVisible : this.title;
    }
  },
  watch: {
    isVisible: {
      immediate: true,
      handler(isVisible) {
        this.$emit('input', isVisible);
      }
    }
  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"gl-accordion-item"},[_c(_vm.headerComponent,{tag:"component",staticClass:"gl-accordion-item-header",class:_vm.headerClass},[_c('gl-button',{directives:[{name:"gl-collapse-toggle",rawName:"v-gl-collapse-toggle",value:(_vm.accordionItemId),expression:"accordionItemId"}],attrs:{"variant":"link","button-text-classes":"gl-display-flex","icon":_vm.icon}},[_vm._v("\n      "+_vm._s(_vm.buttonTitle)+"\n    ")])],1),_vm._v(" "),_c('b-collapse',{staticClass:"gl-mt-3 gl-font-base",attrs:{"id":_vm.accordionItemId,"visible":_vm.isVisible,"accordion":_vm.accordion,"data-testid":("accordion-item-collapse-" + _vm.accordionItemId)},model:{value:(_vm.isVisible),callback:function ($$v) {_vm.isVisible=$$v;},expression:"isVisible"}},[_vm._t("default")],2)],1)};
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
