<template>
    <header-layout>
        <div class="main">
            <div class="main__path">
                <span @click = "clickBack">Назад</span>
                {{ getPath }}
            </div>
            <div class="main__container" @contextmenu.prevent="openmenu" 
                    @dragenter.prevent @dragover.prevent
                    @drop="onDragDrop">
                <div v-if="!files[0] && !folders[0] && !isCreatingFolder">
                    Перетащите сюда файлы
                </div>
                <div class="main__items" @click = "clickedItem">
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
            :type = "type"
            :isShow = "isShowMenu" 
            :mousePosition = "cursorPosition"
            @create-folder = "this.isCreatingFolder = true"
            @delete = "clearClick"
        />
    </header-layout>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from "vuex"
import HeaderLayout from "@/components/Header/HeaderLayout.vue"
import File from "@/components/File/File.vue"
import Folder from "@/components/Folder/Folder.vue"

export default {
  components: { HeaderLayout, File, Folder },
  data() {
      return {
          isShowMenu:false,
          cursorPosition: [],
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
    ...mapMutations({
        deletePath: "files/deletePath",
        addChoosedFiles: "files/addChoosedFiles",
        addChoosedFolders: "files/addChoosedFolders",
        clearChoosedFilesNFolder: "files/clearChoosedFilesNFolder"
    }),
    clickedItem(e) {
        e.stopPropagation()
        const pressedCtrl = e.ctrlKey
        if(pressedCtrl) {
            if(e.target.closest(".folder")) {
                this.addChoosedFolders({folder:e.target.closest(".folder")?.classList[1]})
            } else if(e.target.closest(".file")){
                this.addChoosedFiles({file:e.target.closest(".file")?.classList[1]})
            }
        } else {
            this.clearClick()
        }
    },
    openmenu(e) {
        this.type = null
        if(e.target.closest(".folder")){
            this.type = "folder"
            const id = e.target.closest(".folder")?.classList[1]
            this.addChoosedFolders({folder:id,isRightClick:true})
        } else if(e.target.closest(".file")){
            this.type = "file"
            const id = e.target.closest(".file")?.classList[1]
            this.addChoosedFiles({file:id,isRightClick:true})
        }
        if(this.isShowMenu) {
            this.clearClick()
            return
        }
        this.isShowMenu = !this.isShowMenu
        this.cursorPosition = [e.pageX,e.pageY]
    },
    clearClick(e) {
        this.isShowMenu = false
        this.clearChoosedFilesNFolder()
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
    },
    clickBack(e) {
        this.deletePath()
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
    }),
  },
  mounted() {
      this.getFiles()
      document.addEventListener("click",this.clearClick)

      this.$store.watch(
          state => state.files.path,
          (oldValue,newValue) => {
            this.getFiles(newValue[newValue.length - 1]?._id)
          },
          {
              deep:true
          }
      )
  },
  beforeUnmount() {
      document.removeEventListener("click",this.clearClick)
  }
}
</script>

<style lang="scss" scoped>
    .main {
        width:100%;
        padding: 0 10px;
        &__path {
            font-size: 30px;
            padding: 0 0 20px;
            span {
                cursor:pointer;
            }
        }
        &__container {
            min-height: calc(100vh - (70px + 20px + 50px));
        }
        &__items {
            display: grid;
            grid-template-columns: repeat(auto-fill,90px);
            column-gap: 20px;
            row-gap: 20px;
        }
    }
</style>