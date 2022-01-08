import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import mdiVue from 'mdi-vue/v2'
import * as mdijs from '@mdi/js'
import UUID from 'vue-uuid'


Vue.config.devtools = true

Vue.config.productionTip = false

export const eventBus = new Vue()

Vue.use(
  Vuex
)

Vue.use(UUID)

Vue.use(mdiVue, {
  icons: mdijs
}
)

new Vue({
  store: store,
  render: h => h(App),
}).$mount('#app')

const store = new Vuex.Store({
  state: {
    count: 1
  },
  mutations: {
    changeCount(state, parameter) {
      state.count = parameter
    }
  }
})

