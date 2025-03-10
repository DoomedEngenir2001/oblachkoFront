<template>
    <div class = "container">
        <form>
            <h3>Логин</h3>
            <div class="invalid-input" v-if="!this.loginCorrect && formSubmitted">Введите логин</div>
            <input :value="login" @input="onLoginChanged" class="input_field" text="Введите логин">
            <h3>Пароль</h3>
            <div class="invalid-input" v-if="!this.passwordCorrect && formSubmitted">Введите пароль</div>
            <input type="password" :value="password" @input="onPasswordChanged" class="input_field" text="Введите пароль">
            <h3>Подтвердите пароль</h3>
            <div class="invalid-input" v-if="!this.passwordsEquals && formSubmitted">Пароли не совпадают</div>
            <input type="password" :value="confirmedPassword" @input="onConfirmedChanged" class="input_field" text="Подвердите пароль">
        </form>
        <button @click="register" class="auth_btn">Зарегистрироваться</button>
    </div>
</template>
<script>
import { computed } from 'vue';
export default{
    props:{
        login: {
            value: "",
            type: String,
           required: true
        },
        password: {
            value: "",
            type: String, 
            required: true
        },
        confirmedPassword: {
            value: "",
            type: String,
            required: true
        }
    },
    data(){
        return {
            formSubmitted: false
        }
        
    },
    computed: {
        loginCorrect: function(){
                if(this.$props.login == null) return false;
                const template = /[/.\/,\]/\{/\}/\(/\)/]/;
                if(!template.test(this.$props.login) && this.$props.login.length > 5){
                    return true;
                };
                return false;
            },
        passwordCorrect: function(){
                if(this.$props.password.length < 5){
                    return false;
                }
                return true;
            },
        passwordsEquals: function(){
                if (this.$props.password.length==0 || this.$props.confirmedPassword==0)return false;
                if(this.$props.password != this.$props.confirmedPassword)return false;
                return true;
            } 
    },
    methods : {
        register(){
            this.formSubmitted=true;
            if (this.loginCorrect && this.passwordCorrect && this.passwordsEquals)this.$emit('registerData');
            //получаем токен и т.д., попозже сделаю, кода до бэка докачусь 
        },
        onLoginChanged(event){
            this.$emit('update:login', event.target.value);
        },
        onPasswordChanged(event){
            this.$emit('update:password',event.target.value);
        },
        onConfirmedChanged(event){
            this.$emit('update:confirmedPassword', event.target.value);
        }
        // метод хеша
    }
}
</script>
<style scoped>
.container {
flex-direction: column;
}

.auth_btn{
    margin-top: 20px;
    border-radius: 40px;
    width: 330px;
    height: 40px;
}
</style>