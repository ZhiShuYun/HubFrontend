<template>
  <div v-if="visible" class="migration-notice">
    <div class="migration-notice-inner">
      <div class="migration-notice-icon">
        <font-awesome-icon icon="fa-solid fa-triangle-exclamation" />
      </div>
      <div class="migration-notice-body">
        <h4 class="migration-notice-title">{{ $t('common.message.migrationTitle') }}</h4>
        <p class="migration-notice-content">
          <i18n-t keypath="common.message.migrationContent" tag="span">
            <template #hub>
              <a href="https://hub.acedata.cloud/" target="_blank" rel="noopener noreferrer" class="migration-link">
                {{ $t('common.message.migrationHub') }}
              </a>
            </template>
            <template #platform>
              <a
                href="https://platform.acedata.cloud/"
                target="_blank"
                rel="noopener noreferrer"
                class="migration-link"
              >
                {{ $t('common.message.migrationPlatform') }}
              </a>
            </template>
          </i18n-t>
        </p>
      </div>
      <button class="migration-notice-close" @click="onClose">
        <font-awesome-icon icon="fa-solid fa-xmark" />
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const STORAGE_KEY = 'migration-notice-dismissed';

export default defineComponent({
  name: 'MigrationNotice',
  components: {
    FontAwesomeIcon
  },
  data() {
    return {
      visible: localStorage.getItem(STORAGE_KEY) !== 'true'
    };
  },
  methods: {
    onClose() {
      this.visible = false;
      localStorage.setItem(STORAGE_KEY, 'true');
    }
  }
});
</script>

<style lang="scss" scoped>
.migration-notice {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  padding: 0 16px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  box-shadow: 0 2px 12px rgba(102, 126, 234, 0.4);
}

.migration-notice-inner {
  max-width: 960px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  padding: 12px 0;
  gap: 12px;
}

.migration-notice-icon {
  font-size: 24px;
  color: #fff;
  flex-shrink: 0;
  animation: pulse 2s ease-in-out infinite;
}

.migration-notice-body {
  flex: 1;
  min-width: 0;
}

.migration-notice-title {
  margin: 0 0 4px;
  font-size: 15px;
  font-weight: 700;
  color: #fff;
  letter-spacing: 0.5px;
}

.migration-notice-content {
  margin: 0;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.92);
  line-height: 1.5;
}

.migration-link {
  color: #ffd700;
  font-weight: 600;
  text-decoration: underline;
  text-underline-offset: 2px;

  &:hover {
    color: #fff;
  }
}

.migration-notice-close {
  flex-shrink: 0;
  background: rgba(255, 255, 255, 0.15);
  border: none;
  color: #fff;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  transition: background 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.6;
  }
}

@media (max-width: 767px) {
  .migration-notice {
    padding: 0 12px;
  }

  .migration-notice-inner {
    padding: 10px 0;
  }

  .migration-notice-icon {
    font-size: 20px;
  }

  .migration-notice-title {
    font-size: 14px;
  }

  .migration-notice-content {
    font-size: 12px;
  }
}
</style>
