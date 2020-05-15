import Vue from 'vue'
import App from './App.vue'
import './assets/gloabl.css'
import { components } from './components/Load/index.js'
Vue.use(components.YsLoad1)
Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
