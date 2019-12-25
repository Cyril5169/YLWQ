<template>
  <div class="wrapper">
    <el-container class="page">
      <el-header class="header">
        <cli-header></cli-header>
      </el-header>
      <el-container>
        <el-aside class="left">
          <cli-sidebar></cli-sidebar>
        </el-aside>
        <el-main class="right">
          <div class="board" v-if="identity == 'ECWEB'">
            <img src="../assets/images/警告icon.png" alt="小喇叭" />
            <p>公告</p>
          </div>
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
import cliSidebar from "@/Components/cli-sidebar";
export default {
  name: "Client",
  data() {
    return {
      announce: "登陆成功！",
      identity: this.$store.state.user.data.type
    };
  },
  components: {
    cliHeader,
    cliSidebar
  }
};
</script>

<style scoped>
.wrapper {
  width: 100%;
  margin: 0 auto;
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
  width: 95%;
  min-width:1050px;
  margin: 20px auto;
  position: relative;
  box-shadow: 7px 7px 3px -2px rgba(0, 0, 0, 0.05);
}
.board {
  width: 100%;
  height: 41px;
  background-color: #f4f0b9;
  display: flex;
  align-items: center;
  font-size: 16px;
}
.board img {
  margin: 0 8px;
}
</style>