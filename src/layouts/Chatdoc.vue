<template>
  <div class="main">
    <div class="side">
      <slot name="side">
        <side-panel />
      </slot>
    </div>
    <div class="chatdoc">
      <slot name="chatdoc" />
    </div>
    <el-button round class="menu" @click="drawer = true">
      <font-awesome-icon icon="fa-solid fa-bars" class="icon-menu" />
    </el-button>
    <el-drawer v-model="drawer" :with-header="false" size="340px" class="drawer">
      <side-panel />
    </el-drawer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SidePanel from '@/components/chatdoc/SidePanel.vue';
import { ElDrawer, ElButton } from 'element-plus';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

export default defineComponent({
  name: 'LayoutChatdoc',
  components: {
    SidePanel,
    ElDrawer,
    ElButton,
    FontAwesomeIcon
  },
  data() {
    return {
      drawer: false
    };
  },
  async mounted() {
    await this.onGetApplications();
    await this.onGetRepositories();
  },
  methods: {
    async onGetApplications() {
      await this.$store.dispatch('chatdoc/getApplications');
    },
    async onGetRepositories() {
      await this.$store.dispatch('chatdoc/onGetRepositories');
    }
  }
});
</script>

<style lang="scss" scoped>
.main {
  flex: 1;
  display: flex;
  flex-direction: row;
  .side {
    width: 300px;
    height: 100%;
    overflow-y: scroll;
  }

  .chat {
    height: 100%;
    padding: 15px;
    flex: 1;
    width: calc(100% - 300px);
    height: 100%;
    display: flex;
    flex-direction: column;
  }
}

.menu {
  display: none;
}

@media (max-width: 767px) {
  .side {
    display: none;
  }
  .chat {
    width: 100%;
  }
  .menu {
    display: block;
    position: fixed;
    right: 20px;
    top: 20px;
    z-index: 2000;
  }
}
</style>
