import { createApp } from 'vue'
import MainVue from './Main.vue'
import App from './app'
import Components from './components'

// vuejs v3
(async () => {
  const app = createApp(MainVue)

  Components(app);
  await App(app);
  
  app.mount('#app');
})();
