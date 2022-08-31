import type { App } from 'vue'
import { rippleDirective } from './ripple-directive'

export { rippleDirective }

export default {
  title: 'Ripple 水波纹',
  //install 方法，这个方法会在 app.use 函数内部执行
  install(app: App): void {
    rippleDirective(app)
  }
}


// Vue3
// import ripple from '@/direct/ripple'
// const app = createApp(App)
// app.use(ripple)

// Vue2
// import ripple from '@/direct/ripple'
// import Vue from 'vue'
// Vue.use(ripple)