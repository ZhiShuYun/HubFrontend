<template>
  <layout>
    <template #chatdoc>
      <div class="wrapper">
        <conversations class="side" />
        <div class="chat"></div>
      </div>
    </template>
  </layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Layout from '@/layouts/Chatdoc.vue';
import { IChatdocRepository } from '@/operators';
import Conversations from '@/components/chatdoc/Conversations.vue';

export default defineComponent({
  name: 'ChatdocChat',
  components: {
    Layout,
    Conversations
  },
  data() {
    return {
      loading: false,
      repositoryId: this.$route.params.repositoryId.toString()
    };
  },
  computed: {
    repository(): IChatdocRepository | undefined {
      return this.$store.state?.chatdoc?.repositories?.find((repository) => repository.id === this.id);
    },
    conversations() {
      return this.repository?.conversations;
    }
  },
  async mounted() {
    console.log('start get conversations');
    this.loading = true;
    this.$store
      .dispatch('chatdoc/getConversations', { repositoryId: this.repositoryId })
      .then(() => {
        this.loading = false;
      })
      .catch(() => {
        this.loading = false;
      });
  },
  methods: {}
});
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-direction: row;
  height: 100%;
}
.chat {
  flex: 1;
  width: calc(100% - 300px);
}
</style>
