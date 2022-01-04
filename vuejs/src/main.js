import Vue from 'vue'
import App from './App.vue'
import VueTailwind from 'vue-tailwind'
import TButton from 'vue-tailwind/dist/t-button'
import TModal from 'vue-tailwind/dist/t-modal'

Vue.use(VueTailwind, {
  't-modal': {
    component: TModal,
  },
  't-button': {
    component: TButton,
  },
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
