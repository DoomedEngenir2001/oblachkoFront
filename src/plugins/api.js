import axios from "axios";
const instance = axios.create({ // создаем instance с установленными настройками
    baseURL: "http://localhost:3000/",
    withCredentials: false,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
});
export default{ // а вот здесь все необходимые
    async registrateUser(login_, password_){ // регистрация пользователя
        return instance.post('/register', {
            login: login_,
            password: password_ 
        });
    },
    async loginUser(login_, password_){ // логин пользователя
        return instance.post('/login', {
            login: login_,
            password: password_ 
        });
    },
    async getFileTree(token_, user){
          return instance.get(`/store/getTree/${user}`, {
            headers:{
                Authorization: `Bearer ${token_}`
            }
        });
    },

    async createFolder(token_,path_, folderName_, user_){
        return instance.post("/store/createFolder",{
            user:user_,
            path:path_ ,       
            folderName: folderName_
        }, 
        {
            headers:{
                Authorization: `Bearer ${token_}`
            }
        });
    }
}