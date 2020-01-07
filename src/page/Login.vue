<template>
  <div class="wrapper-login">
    <div class="main-block">
      <div class="main-logo-wrapper">
        <img class="main-logo" src="../assets/images/login3.png" alt />
      </div>
      <div class="main-info-wrapper">
        <h1 class="yulan-system">玉兰网签系统</h1>
        <div class="login-bar"></div>
        <div class="info">
          <div class="info-content">
            <span class="icons-man"></span>
            <label for="loginName" v-bind:class="{'iactiveClass':iactiveClass1}">账号</label>
            <input
              v-bind:class="{'inputactiveClass':inputactiveClass1}"
              @blur="changeStyle2()"
              @focus="changeStyle1()"
              v-model="loginName"
              id="loginName"
              type="text"
              @keydown="keyLogin"
            />
          </div>
        </div>
        <div class="info">
          <div class="info-content">
            <span class="icons-lock"></span>
            <label for="password" v-bind:class="{'iactiveClass':iactiveClass2}" id="lock">密码</label>
            <input
              v-bind:class="{'inputactiveClass':inputactiveClass2}"
              @blur="changeStyle4()"
              @focus="changeStyle3()"
              v-model="password"
              id="password"
              type="password"
              @keydown="keyLogin"
            />
          </div>
        </div>
        <div @click="submit" class="tijiao">登录</div>
      </div>

      <!-- <span class="tri" @click = 'showApp = !showApp'></span> -->

      <transition name="el-zoom-in-left">
        <div class="version" v-show="showApp">
          <div id="android_version" class="item">
            <span class="iconfont"></span>
            <p>Android</p>
            <div class="qrcode">
              <div class="qr_code"></div>
              <p>扫描二维码</p>
              <p>下载Android客户端</p>
            </div>
          </div>
          <div id="ios_version" class="item">
            <span class="iconfont"></span>
            <p>iPhone</p>
            <div class="qrcode">
              <div class="qr_code"></div>
              <p>扫描二维码</p>
              <p>下载ios客户端</p>
            </div>
          </div>
        </div>
      </transition>
    </div>

    <div class="down-words">
      <img src="../assets/images/login2.png" alt />
    </div>
    <el-dialog :visible.sync="dialogVisible" width="30%" :before-close="handleClose" class="dialog">
      <div class="title">
        <span>{{cName}}</span>,请选择您要登入的角色
      </div>
      <div class="pos">
        <ul v-for="(item,index) of pos" :key="index">
          <li class="listyle">
            {{item}}
            <a @click="enter(index)">进入</a>
          </li>
        </ul>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Login",
  data: function() {
    return {
      loginName: "",
      password: "",
      year: this.$store.state.year,
      iactiveClass1: false,
      iactiveClass2: false,
      inputactiveClass1: false,
      inputactiveClass2: false,
      dialogVisible: false, //显示身份选择
      cName: "",
      pos: [],
      showApp: false
    };
  },

  methods: {
    enter(index) {
      this.$router.push({ path: "/server" });
      this.$store.commit("setPosition", index);
      this.$router.go(0); //刷新页面
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
          this.pos = [];
        })
        .catch(_ => {});
    },
    submit: function() {
      if (!this.loginName || !this.password) {
        this.$alert("请填写账号密码！");
        return;
      }
      this.$axios
        .post(`/yulan/web_user/login.do?`, {
          loginName: this.loginName.toUpperCase(),
          password: this.password,
          year: this.year
        })
        .then(res => {
          if (res.data != null && res.data.code == 0) {
            this.$axios
              .post(
                "http://14.29.223.114:10250/yulan-order/web_user/login.do",
                {
                  loginName: res.data.data.loginName,
                  password: this.password,
                  year: this.year
                }
              )
              .then(res2 => {
                this.$store.commit("setCurrentUrl", 0);
                let info = res.data;
                info.data.customerMainId = res2.data.data.customerMainId;
                //根据身份的种类跳转到不同的页面并带上token
                //这里应该要用vuex了吧，放token
                this.$store.commit("setStorage", info);
                if (!info.pos || info.pos.length == 1) {
                  switch (info.data.type) {
                    case "ECWEB":
                      this.$router.push({ path: "/client" });
                      this.$router.go(0); //刷新页面
                      break;
                    case "SALEMAN":
                    case "USER":
                    case "ADMIN":
                    case "SUPERADMIN":
                      this.$router.push({ path: "/server" });
                      this.$router.go(0); //刷新页面
                      break;
                  }
                } else {
                  this.dialogVisible = true;
                  this.cName = this.$store.state.user.data.realName;
                  for (let i = 0; i < info.pos.length; i++) {
                    switch (info.pos[i].position) {
                      case "SALEMAN_M":
                        this.pos[i] = "办事处经理(审核资料卡，填写修改协议)";
                        break;
                      case "SALEMAN_S":
                        this.pos[i] = "业务经理(审核资料卡，填写修改协议)";
                        break;
                      case "MANAGER":
                        this.pos[i] = "中心总经理(审核协议)";
                        break;
                      case "MARKETCHECKER":
                        this.pos[i] = "市场部(审核协议)";
                        break;
                      case "VSMAPPROVEXII":
                        this.pos[i] = "销售总监(审核协议)";
                        break;
                      case "BILLDEP_APPROVE":
                        this.pos[i] = "订单部(审核资料卡)";
                        break;
                      case "LEGALCHECK":
                        this.pos[i] = "法务员(抽查审核资料卡和协议书)";
                        break;
                    }
                  }
                }
              });
          } else {
            this.$alert("请确认账号密码正确！");
          }
        })
        .catch(function(err) {
          console.log("失败", err);
        });
    },
    changeStyle1: function() {
      this.iactiveClass1 = true;
      this.inputactiveClass1 = true;
    },
    changeStyle2: function() {
      if (this.loginName == "") {
        this.iactiveClass1 = false;
        this.inputactiveClass1 = false;
      }
    },
    changeStyle3: function() {
      this.iactiveClass2 = true;
      this.inputactiveClass2 = true;
    },
    changeStyle4: function() {
      if (this.password == "") {
        this.iactiveClass2 = false;
        this.inputactiveClass2 = false;
      }
    },
    keyLogin(event) {
      if (event.keyCode == 13) {
        this.submit();
      }
    }
  },
  mounted() {
    if (
      this.$route.query &&
      this.$route.query.cid &&
      this.$route.query.password
    ) {
      this.loginName = this.$route.query.cid;
      this.password = this.$route.query.password;
      this.submit();
    }
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
/*背景图*/
.wrapper-login {
  min-width: 1000px;
  min-height: 600px;
  width: 100%;
  height: 100%;
  /* background-image: url('../assets/images/login1.jpg'); */
  background-image: url("../assets/images/background.jpg");
  background-size: cover;

  /* background-size: contain; */
  /* background-repeat: no-repeat; */
}
/*右下角的字外包*/
.down-words {
  width: 16.9%;
  position: fixed;
  bottom: 3.5%;
  right: 2%;
}
/* 右下角字的img */
.down-words img {
  width: 100%;
}
.main-info-wrapper {
  position: relative;
  top: -3rem;
}
/*主要填写区*/
.main-block {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 27rem;
  height: 28rem;
  background-color: #ffffff;
  box-shadow: 4px 2px 20px 1px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
}
.main-logo-wrapper {
  width: 6.5rem;
  position: relative;
  margin: 0 auto;
}
.main-logo {
  width: 100%;
  position: relative;
  top: -3.25rem;
}

.yulan-system {
  text-align: center;
  font-size: 1.65rem;
  color: #333333;
  font-weight: normal;
}
.login-bar {
  width: 19rem;
  height: 3px;
  border-radius: 50%;
  background-color: #82bc00;
  margin: 20px auto 0;
}

input {
  border: none;
  outline: none;
}
/*背景图，作为组件的根标签*/
.wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  min-width: 1100px;
  background-image: url("../assets/images/loginbg.jpg");
  background-size: contain;
  background-repeat: no-repeat;
}
/*左上角文字logo*/
.mainicon {
  width: 9.7rem;
  height: 3.15rem;
  position: absolute;
  top: 1.6rem;
  left: 2.15rem;
  background-image: url("../assets/images/mainicon.png");
  background-size: 100% 100%;
}
/*右边信息块*/
.info-wrapper {
  margin-right: 5%;
  font-size: 1.5rem;
  /* width: 500px; */
  /* height: 400px; */
  /* background-color: pink; */
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}
/*玉兰图标logo*/
.logo {
  display: inline-block;
  vertical-align: middle;
  width: 52px;
  height: 52px;
  background-image: url("../assets/images/logo.png");
}
.title {
  margin: 0 20px;
  /* line-height: 52px; */
  vertical-align: middle;
  font-family: "微软雅黑";
}
/*账号密码*/
.info {
  margin-top: 2.6rem;
  text-align: center;
  font-family: YouYuan;
  font-size: 1.3rem;
  color: #a7a7a7;
}
#info1 {
  margin-top: 4rem;
}
/*为了加个背景色而加的块*/
.info-content {
  text-align: left;
  position: relative;
  margin: 0 auto;
  background-color: rgb(236, 239, 236);
  width: 327px;
  height: 38px;
  border-radius: 19px;
}
/*账号密码字*/
label {
  z-index: 1;
  position: absolute;
  font-style: normal;
  left: 54px;
  top: 10px;
  font-size: 18px;
  transition: all 0.6s;
  -webkit-transition: all 0.6s;
}
label[id="lock"] {
  margin-left: 2px;
  margin-right: 2px;
}
/*css的Class*/
.iactiveClass {
  left: 16px;
  top: -26px;
  font-size: 16px;
}
.inputactiveClass {
  margin-left: 36px !important;
}
/*输入框*/
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  transition-delay: 9999s !important;
  transition: color 9999s ease-out, background-color 9999s ease-out !important;
}
.info input {
  /* position: relative; */
  margin-left: 78px;
  font-size: 18px;
  width: 200px;
  background-color: transparent;
  transition: all 1.2s;
}
/*账号密码logo*/
.icons-man,
.icons-lock {
  z-index: 1;
  display: inline-block;
  position: relative;
  top: 5.5px;
  left: 23px;
}
.icons-man {
  width: 25px;
  height: 27px;
  background-image: url("../assets/images/man.png");
}
.icons-lock {
  width: 21px;
  height: 27px;
  background-image: url("../assets/images/lock.png");
  left: 24px;
}

