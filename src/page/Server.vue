<template>
  <div class="wrapper">
    <div class="header">
      <cli-header></cli-header>
    </div>
    <div class="content">
      <div class="right">
        <div class="right-content">
          <router-view />
        </div>
      </div>
      <div class="left">
        <ser-sidebar></ser-sidebar>
      </div>
    </div>
  </div>
</template>


<script>
import cliHeader from "@/Components/cli-header";
import serSidebar from "@/Components/server/ser-sidebar";
import serSearch from "@/Components/server/ser-search";
export default {
  name: "Client",
  data() {
    return {
      announce: "登陆成功！"
    };
  },
  components: {
    cliHeader,
    serSidebar,
    serSearch
  },
  created() {
    console.log("登陆了的用户", this.$store.state.user);
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
  min-width: 1320px;
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
  /* background-color: #e4e4e4; */
  min-width: 1100px;
  padding-bottom: 200px;
  padding-top: 70px;
}

.right-content {
  width: 1100px;
  margin: 0 auto;
  position: relative;

  height: 750px;
  /* margin-top: 80px; */
  border-radius: 10px;
}
</style>
