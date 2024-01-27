<template>
  <div class="main">
    <el-menu v-if="repositoryId" :default-active="activeMenu" mode="horizontal" :ellipsis="false" class="menu">
      <el-menu-item
        v-for="(menuItem, menuItemIndex) in menuItems"
        :key="menuItemIndex"
        :index="menuItem.index"
        @click="onClickMenu(menuItem)"
      >
        {{ menuItem.title }}
      </el-menu-item>
    </el-menu>
    <div class="chatdoc">
      <slot name="chatdoc" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ElMenu, ElMenuItem } from 'element-plus';
import {
  ROUTE_CHATDOC_CONVERSATION,
  ROUTE_CHATDOC_CONVERSATION_NEW,
  ROUTE_CHATDOC_KNOWLEDGE,
  ROUTE_CHATDOC_SETTING
} from '@/router';
import { RouteLocationRaw } from 'vue-router';

interface IMenuItem {
  index: string;
  title: string;
  route?: RouteLocationRaw;
}

interface IData {
  repositoryId: string;
  drawer: boolean;
  activeMenu: string | undefined;
  menuItems: IMenuItem[];
}

export default defineComponent({
  name: 'LayoutChatdoc',
  components: {
    ElMenu,
    ElMenuItem
  },
  data(): IData {
    return {
      repositoryId: this.$route.params?.repositoryId?.toString(),
      drawer: false,
      activeMenu: undefined,
      menuItems: [
        {
          index: 'chat',
          title: this.$t('chatdoc.nav.chat'),
          route: {
            name: ROUTE_CHATDOC_CONVERSATION_NEW
          }
        },
        /*
        {
          index: 'setting',
          title: this.$t('chatdoc.nav.setting'),
          route: {
            name: ROUTE_CHATDOC_SETTING
          }
        },
        */
        {
          index: 'knowledge',
          title: this.$t('chatdoc.nav.knowledge'),
          route: {
            name: ROUTE_CHATDOC_KNOWLEDGE
          }
        }
      ]
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
      await this.$store.dispatch('chatdoc/getRepositories');
    },
    async onClickMenu(menuItem: IMenuItem) {
      this.activeMenu = menuItem.index;
      if (menuItem.route) {
        await this.$router.push({
          // @ts-ignore
          ...menuItem.route,
          params: {
            id: this.id
          }
        });
      }
    }
  }
});
</script>

<style lang="scss" scoped>
.main {
  flex: 1;
  display: flex;
  flex-direction: column;

  .menu {
    width: 100%;
    justify-content: center;
  }

  .chatdoc {
    height: 100%;
    flex: 1;
    width: 100%;
    display: flex;
    flex-direction: row;
  }
}
</style>
