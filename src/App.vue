<template>
  <el-config-provider :locale="locale">
    <migration-notice />
    <router-view />
    <auth-panel />
  </el-config-provider>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ElConfigProvider } from 'element-plus';
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
import AuthPanel from './components/common/AuthPanel.vue';
import MigrationNotice from './components/common/MigrationNotice.vue';

export default defineComponent({
  components: {
    ElConfigProvider,
    AuthPanel,
    MigrationNotice
  },
  data() {
    return {
      locale: zhCn
    };
  }
});
</script>
