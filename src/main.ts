//import * as THREE from 'three'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

//app.config.globalProperties.$three = THREE

app.use(router).mount('#app')