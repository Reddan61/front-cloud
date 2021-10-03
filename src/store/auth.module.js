import { authApi } from "@/axios/API.js"

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
        async fetchAuth(state,payload) {
            state.isAuth = payload.isAuth
            state.user = payload.user
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
                const payload = {
                    isAuth:true,
                    user: response.payload.data.user
                }
                localStorage.setItem("token",response.payload.data.token)
                commit("fetchAuth", payload)
            }

            return response
        },
        async me({state,commit}) {
            const response = await authApi.me()

            if(response.message === "success") {
                const payload = {
                    isAuth:true,
                    user: response.payload.data
                }
                commit("fetchAuth", payload)
            }

            return response
        },
        async logout({ commit }) {
            // const response = await authApi.logout()
            const payload = {
                isAuth:false,
                user: null
            }
            commit("fetchAuth",payload)
            localStorage.removeItem("token")
            // if(response.message === "success") {
            //     const payload = {
            //         isAuth:false,
            //         user: null
            //     }

            //     commit("fetchAuth",payload)
            // }

            // return response
            return true
        }
    },
    namespaced: true
}