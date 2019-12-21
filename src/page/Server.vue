<template>
  <div class="wrapper">
    <el-container class="page">
      <el-header class="header">
        <cli-header></cli-header>
      </el-header>
      <el-container>
        <el-aside class="left">
          <ser-sidebar></ser-sidebar>
        </el-aside>
        <el-main class="right">
          <div class="right-content">
          <router-view />
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>


<script>
import cliHeader from "@/Components/cli-header";
import serSidebar from "@/Components/server/ser-sidebar";
export default {
  name: "Client",
  data() {
    return {
      announce: "登陆成功！"
    };
  },
  components: {
    cliHeader,
    serSidebar
  },
  created() {}
};
</script>

<style scoped>
.wrapper {
  width: 100%;
  margin: 0 auto;
}
.wrapper_inner{
  background-color: white;
}
.page {
  height: 100vh;
}
.content {
  position: relative;
}
.header {
  width: 100%;
  height: 55px;
  background-color: #f9fef0;
}
.left {
  width: 220px !important;
  background-color: #4d4d4d;
  overflow: hidden;
}
.right {
  width: calc(100%-220px);
  display: block;
  background-color: #e4e4e4;
  padding: 0;
}
.right-content {
  width: 90%;
  margin: 20px auto;
  position: relative;
  box-shadow: 7px 7px 3px -2px rgba(0, 0, 0, 0.05);
}
</style>
