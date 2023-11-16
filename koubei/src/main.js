import './assets/main.css'

import { createApp } from 'vue'
//import { createPinia } from 'pinia'
import axios from 'axios'
import VueAxios from 'vue-axios'

import App from './App.vue'
import router from './router'
import { Loading,Overlay,Button,Checkbox   } from 'vant';
import 'vant/lib/index.css';

const app = createApp(App)

//app.use(createPinia())
app.use(router)
app.use(VueAxios, axios)
app.use(Loading);
app.use(Overlay);
app.use(Button);
app.use(Checkbox);
app.mount('#app')