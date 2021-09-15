export const filesModule = {
    state: () => ({
        files:null,
        path:[{
            id:10,
            name:"TEST FOLDER"
        }]
    }),
    getters: {
        getPath(state) {
            return state.path.length === 0 ? "/" : `/${state.path.map(el => el.name).join("/")}`
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
        }
    },
    actions: {
        getFiles({state,commit},file = null) {
            if(!file) {
                commit("setFiles", file ? testInfo2 : testInfo)
                return
            }

            const index = state.path.findIndex(el => el.id === file.id)
            if(index !== -1) {
                commit("deletePath")
            } else {
                commit("addPath",file)
            }

            commit("setFiles", file ? testInfo2 : testInfo)
        },
    }
}


const testInfo = [
    {
        id:1,
        type:"folder",
        name:"SAMPLE FOLDER"
    },
    {
        id:2,
        type:"txt",
        name:"text"
    },
    {
        id:3,
        type:"image",
        name:"PHOTO"
    },
    {
        id:4,
        type:"dsdao",
        name:"PHOTO"
    }
]

const testInfo2 = [
    {
        id:2,
        type:"txt",
        name:"text"
    },
    {
        id:3,
        type:"image",
        name:"PHOTO"
    }
]