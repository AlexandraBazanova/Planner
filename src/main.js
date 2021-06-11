import Vue from 'vue'
import App from './App.vue'
Vue.config.devtools = true

Vue.config.productionTip = false

export const eventBus = new Vue()

new Vue({
  render: h => h(App),
}).$mount('#app')

Vue.directive('red', {
  inserted: function(el) {
    el.style.color = 'red'
  }
})