import { createStore } from "vuex"
import { authModule } from "./auth.module"
import { filesModule } from "./files.module"


const store = createStore({
    modules: {
        auth: authModule,
        files: filesModule
    }
})


export default store