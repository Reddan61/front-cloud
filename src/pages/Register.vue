<template>
  <div class="register">
        <div class = "register__container">
            <div class = "register__header">
                Регистрация
            </div>
            <form @submit.prevent class="register__form">
                <custom-input class="register__input" label = "Введите имя" v-model="username" />
                <custom-input class="register__input" label = "Введите пароль" v-model="password" />
                <custom-input class="register__input" label = "Повторите пароль" v-model="confirmPassword" />
                <custom-button class="register__btn" @click = "register">Отправить</custom-button>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            username:"",
            password:"",
            confirmPassword:""
        }
    },
    methods: {
        register() {
            console.log("register")
        }
    }
}
</script>

<style scoped lang = "scss">
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
        &__btn {
            margin: 10px 0 0;
        }
    }
</style>