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
      {
        path: 'product/:id',
        name: 'Product',
        component: () => import('@/views/fronted/page/Product.vue'),
      },
      {
        path: 'reserve',
        name: 'Reserve',
        component: () => import('@/views/fronted/page/Reserve.vue'),
      },
      {
        path: 'account',
        name: 'Account',
        component: () => import('@/views/fronted/page/Account.vue'),
      },
      {
        path: 'login',
        name: 'Login',
        component: () => import('@/views/fronted/page/Login.vue'),
      },
      {
        path: 'wishlist',
        name: 'Wishlist',
        component: () => import('@/views/fronted/layout/Wishlist.vue'),
      },
      {
        path: 'orderhistory',
        name: 'OrderHistory',
        component: () => import('@/views/fronted/layout/Orderhistory.vue'),
      },
      {
        path: 'coupons',
        name: 'Coupons',
        component: () => import('@/views/fronted/layout/Coupons.vue'),
      },
      {
        path: 'checkout',
        name: 'Checkout',
        component: () => import('@/views/fronted/layout/Checkout.vue'),
      },
      {
        path: 'orderinfo',
        name: 'OrderInfo',
        component: () => import('@/views/fronted/layout/OrderInfo.vue'),
      },
      {
        path: 'orderfound/:orderId',
        name: 'OrderFound',
        component: () => import('@/views/fronted/layout/OrderFound.vue'),
      },
    ],
  },
  {
    path: '/admin',
    name: 'Dashboard',
    component: () => import('../views/backend/Dashboard.vue'),
    children: [
      {
        path: 'products',
        name: 'Products',
        component: () => import('../views/backend/Products.vue'),
      },
      {
        path: 'coupons',
        name: 'Coupons',
        component: () => import('../views/backend/Coupons.vue'),
      },
      {
        path: 'orders',
        name: 'Orders',
        component: () => import('../views/backend/Orders.vue'),
      },
      {
        path: 'storage',
        name: 'Storage',
        component: () => import('../views/backend/Storage.vue'),
      },
    ],
  },
  {
    path: '*',
    redirect: '/',
  },
];

const router = new VueRouter({
  linkExactActiveClass: 'active',
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  routes,
});

export default router;
