import { createApp } from 'vue'
import router from "@/router/"
import App from './App.vue'
import components from "@/components/UI"
import store from "@/store"
import Vfocus from '@/directives/Vfocus'

const app = createApp(App)

components.forEach(el => {
    app.component(el.name,el)
})

app.directive('focus', Vfocus)

app.use(router).use(store).mount('#app')
