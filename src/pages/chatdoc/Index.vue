<template>
  <layout>
    <template #chatdoc> hi </template>
  </layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Layout from '@/layouts/Chatdoc.vue';

export default defineComponent({
  name: 'ChatdocIndex',
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
