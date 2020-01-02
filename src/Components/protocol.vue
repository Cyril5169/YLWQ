<template>
  <div class="box-protocol" ref="box">
    <!-- 评审记录2 -->
    <review-record :recordTitle="recordTitle" :recordArr="recordArr"></review-record>
    <div class="wrapper-search">
      <span>年份:</span>
      <el-select v-model="selYear" class="select" @change="filterYear">
        <el-option v-for="item in 83" :key="item+2017" :value="item+2017" :label="item+2017"></el-option>
      </el-select>
    </div>
    <div v-html="b2b2" v-if="showProtocol" :class="{show:showProtocol}"></div>
    <div class="wenxin" v-if="!showProtocol" :class="{show:showProtocol}">
      <span class="word">如资料卡已通过审批，请联系业务经理生成协议书，谢谢！</span>
    </div>

    <div class="button">
      <button @click="queding" v-show="showProtocol&&recordTitle == '客户查看确认协议数据中'">确认</button>
      <button @click="tuihuiReason" v-show="showProtocol&&recordTitle == '客户查看确认协议数据中'">退回</button>
      <button @click="OutWord" v-show="showProtocol">导出Word</button>
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
import { GetYlContractByCustomer, UpdateContractState } from "@/api/card";

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
      showProtocol: false,
      contractData: [],
      selYear: this.$store.state.year
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
    getExplorer() {
      var explorer = window.navigator.userAgent;
      //判断是否为IE浏览器
      if (explorer.indexOf("MSIE") >= 0) {
        return "ie";
      }
      //判断是否为Firefox浏览器
      else if (explorer.indexOf("Firefox") >= 0) {
        return "Firefox";
      }
      //判断是否为Chrome浏览器
      else if (explorer.indexOf("Chrome") >= 0) {
        return "Chrome";
      }
      //判断是否为Opera浏览器
      else if (explorer.indexOf("Opera") >= 0) {
        return "Opera";
      }
      //判断是否为Safari浏览器
      else if (explorer.indexOf("Safari") >= 0) {
        return "Safari";
      }
    },
    tableExport(type) {
      var doc = "";
      var html = this.b2b2;
      doc += html;
      doc = doc.replace(/\<p\>&nbsp;\<\/p\>/g, "");
      doc = doc.replace(/\<p\>\<\/p\>/g, "");
      doc = doc.replace(/&nbsp;&nbsp;/g, "");
      doc = doc.replace(/&nbsp; &nbsp;/g, "");
      doc = doc.replace(/\<p\>/g, '<p style="font-size:14px;margin:0px">');
      doc = doc.replace(
        /\<p style="text-indent: 2em;"\>/g,
        '<p style="font-size:14px;margin:0px">'
      );
      doc = doc.replace(/table width="850"/g, 'table width="550"');
      doc = doc.replace(
        '">内部编号：',
        ';text-align: left;margin-left:400px">内部编号：'
      );
      doc = doc.replace(
        '">签约地点：',
        ';text-align: left;margin-left:400px">签约地点：'
      );
      doc = doc.replace(
        '">经双方友好',
        ';text-align: left;text-indent: 2em;">经双方友好'
      );
      doc = doc.replace(
        '<p style="text-align: center;">广东玉兰集团年度经销协议书</p>',
        '<p style="text-align: center;font-size:18.6px;font-weight:bold; ">广东玉兰集团年度经销协议书</p>'
      );
      doc = doc.replace(/&nbsp;1、/g, "1、");
      doc = doc.replace(/&nbsp;2、/g, "2、");
      doc = doc.replace(/&nbsp;3、/g, "3、");
      doc = doc.replace(/&nbsp;4、/g, "4、");
      doc = doc.replace(/&nbsp;5、/g, "5、");
      doc = doc.replace(/&nbsp;6、/g, "6、");
      doc = doc.replace(/&nbsp;7、/g, "7、");
      doc = doc.replace(/1\)/g, "&nbsp;1)");
      doc = doc.replace(/2\)/g, "&nbsp;2)");
      doc = doc.replace(/3\)/g, "&nbsp;3)");
      doc = doc.replace(/4\)/g, "&nbsp;4)");
      doc = doc.replace(/5\)/g, "&nbsp;5)");
      doc = doc.replace(/6\)/g, "&nbsp;6)");
      doc = doc.replace(/7\)/g, "&nbsp;7)");
      doc = doc.replace(
        /width="116"><span style="text-indent: 32px;">/g,
        'width="116"><span style="font-size: 14px;">'
      );
      doc = doc.replace(
        /width="116"><span style="color: rgb\(0, 176, 240\);">/g,
        'width="116"><span style="font-size: 14px; color: rgb(0, 176, 240);">'
      );
      doc = doc.replace("乙方（加盖章）：", "&nbsp;&nbsp;乙方（加盖章）：");
      doc = doc.replace(
        "法人代表（或指定代表）：</p>",
        "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;法人代表（或指定代表）：</p>"
      );
      doc = doc.replace(
        "受委托人：</p>",
        "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 受委托人：</p>"
      );
      doc = doc.replace(
        ">年月日",
        ">&nbsp;&nbsp;&nbsp;&nbsp;年&nbsp;&nbsp;月&nbsp;&nbsp;日"
      );
      doc = doc.replace(
        "年月&nbsp; 日</p>",
        "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;年&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;日</p>"
      );
      doc = doc.replace(
        "联系电话：</p>",
        "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 联系电话：</p>"
      );
      doc = doc.replace(
        /style="word-break: break-all; border-width: 1px; border-style: solid; border-color: rgb\(0, 0, 0\);"/g,
        'style=" font-size: 14px;word-break: break-all; border-width: 1px; border-style: solid; border-color: rgb(0, 0, 0);"'
      );
      doc = doc.replace(
        /style="border-width: 1px; border-style: solid; word-break: break-all; border-color: rgb\(0, 0, 0\);" align="center"/g,
        'style=" font-size: 14px;border-width: 1px; border-style: solid; word-break: break-all; border-color: rgb(0, 0, 0);" align="center"'
      );

      var docFile =
        "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:x='urn:schemas-microsoft-com:office:" +
        doc +
        "' xmlns='http://www.w3.org/TR/REC-html40'>";
      docFile =
        docFile +
        "<head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head>" +
        doc +
        "</body></html>";

      var base64data =
        "base64," + window.btoa(unescape(encodeURIComponent(docFile)));
      if (type == "doc") {
        const link = document.createElement("a");
        link.style.display = "none";
        link.href = "data:application/msword;" + base64data;
        //link.download=this.$store.state.user.data.customerMainId+"年度经销协议书";
        link.download =
          this.contractData.cyear + "年度" + this.contractData.cname + "协议书";
        document.body.appendChild(link);
        link.click();
        // window.open("data:application/msword;" + base64data); else if (type == "excel") {
        // window.open("data:application/vnd.ms-excel;" + base64data);
      }
    },
    OutWord() {
      if (this.getExplorer() == "ie") {
        this.$alert("请换火狐或谷歌浏览器下载！", "提示", {
          confirmButtonText: "确定",
          type: "danger"
        });
      } else {
        this.tableExport("doc");
      }
    },
    tuihuiReason() {
      if (!this.check()) return;
      this.hide = true;
    },
    queding() {
      if (!this.check()) return;
      // this.$axios
      //   .post("/yulan/infoState/checkYLcontractentryState.do", {
      //     cid: this.$store.state.user.data.customerMainId,
      //     state: "ASM_CHECKING",
      //     wfmemo: this.memo + "通过协议文本;",
      //     signed: 0,
      //     market: "",
      //     csa: ""
      //   })
      UpdateContractState({
        cid: this.$store.state.user.data.customerMainId,
        year: this.contractData.cyear,
        state: "ASM_CHECKING",
        wfmemo: this.memo + "通过协议文本;",
        signed: 0,
        market: "",
        csa: ""
      })
        .then(res => {
          this.$alert("同意该协议书");
          this.getData();
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    tuihui() {
      if (this.reason != "") {
        // this.$axios
        //   .post("/yulan/infoState/checkYLcontractentryState.do", {
        //     cid: this.$store.state.user.data.customerMainId,
        //     state: "SALEMANMODIFYING",
        //     wfmemo: this.memo + "退回协议书，原因是 [" + this.reason + "];",
        //     signed: 2,
        //     market: "",
        //     csa: ""
        //   })
        UpdateContractState({
          cid: this.$store.state.user.data.customerMainId,
          year: this.contractData.cyear,
          state: "SALEMANMODIFYING",
          wfmemo: this.memo + "退回协议书，原因是[" + this.reason + "];",
          signed: 2,
          market: "",
          csa: ""
        })
          .then(res => {
            this.$alert("退回协议书成功");
            this.getData();
            this.hide = false;
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
    },
    getData() {
      // this.$axios
      //   .post("/yulan/YLcontractentry/getYLcontractHTML.do	", {
      //     cid: this.$store.state.user.data.customerMainId
      //   })
      this.b2b2 = "";
      this.contractData = [];
      this.showProtocol = false;
      this.recordTitle = "";
      this.recordArr = [];
      GetYlContractByCustomer({
        cid: this.$store.state.user.data.customerMainId,
        year: this.selYear
      })
        .then(res => {
          if (res.data != null && res.data.contract) {
            this.showProtocol = true;
            this.b2b2 = res.data.htmlText;
            this.contractData = res.data.contract;
            //发送请求拿评审的数据
            this.$axios
              .post("/yulan/infoState/getYLcontractentryState.do", {
                cid: this.$store.state.user.data.customerMainId,
                cyear: this.contractData.cyear
              })
              .then(res2 => {
                this.recordTitle = res2.data.yLcontractInfo;
                if (res2.data.yLcontractentryMemo)
                  this.recordArr = res2.data.yLcontractentryMemo.reverse();
              })
              .catch(err => {
                console.log("拿评审记录数据错误" + err);
              });
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    filterYear() {
      this.getData();
    }
  },
  mounted() {
    this.getData();
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
  width: 500px;
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
.wrapper-search{
  margin-bottom: 10px;
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
.wrapper-search .el-select .el-input__inner {
  height: 30px;
  width: 100px;
}
.wrapper-search .el-select .el-input__icon {
  line-height: 0px;
}
</style>