<template>
  <div class="folder" :class="folder?._id">
      <icon-folder @click = "getFiles(file)" class="icon icon__folder"/>
      <span v-if="!isCreating">{{folder.foldername}}</span>
      <input class = "folder__input" v-else v-model="input" v-focus
      @keyup.enter="$event.target.blur()" @blur = "createFolder" />
  </div>
</template>

<script>
import { mapActions } from "vuex"
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
    ...mapActions({
      getFiles: 'getFiles'
    }),
    createFolder() {
      this.$emit("create",this.input)
    }
  }
}
</script>

<style lang="scss" scoped>
  .folder {
    display: flex;
    flex-direction: column;
    align-items: center;
    span {  
      margin: 10px 0 0 ;
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
    cursor: pointer;
  }

</style>