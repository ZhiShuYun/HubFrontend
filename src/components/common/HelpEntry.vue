<template>
  <el-tooltip
    effect="dark"
    :content="`<p>${$t('common.message.helpWechat')}: yuxingzou</p><p>${$t(
      'common.message.helpWechat2'
    )}: sunbitty</p>`"
    placement="top-start"
    raw-content
  >
    <el-button type="primary" circle size="large">
      <font-awesome-icon icon="fa-solid fa-question" />
    </el-button>
  </el-tooltip>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ElTooltip, ElButton } from 'element-plus';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

export default defineComponent({
  name: 'HelpEntry',
  components: {
    ElTooltip,
    ElButton,
    FontAwesomeIcon
  }
});
</script>
