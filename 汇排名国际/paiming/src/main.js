import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Vant from 'vant'
import 'vant/lib/index.css'
import 'amfe-flexible'
// import './libs/rem.js';
// import 'lib-flexible'

import wx from "weixin-jsapi";

// import store from './store'


createApp(App).use(router).use(Vant).mount('#app')