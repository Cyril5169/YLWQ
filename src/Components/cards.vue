<template>
  <div class="wrapper-cards">
    <!-- 流动栏 -->
    <div class="step">
      <cli-step :active="this.nowIndex" ref="step" @flag="handleFlag"></cli-step>
    </div>

    <!-- 评审记录 -->
    <review-record :recordTitle="recordTitle" :recordArr="recordArr"></review-record>
    <!-- 灰色提示字 -->
    <div
      class="gray-word2"
      style="padding-top:75px;"
      v-if="cardobj.contractyear"
    >{{cardobj.contractyear}}年资料卡</div>
    <div
      class="gray-word"
      :style="{'padding-top':(cardobj.contractyear?'0':'75px')}"
    >*灰色内容只供客户核对，不允许修改。如要修改，请联系主管业务经理。</div>
    <div
      class="gray-word3"
      v-if="cardobj.state == 'ONCREATE'"
    >*当前资料卡继承上一年，客户可浏览完后直接确认。若点击修改，则进入审批流程。</div>
    <!--  <div class="button" v-if="cardobj.state == 'ONCREATE'">
      <button @click="enter">确&nbsp;&nbsp;&nbsp;&nbsp;认</button>
      <button @click="change">修&nbsp;&nbsp;&nbsp;&nbsp;改</button>
    </div>-->

    <!-- 资料卡展示 -->
    <div class="card">
      <card1
        v-show="shows[0]"
        :cardobj="cardobj"
        :only="only"
        @bridgenext="next"
        @mergeMessage="mergeMessage"
      ></card1>
      <card2
        v-show="shows[1]"
        :cardobj="cardobj"
        :only="only"
        @bridgenext="next"
        @bridgepre="back"
        @mergeMessage="mergeMessage"
      ></card2>
      <card3
        v-show="shows[2]"
        :cardobj="cardobj"
        :only="only"
        @bridgenext="next"
        @bridgepre="back"
        @mergeMessage="mergeMessage"
      ></card3>
      <card4
        v-show="shows[3]"
        :cardobj="cardobj"
        :only="only"
        :showEnter="showEnter"
        :recordTitle="recordTitle"
        @bridgepre="back"
        @mergeMessage="mergeMessage"
        @submitall="save"
        @postall="submit"
        @enter="enter"
        @change="change"
      ></card4>
    </div>
  </div>
</template>


<script>
import cliStep from "@/Components/cli-step";
import card1 from "@/Components/cli-filecard1";
import card2 from "@/Components/cli-filecard2";
import card3 from "@/Components/cli-filecard3";
import card4 from "@/Components/cli-filecard4";
import reviewRecord from "@/Components/review-record";
import { UpdateState, GetCardByCustomer } from "@/api/card";

