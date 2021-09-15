<template>
    <header-layout>
        <div class="main">
            <div class="main__path">
                <span @click = "getFiles(path[path.length - 1])">Назад</span>
                {{ getPath }}
            </div>
            <div class="main__items" v-if="files">
                <file v-for="file in files" :key="file.id" :file = "file" />
            </div>
            <div v-else>
                Пусто
            </div>
        </div>
    </header-layout>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex"
import HeaderLayout from "@/components/Header/HeaderLayout.vue"
import File from "@/components/File/File.vue"

export default {
  components: { HeaderLayout, File },
  methods: {
    ...mapActions({
      getFiles: 'getFiles'
    })
  },
  computed: {
    ...mapState({
        files: state => state.files.files,
        path: state => state.files.path
    }),
    ...mapGetters({
        getPath: "getPath"
    })  
  },
  mounted() {
      this.getFiles()
  }
}
</script>

<style lang = "scss" scoped>
    .main {
        width:100%;
        &__path {
            font-size: 30px;
            padding: 0 0 20px;
        }
        &__items {
            display: flex;
            flex-wrap: wrap;
            gap:20px;
        }
    }
</style>