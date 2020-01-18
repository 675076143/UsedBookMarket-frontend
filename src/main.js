
import Vue from 'vue';
import { router } from './config/router';
import './config/rem';
import App from './App.vue';
import VueLazyload from 'vue-lazyload'
import components from './config/components.js';
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';

import 'vant/lib/index.css';



Vue.use(ViewUI);
Vue.use(components);

Vue.use(VueLazyload)

new Vue({
  router,
  el: '#app',
  render: h => h(App)
});
