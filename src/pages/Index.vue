<template>
    <header-layout>
        <div class="main">
            <div class="main__path">
                <span @click = "getFiles(path[path.length - 1])">Назад</span>
                {{ getPath }}
            </div>
            <div class="main__container" @contextmenu.prevent="openmenu" 
                    @dragenter.prevent @dragover.prevent
                    @drop="onDragDrop">
                <div class="main__items">
                    <div v-if="!files[0] && !folders[0] && !isCreatingFolder">
                        Пусто
                    </div>
                    <folder v-for="folder in folders" :key="folder._id" :folder = "folder" />
                    <file v-for="file in files" :key="file._id" :file = "file" />
                    <folder 
                        v-if = "isCreatingFolder" 
                        :isCreating = "isCreatingFolder" 
                        @create = "createFolderByEmit"
                    />
                </div>
            </div>
            
        </div>
        <custom-menu 
            :_id = "clickedId" 
            :type = "type" 
            :isShow = "isShowMenu" 
            :mousePosition = "cursorPosition"
            @create-folder = "this.isCreatingFolder = true"
        />
    </header-layout>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex"
import HeaderLayout from "@/components/Header/HeaderLayout.vue"
import File from "@/components/File/File.vue"
import Folder from "@/components/Folder/Folder.vue"

export default {
  components: { HeaderLayout, File, Folder },
  data() {
      return {
          isShowMenu:false,
          cursorPosition: [],
          clickedId:null,
          type:null,
          isCreatingFolder:false
      }
  },
  methods: {
    ...mapActions({
        getFiles: 'files/getFiles',
        createFolder: "files/createFolder",
        uploadFiles: "files/uploadFiles"
    }),
    openmenu(e) {
        this.type = null
        this.clickedId = null
        if(e.target.closest(".folder")){
            this.type = "folder"
            this.clickedId = e.target.closest(".folder")?.classList[1]
        } else if(e.target.closest(".file")){
            this.type = "file"
            this.clickedId = e.target.closest(".file")?.classList[1]
        }
        this.isShowMenu = !this.isShowMenu
        this.cursorPosition = [e.pageX,e.pageY]
    },
    clearClick(e) {
        this.isShowMenu = false
    },
    async createFolderByEmit(foldername) {
        this.isCreatingFolder = false
        await this.createFolder(foldername)
    },
    onDragDrop(e) {
        e.preventDefault()
        const maxSize = 1 * 1024 * 1024 * 10
        const files = e.dataTransfer.files
        const filesFiltred = [...files].filter(el => el.type !== "" && el.size <= maxSize)
        
        if(e.target.closest(".folder")) {
            const folderId = e.target.closest(".folder")?.classList[1]
            this.uploadFiles({files:filesFiltred,folderId})
            return
        }
        this.uploadFiles({files:filesFiltred})
    }
  },
  computed: {
    ...mapState({
        files: state => state.files.files,
        folders:state => state.files.folders,
        path: state => state.files.path
    }),
    ...mapGetters({
        getPath: "files/getPath"
    })  
  },
  mounted() {
      this.getFiles()
      document.addEventListener("click",this.clearClick)
  },
  beforeUnmount() {
      document.removeEventListener("click",this.clearClick)
  }
}
</script>

<style lang="scss" scoped>
    .main {
        width:100%;
        &__path {
            font-size: 30px;
            padding: 0 0 20px;
        }
        &__container {
            min-height: calc(100vh - (70px + 40px + 50px));
        }
        &__items {
            display: grid;
            grid-template-columns: repeat(auto-fill,80px);
            column-gap: 20px;
            row-gap: 20px;
        }
    }
</style>