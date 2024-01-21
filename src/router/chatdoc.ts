import { ROUTE_CHATDOC_CHAT, ROUTE_CHATDOC_INDEX, ROUTE_CHATDOC_KNOWLEDGE, ROUTE_CHATDOC_SETTING } from './constants';

export default {
  path: '/chatdoc',
  meta: {
    auth: true
  },
  component: () => import('@/layouts/Main.vue'),
  children: [
    {
      path: '',
      name: ROUTE_CHATDOC_INDEX,
      component: () => import('@/pages/chatdoc/Index.vue')
    },
    {
      path: 'chat',
      name: ROUTE_CHATDOC_CHAT,
      component: () => import('@/pages/chatdoc/Chat.vue')
    },
    {
      path: 'knowledge/:id',
      name: ROUTE_CHATDOC_KNOWLEDGE,
      component: () => import('@/pages/chatdoc/Knowledge.vue')
    },
    {
      path: 'setting',
      name: ROUTE_CHATDOC_SETTING,
      component: () => import('@/pages/chatdoc/Setting.vue')
    }
  ]
};
