<template>
<div class="store-page">
    <div class="top-bar">
        <button class="nav-button">{{this.get_username}}</button>
        <div class="void"></div>
        <button class="nav-button">Помощь</button>
        <button class="nav-button">Выйти</button>
    </div>
    <Explorer></Explorer>

</div>
</template>
<script>
import Explorer from '@/components/explorer.vue';
import { mapGetters } from 'vuex';
export default{
    components:{
        Explorer
    },
    computed:{
        ...mapGetters([
            "get_username",
            "get_token",
        ])
    },
    data(){
        return{
            currentPath: ''
        }
    },
    methods: {

    }
}
</script>
<style lang="css" scoped>
.store-page{
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
}
.top-bar{
    display: flex;
    flex-direction: row;
}
.nav-button{
    height: 50px;
    margin-left: 1%;
    margin-right: 1%;
    width: wrap;
    border-radius: 10px;
    border: 2px solid black;
}
.nav-button:hover{
    background-color: black;
    color: white;
}

/* .add-file:hover{
    background-color: black;
    color: white;
}
.add-folder:hover{
    background-color: black;
    color: white;
} */
.void{
    width: 80%;
}
</style>