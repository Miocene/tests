<script>
import { BNavbar } from 'bootstrap-vue';

export default {
  name: 'GlNavbar',
  components: {
    BNavbar,
  },
  inheritAttrs: false,
};
</script>

<template>
  <b-navbar class="gl-navbar" v-bind="$attrs" v-on="$listeners">
    <slot></slot>
  </b-navbar>
</template>
