import { IApplication, IChatConversation, IChatModel } from '@/operators';
import { IChatdocState } from './models';
import { Status } from '../common/models';
import { IChatdocRepository } from '@/operators/chatdoc/models';

export const resetAll = (state: IChatdocState): void => {
  state.applications = [];
  state.getApplicationsStatus = Status.None;
};

export const setApplications = (state: IChatdocState, payload: IApplication[]): void => {
  state.applications = payload;
};

export const setGetApplicationsStatus = (state: IChatdocState, payload: Status): void => {
  state.getApplicationsStatus = payload;
};

export const setRepositories = (state: IChatdocState, payload: IChatdocRepository[]): void => {
  state.repositories = payload;
};

export const setGetRepositoriesStatus = (state: IChatdocState, payload: Status): void => {
  state.getRepositoriesStatus = payload;
};

export default {
  setApplications,
  setGetApplicationsStatus,
  setRepositories,
  setGetRepositoriesStatus,
  resetAll
};
