import { 
    createApp,
 } from 'vue'
import App from './App.vue'
import router from '@/router/router'
import pinia  from '@/store/store'
import 'animate.css/animate.min.css' //
import 'element-plus/theme-chalk/el-message.css'
import './permission'
import ripple from '@/direct/ripple'

/************CSS**************/
import '@/assets/scss/style.scss';
/************CSS**************/
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
const app = createApp(App)
//element图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.use(router).use(pinia).use(ripple).mount('#app')


