<script>
import GlButton from '../../base/button/button.vue';

export default {
  name: 'CloseButton',
  components: {
    GlButton,
  },
  props: {
    label: {
      type: String,
      required: false,
      default: 'Close',
    },
  },
};
</script>

<template>
  <gl-button
    category="tertiary"
    size="small"
    icon="close"
    :aria-label="label"
    v-bind="$attrs"
    v-on="$listeners"
  />
</template>
