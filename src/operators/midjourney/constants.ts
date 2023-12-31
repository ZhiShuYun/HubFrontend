import i18n from '@/i18n';
import { IMidjourneyChannel } from './models';

export const MIDJOURNEY_CHANNEL_NAME_FAST = 'fast';
export const MIDJOURNEY_CHANNEL_NAME_RELAX = 'relax';
export const MIDJOURNEY_CHANNEL_NAME_TURBO = 'turbo';

export const API_ID_MIDJOURNEY_FAST = '9a628863-8879-462b-bbee-5dc46505b733';
export const API_ID_MIDJOURNEY_RELAX = 'c58713f3-fef7-4c18-824c-9f76b5a07a7f';
export const API_ID_MIDJOURNEY_TURBO = '62ec82bd-7de3-427f-b71a-ab3551ac7677';

export const MIDJOURNEY_CHANNEL_FAST: IMidjourneyChannel = {
  icon: 'fa-solid fa-wind',
  apiId: API_ID_MIDJOURNEY_FAST,
  name: MIDJOURNEY_CHANNEL_NAME_FAST,
  displayName: i18n.global.t('midjourney.button.fast')
};

export const MIDJOURNEY_CHANNEL_RELAX: IMidjourneyChannel = {
  icon: 'fa-solid fa-mug-saucer',
  apiId: API_ID_MIDJOURNEY_RELAX,
  name: MIDJOURNEY_CHANNEL_NAME_RELAX,
  displayName: i18n.global.t('midjourney.button.relax')
};

export const MIDJOURNEY_CHANNEL_TURBO: IMidjourneyChannel = {
  icon: 'fa-solid fa-bolt',
  apiId: API_ID_MIDJOURNEY_TURBO,
  name: MIDJOURNEY_CHANNEL_NAME_TURBO,
  displayName: i18n.global.t('midjourney.button.turbo')
};
