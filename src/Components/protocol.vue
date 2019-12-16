<template>
  <div class="box-protocol" ref="box">
    <!-- 评审记录2 -->
    <review-record :recordTitle="recordTitle" :recordArr="recordArr"></review-record>

    <div v-html="b2b2" v-if="showProtocol" :class="{show:showProtocol}"></div>

    <div class="wenxin" v-if="!showProtocol" :class="{show:showProtocol}">
      <span class="word">如资料卡已通过审批，请联系业务经理生成协议书，谢谢！</span>
    </div>

    <div class="button">
      <button @click="queding" v-show="showProtocol&&recordTitle == '客户查看确认协议数据中'">确认</button>
      <button @click="tuihuiReason" v-show="showProtocol&&recordTitle == '客户查看确认协议数据中'">退回</button>
    </div>
    <transition name="el-fade-in-linear">
      <div class="hide" v-show="hide">
        <div class="back">
          <p>*请说明退回协议书的理由，业务员将根据您的理由修改后再次发送:</p>
          <textarea name="reason" cols="30" rows="10" v-model="reason"></textarea>
        </div>
        <button @click="tuihui">提交</button>
      </div>
    </transition>
    <div class="tuihuiBtn" ref="tuihuiBtn"></div>
  </div>
</template>

<script>
import reviewRecord from "@/Components/review-record";
export default {
  components: { reviewRecord },
  name: "protocol",
  data() {
    return {
      recordTitle: "", //传给评审记录的数据
      recordArr: [], //传给评审记录的数据
      hide: false,
      b2b2: "",
      reason: "",
      showProtocol: false
    };
  },
  computed: {
    nowMonth() {
      let month = "0" + (new Date().getMonth() + 1);
      return month.substr(month.length - 2);
    },
    nowDate() {
      let date = "0" + new Date().getDate();
      return date.substr(date.length - 2);
    },
    nowHour() {
      let hour = "0" + new Date().getHours();
      return hour.substr(hour.length - 2);
    },
    nowMinute() {
      let minute = "0" + new Date().getMinutes();
      return minute.substr(minute.length - 2);
    },
    memo() {
      //记录条
      let nowTime =
        new Date().getFullYear() +
        "-" +
        this.nowMonth +
        "-" +
        this.nowDate +
        " " +
        this.nowHour +
        ":" +
        this.nowMinute +
        " ";
      let memo = nowTime + " " + this.$store.state.user.data.realName;
      return memo;
    }
  },
  methods: {
    tuihuiReason() {
      if (!this.check()) return;
      this.hide = true;
    },
    queding() {
      if (!this.check()) return;
      this.$axios
        .post("/yulan/infoState/checkYLcontractentryState.do", {
          cid: this.$store.state.user.data.loginName,
          state: "ASM_CHECKING",
          wfmemo: this.memo + "通过协议文本;",
          signed: 0,
          market: "",
          csa: ""
        })
        .then(res => {
          if (res.data != null && res.data.code == 0) {
            if (res.data.code == 0) {
              this.$alert("同意该协议书");
              location.reload();
            }
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    tuihui() {
      if (this.reason != "") {
        this.$axios
          .post("/yulan/infoState/checkYLcontractentryState.do", {
            cid: this.$store.state.user.data.loginName,
            state: "SALEMANMODIFYING",
            wfmemo: this.memo + "退回协议书，原因是 [" + this.reason + "];",
            signed: 2,
            market: "",
            csa: ""
          })
          .then(res => {
            if (res.data != null && res.data.code == 0) {
              if (res.data.code == 0) {
                this.$alert("退回协议书成功");
                location.reload();
              }
            }
          })
          .catch(function(err) {
            console.log(err);
          });
      } else {
        this.$alert("退回理由不能为空");
      }
    },
    check() {
      if (this.recordTitle == "客户查看确认协议数据中") return true;
      else {
        this.$alert("您已经操作过此协议书");
        return false;
      }
    }
  },
  mounted() {
    this.$axios
      .post("/yulan/YLcontractentry/getYLcontractHTML.do	", {
        cid: this.$store.state.user.data.loginName
        //  "cid":"C15056",
        // "cid":"C01613"
      })
      .then(res => {
        if (res.data != null && res.data.code == 0) {
          this.showProtocol = true;
          this.b2b2 = res.data.data;
        }
      })
      .catch(function(err) {
        console.log(err);
      });

    //发送请求拿评审的数据
    this.$axios
      .post("/yulan/infoState/getYLcontractentryState.do", {
        cid: this.$store.state.user.data.loginName,
        cyear: this.$store.state.year //必备
      })
      .then(res => {
        this.recordTitle = res.data.yLcontractInfo;
        this.recordArr = res.data.yLcontractentryMemo.reverse();
      })
      .catch(err => {
        console.log("拿评审记录数据错误" + err);
      });
  },
  watch: {
    hide: function() {
      this.$nextTick(() => {
        this.$refs.tuihuiBtn.scrollIntoView(false);
      });
    }
  }
};
</script>

<style scoped>
.box-protocol {
  background-color: white;
  padding: 40px 50px;
  position: relative;
  overflow: hidden;
}
.show {
  height: 650px;
  overflow-y: scroll;
  overflow-x: hidden;
}
button {
  outline: none;
  cursor: pointer;
  border-radius: 10px;
  width: 100px;
  height: 34px;
  font-size: 14px;
  border: 0;
  color: #ffffff;
  background: linear-gradient(to right, #a1d455, #86cb7e);
}
.button {
  margin: 0 auto;
  width: 300px;
}
.button button {
  margin: 20px;
}
.back textarea {
  width: 600px;
  margin: 10px 0;
}
.back p {
  font-size: 16px;
}
.wenxin {
  height: 650px;
  text-align: center;
  margin-top: 20%;
}
.wenxin .word {
  font-size: 20px;
}
.tuihuiBtn {
  width: 1px;
  /* height: 1px; */
  /* padding-top: 200px; */
  position: absolute;
  bottom: -200px;
}
</style>
<style>
.box-protocol .el-popup-parent--hidden {
  overflow-x: hidden !important;
  overflow-y: scroll !important;
}
.box-protocol .el-button--primary {
  border-color: rgb(160, 212, 86) !important;
  background-color: rgb(160, 212, 86) !important;
}
</style>

