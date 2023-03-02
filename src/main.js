import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import axios from 'axios'
import VueAxios from 'vue-axios'

import './assets/all.scss'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import {LoadingPlugin} from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueAxios, axios)
app.use(VueSweetalert2);
app.use(LoadingPlugin);

app.mount('#app')
