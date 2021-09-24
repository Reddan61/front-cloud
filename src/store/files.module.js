import { filesApi } from "@/axios/API.js"

export const filesModule = {
    state: () => ({
        files:[],
        folders:[],
        path:[]
    }),
    getters: {
        getPath(state) {
            return state.path.length === 0 ? "/" : `/${state.path.map(el => el.foldername).join("/")}`
        }
    },
    mutations: {
        addPath(state,file) {
            state.path.push(file)
        },
        deletePath(state) {
            state.path.pop()
        },
        setFiles(state,files) {
            state.files = files
        },
        setFolders(state,folders) {
            state.folders = folders
        },
        addFolder(state,folder) {
            state.folders.push(folder)
        },
        addFiles(state,files) {
            state.files.push(...files)
        }
    },
    actions: {
        async getFiles({state,commit},folder = null) {
           const response = await filesApi.getFiles(folder)
           if(response.message === "success") {
            commit("setFiles",response.payload.data.files)
            commit("setFolders",response.payload.data.folders)
           }
        },
        async createFolder({state,commit},foldername = "test") {
            const rootId = state.path[state.path.length - 1]?._id
            const response = await filesApi.createFolder(rootId,foldername)
            if(response.message === "success") {
                commit("addFolder",response.payload.data)
            }
        },
        async deleteFolders({state,commit, dispatch},_id) {
            const response = await filesApi.deleteFolder(_id)
            if(response.message === "success") {
                await dispatch("getFiles",state.path[state.path.length - 1]?._id)
            }
        },
        async uploadFiles({state,commit},payload) {
            const rootId = payload.folderId ? payload.folderId : state.path[state.path.length - 1]?._id
            const response = await filesApi.uploadFiles(payload.files,rootId)
            if(response.message === "success" && !payload.folderId) {
                commit("addFiles",response.payload.data)
            }
        },
        async deleteFiles({state,commit,dispatch},_id) {
            const response = await filesApi.deleteFiles(_id)
            if(response.message === "success") {
                await dispatch("getFiles",state.path[state.path.length - 1]?._id)
            }
        }
    },
    namespaced:true
}


const testInfo = [
  
]

const testInfo2 = [
    
]