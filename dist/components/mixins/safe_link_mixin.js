import { SafeLinkDirective } from '../../directives/safe_link/safe_link';

const SafeLinkMixin = {
  directives: {
    SafeLink: SafeLinkDirective
  },
  props: {
    isUnsafeLink: {
      type: Boolean,
      required: false,
      default: false
    },
    // This prevents bootstrap-vue from setting target="_self"
    // when target attribute is not present
    target: {
      type: String,
      required: false,
      default: null
    }
  },
  computed: {
    safeLinkConfig() {
      return {
        skipSanitization: this.isUnsafeLink
      };
    }
  }
};

export { SafeLinkMixin };
