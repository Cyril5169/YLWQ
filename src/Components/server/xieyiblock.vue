<template>
  <div class="xieyi-wrapper">
    <div class="xieyi-title">创建协议书</div>
    <div class="xieyi-title" id="yxpp">
      经营品牌：
      <input type="checkbox" name="brand" id="WallPaper1" v-model="databool1" />
      <label for="WallPaper1">玉兰（墙纸类产品）</label>
      <input type="checkbox" name="brand" id="SoftProducts1" v-model="databool2" />
      <label for="SoftProducts1">兰居尚品（布艺类产品）</label>
    </div>
    <div class="xieyi-items">
      <!-- <span class="input-blocks">
        销售总任务：
        <input type="text" class="small-block readonly" readonly v-model="totalAim" /> 万元
      </span>-->
      <span class="input-blocks">
        销售总任务：
        <input type="text" class="small-block" v-model="aRetailing" /> 万元
      </span>
      <!-- <span class="input-blocks">
        玉兰•兰居尚品：
        <input
          type="text"
          class="small-block"
          :class="{readonly:!databool2}"
          :readonly="!databool2"
          v-model="cMatching"
        /> 万元
      </span>-->
    </div>
    <div class="xieyi-items">
      <span class="input-blocks">销售任务</span>
    </div>
    <!--下面的数据有点放不下-->
    <table border="1" cellspacing="0">
      <tr>
        <td>1月</td>
        <td>2月</td>
        <td>3月</td>
        <td>4月</td>
        <td>5月</td>
        <td>6月</td>
        <td>7月</td>
        <td>8月</td>
        <td>9月</td>
        <td>10月</td>
        <td>11月</td>
        <td>12月</td>
        <td>总计</td>
      </tr>
      <tr>
        <td>
          <input type="number" v-model="m1" class="readonly" readonly />
        </td>
        <td>
          <input type="number" v-model="m1" class="readonly" readonly />
        </td>
        <td>
          <input type="number" v-model="m11" class="readonly" readonly />
        </td>
        <td>
          <input type="number" v-model="m11" class="readonly" readonly />
        </td>
        <td>
          <input type="number" v-model="m11" class="readonly" readonly />
        </td>
        <td>
          <input type="number" v-model="m11" class="readonly" readonly />
        </td>
        <td>
          <input type="number" v-model="m11" class="readonly" readonly />
        </td>
        <td>
          <input type="number" v-model="m11" class="readonly" readonly />
        </td>
        <td>
          <input type="number" v-model="m11" class="readonly" readonly />
        </td>
        <td>
          <input type="number" v-model="m11" class="readonly" readonly />
        </td>
        <td>
          <input type="number" v-model="m11" class="readonly" readonly />
        </td>
        <td>
          <input type="number" v-model="m2" class="readonly" readonly />
        </td>
        <td>
          <input type="number" readonly v-model="totalAim" />
        </td>
      </tr>
    </table>
    <div class="xieyi-items">
      <span class="input-blocks">
        总任务完成返点：
        <input type="number" v-model="rewordpercent" class="small-block" />&nbsp;%
      </span>
      <!-- <span class="input-blocks">
        兰居尚品任务返点：
        <input type="number" v-model="rewordpercent2" class="small-block" />&nbsp;%
      </span>-->
    </div>
    <div class="xieyi-items">
      <span class="input-blocks">
        备货金额占比：
        <input type="text" class="small-block readonly" readonly v-model="stockpercent" />&nbsp;%
      </span>
      <span class="input-blocks">
        合人民币：
        <input
          type="text"
          style="width:70px;"
          class="small-block readonly"
          readonly
          v-model="allRMB"
        />&nbsp;元
      </span>
    </div>
    <div class="timer-wapper">
      <div class="timer">
        <p class="timeWord">协议生效日期：</p>
        <el-date-picker
          v-model="startDate"
          align="right"
          type="date"
          placeholder="协议生效日期"
          class="time"
          :picker-options="pickerOptions1"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
      </div>
      <div class="timer">
        <p class="timeWord">协议截止日期：</p>
        <el-date-picker
          v-model="endDate"
          align="right"
          type="date"
          placeholder="协议截止日期"
          class="time"
          :picker-options="pickerOptions1"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
      </div>
    </div>

    <div class="button">
      <button @click="submit">创建并发送</button>
      <button @click="exitBlock">取消</button>
    </div>
    <div v-show="showReject">
      <!-- <div class="tuihuiName">*协议书被【{{ccName}}】退回</div> -->
      <!-- <textarea></textarea>  -->
    </div>
  </div>
</template>

