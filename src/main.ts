import { 
    createApp,
 } from 'vue'
import App from './App.vue'
import router from '@/router/router'
import store from './store'

import 'animate.css/animate.min.css' //

import './permission'

/************CSS**************/
import '@/assets/scss/style.scss';
/************CSS**************/



createApp(App).use(router).use(store).mount('#app')
