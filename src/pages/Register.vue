<template>
  <div class="register">
        <div class = "register__container">
            <div class = "register__header">
                Регистрация
            </div>
            <form @submit.prevent class="register__form">
                <custom-input 
                    class="register__input" label = "Введите имя" v-model="username" 
                    :error = "v$.username.$error"
                    :errors = "v$.username.$errors[0]?.$message" 
                />
                <custom-input 
                    class="register__input" type = "password" label = "Введите пароль" v-model="password" 
                    :error = "v$.password.$error"
                    :errors = "v$.password.$errors[0]?.$message" 
                />
                <custom-input 
                    class="register__input" type = "password" label = "Повторите пароль" v-model="confirmPassword" 
                    :error = "v$.confirmPassword.$error"
                    :errors = "v$.confirmPassword.$errors[0]?.$message" 
                />
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
import useValidate from "@vuelidate/core"
import { minLength, maxLength, required, helpers, sameAs } from "@vuelidate/validators"

export default {
    data() {
        return {
            v$:useValidate(),
            username:"",
            password:"",
            confirmPassword:""
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
            },
            confirmPassword: {
                sameAs: helpers.withMessage("Пароли должны совпадать",sameAs(this.password))
            }
        }
    },
    methods: {
        ...mapActions({
            register: "auth/register"
        }),
        async fetchRegister() {
            this.v$.$validate()
            if(this.v$.$error) {
                return
            }

            const form = {
                username: this.username,
                password: this.password,
                confirmPassword: this.confirmPassword
            }

            const response = await this.register(form)
            
            if(response.message === "success") {
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