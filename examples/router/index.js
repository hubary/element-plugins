import Vue from 'vue';
import VueRouter from 'vue-router';
import Demo1 from '@examples/views/demo1.vue'
Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    alias: '/demo1',
    name: 'demo1',
    component: Demo1,
  },
  {
    path: '/demo2',
    name: 'demo2',
    component: () => import(/* webpackChunkName: "viewer" */ '@examples/views/demo2.vue'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
