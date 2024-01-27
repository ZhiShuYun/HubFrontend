<template>
  <layout>
    <template #chatdoc>
      <el-button @click="onUpload">upload</el-button>
      <el-card v-for="(document, documentIndex) in documents" :key="documentIndex" class="document">
        {{ document.id }}
      </el-card>
      <el-alert v-if="documents?.length === 0" type="info" description="no documents" />
    </template>
  </layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Layout from '@/layouts/Chatdoc.vue';
import { IChatdocRepository } from '@/operators';
import { ElCard, ElButton, ElAlert } from 'element-plus';

export default defineComponent({
  name: 'ChatdocKnowledge',
  components: {
    Layout,
    ElButton,
    ElCard,
    ElAlert
  },
  data() {
    return {
      loading: false,
      id: this.$route.params.id.toString()
    };
  },
  computed: {
    repository(): IChatdocRepository | undefined {
      return this.$store.state?.chatdoc?.repositories?.find((repository) => repository.id === this.id);
    },
    documents() {
      return this.repository?.documents;
    }
  },
  async mounted() {
    this.loading = true;
    this.$store
      .dispatch('chatdoc/getDocuments', { repositoryId: this.id })
      .then(() => {
        this.loading = false;
      })
      .catch(() => {
        this.loading = false;
      });
  },
  methods: {
    onUpload() {
      console.log('onUpload');
    }
  }
});
</script>
