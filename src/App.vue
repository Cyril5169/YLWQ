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
.el-dialog {
  width: 48% !important;
  /* height: 36%; */
}
/*右边确定按钮*/
.el-button--primary {
  border-color: rgb(160, 212, 86) !important;
  background-color: rgb(160, 212, 86) !important;
}
.el-popup-parent--hidden {
  overflow-x: hidden !important;
  overflow-y: hidden !important;
}
.el-dialog {
  border-radius: 5px;
}
.el-table td,
.el-table th {
  padding: 6px 0;
}
</style>
