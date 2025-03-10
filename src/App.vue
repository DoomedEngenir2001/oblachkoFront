<template>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',
}
</script>
<style>
.app {
  height: 100vh;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.logo-container{
    width: 380px;
    height: 280px;
    background-size: contain;
    background-repeat: no-repeat;
    background-image: url('~@/assets/logo_cloud.svg'); 
}
.input_field{
    margin-top: 5px;
    width: 820px;
    height: 24px;
    border: 3px;
    border-style: solid;
    border-color: black;
    text-size-adjust: 24px;
}
.invalid-input{
    width: 820px;
    height: 24px;
    color: red;
    background-color: rgb(255, 208, 191);
}
</style>
