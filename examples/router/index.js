import Vue from 'vue';
import VueRouter from 'vue-router';
// ==开始==  demo组件引入  ========================0==
import DialogLimitDemo from '@examples/views/el-dialog-limit-demo.vue';
import HubaryDotDemo from '@examples/views/hubary-dot-demo.vue';
import HubaryRemoteSearchDemo from '@examples/views/hubary-remote-search-demo.vue';
import HubaryExpandSearchDemo from '@examples/views/hubary-expand-search-demo.vue';
// ==结束==  demo组件引入  ========================1==
Vue.use(VueRouter);

const routes = [
  {
    path: '/el-dialog-limit',
    component: DialogLimitDemo,
  },
  {
    path: '/hubary-expand-search',
    component: HubaryExpandSearchDemo,
  },

  {
    path: '/hubary-dot',
    component: HubaryDotDemo,
  },
  {
    path: '/hubary-remote-search',
    component: HubaryRemoteSearchDemo,
  },
  {
    path: '*',
    redirect: '/hubary-expand-search',
  },
];

const router = new VueRouter({
  routes,
});

export default router;
