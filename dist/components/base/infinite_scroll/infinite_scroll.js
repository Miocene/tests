import throttle from 'lodash/throttle';
import __vue_normalize__ from 'vue-runtime-helpers/dist/normalize-component.js';

const throttleDuration = 1000;
/**
 * After adding more items, scroll will adjust slightly.
 * Values in pixels, should be a small amount.
 */
const adjustScrollGap = 5;
const THRESHOLD = 1;
var script = {
  name: 'GlInfiniteScroll',
  props: {
    /**
     * Total number of items available
     */
    totalItems: {
      type: Number,
      required: false,
      default: 0
    },
    /**
     * Numbers of items fetched before scrolling
     */
    fetchedItems: {
      type: Number,
      required: true
    },
    /**
     * Max height of the list before the scrollbar appears
     */
    maxListHeight: {
      type: Number,
      required: false,
      default: 0
    }
  },
  computed: {
    listHeight() {
      return {
        maxHeight: this.maxListHeight ? `${this.maxListHeight}px` : 'auto'
      };
    },
    legendText() {
      if (this.totalItems > 0) {
        return `Showing ${this.fetchedItems} of ${this.totalItems} items`;
      }
      return `Showing ${this.fetchedItems} items`;
    }
  },
  watch: {
    fetchedItems(newVal, oldVal) {
      // Re-adjust scroll to the current item if more items are added
      if (newVal > oldVal) {
        const {
          scrollHeight,
          scrollTop
        } = this.$refs.infiniteContainer;
        // Only when scrolled to the top
        if (scrollHeight !== 0 && scrollTop === 0) {
          // Wait until the DOM is fully updated to adjust scroll
          this.$nextTick(() => {
            const {
              scrollHeight: newScrollHeight
            } = this.$refs.infiniteContainer;

            // New scrollTop is the new height, minus the old height
            // minus a small space to allow the user to trigger a scroll once more
            let top = newScrollHeight - scrollHeight - adjustScrollGap;

            // Never adjust to 0, or a new event may be be triggered
            if (top < 1) {
              top = 1;
            }
            this.scrollTo({
              top
            });
          });
        }
      }
    }
  },
  mounted() {
    // Scroll to bottom for reverse effect
    this.$nextTick(() => {
      if (this.$listeners.topReached && !this.$listeners.bottomReached) {
        this.scrollDown();
      }
    });
  },
  methods: {
    /**
     * Scroll to the top of the container, leaving a gap
     * to avoid triggering the event.
     */
    scrollUp() {
      this.scrollTo({
        top: adjustScrollGap
      });
    },
    /**
     * Scroll to the bottom of the container, leaving a gap
     * to avoid triggering the event.
     */
    scrollDown() {
      const {
        scrollHeight
      } = this.$refs.infiniteContainer;
      this.scrollTo({
        top: scrollHeight - adjustScrollGap
      });
    },
    /**
     * Scroll to a location in the container
     *
     * @param params.top - Number of pixels along Y axis to
     * scroll the list container.
     * @param params.behavior - Determines whether scrolling
     * is instant or animates smoothly. Can be 'auto', 'instant', or 'smooth'
     * See [MDN spec](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollTo)
     */
    scrollTo(_ref) {
      let {
        top,
        behavior
      } = _ref;
      this.$refs.infiniteContainer.scrollTo({
        top,
        behavior
      });
    },
    topReached: throttle(function topReachedThrottled() {
      /**
       * Emitted when item container is scrolled to the top
       */
      this.$emit('topReached');
    }, throttleDuration),
    bottomReached: throttle(function bottomReachedThrottled() {
      /**
       * Emitted when item container is scrolled to the bottom
       */
      this.$emit('bottomReached');
    }, throttleDuration),
    itemsListHeight() {
      return this.$refs.infiniteContainer.scrollHeight;
    },
    scrollTop() {
      return this.$refs.infiniteContainer.scrollTop;
    },
    handleScroll: throttle(function handleScrollThrottled() {
      if (Math.abs(this.itemsListHeight() - this.maxListHeight - this.scrollTop()) < THRESHOLD) {
        this.bottomReached();
      } else if (this.scrollTop() <= THRESHOLD) {
        this.topReached();
      }
    })
  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_vm._t("header"),_vm._v(" "),_c('div',_vm._g(_vm._b({ref:"infiniteContainer",staticClass:"gl-infinite-scroll-container",style:(_vm.listHeight),on:{"scroll":_vm.handleScroll}},'div',_vm.$attrs,false),_vm.$listeners),[_vm._t("items")],2),_vm._v(" "),_c('p',{staticClass:"gl-infinite-scroll-legend"},[_vm._t("default",function(){return [_vm._v("\n      "+_vm._s(_vm.legendText)+"\n    ")]},{"fetchedItems":_vm.fetchedItems,"totalItems":_vm.totalItems})],2)],2)};
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
export { adjustScrollGap };
