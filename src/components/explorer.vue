<template>
    <div class="explorer-vue">
        <div class="address-line-container">
            <div class="backward-btn" @click = "toPrevState"></div>
            <div class="forward-btn" @click = "toNextState"></div>
            <div class="address-line">{{this.currentPath}}</div>
        </div>
        <div  class="files-container">
            <div class="back-btn" @click="backFolder">...</div>
            <ExplorerItem @toFolder="toFolder" v-for="objectRender in objectsToRender" :key="objectRender.name" 
            :type="objectRender.type" :name="objectRender.name"></ExplorerItem>
            </div>
            <div class="tool-bar">
                <button class="add-folder" @click="isVisibleModalFolder=true"></button>
                <button class="add-file" @click="isVisibleModalFile=true"></button>
            </div>
        

            <div class="modal" v-if="isVisibleModalFile">
                <div class="modal-content">
                    <p>Загрузите файл</p>
                    <div class="drag-n-drop-placeholder">
                        <DragContainer />
                    </div>
                    <div class="btn-placeholder">
                        <button @click="isVisibleModalFile=false">Закрыть</button>
                        <button>Загрузить</button>
                    </div>
                </div>
            </div>

            <div class="modal" v-if="isVisibleModalFolder">
                <div class="modal-content">
                    <p>Введите имя папки</p>
                    <input v-model="folderName" />
                    <div class="btn-placeholder">
                        <button @click="isVisibleModalFolder=false">Закрыть</button>
                        <button @click="addFolder">Создать</button>
                    </div>
                </div>
            </div>
    </div>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import ExplorerItem from './explorerItem.vue';
import api from '@/plugins/api';
import DragContainer from './dragContainer.vue';
export default {
    async beforeMount(){
        this.objectsToRender = await this.getRenderObjects(this.currentPath);
        this.history = this.get_history;
        if ( this.history.length==0)this.index=0;
        else this.index = this.history.length-1;
    },
    components:{
        ExplorerItem, DragContainer
    },
    data(){
        return {
        isVisibleModalFolder: false,
        isVisibleModalFile: false,
        currentPath: "root",
        folderName: "",
        objectsToRender: [],
        history: [],
        index: 0
        }
    },
    computed:{
        ...mapGetters([
            'get_history_length',
            'get_history',
            'get_token',
            'get_username'
        ]),
    },
    methods : {
        ...mapActions({
            getRenderObjects: 'getRenderObjects', 
            getTree: 'getTree'
        }),
        ...mapMutations({
            add_history: 'add_history'
        }),
        async addFolder(){
            // modal window nado sdelat
            try{
            await api.createFolder(this.get_token,this.currentPath, this.folderName, this.get_username);
            await this.getTree(this.get_username);
            this.objectsToRender = await this.getRenderObjects(this.currentPath);
            }catch(err){
                console.log(err);
            }
            this.isVisibleModalFolder=false;
        },
        async uploadFile(){

        },
        async toFolder(action, folder){ // переход в нужную папку
            this.currentPath = this.currentPath + "/" + folder;
            this.objectsToRender = await this.getRenderObjects(this.currentPath); 
            this.add_history(this.currentPath);
            this.index++;
        },
        async backFolder(){
            let splitedPath = this.currentPath.split("/");
            this.currentPath = splitedPath[0];
                for(let i=1; i<splitedPath.length-1;i++){
                    console.log(splitedPath[i]);
                    this.currentPath +=  "/" + splitedPath[i];
                }
            this.objectsToRender = await this.getRenderObjects(this.currentPath); 
            this.add_history(this.currentPath);
            this.index++;
        },
        async toNextState(){
            if (this.index != this.history.length -1)this.index++;
            let path= this.history[this.index];
            console.log(path);
            this.currentPath = path;
            this.objectsToRender = await this.getRenderObjects(this.currentPath);
        },
        async toPrevState(){
            if(this.index !=0)this.index--;
            let path= this.history[this.index];
            console.log(path);
            this.currentPath = path;
            this.objectsToRender = await this.getRenderObjects(this.currentPath);
        }

    }
}
</script>
<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-content {
  background: white;
  padding: 20px;
  border-radius: 5px;
  width: 300px;
  position: relative;
}

.address-line-container{
    margin-top: 15px;
    display: flex;
    flex-direction: raw;
}
.address-line{
    width: 95%;
    height: 30px;
    line-height: 30px;
    font-size: medium;
    border: 1px solid black;
}
 .files-container{
    height: 80vh;
} 
.btn{
    width:20px;
    height: 20px;
}
.back-btn{
    font-size: 36px; 
    padding-left: 5px;
    display: table-cell; 
    vertical-align: middle;
}
.backward-btn{
    width: 30px;
    height: 30px;
    background-image:url(~@/assets/left-arrow.png) ;
    background-size: contain;
    background-repeat: no-repeat;
}
.forward-btn{
    width: 30px;
    height: 30px;
    background-image:url(~@/assets/right-arrow.png) ;
    background-size: contain;
    background-repeat: no-repeat;
}
.tool-bar{
    height: 50px;
    display: flex;
    justify-content: flex-end;
    flex-direction: raw;
    align-items: end;
}
.add-folder{
    width: 60px;
    height: 60px;
    background-size: contain;
    background-repeat: no-repeat;
    background-image: url(~@/assets/new-folder.png);
    margin: 5px 10px 5px 10px;
}
.add-file{
    width: 60px;
    height: 60px;
    background-size: contain;
    background-repeat: no-repeat;
    background-image: url(~@/assets/add-file.png);
    margin: 5px 10px 5px 10px;
}
</style>