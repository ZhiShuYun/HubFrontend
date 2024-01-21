<template>
  <layout>
    <template #chatdoc>
      <el-card @click="onCreate">
        <font-awesome-icon :icon="['fas', 'book']" />
      </el-card>
      <el-card
        v-for="(repository, repositoryIndex) in repositories"
        :key="repositoryIndex"
        class="repository"
        @click="onClick(repository)"
      >
        {{ repository.id }}
      </el-card>
    </template>
  </layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Layout from '@/layouts/Chatdoc.vue';
import { ElCard } from 'element-plus';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { IChatdocRepository } from '@/operators';
import { ROUTE_CHATDOC_KNOWLEDGE } from '@/router';

export default defineComponent({
  name: 'ChatdocKnowledge',
  components: {
    Layout,
    ElCard,
    FontAwesomeIcon
  },
  data() {
    return {};
  },
  computed: {
    repositories() {
      return this.$store.state.chatdoc.repositories;
    }
  },
  async mounted() {},
  methods: {
    onCreate() {
      console.log('onCreate');
    },
    onClick(repository: IChatdocRepository) {
      console.log('onClick', repository);
      this.$router.push({
        name: ROUTE_CHATDOC_KNOWLEDGE,
        params: {
          id: repository.id
        }
      });
    }
  }
});
</script>

<style lang="scss" scoped>
.repository {
  width: 300px;
  margin-bottom: 20px;
}
</style>
