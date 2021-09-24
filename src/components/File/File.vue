<template>
  <div class="file" :class="file?._id">
      <img v-if="file.mimetype.search('image') !== -1" alt = 'image' :src = "imageSrc" class = "image" />
      <icon-txt v-else class="icon icon__txt" />
      <span>{{file.filename}}</span>
  </div>
</template>

<script>
import { mapActions } from "vuex"
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
  data() {
    return {
    }
  },
  methods: {
    ...mapActions({
      getFiles: 'getFiles'
    })
  },
  computed: {
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
    cursor: pointer;
  }
</style>