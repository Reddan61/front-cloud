<template>
    <div class="login">
        <div class = "login__container">
            <div class = "login__header">
                Авторизация
            </div>
            <form @submit.prevent class="login__form">
                <custom-input
                    class="login__input" label = "Введите имя" v-model="username" 
                    :error = "v$.username.$error"
                    :errors = "v$.username.$errors[0]?.$message" 
                />
                <custom-input 
                    class="login__input" type = "password" label = "Введите пароль" v-model="password" 
                    :error = "v$.password.$error"
                    :errors = "v$.password.$errors[0]?.$message" 
                />
                <div class="login__btns">
                    <custom-button class="login__btn" @click = "fetchLogin">Отправить</custom-button>
                    <router-link to = "/register">Создать</router-link>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { mapActions } from "vuex"
import useValidate from "@vuelidate/core"
import { minLength, maxLength, required, helpers } from "@vuelidate/validators"
import CustomButton from '../components/UI/CustomButton.vue'

export default {
  components: { CustomButton },
    data() {
        return {
            v$: useValidate(),
            username: "",
            password:""
        }
    },
    validations() {
       return{
            username: { 
                required: helpers.withMessage("Необходимое поле",required),
                minLength: helpers.withMessage("Имя слишком короткое",minLength(3)), 
                maxLength: helpers.withMessage("Имя слишком длинное",maxLength(30))
            },
            password: {
                required: helpers.withMessage("Необходимое поле",required),
                minLength: helpers.withMessage("Пароль слишком короткий",minLength(3))
            }
        }
    },
    methods: {
        ...mapActions({
            login: "auth/login"
        }),
        async fetchLogin() {
            this.v$.$validate()
            if(this.v$.$error) {
                return
            }
            const form = {
                username: this.username,
                password: this.password
            }

            const response = await this.login(form)

            if(response.message === "success") {
                this.$router.push("/")
            } else {
                alert("Что-то пошло не так!")
            }
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