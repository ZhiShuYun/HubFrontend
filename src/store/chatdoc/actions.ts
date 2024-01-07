import { IApplication, apiUsageOperator, applicationOperator } from '@/operators';
import { IRootState, Status } from '../common/models';
import { ActionContext } from 'vuex';
import { log } from '@/utils/log';
import { IChatdocState } from './models';
import { IChatdocRepository } from '@/operators/chatdoc/models';
import { chatdocOperator } from '@/operators/chatdoc/operator';

export const setApplications = async ({ commit }: any, payload: IApplication[]): Promise<void> => {
  commit('setApplications', payload);
};

export const getApplications = async ({
  commit,
  rootState
}: ActionContext<IChatdocState, IRootState>): Promise<IApplication[]> => {
  log(getApplications, 'start to get application for chat');
  commit('setGetApplicationsStatus', Status.Request);
  const { data: applications } = await applicationOperator.getAll({
    user_id: rootState.user.id,
    api_id: []
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
  state,
  rootState
}: ActionContext<IChatdocState, IRootState>): Promise<IChatdocRepository[]> => {
  log(getRepositories, 'start to get repositories');
  commit('setGetRepositoriesStatus', Status.Success);
  const {
    data: { items: apiUsages }
  } = await apiUsageOperator.getAll({
    user_id: rootState.user.id,
    // @ts-ignore
    application_id: state.applications?.map((application) => application.id),
    offset: 0,
    limit: 50,
    ordering: '-created_at'
  });
  log(getRepositories, 'get api usages success', apiUsages);
  commit('setGetRepositoriesStatus', Status.Success);
  // de duplicate repositories using id
  const repositoryIds: string[] = apiUsages.map((apiUsage) => apiUsage.metadata?.repository_id).filter((id) => id);
  const uniqueRepositoryIds = [...new Set(repositoryIds)];
  log(getRepositories, 'get unique repository ids', uniqueRepositoryIds);
  const repositories = (await chatdocOperator.retrieveRepositories(uniqueRepositoryIds)).data;
  log(getRepositories, 'get repositories success', repositories);
  commit('setRepositories', repositories);
  return repositories;
};

export default {
  setApplications,
  getApplications,
  getRepositories,
  resetAll
};
