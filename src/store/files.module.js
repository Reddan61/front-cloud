import { filesApi } from "@/axios/API.js"

export const filesModule = {
    state: () => ({
        files:[],
        folders:[],
        path:[],
        choosedFilesNFolders: {
            files:[],
            folders:[]
        }
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
        },
        addChoosedFiles(state,payload) {
            const file = payload.file
            const isRightClick = payload.isRightClick

            const filtered = state.choosedFilesNFolders.files.filter(el => el !== file)

            if(state.choosedFilesNFolders.files.length !== filtered.length && !isRightClick) {
                state.choosedFilesNFolders = {
                    ... state.choosedFilesNFolders,
                    files: filtered
                } 
                return
            }
            
            state.choosedFilesNFolders = {
                ... state.choosedFilesNFolders,
                files: [... state.choosedFilesNFolders.files, file ]
            }
        },
        addChoosedFolders(state,payload) {
            const folder = payload.folder
            const isRightClick = payload.isRightClick

            const filtered = state.choosedFilesNFolders.folders.filter(el => el !== folder)

            if(state.choosedFilesNFolders.folders.length !== filtered.length && !isRightClick) {
                state.choosedFilesNFolders = {
                    ... state.choosedFilesNFolders,
                    folders: filtered
                } 
                return
            }
            state.choosedFilesNFolders = {
                ... state.choosedFilesNFolders,
                folders: [... state.choosedFilesNFolders.folders, folder ]
            }
        },
        clearChoosedFilesNFolder(state) {
            state.choosedFilesNFolders = {
                files:[],
                folders:[]
            }
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
        async createFolder({state,commit},foldername = "") {
            const rootId = state.path[state.path.length - 1]?._id
            const response = await filesApi.createFolder(rootId,foldername)
          
            if(response.message === "success") {
                commit("addFolder",response.payload.data)
            }
        },
        async delete({state,commit, dispatch}) {
            const response1 = await filesApi.deleteFolder(state.choosedFilesNFolders.folders)
            const response2 = await filesApi.deleteFiles(state.choosedFilesNFolders.files)
            await dispatch("getFiles",state.path[state.path.length - 1]?._id)
        },
        async uploadFiles({state,commit},payload) {
            const rootId = payload.folderId ? payload.folderId : state.path[state.path.length - 1]?._id
            const response = await filesApi.uploadFiles(payload.files,rootId)
            if(response.message === "success" && !payload.folderId) {
                commit("addFiles",response.payload.data)
            }
        },
        async downloadFilesNFolders({ state }) {
            const response = await filesApi.download(state.choosedFilesNFolders)
            if(response.message === "error") {
                alert("Что-то пошло не так!")
            }
        } 
    },
    namespaced:true
}