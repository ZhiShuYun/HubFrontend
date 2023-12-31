<template>
  <layout>
    <template #presets>
      <preset-panel />
    </template>
    <template #operation>
      <channel-selector class="mb-4" />
      <api-status
        :initializing="initializing"
        :application="application"
        :api-id="channel.apiId"
        :need-apply="needApply"
        class="mb-4"
        @refresh="onGetApplications"
      />
      <div class="pt-4">
        <reference-image class="mb-4" @change="references = $event" />
        <prompt-input v-model="prompt" class="mb-4" />
        <elements-selector v-model="elements" :advanced="preset?.advanced" class="mb-4" />
        <ignore-selector v-if="preset?.advanced" v-model="ignore" class="mb-4" />
        <final-prompt v-if="finalPrompt" :model-value="finalPrompt" />
        <el-button type="primary" class="btn btn-generate" :disabled="!finalPrompt" @click="onGenerate">
          {{ $t('midjourney.button.generate') }}
        </el-button>
      </div>
    </template>
    <template #results>
      <task-brief-list :applications="applications" @custom="onCustom" />
    </template>
  </layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Layout from '@/layouts/Midjourney.vue';
import PresetPanel from '@/components/midjourney/PresetPanel.vue';
import PromptInput from '@/components/midjourney/PromptInput.vue';
import ElementsSelector from '@/components/midjourney/ElementsSelector.vue';
import IgnoreSelector from '@/components/midjourney/IgnoreSelector.vue';
import { ElButton, ElMessage } from 'element-plus';
import ChannelSelector from '@/components/midjourney/ChannelSelector.vue';
import ReferenceImage from '@/components/midjourney/ReferenceImage.vue';
import {
  IApplication,
  MidjourneyImagineAction,
  applicationOperator,
  midjourneyOperator,
  IMidjourneyImagineRequest,
  IApplicationDetailResponse
} from '@/operators';
import ApiStatus from '@/components/common/ApiStatus.vue';
import TaskBriefList from '@/components/midjourney/tasks/TaskBriefList.vue';
import FinalPrompt from '@/components/midjourney/FinalPrompt.vue';
import { ERROR_CODE_DUPLICATION } from '@/constants/errorCode';
import { Status } from '@/store/common/models';

interface IData {
  prompt: string;
  elements: string[];
  ignore: string;
  references: string[];
}

const CALLBACK_URL = 'https://webhook.zhishuyun.com/midjourney';

export default defineComponent({
  name: 'MidjourneyIndex',
  components: {
    ChannelSelector,
    ReferenceImage,
    PresetPanel,
    PromptInput,
    ElementsSelector,
    IgnoreSelector,
    ElButton,
    ApiStatus,
    TaskBriefList,
    FinalPrompt,
    Layout
  },
  data(): IData {
    return {
      prompt: '',
      elements: [],
      ignore: '',
      references: []
    };
  },
  computed: {
    channel() {
      return this.$store.state.midjourney.channel;
    },
    preset() {
      return this.$store.state.midjourney.preset;
    },
    initializing() {
      return this.$store.state.midjourney.getApplicationsStatus === Status.Request;
    },
    applications() {
      return this.$store.state.midjourney.applications;
    },
    needApply() {
      return this.$store.state.midjourney.getApplicationsStatus === Status.Success && !this.application;
    },
    application() {
      if (this.applications && this.applications.length > 0) {
        return this.applications.filter((item: IApplication) => item.api_id === this.channel.apiId)[0];
      }
      return undefined;
    },
    finalPrompt(): string {
      let content = '';
      if (this.references.length > 0) {
        content += `${this.references.join(' ')} `;
      }
      if (this.prompt) {
        content += this.prompt;
      }
      if (this.elements.length > 0) {
        content += ',' + this.elements.join(',');
      }
      if (this.preset.model && !content.includes(`--${this.preset.model}`)) {
        content += ` --${this.preset.model}`;
      }
      if (this.preset.version && !content.includes(`--version `) && !content.includes(`--v `)) {
        content += ` --version ${this.preset.version}`;
      }
      if (this.preset.chaos && !content.includes(`--chaos `)) {
        content += ` --chaos ${this.preset.chaos}`;
      }
      if (this.preset.quality && !content.includes(`--quality `) && !content.includes(`--q `)) {
        content += ` --quality ${this.preset.quality}`;
      }
      if (this.preset.ratio && !content.includes(`--aspect `) && !content.includes(`--ar `)) {
        content += ` --aspect ${this.preset.ratio}`;
      }
      if (this.preset.stylize && !content.includes(`--stylize `) && !content.includes(`--s `)) {
        content += ` --stylize ${this.preset.stylize}`;
      }
      if (this.preset.weird && !content.includes(`--weird `) && !content.includes(`--w `)) {
        content += ` --weird ${this.preset.weird}`;
      }
      if (this.ignore && !content.includes(`--no `)) {
        content += ` --no ${this.ignore}`;
      }
      if (this.preset.iw && !content.includes(`--iw `)) {
        content += ` --iw ${this.preset.iw}`;
      }
      if (this.preset.style && !content.includes(`--style`)) {
        content += ` --style ${this.preset.style}`;
      }
      return this.prompt || this.references?.length > 0 ? content : '';
    }
  },
  async mounted() {
    await this.onGetApplications();
  },
  methods: {
    onApply() {
      applicationOperator
        .create({
          // @ts-ignore
          application: this.application
        })
        .then(({ data: data }: { data: IApplicationDetailResponse }) => {
          this.application = data;
          ElMessage.success(this.$t('application.message.applySuccessfully'));
        })
        .catch((error) => {
          if (error?.response?.data?.code === ERROR_CODE_DUPLICATION) {
            ElMessage.error(this.$t('application.message.alreadyApplied'));
          }
        });
    },
    async onGetApplications() {
      await this.$store.dispatch('midjourney/getApplications');
    },
    async onStartTask(request: IMidjourneyImagineRequest) {
      const token = this.application?.credential?.token;
      const endpoint = this.application?.api?.endpoint;
      const path = this.application?.api?.path;
      if (!token || !endpoint || !path) {
        console.error('no token or endpoint or question');
        return;
      }
      midjourneyOperator
        .imagine(request, {
          token,
          endpoint,
          path
        })
        .then(() => {
          ElMessage.success(this.$t('midjourney.message.startTaskSuccess'));
        })
        .catch(() => {
          ElMessage.error(this.$t('midjourney.message.startTaskFailed'));
        });
    },
    async onCustom(payload: { image_id: string; action: MidjourneyImagineAction }) {
      const request = {
        image_id: payload.image_id,
        action: payload.action,
        callback_url: CALLBACK_URL
      };
      this.onStartTask(request);
    },
    async onGenerate() {
      const request = {
        prompt: this.finalPrompt,
        action: MidjourneyImagineAction.GENERATE,
        translation: this.preset?.translation,
        callback_url: CALLBACK_URL
      };
      this.onStartTask(request);
    }
  }
});
</script>

<style lang="scss" scoped>
.operation {
  flex: 1;
  padding: 15px;
  height: 100%;
  overflow-x: scroll;
  .title {
    font-size: 14px;
    margin-bottom: 10px;
  }
  .btn.btn-generate {
    width: 80px;
    border-radius: 20px;
  }
}
</style>
