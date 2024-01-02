<template>
  <div class="wrapper">
    <div class="left">
      <navigator />
    </div>
    <div class="right">
      <side-panel class="side" />
      <router-view class="main" />
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
import Navigator from '@/components/common/Navigator.vue';
import SidePanel from '@/components/chat/SidePanel.vue';
import { ElDrawer, ElButton } from 'element-plus';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

export default defineComponent({
  name: 'LayoutChat',
  components: {
    SidePanel,
    Navigator,
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
    await this.onGetConversations();
  },
  methods: {
    async onGetApplications() {
      await this.$store.dispatch('chat/getApplications');
    },
    async onGetConversations() {
      await this.$store.dispatch('chat/getConversations');
    }
  }
});
</script>

<style lang="scss" scoped>
.wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  .left {
    width: 60px;
    height: 100%;
    border-right: 1px solid var(--el-border-color);
  }
  .right {
    height: 100%;
    flex: 1;
    width: calc(100% - 60px);
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
  }
  .menu {
    display: none;
  }
}

@media (max-width: 767px) {
  .wrapper {
    .right {
      width: 100%;
      .side {
        display: none;
      }
    }
    .menu {
      display: block;
      position: fixed;
      right: 20px;
      top: 20px;
      z-index: 2000;
    }
  }
}
</style>
