<template>
  <div ref = "menu" class="menu" v-show="isShow">
      <div class="menu__items">
          <span class="menu__item" v-if="!type" @click = "create">
              Создать папку
          </span>
          <span class="menu__item" @click="download">
              Скачать
          </span>
          <span class="menu__item" @click="deleteClick">
              Удалить
          </span>
      </div>
  </div>
</template>

<script>
import { mapActions } from "vuex"

export default {
    name:"custom-menu",
    props: {
        isShow:Boolean,
        mousePosition: {
            type:Array,
            required:true
        },
        type: {
            required:true
        }
    },
    methods: {
        ...mapActions({
            delete: "files/delete",
            downloadFilesNFolders: "files/downloadFilesNFolders"
        }),
        create() {
            this.$emit("create-folder")
        },
        async deleteClick(e) {
            e.stopPropagation()
            await this.delete()
            this.$emit("delete")
        },
        download(e) {
            this.downloadFilesNFolders()
        }
    },
    watch: {
        isShow: function(val) {
            this.$refs.menu.style.left = this.mousePosition[0] + "px"
            this.$refs.menu.style.top = this.mousePosition[1] + "px"
        }
    }
}
</script>

<style lang="scss" scoped>
    .menu {
        position:fixed;
        background: white;
        padding: 10px;
        box-shadow: 0 0 10px black;
        &__items {
            display: flex;
            flex-direction: column;
            font-size: 20px;
        }
        &__item {
            margin: 10px 0 0;
            cursor: pointer;
            &:first-child{
                margin:0;
            }
        }
    }
</style>