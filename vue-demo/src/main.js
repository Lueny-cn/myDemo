import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/reset.scss'
import 'lib-flexible/flexible.js'
import CollapseTransition from './transitions/collapse-transition.js'
// import CollapseTransition from 'element-ui/lib/transitions/collapse-transition'
// Vue.config.productionTip = false

Vue.component(CollapseTransition.name, CollapseTransition)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
