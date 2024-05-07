<script>
import { BNav } from 'bootstrap-vue';

export default {
  name: 'GlNav',
  components: {
    BNav,
  },
  inheritAttrs: false,
};
</script>

<template>
  <b-nav v-bind="$attrs" v-on="$listeners">
    <slot></slot>
  </b-nav>
</template>
