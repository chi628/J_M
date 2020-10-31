import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import { ValidationProvider, ValidationObserver, localize } from 'vee-validate/dist/vee-validate.full.esm';
import tw from 'vee-validate/dist/locale/zh_TW.json';
// import VueI18n from 'vue-i18n';
import App from './Home.vue';
import router from './router';

Vue.config.productionTip = false;

localize('zh_TW', tw);
Vue.use(VueAxios, axios);
Vue.component('Loading', Loading);
Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

Vue.filter('money', (money) => {
  const parts = money.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
});

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
