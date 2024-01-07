import { ROUTE_CHATDOC_INDEX } from './constants';

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
    }
  ]
};
