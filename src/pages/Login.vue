<template>
    <div class="login">
        <div class = "login__container">
            <div class = "login__header">
                Авторизация
            </div>
            <form @submit.prevent class="login__form">
                <custom-input class="login__input" label = "Введите имя" v-model="username" />
                <custom-input class="login__input" label = "Введите пароль" v-model="password" />
                <custom-button class="login__btn" @click = "checkUser">Отправить</custom-button>
            </form>
        </div>
    </div>
</template>

<script>
import CustomButton from '../components/UI/CustomButton.vue'

export default {
  components: { CustomButton },
    data() {
        return {
            username: "",
            password:""
        }
    },
    methods: {
        checkUser() {
            console.log('login')
        }
    }
}
</script>

<style scoped lang="scss">
    .login {
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
        &__btn {
            margin: 10px 0 0;
        }
    }
   
</style>