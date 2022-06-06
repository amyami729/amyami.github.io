import { createApp } from 'vue';
import App from './App.vue';
import router from './router/Index';
import store from './store';
import axios from 'axios';
import VueAxios from 'vue-axios';
import 'bootstrap';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import AOS from 'aos'
import 'aos/dist/aos.css'

import globalValidator from '@/globalValidator';
import { currency, date } from './filters/currency';

const app = createApp(App);
app.use(store);
app.use(router);
app.use(VueAxios, axios);

app.component('loading', Loading);
app.component('globalValidator', globalValidator);
app.config.globalProperties.$filters = { currency, date };

AOS.init({ });

app.mount('#app');

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const api = `${process.env.VUE_APP_APIPATH}/api/user/check`;
    axios.post(api).then((response) => {
      if (response.data.success) {
        next();
      } else {
        next({ path: '/login' });
      }
    });
  } else {
    next();
  }
});