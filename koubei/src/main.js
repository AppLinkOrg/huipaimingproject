import './assets/main.css'

import { createApp } from 'vue'
//import { createPinia } from 'pinia'
import axios from 'axios'
import VueAxios from 'vue-axios'

import App from './App.vue'
import router from './router'
import {
  Loading,
  Overlay,
  Button,
  Checkbox,
  Toast,
  Dialog,
  NavBar,
  ConfigProvider,
  Field,
  Form,
  Calendar,
  DatePicker,
  Popup
} from 'vant'
import { VueEcharts } from 'vue3-echarts'
import 'vant/lib/index.css'

const app = createApp(App)

//app.use(createPinia())
app.use(router)
app.use(VueAxios, axios)
app.use(Loading)
app.use(Overlay)
app.use(Button)
app.use(Checkbox)
app.use(VueEcharts)
app.use(Toast)
app.use(Dialog)
app.use(NavBar)
app.use(ConfigProvider)
app.use(Field)
app.use(Form)
app.use(Calendar)
app.use(DatePicker)
app.use(Popup)
app.mount('#app')
