import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '',
        name: 'Index',
        component: () => import('@/views/fronted/layout/Index.vue'),
      },
      {
        path: 'about',
        name: 'About',
        component: () => import('@/views/fronted/page/About.vue'),
      },
      {
        path: 'products/:category',
        name: 'Products',
        component: () => import('@/views/fronted/page/Products.vue'),
      },
    ],
  },
  {
    path: '*',
    redirect: '/',
  },
];

const router = new VueRouter({
  routes,
});

export default router;
