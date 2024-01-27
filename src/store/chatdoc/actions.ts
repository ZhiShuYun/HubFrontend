import { IApplication, apiUsageOperator, applicationOperator } from '@/operators';
import { IRootState, Status } from '../common/models';
import { ActionContext } from 'vuex';
import { log } from '@/utils/log';
import { IChatdocState } from './models';
import { IChatdocDocument, IChatdocRepository } from '@/operators/chatdoc/models';
import { chatdocOperator } from '@/operators/chatdoc/operator';
import {
  API_ID_CHATDOC_CHAT,
  API_ID_CHATDOC_DOCUMENTS,
  API_ID_CHATDOC_REPOSITORIES
} from '@/operators/chatdoc/constants';

export const setApplications = async ({ commit }: any, payload: IApplication[]): Promise<void> => {
  commit('setApplications', payload);
};

export const setRepository = async ({ commit }: any, payload: { repository: IChatdocRepository }): Promise<void> => {
  commit('setRepository', payload);
};

export const getApplications = async ({
  commit,
  rootState
}: ActionContext<IChatdocState, IRootState>): Promise<IApplication[]> => {
  log(getApplications, 'start to get application for chat');
  commit('setGetApplicationsStatus', Status.Request);
  const { data: applications } = await applicationOperator.getAll({
    user_id: rootState.user.id,
    api_id: [API_ID_CHATDOC_REPOSITORIES, API_ID_CHATDOC_CHAT, API_ID_CHATDOC_DOCUMENTS]
  });
  log(getApplications, 'get application for chat success', applications);
  commit('setGetApplicationsStatus', Status.Success);
  commit('setApplications', applications?.items);
  return applications.items;
};

export const resetAll = ({ commit }: ActionContext<IChatdocState, IRootState>): void => {
  commit('resetAll');
};

export const getRepositories = async ({
  commit,
  state
}: ActionContext<IChatdocState, IRootState>): Promise<IChatdocRepository[]> => {
  log(getRepositories, 'start to get repositories');
  commit('setGetRepositoriesStatus', Status.Request);
  const applications = state.applications;
  console.log('applications', applications);
  const application = applications?.find(
    (application: IApplication) => application.api?.id === API_ID_CHATDOC_REPOSITORIES
  );
  console.log('application', application);
  const token = application?.credential?.token;
  if (!token) {
    commit('setRepositories', undefined);
    return [];
  }
  const repositories = (
    await chatdocOperator.getAllRepositories({
      token
    })
  ).data;
  commit('setGetRepositoriesStatus', Status.Success);
  log(getRepositories, 'get repositories success', repositories);
  commit('setRepositories', repositories);
  return repositories;
};

export const getDocuments = async (
  { commit, state }: ActionContext<IChatdocState, IRootState>,
  payload: { repositoryId: string }
): Promise<IChatdocDocument[]> => {
  log(getRepositories, 'start to get documents');
  const applications = state.applications;
  console.log('applications', applications);
  const application = applications?.find(
    (application: IApplication) => application.api?.id === API_ID_CHATDOC_DOCUMENTS
  );
  console.log('application', application);
  const token = application?.credential?.token;
  if (!token) {
    commit('setRepository', {
      id: payload.repositoryId,
      documents: []
    });
    return [];
  }
  const documents = (
    await chatdocOperator.getAllDocuments(payload.repositoryId, {
      token
    })
  ).data;
  log(getRepositories, 'get documents success', documents);
  commit('setRepository', {
    id: payload.repositoryId,
    documents: []
  });
  return documents;
};

export const getRepository = async (
  { commit, state }: ActionContext<IChatdocState, IRootState>,
  payload: { id: string }
): Promise<IChatdocRepository> => {
  log(getRepository, 'start to get repository');
  // commit('setGetRepositoryStatus', Status.Request);
  const applications = state.applications;
  const application = applications?.find(
    (application: IApplication) => application.api?.id === API_ID_CHATDOC_REPOSITORIES
  );
  const token = application?.credential?.token;
  if (!token) {
    commit('setRepository', { id: payload.id });
    return Promise.reject('no token');
  }
  const repository = (
    await chatdocOperator.getRepository(payload.id, {
      token
    })
  ).data;
  // commit('setGetRepositoryStatus', Status.Success);
  log(getRepository, 'get repository success', repository);
  commit('setRepository', repository);
  return repository;
};

export default {
  setApplications,
  getApplications,
  getRepositories,
  getRepository,
  setRepository,
  resetAll
};
