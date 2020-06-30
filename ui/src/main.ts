import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import { concatWithAPI_URL } from '@/utils';

Vue.config.productionTip = false;
Vue.filter('concatWithAPI_URL', concatWithAPI_URL);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
