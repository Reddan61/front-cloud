import { createApp } from 'vue'
import router from "@/router/"
import App from './App.vue'
import components from "@/components/UI"
import store from "@/store"

const app = createApp(App)

components.forEach(el => {
    app.component(el.name,el)
})

app.use(router).use(store).mount('#app')
