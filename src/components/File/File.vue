<template>
  <div class="file" :class="[file?._id, choosedFiles.indexOf(file?._id) !== -1 ? 'file_active' :'']">
      <img v-if="file.mimetype.search('image') !== -1" alt = 'image' :src = "imageSrc" class = "image" />
      <icon-txt v-else class="icon icon__txt" />
      <span>{{file.filename}}</span>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex"
import { config } from "@/config"
import IconFolder from '@/components/svg/IconFolder.vue'
import IconTxt from '@/components/svg/IconTxt.vue'

export default {
  components: {
    IconFolder,IconTxt
  },
  props: {
    file: Object
  },
  methods: {
    ...mapActions({
      getFiles: 'getFiles'
    })
  },
  computed: {
    ...mapState({
      choosedFiles: state => state.files.choosedFilesNFolders.files
    }),
    imageSrc: function () {
      return `${config.apiUrl}/${this.file.uploadname}`
    }
  }
}
</script>

<style lang="scss" scoped>
  .file {
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
      margin: 10px 0 0;
      max-width: 80px;
      word-break: break-all;
      text-align: center;
    }
  }
  .icon {
    width: 80px;
    height: 80px;
    cursor: pointer;
  }
  .image {
    width: 80px;
    height: 80px;
    object-fit: contain;
  }
</style>