import axios from "axios"

const instance = axios.create({
    withCredentials:true,
    baseURL:"http://localhost:8888/"
})


export const authApi = {
    me: async () => {
        try {
            const response = await instance.get("auth/me")
            return response.data
        } catch(e) {
            return {
                message:"error"
            }
        }
    },
    register: async (form) => {
        try {
            const response = await instance.post("auth/register", form)
            return response.data
        } catch(e) {
            return {
                message:"error"
            }
        }
    },
    login: async (form) => {
        try {
            const response = await instance.post("auth/login", form)
            return response.data
        } catch(e) {
            return {
                message:"error"
            }
        }
    },
    logout: async () => {
        try {
            const response = await instance.delete("auth/logout")
            return response.data
        } catch(e) {
            return {
                message:"error"
            }
        }
    }
}