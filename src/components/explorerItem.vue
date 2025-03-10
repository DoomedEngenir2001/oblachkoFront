<template>
<div class="explorer-item" @click="showDownloadWindow">
    <div id="type" class="type-icon" :class="this.$props.type"></div>
    <div class="filename" >{{this.$props.name}}</div>
</div>
</template>
<script>
export default{
    created(){

    },
    props:{
        type: {
            required: true,
            type: String
        },
        name: {
            required: true,
            type: String
        }
    },
    methods: {
        showDownloadWindow(){
            if (this.$props.type == "Folder"){
                this.$emit("toFolder", "add", this.name);
            }
            // если папка - то переход к содержимому
            // если файл - то скачать
            return 0;
        }
    }
}
</script> 
<style>
.explorer-item{
    display: table;
}
.type-icon{
    width: 64px;
    height: 64px;
    background-size: contain;
    background-repeat: no-repeat;
}
.filename{
    font-size: 15px; 
    padding-left: 5px;
    display: table-cell; 
    vertical-align: middle;
}
.Folder{
    background-image: url(~@/assets/folder.png);
}
.Audio{
    background-image: url(~@/assets/audio-file.png);
}
.Video{
    background-image: url(~@/assets/video.png);
}
.Text{
    background-image: url(~@/assets/doc.png);
}
.Exel{
    background-image: url(~@/assets/xls.png) ;
}
.Pdf{
    background-image:url(~@/assets/pdf.png) ;
}
.Other{
    background-image:url(~@/assets/files.png);
}
</style>