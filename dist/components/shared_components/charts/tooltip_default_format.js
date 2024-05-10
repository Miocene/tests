import SeriesLabel from '../../charts/series_label/series_label';
import __vue_normalize__ from 'vue-runtime-helpers/dist/normalize-component.js';

var script = {
  name: 'TooltipDefaultFormat',
  components: {
    SeriesLabel
  },
  props: {
    tooltipContent: {
      type: Object,
      required: true
    }
  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',_vm._l((_vm.tooltipContent),function(value,label){return _c('div',{key:("" + label + (value.value)),staticClass:"gl-charts-tooltip-default-format-series"},[_c('series-label',{staticClass:"gl-charts-tooltip-default-format-series-label",attrs:{"color":value.color}},[_vm._v("\n      "+_vm._s(label)+"\n    ")]),_vm._v(" "),_c('div',{staticClass:"gl-charts-tooltip-default-format-series-value"},[_vm._t("tooltip-value",function(){return [_vm._v(_vm._s(value.value))]},{"value":value.value})],2)],1)}),0)};
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
