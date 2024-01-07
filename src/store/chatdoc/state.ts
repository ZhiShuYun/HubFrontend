import { CHAT_MODEL_CHATGPT } from '@/operators';
import { IChatdocState } from './models';

export default (): IChatdocState => {
  return {
    applications: undefined,
    getApplicationsStatus: undefined
  };
};
