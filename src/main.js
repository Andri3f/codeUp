import './assets/styles/index.scss'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { VueEmotion } from '@egoist/vue-emotion'

//import i18n
import i18n from './plugins/i18n'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)
app.use(VueEmotion)
app.mount('#app')
