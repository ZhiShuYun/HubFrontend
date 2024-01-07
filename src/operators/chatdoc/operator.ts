import axios, { AxiosProgressEvent, AxiosResponse } from 'axios';
import {
  IChatdocChatResponse,
  IChatdocDocumentResponse,
  IChatdocRepositoriesResponse,
  IChatdocRepositoryResponse
} from './models';
import { BASE_URL_API } from '@/constants';
import { ACTION_CREATE, ACTION_DELETE, ACTION_RETRIEVE, ACTION_RETRIEVE_BATCH } from '@/constants';

class ChatdocOperator {
  async createRepository(options: { token: string }): Promise<AxiosResponse<IChatdocRepositoryResponse>> {
    return await axios.post(
      `/chatdoc/tasks`,
      {
        action: ACTION_CREATE
      },
      {
        headers: {
          authorization: `Bearer ${options.token}`,
          accept: 'application/json',
          'content-type': 'application/json'
        },
        baseURL: BASE_URL_API
      }
    );
  }

  async deleteRepository(id: string, options: { token: string }): Promise<AxiosResponse<IChatdocRepositoryResponse>> {
    return await axios.post(
      `/chatdoc/repositories`,
      {
        action: ACTION_DELETE,
        id
      },
      {
        headers: {
          authorization: `Bearer ${options.token}`,
          accept: 'application/json',
          'content-type': 'application/json'
        },
        baseURL: BASE_URL_API
      }
    );
  }

  async retrieveRepository(id: string, options: { token: string }): Promise<AxiosResponse<IChatdocRepositoryResponse>> {
    return await axios.post(
      `/chatdoc/repositories`,
      {
        action: ACTION_RETRIEVE,
        id
      },
      {
        headers: {
          authorization: `Bearer ${options.token}`,
          accept: 'application/json',
          'content-type': 'application/json'
        },
        baseURL: BASE_URL_API
      }
    );
  }

  async retrieveRepositories(ids: string[]): Promise<AxiosResponse<IChatdocRepositoriesResponse>> {
    return await axios.post(
      `/chatdoc/repositories`,
      {
        action: ACTION_RETRIEVE_BATCH,
        ids
      },
      {
        headers: {
          accept: 'application/json',
          'content-type': 'application/json'
        },
        baseURL: BASE_URL_API
      }
    );
  }

  async createDocument(
    repositoryId: string,
    options: { token: string }
  ): Promise<AxiosResponse<IChatdocDocumentResponse>> {
    return await axios.post(
      `/chatdoc/documents`,
      {
        action: ACTION_CREATE,
        repository_id: repositoryId
      },
      {
        headers: {
          authorization: `Bearer ${options.token}`,
          accept: 'application/json',
          'content-type': 'application/json'
        },
        baseURL: BASE_URL_API
      }
    );
  }

  async retrieveDocument(id: string, options: { token: string }): Promise<AxiosResponse<IChatdocDocumentResponse>> {
    return await axios.post(
      `/chatdoc/documents`,
      {
        action: ACTION_RETRIEVE,
        id
      },
      {
        headers: {
          authorization: `Bearer ${options.token}`,
          accept: 'application/json',
          'content-type': 'application/json'
        },
        baseURL: BASE_URL_API
      }
    );
  }

  async deleteDocument(id: string, options: { token: string }): Promise<AxiosResponse<IChatdocDocumentResponse>> {
    return await axios.post(
      `/chatdoc/documents`,
      {
        action: ACTION_DELETE,
        id
      },
      {
        headers: {
          authorization: `Bearer ${options.token}`,
          accept: 'application/json',
          'content-type': 'application/json'
        },
        baseURL: BASE_URL_API
      }
    );
  }

  async chat(
    repositoryId: string,
    options: { token: string; stream: (response: IChatdocChatResponse) => void }
  ): Promise<AxiosResponse<IChatdocChatResponse>> {
    return await axios.post(
      `/chatdoc/chat`,
      {
        repository_id: repositoryId
      },
      {
        headers: {
          authorization: `Bearer ${options.token}`,
          accept: 'application/x-ndjson',
          'content-type': 'application/json'
        },
        baseURL: BASE_URL_API,
        responseType: 'stream',
        onDownloadProgress: ({ event }: AxiosProgressEvent) => {
          const response = event.target.response;
          const lines = response.split('\r\n').filter((line: string) => !!line);
          const lastLine = lines[lines.length - 1];
          if (lastLine) {
            const jsonData = JSON.parse(lastLine);
            if (options?.stream) {
              options?.stream(jsonData as IChatdocChatResponse);
            }
          }
        }
      }
    );
  }
}

export const chatdocOperator = new ChatdocOperator();