/*登陆按钮部分----------------*/
.tijiao {
  user-select: none;
  margin: 3.6rem auto 0 auto;
  width: 327px;
  height: 40px;
  line-height: 40px;
  font-size: 20px;
  text-align: center;
  background-color: #82bc00;
  color: white;
  border-radius: 5px;
  cursor: pointer;
}
.dialog .title {
  text-align: center;
  font-size: 22px;
  padding-bottom: 15px;
}
.dialog .title span {
  color: rgb(134, 204, 124);
}
.dialog .pos {
  font-size: 18px;
  padding-left: 20px;
}
.dialog a {
  cursor: pointer;
  position: absolute;
  right: 10%;
  text-decoration: none;
  color: rgb(134, 204, 124);
}
.dialog a:hover {
  color: blue;
}
.listyle {
  line-height: 40px;
}
.tri {
  display: inline-block;
  background-image: url("../assets/images/tri2.png");
  width: 50px;
  height: 50px;
  background-repeat: no-repeat;
  /* background-size: cover; */
  background-size: 113%;
  position: absolute;
  right: 0;
  bottom: 0;
  border-radius: 0px 0px 20px 0px;
  box-shadow: 1px 1px 5px #888888;
  cursor: pointer;
}
.tri:hover {
  background-image: url("../assets/images/tri3.png");
}
.version {
  position: relative;
  top: -43%;
  left: 105%;
  width: 370px;
}
.item {
  box-sizing: border-box;
  width: 168px;
  height: 168px;
  border: 1px solid #e4e4e4;
  text-align: center;
  padding-top: 30px;
  display: inline-block;
  position: relative;
  cursor: pointer;
  color: #999;
  margin: 4px;
}
.item p {
  padding-top: 18px;
  font-size: 18px;
}
#android_version span {
  display: inline-block;
  background: url("../assets/images/android.png");
  width: 60px;
  height: 60px;
  background-size: cover;
  background-repeat: no-repeat;
}
#ios_version span {
  display: inline-block;
  background: url("../assets/images/ios.png");
  width: 60px;
  height: 60px;
  background-size: cover;
  background-repeat: no-repeat;
}
.qrcode {
  width: 166px;
  height: 166px;
  position: absolute;
  left: 0;
  top: 0;
  background: #f8f8f8;
  display: none;
}
.qrcode .qr_code {
  width: 100px;
  height: 100px;
  margin: 15px auto 0px;
  background: url("../assets/images/app.png");
  background-size: cover;
  background-repeat: no-repeat;
}
.qrcode p {
  font-size: 12px;
  line-height: 3px;
}
.item:hover > .qrcode {
  display: block;
}
#ios_version .qr_code {
  background: url("../assets/images/please.png");
  background-size: cover;
  background-repeat: no-repeat;
}
</style>

<style>
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
  padding: 4px 0;
}
</style>