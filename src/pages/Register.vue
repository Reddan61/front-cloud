<template>
  <div class="register">
        <div class = "register__container">
            <div class = "register__header">
                Регистрация
            </div>
            <form @submit.prevent class="register__form">
                <custom-input class="register__input" label = "Введите имя" v-model="username" />
                <custom-input class="register__input" type = "password" label = "Введите пароль" v-model="password" />
                <custom-input class="register__input" type = "password" label = "Повторите пароль" v-model="confirmPassword" />
                <div class="register__btns">
                    <custom-button class="register__btn" @click = "fetchRegister">Отправить</custom-button>
                    <router-link to = "/login">Войти</router-link>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { mapActions } from "vuex"

export default {
    data() {
        return {
            username:"",
            password:"",
            confirmPassword:""
        }
    },
    methods: {
        ...mapActions({
            register: "auth/register"
        }),
        async fetchRegister() {
            const form = {
                username: this.username,
                password: this.password,
                confirmPassword: this.confirmPassword
            }

            const response = await this.register(form)

            if(response.message = "success") {
                this.$router.push("/login")
            } else {
                alert("Что-то пошло не так!")
            }
        }
    }
}
</script>

<style scoped lang="scss">
    .register {
        width: 100%;
        min-height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        &__header {
            display: inline-block;
            width: 100%;
            text-align: center;
            font-size: 25px;
            font-weight: 600;
            padding: 10px 0;
        }
        &__form {
            display: flex;
            flex-direction: column;
            gap: 5px;
            width: 300px;
        }
        &__input {
          font-size: 20px;
        }
        &__btns {
            display: flex;
            padding: 10px 0 0;
            justify-content: space-between;
            align-items: center;
            a {
                &:visited {
                    color:#606060;
                }
            }
        }
    }
</style>