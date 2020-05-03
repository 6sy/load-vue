import Vue from 'vue'
import App from './App.vue'
import './assets/gloabl.css'
// import Load from './components/Load/index'
import { components } from './components/Load/index.js'
// Vue.use(install)
Vue.use(components.YsLoadBobble)
Vue.use(components.YsLoad1)
Vue.use(components.YsLoad5)
Vue.use(components.YsLoad6)
Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
