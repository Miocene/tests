import isNumber from 'lodash/isNumber';
import { avatarSizeOptions, avatarShapeOptions } from '../../../utils/constants';
import { getAvatarChar } from '../../../utils/string_utils';
import __vue_normalize__ from 'vue-runtime-helpers/dist/normalize-component.js';

//
const IDENTICON_BG_COUNT = 7;
var script = {
  name: 'GlAvatar',
  props: {
    entityId: {
      type: Number,
      required: false,
      default: 0
    },
    entityName: {
      type: String,
      required: false,
      default: ''
    },
    src: {
      type: String,
      required: false,
      default: ''
    },
    /**
     * Show fallback identicon when image fails to load
     */
    fallbackOnError: {
      type: Boolean,
      required: false,
      default: false
    },
    alt: {
      type: String,
      required: false,
      default: 'avatar'
    },
    size: {
      type: [Number, Object],
      required: false,
      default: avatarSizeOptions[1],
      validator: value => {
        const sizes = isNumber(value) ? [value] : Object.values(value);
        const areValidSizes = sizes.every(size => {
          const isValidSize = avatarSizeOptions.includes(size);
          if (!isValidSize) {
            /* eslint-disable-next-line no-console */
            console.error(`Avatar size should be one of [${avatarSizeOptions}], received: ${size}`);
          }
          return isValidSize;
        });
        return areValidSizes;
      }
    },
    shape: {
      type: String,
      required: false,
      default: avatarShapeOptions.circle
    }
  },
  data() {
    return {
      imageLoadError: false
    };
  },
  computed: {
    sizeClasses() {
      if (isNumber(this.size)) {
        return `gl-avatar-s${this.size}`;
      }
      const {
        default: defaultSize,
        ...nonDefaultSizes
      } = this.size;
      return [`gl-avatar-s${defaultSize || avatarSizeOptions[1]}`, ...Object.entries(nonDefaultSizes).map(_ref => {
        let [breakpoint, size] = _ref;
        return `gl-${breakpoint}-avatar-s${size}`;
      })];
    },
    isCircle() {
      return this.shape === avatarShapeOptions.circle;
    },
    identiconBackgroundClass() {
      /*
       * Gets a number between 1-7 depending on the 'entityId'.
       * Gets the remainder after dividing the 'entityId' by the number of available backgrounds.
       */
      const type = this.entityId % IDENTICON_BG_COUNT + 1;
      return `gl-avatar-identicon-bg${type}`;
    },
    identiconText() {
      return getAvatarChar(this.entityName);
    },
    showImage() {
      // Don't show when image is not present
      if (!this.src) {
        return false;
      }
      // Don't show when fallbackOnError is true and there was failure to load image
      if (this.src && this.fallbackOnError && this.imageLoadError) {
        return false;
      }
      return true;
    }
  },
  watch: {
    src(newSrc, oldSrc) {
      if (newSrc !== oldSrc) this.imageLoadError = false;
    }
  },
  methods: {
    handleLoadError(event) {
      this.imageLoadError = true;
      this.$emit('load-error', event);
    }
  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.showImage)?_c('img',_vm._g({class:['gl-avatar', { 'gl-avatar-circle': _vm.isCircle }, _vm.sizeClasses],attrs:{"src":_vm.src,"alt":_vm.alt},on:{"error":_vm.handleLoadError}},_vm.$listeners)):_c('div',_vm._g({class:[
    'gl-avatar gl-avatar-identicon',
    { 'gl-avatar-circle': _vm.isCircle },
    _vm.sizeClasses,
    _vm.identiconBackgroundClass ]},_vm.$listeners),[_vm._v("\n  "+_vm._s(_vm.identiconText)+"\n")])};
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
