import { ROLE_ASSISTANT, ROLE_SYSTEM, ROLE_USER } from '@/constants';
import {
  CHAT_MODEL_NAME_CHATGPT,
  CHAT_MODEL_NAME_CHATGPT4,
  CHAT_MODEL_NAME_CHATGPT4_BROWSING,
  CHAT_MODEL_NAME_CHATGPT4_VISION,
  CHAT_MODEL_NAME_CHATGPT_16K,
  CHAT_MODEL_NAME_CHATGPT_BROWSING
} from './constants';

export type IChatModelName =
  | typeof CHAT_MODEL_NAME_CHATGPT
  | typeof CHAT_MODEL_NAME_CHATGPT4
  | typeof CHAT_MODEL_NAME_CHATGPT_16K
  | typeof CHAT_MODEL_NAME_CHATGPT_BROWSING
  | typeof CHAT_MODEL_NAME_CHATGPT4_BROWSING
  | typeof CHAT_MODEL_NAME_CHATGPT4_VISION;

export interface IChatModel {
  apiId: string;
  name: IChatModelName;
  displayName: string;
  description: string;
}

interface IError {
  code: string;
  detail?: string;
}

export enum IChatMessageState {
  PENDING = 'pending',
  ANSWERING = 'answering',
  FINISHED = 'finished',
  FAILED = 'failed'
}

export interface IChatMessageContentItem {
  type: string;
  text?: string;
  image_url?: string;
}

export interface IChatMessage {
  state?: IChatMessageState;
  content?: string | IChatMessageContentItem[];
  role?: typeof ROLE_SYSTEM | typeof ROLE_ASSISTANT | typeof ROLE_USER;
  error?: IError;
}

export interface IChatConversation {
  id: string;
  messages: IChatMessage[];
  title?: string;
  deleting?: boolean;
  editing?: boolean;
  new?: boolean;
}

export interface IChatAskOptions {
  stream?: (response: IChatAskResponse) => void;
  token: string;
  endpoint: string;
  path: string;
}

export interface IChatConversationOptions {
  endpoint: string;
  path: string;
}

export interface IChatAskRequest {
  question: string;
  references?: string[];
  stateful?: boolean;
  conversation_id?: string;
}

export interface IChatAskResponse {
  answer: string;
  delta_answer: string;
  conversation_id?: string;
}

export enum IChatConversationAction {
  RETRIEVE = 'retrieve',
  UPDATE = 'update',
  DELETE = 'delete',
  RETRIEVE_BATCH = 'retrieve_batch'
}

export interface IChatConversationRequest {
  action: IChatConversationAction;
  id: string;
  messages?: IChatMessage[];
}

export type IChatConversationResponse = IChatConversation;