export default {
  name: "cards",
  components: { cliStep, card1, card2, card3, card4, reviewRecord },
  data() {
    return {
      shows: [true, false, false, false],
      cardobj: {},
      flag: true, //锁住切换
      postobj: {},
      recordTitle: "", //传给评审记录的数据
      recordArr: [], //传给评审记录的数据
      only: false,
      showEnter: false
    };
  },
  computed: {
    nowIndex: function() {
      return this.shows.indexOf(true);
    },
    isFirst() {
      return !this.nowIndex == 0;
    }
  },
  methods: {
    back() {
      if (this.nowIndex != 0) {
        let i = this.nowIndex;
        this.$set(this.shows, i, false);
        this.$set(this.shows, i - 1, true);
      } else {
        this.$router.push({ path: "/client/tip" });
      }
      this.$refs.step.$emit("bridge");
    },
    next() {
      if (this.flag == true) {
        if (this.nowIndex != 3) {
          let i = this.nowIndex;
          this.$set(this.shows, i, false);
          this.$set(this.shows, i + 1, true);
        }
        this.$refs.step.$emit("bridge2");
      }
      this.flag = false;
    },
    save() {
      // this.$alert('提交信息成功');
      //此处调用AXIOS方法将资料卡数据都发送到数据库，但没有改状态
      this.$axios
        .post("/yulan/customerInfo/updateCustomerInfo.do", this.postobj)
        .then(res => {
          if (res.data.code == 0) {
            this.$alert("保存信息成功");
          } else {
            this.$alert("保存失败");
          }
        })
        .catch(err => {
          console.log("保存信息错误", err);
        });
    },
    submit() {
      //提交的同时还要生成用户填写资料卡这一条评审记录，还有改变state的状态为BUSINESSCHECKING
      this.$axios
        .post("/yulan/customerInfo/updateCustomerInfo.do", this.postobj)
        .then(res => {
          if (res.data.code == 0) {
            this.$axios
              .post("/yulan/infoState/bussinessCheckCustomerInfoCard.do", {
                cid: this.cardobj.cid,
                state: "BUSINESSCHECKING",
                memo:
                  new Date().getFullYear() +
                  "-" +
                  (new Date().getMonth() + 1 >= 10
                    ? new Date().getMonth()
                    : "0" + (new Date().getMonth() + 1)) +
                  "-" +
                  (new Date().getDate() >= 10
                    ? new Date().getDate()
                    : "0" + new Date().getDate()) +
                  " " +
                  (new Date().getHours() >= 10
                    ? new Date().getHours()
                    : "0" + new Date().getHours()) +
                  ":" +
                  (new Date().getMinutes() >= 10
                    ? new Date().getMinutes()
                    : "0" + new Date().getMinutes()) +
                  " " +
                  this.cardobj.cname +
                  "提交;"
              })
              .then(res => {
                console.log(res.data);
                if (res.data.code == 0) {
                  this.$alert("保存并提交成功！");
                  location.reload();
                } else {
                  this.$alert("保存成功但提交失败！");
                }
              })
              .catch(err => {
                console.log("操作失败", err);
              });
          } else {
            this.$alert("保存失败");
          }
        })
        .catch(err => {
          console.log("保存信息错误", err);
        });
    },
    handleFlag(data) {
      //接受step组件传来的flag值
      this.flag = data;
    },
    //合并所有信息为一个对象的方法
    mergeMessage(obj) {
      Object.assign(this.postobj, obj);
    },
    getCards() {
      this.$axios
        .post("/yulan/customerInfo/getCustomerInfo.do", {
          CID: this.$store.state.user.data.customerMainId
        })
        .then(res => {
          if (res.data != null && res.data.code == 0) {
            this.cardobj = res.data.data;
            console.log("cards得到的整个对象", this.cardobj);
            if (this.cardobj.contractyear < this.$store.state.year) {
              this.$alert(
                "请联系市场部添加" + this.$store.state.year + "年客户资料卡",
                "提示",
                {
                  confirmButtonText: "确定",
                  type: "warning"
                }
              );
              this.only = true;
              return;
            }
            if (this.cardobj.state == "ONCREATE") {
              this.only = true;
              this.showEnter = true;
            }
            // //发送请求拿评审的数据
            this.$axios
              .post("/yulan/infoState/getCustomerInfoCardState.do", {
                cid: this.$store.state.user.data.customerMainId,
                year: this.cardobj.contractyear
              })
              .then(res => {
                this.recordTitle = res.data.customerInfo;
                if (this.cardobj.state == "ONCREATE")
                  this.recordTitle = "资料卡确认中";
                if (res.data.memo) this.recordArr = res.data.memo.reverse();
                if (
                  this.recordTitle == "资料卡通过" || //APPROVED
                  this.recordTitle == "业务员审核中" || //BUSINESSCHECKING
                  this.recordTitle == "订单部审核中" //BIILDEPCHECKING
                ) {
                  this.only = true;
                }
              })
              .catch(err => {
                console.log("拿评审记录数据错误?" + err);
              });
          } else {
            console.log("拿不到cards对象", res.data);
            this.only = true;
            this.$alert("请联系市场部添加客户资料卡", "提示", {
              confirmButtonText: "确定",
              type: "warning"
            });
          }
        })
        .catch(function(err) {
          console.log("cards拿对象报错", err);
        });
    },
    enter() {
      this.$confirm("确认资料卡？", "提示", {
        confirmButtonText: "是",
        cancelButtonText: "否",
        type: "info"
      }).then(() => {
        UpdateState({
          cid: this.$store.state.user.data.customerMainId,
          year: this.cardobj.contractyear,
          state: "APPROVED",
          memo:
            new Date().getFullYear() +
            "-" +
            (new Date().getMonth() + 1 >= 10
              ? new Date().getMonth()
              : "0" + (new Date().getMonth() + 1)) +
            "-" +
            (new Date().getDate() >= 10
              ? new Date().getDate()
              : "0" + new Date().getDate()) +
            " " +
            (new Date().getHours() >= 10
              ? new Date().getHours()
              : "0" + new Date().getHours()) +
            ":" +
            (new Date().getMinutes() >= 10
              ? new Date().getMinutes()
              : "0" + new Date().getMinutes()) +
            " " +
            this.cardobj.cname +
            "确认;"
        })
          .then(res => {
            this.$alert("操作成功");
            location.reload();
          })
          .catch(res => {
            this.$alert("操作失败，请稍后重试", "提示", {
              confirmButtonText: "确定",
              type: "warning"
            });
          });
      });
    },
    change() {
      this.$confirm("确认开始修改，开始修改后将不可进行确认操作？", "提示", {
        confirmButtonText: "是",
        cancelButtonText: "否",
        type: "info"
      }).then(() => {
        UpdateState({
          cid: this.$store.state.user.data.customerMainId,
          year: this.cardobj.contractyear,
          state: "CUSTOMERPORCESSING",
          memo:
            new Date().getFullYear() +
            "-" +
            (new Date().getMonth() + 1 >= 10
              ? new Date().getMonth()
              : "0" + (new Date().getMonth() + 1)) +
            "-" +
            (new Date().getDate() >= 10
              ? new Date().getDate()
              : "0" + new Date().getDate()) +
            " " +
            (new Date().getHours() >= 10
              ? new Date().getHours()
              : "0" + new Date().getHours()) +
            ":" +
            (new Date().getMinutes() >= 10
              ? new Date().getMinutes()
              : "0" + new Date().getMinutes()) +
            " " +
            this.cardobj.cname +
            "修改;"
        })
          .then(res => {
            location.reload();
          })
          .catch(res => {
            this.$alert("操作失败，请稍后重试", "提示", {
              confirmButtonText: "确定",
              type: "warning"
            });
          });
      });
    }
  },
  mounted() {
    //发送请求拿业务员或者客户的cid后面来用
    this.getCards();
  },
  created() {}
};
</script>


