import Vue from 'vue';
import App from './App.vue';
import HubaryPackages from '@packages';
import ElementUI from 'element-ui';
import router from './router/index'
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI, { size: 'small' });
Vue.use(HubaryPackages);
Vue.config.productionTip = false;

const Instance = new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
console.log(Instance);