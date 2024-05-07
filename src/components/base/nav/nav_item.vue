<script>
import { BNavItem } from 'bootstrap-vue';

export default {
  name: 'GlNavItem',
  components: {
    BNavItem,
  },
  inheritAttrs: false,
};
</script>

<template>
  <b-nav-item v-bind="$attrs" v-on="$listeners">
    <slot></slot>
  </b-nav-item>
</template>
