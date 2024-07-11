import axios from "axios"
import { config } from "@/config"

const instance = axios.create({
    baseURL:`${config.apiUrl}/`,
    withCredentials: true,
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
    deleteFolder: async (ids) => {
        try {
            const response = await instance.delete("files/folder", {
                data: {
                    folders:ids
                }
            })
            return response.data
        } catch(e) {
            return {
                message:"error"
            }
        }
    },
    deleteFiles: async (ids) => {
        try {
            const response = await instance.delete("files/files", {
                data: {
                    files:ids
                }
            })
            return response.data
        } catch(e) {
            return {
                message:"error"
            }
        }
    },
    uploadFiles:async (files,folderId) => {
        try {
            const formdata = new FormData()
            if(folderId) {
                formdata.set("folder",folderId)
            }
            files.forEach(el => formdata.append("files",el))
            const response = await instance.post("files/upload",formdata)
            return response.data
        } catch(e) {
            return {
                message:"error"
            }
        }
    },
    download:async (filesNFolders) => {
        try {
            const response = await instance.post("files/download",filesNFolders, {
               responseType: 'arraybuffer'
            })
            var blob = new Blob([response.data], {type : "application/zip"});
            var objectUrl = URL.createObjectURL(blob);
            window.open(objectUrl);

            return response.data
        } catch(e) {
            return {
                message:"error"
            }
        }
    }
}