import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui';
import MyHttpServer from '@/plugins/http.js'


//不要忘记引入css文件
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/css/base.css'

import router from './router'


//使用插件
Vue.use(ElementUI);
Vue.use(MyHttpServer);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
