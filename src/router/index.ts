import { createRouter, createWebHistory } from 'vue-router';
import auth from './auth';
import console from './console';
import chat from './chat';
import midjourney from './midjourney';
import distribution from './distribution';
import chatdoc from './chatdoc';

import { ROUTE_CHAT_CONVERSATION_NEW, ROUTE_INDEX } from './constants';

const routes = [
  {
    path: '/',
    name: ROUTE_INDEX,
    redirect: {
      name: ROUTE_CHAT_CONVERSATION_NEW
    }
  },
  console,
  chatdoc,
  auth,
  chat,
  midjourney,
  distribution
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;

export * from './constants';
