<template>
  <layout>
    <template #chatdoc> Knowledge </template>
  </layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Layout from '@/layouts/Chatdoc.vue';

export default defineComponent({
  name: 'ChatdocKnowledge',
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
