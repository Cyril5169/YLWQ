<template>
  <div class="wrapper-header">
    <div class="header-left">
      <div class="icon-new"></div>
    </div>
    <div class="header-right">
      <div class="welcome">欢迎你，{{position}}{{realName}}</div>
      <div class="exit" @click="exitSto">
        <p style=" user-select: none">退出登录</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "cli-header",
  data() {
    return {
      realName: this.$store.state.user.data.realName,
      position: ""
    };
  },
  methods: {
    //退出登陆
    exitSto() {
      this.$confirm("确定退出？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$store.commit("removeStorage");
          this.$router.push("/");
        })
        .catch(() => {});
    }
  },
  mounted() {
    if (this.$store.state.user.pos) {
      let position = this.$store.state.user.pos[0].position;
      switch (position) {
        case "SALEMAN_M":
          this.position = "办事处经理";
          break;
        case "SALEMAN_S":
          this.position = "业务经理";
          break;
        case "BILLDEP_APPROVE":
          this.position = "订单部";
          break;
        case "MANAGER":
          this.position = "中心总经理";
          break;
        case "MARKETCHECKER":
          this.position = "市场部";
          break;
        case "VSMAPPROVEXII":
          this.position = "销售总监";
          break;
        case "LEGALCHECK":
          this.position = "法务员";
          break;
      }
    }
  }
};
</script>

<style scoped>
.wrapper-header {
  width: 100%;
  height: 100%;
  position: relative;
}
.wrapper-header div {
  display: inline-block;
  line-height: 55px;
}
.header-left {
  position: relative;
  width: 700px;
  height: 100%;
}
.header-right {
  height: 100%;
  position: absolute;
  right: 0;
  bottom: 5px;
}
.icon-flower {
  width: 35px;
  height: 35px;
  background-image: url("../assets/images/logo.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  margin-left: 5px;
  position: relative;
  top: 0;
  transform: translateY(15%);
}
.icon-word {
  width: 117px;
  height: 39px;
  background-image: url("../assets/images/mainicon.png");
  background-size: contain;
  background-repeat: no-repeat;
  position: relative;
  top: 0;
  transform: translateY(20%);
}
.icon-new {
  width: 160px;
  height: 68px;
  background-image: url("../assets/images/玉兰家居logo.png");
  background-size: contain;
  background-repeat: no-repeat;
  position: relative;
  top: 0;
  transform: translateY(16%);
  margin-left: 2px;
}
.title {
  font-size: 18px;
  color: #747473;
  position: absolute;
  margin-left: 1.75rem;
}
.welcome {
  font-size: 14px;
  color: #020202;
}
.exit {
  width: 117px;
  height: 34px;
  text-align: center;
  margin: 0.95rem 1.75rem 0 3.85rem;
  box-sizing: border-box;
  background-image: linear-gradient(74deg, #a7d64b 1%, #82c985 100%),
    linear-gradient(#a5d050, #a5d050);
  color: white;
  border-radius: 5px;
  cursor: pointer;
}
.exit p {
  padding: 8.5px 0;
  font-size: 16px;
  line-height: 16px;
}
</style>
<style>
.el-message-box__wrapper {
  overflow-y: scroll;
  overflow-x: hidden;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
}
.el-message-box .el-popup-parent--hidden {
  overflow-x: hidden !important;
  overflow-y: scroll !important;
}
.el-message-box .el-button--primary {
  border-color: rgb(160, 212, 86) !important;
  background-color: rgb(160, 212, 86) !important;
}
.el-message-box .el-button:hover {
  border-color: rgb(160, 212, 86) !important;
  background-color: white !important;
  color: rgb(160, 212, 86) !important;
}
.el-message-box .el-button--primary:hover {
  border-color: rgb(160, 212, 86) !important;
  background-color: rgb(160, 212, 86) !important;
  color: white !important;
}
</style>