export const authModule = {
    state: () => ({
        isAuth:true,
        user: {
            id:1,
            username:"Dizax"
        }
    }),
    getters: {
        test(state,getters) {
            
        }
    },
    mutations: {
        async fetchAuth({ state, commit}) {

        }
    },
    actions: {

    }
}