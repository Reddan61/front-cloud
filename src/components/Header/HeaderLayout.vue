<template>
    <div class="app">
        <div class="app__container">
            <header class="header">
                <div></div>
                <div class="header__card card">
                    <span class="card__name">{{ user?.username }}</span>
                    <icon-exit class = "icon__exit" @click = "fetchLogout" />
                </div>
            </header>
            <div class="app__body">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex"
import IconExit from '@/components/svg/IconExit.vue'

export default {
  components: { IconExit },
    methods: {
        ...mapActions({
            logout: "auth/logout"
        }),
        async fetchLogout() {
            await this.logout()

            this.$router.push("/login")
        }
    },
    computed: {
        ...mapState({
            isAuth: state => state.auth.isAuth,
            user: state => state.auth.user
        })
    }
}
</script>

<style lang="scss" scoped>
    .app {
        width: 100%;
        min-height: 100vh;
        display:flex;
        justify-content: center;
        &__container {
            width: 100%;
            max-width: 1200px;
        }
        &__body {
            margin: 20px 0 0;
            width: 100%;
        }
    }
    .header {
        width: 100%;
        height: 70px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .icon {
        &__exit {
            width: 20px;
            height: 20px;
            cursor: pointer;
        }
    }
    .card {
        display: flex;
        gap: 10px;
        &__name {
            font-size: 20px;
        }
    }
</style>