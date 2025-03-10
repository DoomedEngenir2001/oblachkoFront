<template>
    <div class="register-page">
        <div class="logo-container"></div>
        <RegisterForm @registerData="registerUser" v-model:login="login" v-model:password="password" v-model:confirmedPassword="confirmedPassword"></RegisterForm>
        <button class="auth_btn" @click="$router.push('/login')">Войти</button>
    </div>
</template>
<script>
import RegisterForm from '@/components/registerForm.vue';
import api from '@/plugins/api';
import { mapActions, mapMutations } from 'vuex';
    export default{
        components:{
            RegisterForm
        },
       data(){
            return {
                login: "",
                password: "",
                confirmedPassword: "",  
            }
        },

        methods: {
        ...mapMutations({
            setToken: "setToken",
            Authorize: "Authorize",
            setName: "setUserName"
        }),
        ...mapActions({
            getTree: "getTree"
        }),
        async registerUser(){
            try{
                const response = await api.registrateUser(this.login, this.password);
                this.setToken(response.data.token);
                this.setName(this.login);
                this.Authorize();
                const response_tree = await this.getTree(this.login);
            }catch(err){
                console.log(err);
            }
            this.$router.push("/store"); 
        }
    }
}
    </script>
<style scoped>
.register-page{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.sign-in-btn{
        border-radius: 40px;
        width: 330px;
        height: 60px;
}
.auth_btn{
    margin-top: 20px;
    border-radius: 40px;
    width: 330px;
    height: 40px;
}
</style>