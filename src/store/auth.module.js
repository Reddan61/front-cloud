import { authApi } from "@/axios/API.ts"

export const authModule = {
    state: () => ({
        isAuth:false,
        user: null
    }),
    getters: {
        test(state,getters) {
            
        }
    },
    mutations: {
        async fetchAuth(state,user,isAuth) {
            state.isAuth = isAuth
            state.user = user
        }
    },
    actions: {
        async register({state,commit}, form) {
            const response = await authApi.register(form)
            
            return response
        },
        async login({state,commit}, form) {
            const response = await authApi.login(form)
            if(response.message === "success") {
                commit("fetchAuth",response.payload.data, true)
            }

            return response
        },
        async me({state,commit}, form) {
            const response = await authApi.me()

            if(response.message === "success") {
                commit("fetchAuth",response.payload.data, true)
            }

            return response
        },
        async logout({ commit }) {
            const response = await authApi.logout()

            if(response.message === "success") {
                commit("fetchAuth",null, false)
            }

            return response
        }
    },
    namespaced: true
}