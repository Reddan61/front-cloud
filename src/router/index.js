import { createRouter, createWebHistory } from "vue-router"
import Login from "@/pages/Login.vue"
import Register from "@/pages/Register.vue"
import Index from "@/pages/Index.vue"

const routes = [
    {
        path:'/login',
        component:Login
    },
    {
        path:'/register',
        component:Register
    },
    {
        path:'/',
        component: Index
    }
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

export default router