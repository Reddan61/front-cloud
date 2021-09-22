import { createRouter, createWebHistory } from "vue-router"
import store from "@/store"
import Login from "@/pages/Login.vue"
import Register from "@/pages/Register.vue"
import Index from "@/pages/Index.vue"
import { authApi } from "@/axios/API.ts"

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
        component: Index,
        meta: {auth:true}
    },
    {
        path: "/:catchAll(.*)",
        redirect: "/"
    }
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

router.beforeEach(async (to,from,next) => {
    const response = await store.dispatch("auth/me")
    const requiredAuth = to.matched.some(el => el.meta.auth)
    if(response.message === "error" && requiredAuth) {
        next("/login")
        return
    } else if(response.message === "success" && (to.path === "/login" || to.path === "/register" )) {
        next("/")
        return
    }
    next()
})

export default router