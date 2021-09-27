<template>
  <div class="folder" :class="[folder?._id, choosedFolders.indexOf(folder?._id) !== -1 ? 'folder_active' :'']" @click = "clickedFolder">
      <icon-folder class="icon icon__folder"/>
      <span v-if="!isCreating">{{folder.foldername}}</span>
      <input class = "folder__input" v-else v-model="input" v-focus
      @keyup.enter="$event.target.blur()" @blur = "createFolder" />
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex"
import IconFolder from '@/components/svg/IconFolder.vue'

export default {
  components: {
    IconFolder
  },
  props: {
    folder: Object,
    isCreating: Boolean
  },
  data() {
    return {
      input:""
    }
  },
  methods: {
    ...mapMutations({
      addPath: "files/addPath"
    }),
    createFolder() {
      this.$emit("create",this.input)
    },
    clickedFolder(e) {
      const pressedCtrl = e.ctrlKey
      if(!pressedCtrl) {
        this.addPath(this.folder)
      }
    }
  },
  computed: {
       ...mapState({
      choosedFolders: state => state.files.choosedFilesNFolders.folders
    }),
  }
}
</script>

<style lang="scss" scoped>
  .folder {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding: 5px;
    cursor: pointer;
    &_active {
      background: rgb(204,232,255);
    }
    span {  
      flex: 1 1 auto;
      padding: 10px 0 0 ;
      max-width: 80px;
      word-wrap: break-word;
      text-align: center;
    }
    &__input {
      margin: 10px 0 0;
      max-width: 80px;
    }
  }
  .icon {
    width: 80px;
    height: 80px;
  }

</style>