import { authApi } from "@/axios/API.js"

export const authModule = {
    state: () => ({
        isAuth:false,
        user: null,
        loading: false
    }),
    mutations: {
        setLoading(state, payload) {
            if (state.loading === payload.loading) return;

            state.loading = payload.loading;
        },
        fetchAuth(state, payload) {
            state.isAuth = payload.isAuth
            state.user = payload.user
        }
    },
    actions: {
        async register({state, commit}, form) {
            const response = await authApi.register(form)
            return response
        },
        async login({state, commit}, form) {
            const response = await authApi.login(form)
            if(response.message === "success") {
                const payload = {
                    isAuth:true,
                    user: response.payload.data.user
                }

                commit("fetchAuth", payload)
            }

            return response
        },
        async me({state, commit}) {
            commit("setLoading", { loading: true });
            const response = await authApi.me()

            if(response.message === "success") {
                const payload = {
                    isAuth:true,
                    user: response.payload.data
                }

                commit("fetchAuth", payload)
            }

            commit("setLoading", { loading: false });

            return response
        },
        async logout({ commit }) {
            commit("setLoading", { loading: true });

            const response = await authApi.logout()

            if(response.message === "success") {
                const payload = {
                    isAuth:false,
                    user: null
                }

                commit("fetchAuth",payload)
            }

            commit("setLoading", { loading: false });
            
            return response
        }
    },
    namespaced: true
}