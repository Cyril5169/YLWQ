<template>
  <div class="wrapper">
    <div class="header">
      <cli-header></cli-header>
    </div>
    <div class="content">
      <div class="right">
        <div class="board">
          <img
            src="http://14.29.221.109:10250/upload/images/警告icon.png"
            alt="小喇叭"
          >
          <p>公告</p>
        </div>
        <div class="right-content">
          <router-view />
        </div>
      </div>
      <div class="left">
        <cli-sidebar></cli-sidebar>
      </div>
    </div>
  </div>
</template>


<script>
import cliHeader from "@/Components/cli-header";
import cliSidebar from "@/Components/cli-sidebar";
export default {
  name: "Client",
  data() {
    return {
      announce: "登陆成功！"
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
  height: 100%;
}
.content {
  position: relative;
  /* width: 1000px;
   margin: 0 auto; */
}
.header {
  width: 100%;
  height: 55px;
  background-color: #f9fef0;
  min-width: 1200px;
}
.left {
  width: 220px;
  height: 100%;
  background-color: #4d4d4d;
  float: left;
  position: absolute;
  top: 0;
}

.right {
  width: calc(100%-220px);
  display: block;
  margin-left: 220px;
  background-color: #e4e4e4;
  min-width: 1000px;
  padding-bottom: 100px;
}

.right-content {
  width: 90%;
  margin: 0 auto;
  margin-top: 60px;
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
