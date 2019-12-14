<template>
  <div class="wrapper-tip">
    <h2>网络订单交易提示</h2>
    <br />
    <div class="tips">
      为提高年度经销协议签订效率，便于双方管理，从2015年开始，经销商年度协议的签订将通过玉兰经销商B2B平
      <br />台进行，为保证你的交易安全，玉兰提醒你，请务必细读以下交易提示。
    </div>
    <div class="main">
      <h3>
        <span></span>使用正确网址登陆我司网站
      </h3>
      <p>请直接输入玉兰B2B平台网址(地址名)登录，建议您将网站地址添加到浏览器的"收藏夹"以便随时进入。</p>
      <h3>
        <span></span>请保管好您的账号密码
      </h3>
      <p>请确保使用本系统的人员为经销商法人或授权代表，并务必保管好您的账号、密码，不要泄露给其他人。</p>
      <h3>
        <span></span>密码设置提醒
      </h3>
      <p>使用系统默认的密码登陆系统后请立即修改，并尽量避免规律组合，忘记密码的，可向区域主管人员申请办理密码重置。</p>
      <h3>
        <span></span>法律效应确认
      </h3>
      <p>我司对通过该系统签订的年度协议或提交的网络订单均默认为经销商法人代表操作，与纸质协议及订单具同等效力。</p>
      <h3>
        <span></span>保护计算机安全
      </h3>
      <p class="safe">1、建议您定期安装最新的操作系统和浏览器安全程序或补丁。</p>
      <p class="safe">2、请您安装个人防火墙，防止黑客入侵您的计算机。</p>
      <p class="safe">3、请您安装杀毒软件，并养成定期查杀病毒及升级更新杀毒软件的习惯，防止病毒入侵。</p>
      <p class="safe">4、不要随意打开不明来历的电子邮件，防止计算机感染病毒。</p>
    </div>
    <div class="protocol">
      <input type="checkbox" name="protocol" id="protocol" v-model="agree" ref="checkbox" />
      <label for="protocol"></label>
      <span>
        我已知悉上述条款，同意在玉兰B2B在线平台签订{{year}}年合作协议，并使用该系统进行日常订单往来，同时本人确定
        <br />所有平台操作行为均代表本人意愿！
      </span>
    </div>
    <div
      @click="nextstep"
      class="button"
      v-show="this.agree&&this.$store.state.user.data.userState != '1'"
    >确定</div>
  </div>
</template>

<script>
// import { mapState } from "vuex";
export default {
  name: "cli-tip",
  data() {
    return {
      agree: false,
      year: this.$store.state.year
    };
  },
  methods: {
    nextstep: function() {
      // this.$router.push({ path: "/client/cliFilecard1" });
      if (this.$store.state.user.data.userState != "1") {
        this.$axios
          .post("/yulan/web_user/updateUserState.do", {
            cid: this.$store.state.user.data.loginName,
            userState: "1",
            year: this.$store.state.year
          })
          .then(res => {
            if (res.data != null) {
              console.log("操作成功");
              this.$alert("我已知悉上述条款");
              let info = res.data;
              this.$store.commit("setStorage", info);
            }
          })
          .catch(function(err) {
            console.log("操作失败" + err);
          });
      } else {
        this.$message({
          showClose: true,
          message: "您已经确认过了，无需再次确认",
          type: "warning"
        });
        // this.$message({showClose: true,message: '你是傻逼吗，还点确定干嘛',type: 'warning'});
      }
    }
  },
  mounted() {
    if (this.$store.state.user.data.userState == "1") {
      this.agree = true;
      this.$refs.checkbox.disabled = "true";
    }
  }
};
</script>

<style scoped>
.wrapper-tip {
  font-family: "微软雅黑";
  margin-top: 4rem;
  box-sizing: border-box;
  width: 100%;
  height: 1100px;
  background-color: white;
  font-size: 16px;
}
h2 {
  text-align: center;
  font-weight: normal;
  padding: 20px 0;
  border-bottom: 1px solid #e9eeef;
}
h3 {
  font-weight: normal;
  padding: 10px 0 10px 120px;
  font-size: 17px;
}
p {
  padding: 10px 0 10px 120px;
  font-size: 16px;
  width: 900px;
  text-indent: 32px;
}

.safe {
  padding-top: 0;
}

.tips {
  width: 1000px;
  font-size: 17px;
  /* padding: 35px 10px; */
  /* text-align: center; */
  padding: 35px 0 35px 140px;
  transform: translateX(-32px);
  text-indent: 32px;
}
h3 span {
  display: inline-block;
  width: 5px;
  height: 35px;
  vertical-align: -45%;
  background-color: #a5de4d;
  transform: translateX(-10px);
  border-radius: 10px;
}
.protocol {
  border-top: 1px solid #e9eeef;
  padding: 30px 0 10px 120px;
  font-size: 16px;
  transform: translate(-35px, 30px);
}
.protocol span {
  display: inline-block;
  /* font-size: 17px; */
}
.button {
  margin: 80px auto 0 auto;
  width: 100px;
  height: 34px;
  line-height: 34px;
  font-size: 14px;
  text-align: center;
  background-image: linear-gradient(74deg, #a7d64b 1%, #82c985 100%),
    linear-gradient(#a5d050, #a5d050);
  color: white;
  border-radius: 10px;
  cursor: pointer;
}

input[type="checkbox"] + label::before {
  content: "\a0"; /*不换行空格*/
  font-size: 150%;
  display: inline-block;
  vertical-align: 0.2em;
  width: 0.6em;
  height: 0.6em;
  margin-right: 0.2em;
  margin-left: 20px;
  background-color: #e5f3cb;
  /* text-indent: 0.15em; */
  line-height: 0.65;
  /*行高不加单位，子元素将继承数字乘以自身字体尺寸而非父元素行高*/
  border: 1px solid #a4d041;
  transform: translateY(-10px);
}
input[type="checkbox"]:checked + label::before {
  content: "\2714";
  font-size: 150%;
  color: #769b20;
  background-color: #e5f3cb;
}
input {
  position: absolute;
  clip: rect(0, 0, 0, 0);
}
</style>

<style>
.wrapper-tip .el-popup-parent--hidden {
  overflow-x: hidden !important;
  overflow-y: scroll !important;
}
.wrapper-tip .el-button--primary {
  border-color: rgb(160, 212, 86) !important;
  background-color: rgb(160, 212, 86) !important;
}
</style>