<script>
var ms = {
  //身份和中文翻译
  SALEMAN_M: "办事处经理",
  SALEMAN_S: "业务经理"
};
import { GetYlContractByCustomer, UpdateContractState } from "@/api/card";

export default {
  name: "xieyiblock",
  data() {
    return {
      position: this.$store.state.user.pos[0].position,
      weiTuoObj: null,
      m1: "",
      m11: "",
      m2: "",
      databool1: false,
      databool2: false,
      aRetailing: "0", //
      cMatching: "0", //
      stockpercent: "10", //备货占比
      rewordpercent: "", //
      rewordpercent2: "",
      startDate: new Date().getFullYear() + "-01-01", //协议开始日期
      endDate: new Date().getFullYear() + "-12-31", //协议结束日期
      preferedbrand: "", //意向品牌
      pickerOptions1: {
        //快捷选择时间
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      }
    };
  },
  props: ["ccid", "cyear", "ccName", "showReject"],
  methods: {
    submit() {
      //判空↓
      if (!this.preferedbrand) {
        this.$alert("请选择意向品牌！");
        return;
      }
      if (
        !this.aRetailing||
        this.aRetailing == "0" ||
        !this.rewordpercent||
        !this.startDate||
        !this.endDate
      ) {
        this.$alert("请填写全部信息！");
        return;
      }
      if (this.showReject == false) {
        this.$axios
          .post("/yulan/YLcontractentry/createYLcontract.do", {
            ccyear: this.cyear,
            ccid: this.ccid,
            aRetailing: this.aRetailing,
            cMatching: this.cMatching,
            m1: this.m1,
            m2: this.m1,
            m3: this.m11,
            m4: this.m11,
            m5: this.m11,
            m6: this.m11,
            m7: this.m11,
            m8: this.m11,
            m9: this.m11,
            m10: this.m11,
            m11: this.m11,
            m12: this.m2,
            rewordpercent: this.rewordpercent,
            rewordpercent2: this.rewordpercent2, //兰居返点比例 %
            stockpercent: this.stockpercent,
            startDate: this.startDate, //协议开始日期
            endDate: this.endDate, //协议结束日期
            bEngineering: 0, //没用到
            payminimum: 0, //2015年协议使用没用到
            memo2: null, //补充协议内容没用到
            preferedbrand: this.preferedbrand, //销售品牌
            privateAccountAuthed: "N", //--X 表示无关， Y 表示客户授权配偶账号 N 无需授权
            legalchecked: 0
          })
          .then(res => {
            if (res.data.code == 0) {
              this.$alert("下达协议书成功");
              // this.$axios
              //   .post("/yulan/infoState/checkYLcontractentryState.do", {
              //     cid: this.ccid,
              //     state: "CUSTOMERAFFIRM",
              //     wfmemo: this.memo + "提交;",
              //     signed: 0,
              //     market: "",
              //     csa: ""
              //   })
              UpdateContractState({
                cid: this.ccid,
                year: this.cyear,
                state: "CUSTOMERAFFIRM",
                wfmemo: this.memo + "提交;",
                signed: 0,
                market: "",
                csa: ""
              }).then(res => {
                this.exitBlock();
                this.$emit("updatePage");
              });
            } else {
              this.$alert("创建协议书错误");
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.$axios
          .post("/yulan/YLcontractentry/updateYLcontract.do", {
            ccyear: this.cyear,
            ccid: this.ccid,
            aRetailing: this.aRetailing,
            cMatching: this.cMatching,
            m1: this.m1,
            m2: this.m1,
            m3: this.m11,
            m4: this.m11,
            m5: this.m11,
            m6: this.m11,
            m7: this.m11,
            m8: this.m11,
            m9: this.m11,
            m10: this.m11,
            m11: this.m11,
            m12: this.m2,
            rewordpercent: this.rewordpercent,
            rewordpercent2: this.rewordpercent2, //兰居返点比例 %
            stockpercent: this.stockpercent,
            startDate: this.startDate, //协议开始日期
            endDate: this.endDate, //协议结束日期
            preferedbrand: this.preferedbrand, //销售品牌
            legalchecked: 0
          })
          .then(res => {
            this.$alert("重新下达协议书成功");
            // this.$axios
            //   .post("/yulan/infoState/checkYLcontractentryState.do", {
            //     cid: this.ccid,
            //     state: "CUSTOMERAFFIRM",
            //     wfmemo: this.memo + "重新提交;",
            //     signed: 0,
            //     market: "",
            //     csa: ""
            //   })
            UpdateContractState({
              cid: this.ccid,
              year: this.cyear,
              state: "CUSTOMERAFFIRM",
              wfmemo: this.memo + "重新提交;",
              signed: 0,
              market: "",
              csa: ""
            }).then(res => {
              this.exitBlock();
              this.$emit("updatePage");
            });
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    exitBlock() {
      //清空退出
      this.reflesh();
      this.$emit("hiddenBlock");
    },
    //清空
    reflesh() {
      (this.m1 = ""),
        (this.m11 = ""),
        (this.m2 = ""),
        (this.aRetailing = "0"),
        (this.cMatching = "0"),
        (this.stockpercent = ""),
        (this.rewordpercent = ""),
        (this.rewordpercent2 = ""),
        (this.startDate = new Date().getFullYear() + "-01-01"), //协议开始日期
        (this.endDate = new Date().getFullYear() + "-12-31"), //协议结束日期
        (this.preferedbrand = ""),
        (this.databool1 = false),
        (this.databool2 = false),
        (this.weiTuoObj = null);
    }
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
      //评审记录
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
      let memo =
        nowTime +
        "被" +
        ms[this.position] +
        this.$store.state.user.data.realName;
      return memo;
    },
    totalAim() {
      return Number(this.aRetailing) + Number(this.cMatching);
    },
    allRMB() {
      return (this.totalAim * this.stockpercent * 100).toFixed(2);
    },
    cidYear() {
      return {
        cid: this.ccid,
        year: this.cyear
      };
    }
  },
  updated() {},
  watch: {
    totalAim() {
      this.m1 = Math.floor(this.totalAim * 0.05 * 100) / 100;
      this.m11 = Math.floor(this.totalAim * 0.09 * 100) / 100;
      this.m2 = (this.totalAim - this.m1 * 2 - this.m11 * 9).toFixed(2);
    },
    databool1(newV, oldV) {
      if (newV) {
        if (this.weiTuoObj == null) this.aRetailing = "";
        else this.aRetailing = this.weiTuoObj.aRetailing;
        if (this.databool2) {
          this.preferedbrand = "√玉兰（墙纸类产品）√兰居尚品（布艺类产品）";
        } else {
          this.preferedbrand = "√玉兰（墙纸类产品）";
        }
      } else {
        this.aRetailing = "0";
        if (this.databool2) {
          this.preferedbrand = "√兰居尚品（布艺类产品）";
        } else {
          this.preferedbrand = "";
        }
      }
    },
    databool2(newV, oldV) {
      if (newV) {
        if (this.weiTuoObj == null) this.cMatching = "";
        else this.cMatching = this.weiTuoObj.cMatching;
        if (this.databool1) {
          this.preferedbrand = "√玉兰（墙纸类产品）√兰居尚品（布艺类产品）";
        } else {
          this.preferedbrand = "√兰居尚品（布艺类产品）";
        }
      } else {
        this.cMatching = "0";
        if (this.databool1) {
          this.preferedbrand = "√玉兰（墙纸类产品）";
        } else {
          this.preferedbrand = "";
        }
      }
    }
    // cidYear() {
    //   if (this.showReject == true && this.ccid) {
    //     //修改获取原来的
    //     // this.$axios
    //     //   .post("/yulan/YLcontractentry/getYLcontract.do", {
    //     //     ccid: this.ccid
    //     //   })
    //     GetYlContractByCustomer({
    //       cid: this.ccid,
    //       year: this.cyear
    //     })
    //       .then(res => {
    //         if (res.data != null && res.data.contract) {
    //           this.weiTuoObj = res.data.contract;
    //           if (this.weiTuoObj.preferedbrand) {
    //             this.preferedbrand = this.weiTuoObj.preferedbrand;
    //             this.databool1 = this.preferedbrand.indexOf("墙纸") != -1;
    //             this.databool2 = this.preferedbrand.indexOf("软装") != -1;
    //           } else {
    //           }
    //           this.aRetailing = this.weiTuoObj.aRetailing;
    //           this.cMatching = this.weiTuoObj.cMatching;
    //           this.rewordpercent = this.weiTuoObj.rewordpercent;
    //           this.rewordpercent2 = this.weiTuoObj.rewordpercent2;
    //           this.endDate = new Date(this.weiTuoObj.endDate);
    //           this.startDate = new Date(this.weiTuoObj.startDate);
    //           this.stockpercent = this.weiTuoObj.stockpercent;
    //         }
    //       })
    //       .catch(err => {
    //         console.log("获取协议书信息失败", err);
    //       });
    //   }
    // }
  },
  mounted() {
    if (this.showReject == true && this.ccid) {
      GetYlContractByCustomer({
        cid: this.ccid,
        year: this.cyear
      })
        .then(res => {
          if (res.data != null && res.data.contractInfo) {
            this.weiTuoObj = res.data.contractInfo;
            if (this.weiTuoObj.preferedbrand) {
              this.preferedbrand = this.weiTuoObj.preferedbrand;
              this.databool1 = this.preferedbrand.indexOf("墙纸") != -1;
              this.databool2 = this.preferedbrand.indexOf("软装") != -1 || this.preferedbrand.indexOf("布") != -1;
            } else {
            }
            this.aRetailing = this.weiTuoObj.aRetailing;
            this.cMatching = this.weiTuoObj.cMatching;
            this.rewordpercent = this.weiTuoObj.rewordpercent;
            this.rewordpercent2 = this.weiTuoObj.rewordpercent2;
            this.endDate = new Date(res.data.contract.endDate);
            this.startDate = new Date(res.data.contract.startDate);
            this.stockpercent = this.weiTuoObj.stockpercent;
          }
        })
        .catch(err => {
          console.log("获取协议书信息失败", err);
        });
    }
  }
};
</script>

<style scoped>
.timer-wapper {
  margin-top: 15px;
}
.input-blocks {
  vertical-align: center;
  display: inline-block;
  line-height: 40px;
  margin-right: 20px;
}
#yxpp {
  font-size: 16px;
  text-align: left;
}
input[type="checkbox"]:checked + label::before {
  content: "\2714";
  font-size: 180%;
  color: #769b20;
}
input[type="checkbox"] + label::before {
  content: "\A0";
  font-size: 180%;
  display: inline-block;
  vertical-align: 0.2em;
  width: 0.8em;
  height: 0.8em;
  margin-right: 0.2em;
  /* background-color: #e5f3cb; */
  text-indent: 0.15em;
  line-height: 0.65;
  border: 1px solid #a4d041;
  position: relative;
  top: 8px;
}

input[type="checkbox"] {
  position: absolute;
  opacity: 0; /*完全透明*/
}
.readonly {
  background-color: #e9eeeb;
}
.xieyi-wrapper {
  z-index: 10;
  position: absolute;
  width: 730px;
  margin: 0 auto;
  left: 200px;
  top: 60px;
  box-sizing: border-box;
  padding: 0 40px;
  background-color: rgb(237, 253, 240);
  border: 1px solid black;
}
.xieyi-title {
  text-align: center;
  line-height: 50px;
  font-size: 18px;
}
input[type="text"] {
  height: 20px;
  position: relative;
}
.xieyi-items {
  height: 40px;
  vertical-align: center;
  font-size: 14px;
  /* user-select: none; */
}
.small-block {
  width: 50px;
  height: 20px;
  vertical-align: center;
}
button {
  outline: none;
  cursor: pointer;
  border-radius: 10px;
  margin: 40px 30px;
  width: 100px;
  height: 34px;
  border: 0;
  color: #ffffff;
  background: linear-gradient(to right, #a1d455, #86cb7e);
}
.button {
  display: flex;
  justify-content: center;
}
textarea {
  width: 600px;
  height: 150px;
  resize: none;
  font-size: 14px;
  box-sizing: border-box;
  padding: 8px;
  line-height: 20px;
  border-radius: 4px;
  margin-bottom: 30px;
}
input {
  background-color: rgb(237, 253, 240);
  border: 1px solid rgb(197, 204, 199);
  outline: none;
  padding: 0 6px;
}
.xieyi-address {
  width: 450px;
}
table td input {
  width: 35px;
  height: 30px;
  border: none;
  text-align: center;
}
table {
  margin-bottom: 15px;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}

input[type="number"] {
  -moz-appearance: textfield;
}
.timer {
  display: inline-block;
  margin-right: 220px;
  position: relative;
}
.time {
  position: absolute;
  top: -5px;
  left: 110px;
}
.timeWord {
  font-size: 14px;
}
.tuihuiName {
  padding-bottom: 20px;
}
</style>

<style>
.timer .el-input--prefix .el-input__inner {
  width: 188px;
  height: 28px;
  border-color: #a0a0a0;
  background-color: transparent;
}
.timer .el-input__icon {
  line-height: 28px;
}

.xieyi-wrapper .el-popup-parent--hidden {
  overflow-x: hidden !important;
  overflow-y: scroll !important;
}
.xieyi-wrapper .el-button--primary {
  border-color: rgb(160, 212, 86) !important;
  background-color: rgb(160, 212, 86) !important;
}
.xieyi-wrapper .el-button:hover {
  border-color: rgb(160, 212, 86) !important;
  background-color: white !important;
  color: rgb(160, 212, 86) !important;
}
.xieyi-wrapper .el-button--primary:hover {
  border-color: rgb(160, 212, 86) !important;
  background-color: rgb(160, 212, 86) !important;
  color: white !important;
}
</style>