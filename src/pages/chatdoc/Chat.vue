<template>
  <layout>
    <template #chatdoc> Chat </template>
  </layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Layout from '@/layouts/Chatdoc.vue';

export default defineComponent({
  name: 'ChatdocChat',
  components: {
    Layout
  },
  data() {
    return {};
  },
  async mounted() {},
  methods: {}
});
</script>
