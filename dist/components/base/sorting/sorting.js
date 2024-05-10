import { GlTooltipDirective } from '../../../directives/tooltip';
import GlButton from '../button/button';
import GlButtonGroup from '../button_group/button_group';
import GlCollapsibleListbox from '../new_dropdowns/listbox/listbox';
import { isOption } from '../new_dropdowns/listbox/utils';
import { translate } from '../../../utils/i18n';
import __vue_normalize__ from 'vue-runtime-helpers/dist/normalize-component.js';

var script = {
  name: 'GlSorting',
  components: {
    GlButton,
    GlButtonGroup,
    GlCollapsibleListbox
  },
  directives: {
    GlTooltip: GlTooltipDirective
  },
  props: {
    /**
     * Text to place in the toggle button.
     */
    text: {
      type: String,
      required: false,
      default: ''
    },
    /**
     * Sort options to display in the dropdown
     */
    sortOptions: {
      type: Array,
      required: false,
      default: () => [],
      // eslint-disable-next-line unicorn/no-array-callback-reference
      validator: sortOptions => sortOptions.every(isOption)
    },
    /**
     * The value of the item currently selected in the dropdown.
     * Only to be used with the `sortOptions` prop.
     */
    sortBy: {
      type: [String, Number],
      required: false,
      default: null
    },
    /**
     * Determines the current sort order icon displayed.
     */
    isAscending: {
      type: Boolean,
      required: false,
      default: false
    },
    /**
     * The text for the tooltip and aria-label of the sort direction toggle
     * button instead of the defaults for ascending/descending.
     */
    sortDirectionToolTip: {
      type: String,
      required: false,
      default: null
    },
    /**
     * Additional class(es) to apply to the root element of the GlCollapsibleListbox.
     */
    dropdownClass: {
      type: String,
      required: false,
      default: ''
    },
    /**
     * Additional class(es) to apply to the dropdown toggle.
     */
    dropdownToggleClass: {
      type: String,
      required: false,
      default: ''
    },
    /**
     * Additional class(es) to apply to the sort direction toggle button.
     */
    sortDirectionToggleClass: {
      type: String,
      required: false,
      default: ''
    },
    /**
     * Render the dropdown toggle button as a block element
     */
    block: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    localSortDirection() {
      return this.isAscending ? 'sort-lowest' : 'sort-highest';
    },
    sortDirectionText() {
      if (this.sortDirectionToolTip) return this.sortDirectionToolTip;
      return this.isAscending ? translate('GlSorting.sortAscending', 'Sort direction: ascending') : translate('GlSorting.sortDescending', 'Sort direction: descending');
    }
  },
  methods: {
    toggleSortDirection() {
      const newDirection = !this.isAscending;

      /**
       * Emitted when the sort direction button is clicked.
       *
       * The event's payload will be true if the direction has been changed to
       * ascending, or false if descending.
       *
       * @property {boolean} isAscending
       */
      this.$emit('sortDirectionChange', newDirection);
    },
    onSortByChanged(event) {
      /**
       * Emitted when the sort field is changed.
       *
       * The event's payload is the value of the selected sort field.
       *
       * Only emitted when using the `sortOptions` prop.
       *
       * @property {string|number} value
       */
      this.$emit('sortByChange', event);
    }
  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('gl-button-group',{staticClass:"gl-sorting"},[_c('gl-collapsible-listbox',{class:_vm.dropdownClass,attrs:{"toggle-text":_vm.text,"items":_vm.sortOptions,"selected":_vm.sortBy,"toggle-class":_vm.dropdownToggleClass,"placement":"bottom-end","block":_vm.block},on:{"select":_vm.onSortByChanged}}),_vm._v(" "),_c('gl-button',{directives:[{name:"gl-tooltip",rawName:"v-gl-tooltip"}],class:['sorting-direction-button', _vm.sortDirectionToggleClass],attrs:{"title":_vm.sortDirectionText,"icon":_vm.localSortDirection,"aria-label":_vm.sortDirectionText},on:{"click":_vm.toggleSortDirection}})],1)};
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
