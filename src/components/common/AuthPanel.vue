<template>
  <el-dialog :model-value="!authenticated" class="dialog" width="400px">
    <iframe width="100%" height="100%" :src="iframeUrl" title="Auth Panel"></iframe>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ElDialog } from 'element-plus';
import { getBaseUrlAuth } from '@/utils';

export default defineComponent({
  name: 'AuthPanel',
  components: {
    ElDialog
  },
  data() {
    return {
      iframeUrl: getBaseUrlAuth()
    };
  },
  computed: {
    authenticated() {
      return !!this.$store.state.token.access;
    }
  },
  mounted() {
    window.addEventListener('message', (event: MessageEvent) => {
      console.log('data', event.data);
      if (event.data.name === 'login') {
        const data = event.data.data;
        console.log('data', data);
        const token = {
          access: data.access_token,
          refresh: data.refresh_token,
          expiration: data.expires_in
        };
        this.$store.dispatch('setToken', token);
      }
    });
  }
});
</script>

<style lang="scss" scoped>
.dialog {
  width: 400px;
  height: 600px;
}
</style>
