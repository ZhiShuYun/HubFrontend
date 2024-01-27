import { ACTION_CREATE, ACTION_DELETE, ACTION_UPDATE, ROLE_ASSISTANT, ROLE_SYSTEM, ROLE_USER } from '@/constants';

export interface IChatdocRepository {
  id: string;
  name?: string;
  description?: string;
  documents?: IChatdocDocument[];
}

export interface IChatdocDocument {
  id: string;
  repository_id: string;
  file_url: string;
  file_name: string;
}

export interface IChatdocMessage {
  content?: string;
  role?: typeof ROLE_SYSTEM | typeof ROLE_ASSISTANT | typeof ROLE_USER;
}

export interface IChatdocChatRequest {
  repository_id: string;
  messages: IChatdocMessage[];
  temperature?: number;
  knowledge_fallback?: boolean;
}

export interface IChatdocDocumentRequest extends IChatdocDocument {
  action: typeof ACTION_CREATE | typeof ACTION_UPDATE | typeof ACTION_DELETE;
  callback_url?: string;
}

export interface IChatdocDocumentResponse extends IChatdocDocument {}

export interface IChatdocRepositoryRequest extends IChatdocRepository {
  action: typeof ACTION_CREATE | typeof ACTION_UPDATE | typeof ACTION_DELETE;
}

export interface IChatdocRepositoryResponse extends IChatdocRepository {}
export type IChatdocRepositoriesResponse = IChatdocRepository[];
export type IChatdocDocumentsResponse = IChatdocDocument[];

export interface IChatdocChatResponse {
  answer: string;
  delta_answer: string;
  repository_id?: string;
}
