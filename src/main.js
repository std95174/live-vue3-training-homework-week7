import {createApp} from 'vue'
import {createPinia} from 'pinia'

import App from './App.vue'
import router from './router'

import axios from 'axios'
import VueAxios from 'vue-axios'

import './assets/all.scss'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import {LoadingPlugin} from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';

// import VeeValidate
import * as VeeValidate from 'vee-validate'
import VeeValidateRules from '@vee-validate/rules'
import * as VeeValidateI18n from '@vee-validate/i18n'

import zh_TW from './assets/zh_TW.json'

Object.keys(VeeValidateRules).forEach((rule) => {
    VeeValidate.defineRule(rule, VeeValidateRules[rule])
})
// Activate the locale
VeeValidate.configure({
    generateMessage: VeeValidateI18n.localize('zh_TW', zh_TW),
    validateOnInput: true // 調整為：輸入文字時，就立即進行驗證
})

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueAxios, axios)
app.use(VueSweetalert2);
app.use(LoadingPlugin);
app.component('VForm', VeeValidate.Form);
app.component('VField', VeeValidate.Field);
app.component('ErrorMessage', VeeValidate.ErrorMessage);

app.mount('#app')
