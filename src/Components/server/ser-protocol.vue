<template>
  <div class="box">
    <review-record :recordTitle="recordTitle" :recordArr="recordArr"></review-record>
    <i class="el-icon-close" @click="dispear"></i>
    <div class="show" v-html="b2b2"></div>
    <!-- 确认退回按钮 -->
    <div class="button">
      <button @click="queding">确认</button>
      <button @click="OutWord">导出Word</button>
      <button @click="showReason" v-show="flag == '0' ">退回</button>
    </div>
    <!-- 隐藏部分 -->
    <transition name="el-fade-in-linear">
      <div v-show="hide">
        <div class="back">
          <p>*请说明退回协议书的理由，业务员将根据您的理由修改后再次发送:</p>
          <textarea name="reason" cols="30" rows="10" v-model="reason"></textarea>
        </div>
        <button @click="tuihui">提交</button>
      </div>
    </transition>
    <div ref="tuihuiBtn"></div>
  </div>
</template>

<script>
import reviewRecord from "@/Components/review-record";
import { GetYlContractByCustomer, UpdateContractState } from "@/api/card";

var ps = {
  //身份和审核后变成的状态
  MANAGER: "DEP_MARKET_CHECK",
  MARKETCHECKER: "CSA_CHECK",
  VSMAPPROVEXII: "APPROVED"
};
var pt = {
  //身份和中文翻译
  MANAGER: "中心总经理",
  MARKETCHECKER: "市场部",
  VSMAPPROVEXII: "销售总监"
};
var pn = {
  //身份和signed变化
  MANAGER: 0,
  MARKETCHECKER: 0,
  VSMAPPROVEXII: 1
};
export default {
  name: "ser-protocol",
  components: { reviewRecord },
  data() {
    return {
      hide: false,
      b2b2: "",
      reason: "",
      position: this.$store.state.user.pos[0].position,
      recordTitle: "", //传给评审记录的数据
      recordArr: [], //传给评审记录的数据
      contractData: []
    };
  },
  props: ["cid", "flag", "cyear"],
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
    wfmemo() {
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
      let wfmemo =
        nowTime +
        pt[this.position] +
        this.$store.state.user.data.realName;
      return wfmemo;
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
      // doc += "<table>";
      // var html = document.getElementById("PrintDiv1").innerHTML;
      var html = this.b2b2;
      doc += html;
      // doc = doc.replace('body style="','body style="font-size:30px; ');子节点设立了样式所有无效

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
      doc = doc.replace(/color: rgb\(0, 176, 240\);/g, "color: rgb(0, 0, 0);");
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
        link.download =
          this.cyear + "年度" + this.contractData.cname + "协议书";
        document.body.appendChild(link);
        link.click();
        // window.open("data:application/msword;" + base64data);
      } else if (type == "excel") {
        window.open("data:application/vnd.ms-excel;" + base64data);
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
    showReason() {
      this.hide = true;
    },
    dispear() {
      //红叉关闭
      this.$emit("close", false);
    },
    queding() {
      let market = "";
      let csa = "";
      if (this.position == "MARKETCHECKER") {
        market = this.$store.state.user.data.realName;
      }
      if (this.position == "VSMAPPROVEXII") {
        csa = this.$store.state.user.data.realName;
      }
      if (this.flag == "0") {
        // this.$axios
        //   .post("/yulan/infoState/checkYLcontractentryState.do", {
        //     cid: this.cid,
        //     state: ps[this.position],
        //     wfmemo: this.wfmemo + " 审核批准协议文本;",
        //     signed: pn[this.position],
        //     market: market,
        //     csa: csa
        //   })
        UpdateContractState({
          cid: this.cid,
          year: this.cyear,
          state: ps[this.position],
          wfmemo: this.wfmemo + "通过协议书;",
          signed: pn[this.position],
          market: market,
          csa: csa
        })
          .then(res => {
            this.$alert("同意该协议书");
            location.reload();
            this.dispear();
          })
          .catch(function(err) {
            console.log(err);
          });
      } else {
        this.dispear();
      }
    },
    tuihui() {
      if (this.reason == "") {
        this.$alert("退回理由不能为空");
        return false;
      }
      // this.$axios
      //   .post("/yulan/infoState/checkYLcontractentryState.do", {
      //     cid: this.cid,
      //     state: "SALEMANMODIFYING",
      //     wfmemo: this.wfmemo + "退回协议书，原因是 [" + this.reason + "];",
      //     signed: 2,
      //     market: "",
      //     csa: ""
      //   })
      UpdateContractState({
        cid: this.cid,
        year: this.cyear,
        state: "SALEMANMODIFYING",
        wfmemo: this.wfmemo + "退回协议书，原因是 [" + this.reason + "];",
        signed: 2,
        market: "",
        csa: ""
      })
        .then(res => {
          this.$alert("退回协议书成功");
          location.reload();
          this.dispear();
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  },
  watch: {
    // cid(newvalue) {
    //   this.$axios
    //     .post("/yulan/YLcontractentry/getYLcontractHTML.do	", {
    //       cid: newvalue
    //     })
    //     .then(res => {
    //       if (res.data != null && res.data.code == 0) {
    //         this.b2b2 = res.data.data;
    //       }
    //     })
    //     .catch(function(err) {
    //       console.log(err);
    //     });
    //   this.$axios
    //     .post("/yulan/infoState/getYLcontractentryState.do", {
    //       cid: newvalue,
    //       cyear: this.$store.state.year
    //     })
    //     .then(res => {
    //       console.log("拿评审记录数据成功");
    //       this.recordTitle = res.data.yLcontractInfo;
    //       this.recordArr = res.data.yLcontractentryMemo.reverse();
    //     })
    //     .catch(err => {
    //       console.log("拿评审记录数据错误" + err);
    //     });
    // },
    hide: function() {
      this.$nextTick(() => {
        this.$refs.tuihuiBtn.scrollIntoView(false);
      });
    }
  },
  mounted() {
    if (this.cid) {
      // this.$axios
      //     .post("/yulan/YLcontractentry/getYLcontractHTML.do	", {
      //       cid: newvalue
      //     })
      GetYlContractByCustomer({
        cid: this.cid,
        year: this.cyear
      })
        .then(res => {
          if (res.data != null && res.data.contract) {
            this.b2b2 = res.data.htmlText;
            this.contractData = res.data.contract;
            this.$axios
              .post("/yulan/infoState/getYLcontractentryState.do", {
                cid: this.cid,
                cyear: Number(this.cyear)
              })
              .then(res => {
                this.recordTitle = res.data.yLcontractInfo;
                if (res.data.yLcontractentryMemo)
                  this.recordArr = res.data.yLcontractentryMemo.reverse();
              })
              .catch(err => {
                console.log("拿评审记录数据错误" + err);
              });
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
.box {
  background-color: white;
  padding: 40px 50px;
  position: relative;
  border: 1px solid #86cb7e;
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
  margin: 10px auto;
  text-align: center;
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
.el-icon-close {
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
  color: red;
  font-size: 25px;
}
</style>

<style>
.box .el-popup-parent--hidden {
  overflow-x: hidden !important;
  overflow-y: scroll !important;
}
.box .el-button--primary {
  border-color: rgb(160, 212, 86) !important;
  background-color: rgb(160, 212, 86) !important;
}
.box .el-button:hover {
  border-color: rgb(160, 212, 86) !important;
  background-color: white !important;
  color: rgb(160, 212, 86) !important;
}
.box .el-button--primary:hover {
  border-color: rgb(160, 212, 86) !important;
  background-color: rgb(160, 212, 86) !important;
  color: white !important;
}
</style>