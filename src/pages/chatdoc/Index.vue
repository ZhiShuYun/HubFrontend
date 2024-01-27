<template>
  <layout>
    <template #chatdoc>
      <el-row class="repositories" :gutter="15">
        <el-col :xl="3" :md="4" :xm="6" :xs="24">
          <el-card class="repository" @click="onCreate">
            <font-awesome-icon :icon="['fas', 'book']" />
          </el-card>
        </el-col>
        <el-col
          v-for="(repository, repositoryIndex) in repositories"
          :key="repositoryIndex"
          :xl="3"
          :md="4"
          :xm="6"
          :xs="24"
        >
          <el-card class="repository" @click="onClick(repository)">
            <h2 class="name">{{ repository.name }}</h2>
            <p class="id">
              <font-awesome-icon :icon="['fas', 'book']" />
              {{ repository.id }}
            </p>
            <p class="description">
              {{ repository.description }}
            </p>
          </el-card>
        </el-col>
      </el-row>
    </template>
  </layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Layout from '@/layouts/Chatdoc.vue';
import { ElCard, ElRow, ElCol } from 'element-plus';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { IChatdocRepository } from '@/operators';
import { ROUTE_CHATDOC_KNOWLEDGE } from '@/router';

export default defineComponent({
  name: 'ChatdocKnowledge',
  components: {
    Layout,
    ElCard,
    ElRow,
    ElCol,
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
  width: 100%;
  margin-bottom: 20px;
  cursor: pointer;

  .name {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 10px;
  }

  .id {
    font-size: 12px;
    color: #333;
  }

  .description {
    font-size: 12px;
    color: #666;
  }
}
</style>
