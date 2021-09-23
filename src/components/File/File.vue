<template>
  <div class="file">
      <img v-if="file.type === 'image'" :alt = 'image' :src = "testImage" class = "image" />
      <icon-txt v-else-if="file.type === 'txt'" class="icon icon__txt" />
      <div v-else>Неизвестный формат</div>
      <span>{{file.name}}</span>
  </div>
</template>

<script>
import { mapActions } from "vuex"
import IconFolder from '@/components/svg/IconFolder.vue'
import IconTxt from '@/components/svg/IconTxt.vue'
import testImage from "@/public/test.jpg"

export default {
  components: {
    IconFolder,IconTxt
  },
  props: {
    file: Object
  },
  data() {
    return {
      testImage
    }
  },
  methods: {
    ...mapActions({
      getFiles: 'getFiles'
    })
  }
}
</script>

<style lang = "scss" scoped>
  .file {
    display: flex;
    flex-direction: column;
    align-items: center;
    span {  
      margin: 10px 0 0  ;
      max-width: 80px;
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