import { createApp } from 'vue'
import App from './App/app.vue'

import Components from './components/index'
import { Load } from './util/index'
import Directives from './directives/index'

const load = async function () {
  const main = createApp(App)
  
  Components(main)
  await Load(main)
  Directives(main)

  // main.directive
  
  main.mount('#app')
}

load()