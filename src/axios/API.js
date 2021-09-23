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

export const filesApi = {
    getFiles: async (folder) => {
        try {
            const response = await instance.get("files/", {
                params: {
                    folder
                }
            })
            return response.data
        } catch(e) {
            return {
                message:"error"
            }
        }
    }, 
    createFolder: async (rootId,foldername) => {
        try {
            const response = await instance.post("files/folder", {
                foldername,
                folder:rootId
            })
            return response.data
        } catch(e) {
            return {
                message:"error"
            }
        }
    },
    deleteFolder: async (_id) => {
        try {
            const response = await instance.delete("files/folder", {
                data: {
                    folders:[_id]
                }
            })
            return response.data
        } catch(e) {
            return {
                message:"error"
            }
        }
    }
}