import { String } from "core-js";
import { createStore } from "vuex";
import api from '@/plugins/api';

export default createStore({
    state: { // переменные сосnояния
        token: "",
        username: "",
        isAuth: false,
        tree: null,
        explorer_history: ['root']
    },
    getters: { // вычисляемые зачения
        get_token(state){
            return state.token;
        },
        get_username(state){
            return state.username;
        },
        get_history_length(state){
            return state.explorer_history.length;
        },
        get_history(state){
            return state.explorer_history;
        }
    },

    mutations: { // функции, меняющие состояния
        setToken(state, token_){
            state.token=token_;
        },
        setUserName(state, name){
            state.username = name;
        },
        Authorize(state){
            state.isAuth = true;
        },
        setTree(state, tree_){
            state.tree = tree_;
        },
        add_history(state, path){
            state.explorer_history.push(path);
        }
    },
    actions: { // то, что оперирует мутациями
        async getTree(context, user) { 
            try{
                const response = await api.getFileTree(context.state.token, user);
                context.commit( 'setTree', response.data);
            }catch(err){console.log(err);
                return;
            }
           
        },
        async getRenderObjects({state}, path){
            let RenderedObjects = state.tree.child; 
            let Subfolders = path.split("/") ;
            for(let i = 1; i< Subfolders.length; i++){ 
                for (let j=0; j<RenderedObjects.length; j++){
                    if(RenderedObjects[j].name == Subfolders[i] && RenderedObjects[j].type == "Folder")
                        RenderedObjects = RenderedObjects[j].child; 
                }
            }
            return RenderedObjects;
        }
    }

});