<template>
    <div class="login-page">
        <div class="logo-container"></div>
        <LoginForm @loginData="authentificate" v-model:login="login" v-model:password="password" ></LoginForm>
        <button class="sign-in-btn" @click="$router.push('/register')">Зарегистрироваться</button>
    </div>  
</template>
<script>
import LoginForm from '@/components/loginForm.vue';
import api from '@/plugins/api';
import { mapActions, mapGetters, mapMutations } from 'vuex';
export default{
    components: {
        LoginForm
    },
    data(){
        return{
            login: '',
            password: '',
            }
    },
    methods: {
        ...mapMutations({
                setToken: "setToken",
                Authorize: "Authorize",
                setName: "setUserName"

        }),
        ...mapActions({
            getTree: 'getTree'
        }),
        async authentificate(){
            try{
            const response_auth = await api.loginUser(this.login, this.password)//.then(response_auth => {
            this.setToken(response_auth.data.token);
            this.setName(this.login);
            this.Authorize();
            const response_tree = await this.getTree(this.login);
            }catch(err){
                console.log(err);
                return;
            }
            this.$router.push("/store");  
        }
    }
}
</script>
<style scoped>
.login-page{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.sign-in-btn{
    border-radius: 40px;
    margin-top: 20px;
    width: 330px;
    height: 40px;
}
</style>