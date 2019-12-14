<template>
  <keep-alive exclude="cli-tip">
  <div id="app">
    <router-view/>
  </div>
  </keep-alive>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
*{
  margin:0;
  padding:0;
}
/*强势挖坑↓*/
@media screen and (max-width: 1600px){
  html{
    font-size:15px;
  }
}
@media screen and (min-width: 1600px){
  html{
    font-size: 20px;
  }
}
/*出错可能在这里↑*/ 
html,
body{
  width:100%;
  height:100%;
  /* overflow-x: hidden; */
}
#app {
  width:100%;
  height:100%;
}
</style>
