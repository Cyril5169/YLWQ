<template>
  <div class="wrapper-cer">
    <div class="wenxin" v-if="!showCer">
      <span>协议书暂未通过，请耐心等候</span>
    </div>
    <div class="wenxin" v-if="showCer && imgLoading">
      <span>正在生成授权书，请稍后...</span>
    </div>
    <div class="floatDiv">
      <el-switch
        v-if="showCer && !imgLoading"
        v-model="preValue"
        active-text="大图模式"
        inactive-text="预览模式"
        @change="preChange"
        style="margin-left:20px;"
      ></el-switch>
      <div
        v-if="showCer && !imgLoading && !preValue"
        style="margin-left:20px;color:red;font-size:15px;"
      >当前为预览模式，若要保存图片，请切换至大图模式</div>
    </div>
    <canvas class="picture" ref="picture" width="600" height="800" v-if="showCer"></canvas>
  </div>
</template>

<script>
import { GetCardByCustomer, GetYlContractByCustomer } from "@/api/card";

export default {
  name: "certificate",
  data() {
    return {
      name: this.$store.state.user.data.realName,
      area1: "",
      area2: "",
      area3: "",
      businesslicenseNO: "",
      startDate: "",
      endDate: "",
      recordTitle: "", //根据评审记录的上面文字来判断协议书是否已通过
      showCer: false,
      imgLoading: false,
      preValue: false,
      imgWidth: 600,
      imgHeight: 800,
      thisPage: true
    };
  },
  computed: {
    area() {
      return this.area1 + this.area2 + this.area3;
    }
  },
  methods: {
    formatDate(date) {
      {
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? "0" + m : m;
        var d = date.getDate();
        d = d < 10 ? "0" + d : d;
        return y + "." + m + "." + d;
      }
    },
    preChange() {
      this.init();
    },
    getData() {
      let year = this.$store.state.year;
      //let year = 2019;
      //发送请求拿评审记录的协议书当前状态
      this.$axios
        .post("/yulan/infoState/getYLcontractentryState.do", {
          cid: this.$store.state.user.data.customerMainId,
          cyear: year //必备
        })
        .then(res => {
          this.recordTitle = res.data.yLcontractInfo;
          if (this.recordTitle == "协议书通过") {
            this.showCer = true;

            // this.$axios
            //   .post("/yulan/customerInfo/getAuthorization.do", {
            //     //获取授权区域并展示canvas
            //     cid: this.$store.state.user.data.customerMainId
            //   })
            GetCardByCustomer({
              cid: this.$store.state.user.data.customerMainId,
              year: year
            })
              .then(res2 => {
                if (res2.data != null && res2.data.length > 0) {
                  this.area3 = res2.data[0].areaDistrict3Text;
                  this.area2 = res2.data[0].areaDistrict2Text;
                  this.area1 = res2.data[0].districtText;
                  this.businesslicenseNO = res2.data[0].file2BusinesslicenseNo;
                  if (this.area2 == null) this.area2 = "";
                  if (this.area3 == null) this.area3 = "";

                  // this.$axios
                  //   .post("/yulan/YLcontractentry/getYLcontract.do", {
                  //     //获取协议书的两个时间
                  //     ccid: this.$store.state.user.data.customerMainId
                  //   })
                  GetYlContractByCustomer({
                    cid: this.$store.state.user.data.customerMainId,
                    year: year
                  })
                    .then(res3 => {
                      let startDate = res3.data.contract.startDate;
                      let endDate = res3.data.contract.endDate;
                      this.startDate = new Date(startDate);
                      this.endDate = new Date(endDate);

                      if (this.showCer == true) this.init();
                    })
                    .catch(err => {
                      console.log(err);
                    });
                }
              })
              .catch(function(err) {
                console.log(err);
              });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    init() {
      let me = this;
      this.imgLoading = true;
      let name = this.name;
      let buNo = this.businesslicenseNO;
      let area = this.area;
      let startDate = this.formatDate(this.startDate);
      let endDate = " - " + this.formatDate(this.endDate);
      let date = startDate + endDate;
      var picture = this.$refs.picture,
        ctx = picture.getContext("2d"),
        img = new Image();
      picture.width = picture.width;
      img.onload = function() {
        if (me.preValue == true) {
          //原图
          picture.width = img.width;
          picture.height = img.height;
        } else {
          picture.width = 600;
          picture.height = 800;
        }
        let x = picture.width / img.width;
        let y = picture.height / img.height;
        ctx.scale(x, y);
        ctx.drawImage(img, 0, 0);
        ctx.font = "bold 64px 宋体";
        ctx.style = "black";
        let namex = ((500 - name.length * 19) / 2 + 150) * 3.25;
        ctx.fillText(name, namex, 1535);
        let buNox = ((350 - buNo.length * 19) / 2 + 270) * 3.25;
        ctx.fillText(buNo, buNox, 1635);
        ctx.fillText(area, 650, 1985);
        ctx.fillText(date, 775, 2110);
        me.imgLoading = false;
      };
      //img.src = "http://14.29.221.4:10250/upload/images/newshouquan2.png";
      img.src = "http://14.29.221.4:10250/upload/images/newcertificate.jpg";
    }
  },
  created() {
    this.getData();
  },
  mounted() {
    window.oncontextmenu = e => {
      if (!this.preValue && this.thisPage) event.returnValue = false; //阻止右键菜单
    };
  }
};
</script>

<style scoped>
.wrapper-cer {
  width: 100%;
  min-height: 800px;
  background-color: white;
}
.picture {
  display: block;
  margin: 0 auto 0 10px;
}
.floatDiv {
  float: left;
  padding: 10px;
}
.name {
  width: 246px;
  height: 41px;
  /* background-color: red; */
  position: absolute;
  top: 46%;
  left: 16%;
  text-align: center;
  font-size: 16px;
}
.area {
  width: 300px;
  height: 27px;
  /* background-color: pink; */
  position: absolute;
  top: 53.7%;
  left: 27%;
  font-size: 16px;
}
.wenxin {
  font-size: 20px;
  text-align: center;
  padding-top: 20%;
}
</style>