<style scoped>
.wrapper-cards {
  font-family: "微软雅黑";
  box-sizing: border-box;
  width: 100%;
  background-color: white;
  margin-top: 50px;
}
.step {
  width: 550px;
  height: 80px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: -40px;
}

.gray-word {
  height: 24px;
  font-size: 16px;
  line-height: 18px;
  color: #8a8d8a;
  text-align: center;
}
.gray-word2 {
  height: 24px;
  font-size: 24px;
  line-height: 18px;
  text-align: center;
}
.gray-word3 {
  height: 24px;
  font-size: 16px;
  line-height: 18px;
  text-align: center;
  color: red;
}

button {
  outline: none;
  cursor: pointer;
  border-radius: 10px;
  margin: 10px 30px 0px;
  width: 100px;
  height: 34px;
  font-size: 14px;
  border: 0;
  color: #ffffff;
  background: linear-gradient(to right, #a1d455, #86cb7e);
}
.button {
  display: flex;
  justify-content: center;
}
</style>

<style>
.wrapper-cards .el-popup-parent--hidden {
  overflow-x: hidden !important;
  overflow-y: scroll !important;
}
.wrapper-cards .el-button--primary {
  border-color: rgb(160, 212, 86) !important;
  background-color: rgb(160, 212, 86) !important;
}
.wrapper-cards .el-button:hover {
  border-color: rgb(160, 212, 86) !important;
  background-color: white !important;
  color: rgb(160, 212, 86) !important;
}
.wrapper-cards .el-button--primary:hover {
  border-color: rgb(160, 212, 86) !important;
  background-color: rgb(160, 212, 86) !important;
  color: white !important;
}
</style>