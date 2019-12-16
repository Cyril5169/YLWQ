<template>
  <div class="wrapper-cer">
    <div class="wenxin" v-if="!showCer">
      <span>协议书暂未通过，请耐心等候</span>
    </div>
    <canvas class="picture" ref="picture" width="600" height="800" v-if="showCer"></canvas>
  </div>
</template>

 
<script>
export default {
  name: "certificate",
  data() {
    return {
      name: this.$store.state.user.data.realName,
      area1: "",
      area2: "",
      area3: "",
      startDate: "",
      endDate: "",
      recordTitle: "", //根据评审记录的上面文字来判断协议书是否已通过
      showCer: false
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

    init() {
      let name = this.name;
      let area = this.area;
      let startDate = this.formatDate(this.startDate);
      let endDate = "-" + this.formatDate(this.endDate);
      var picture = this.$refs.picture,
        ctx = picture.getContext("2d"),
        img = new Image();

      img.onload = function() {
        let x = 600 / img.width;
        let y = 800 / img.height;
        ctx.scale(x, y);
        ctx.drawImage(img, 0, 0);
        ctx.font = "bold 64px serif";
        ctx.style = "black";
        let namex = ((345 - name.length * 19) / 2 + 110) * 3.25;
        ctx.fillText(name, namex, 1600);
        ctx.fillText(area, 650, 1850);
        ctx.fillText(startDate, 775, 1970);
        ctx.fillText(endDate, 1125, 1970);
      };
      img.src = "http://14.29.221.109:10250/upload/images/newshouquan2.png";
    }
  },
  created() {
    //发送请求拿评审记录的协议书当前状态
    this.$axios
      .post("/yulan/infoState/getYLcontractentryState.do", {
        cid: this.$store.state.user.data.loginName,
        cyear: this.$store.state.year //必备
      })
      .then(res => {
        this.recordTitle = res.data.yLcontractInfo;
        if (this.recordTitle == "协议书通过") {
          this.showCer = true;

          this.$axios
            .post("/yulan/customerInfo/getAuthorization.do", {
              //获取授权区域并展示canvas
              cid: this.$store.state.user.data.loginName
            })
            .then(res => {
              if (res.data != null) {
                this.area3 = res.data.areaDistrict3Text;
                this.area2 = res.data.areaDistrict2Text;
                this.area1 = res.data.districtText;
                if (this.area2 == null) this.area2 = "";
                if (this.area3 == null) this.area3 = "";
                if (this.showCer == true) this.init();
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

    this.$axios
      .post("/yulan/YLcontractentry/getYLcontract.do", {
        //获取协议书的两个时间
        ccid: this.$store.state.user.data.loginName
      })
      .then(res => {
        let startDate = res.data.data.startDate;
        let endDate = res.data.data.endDate;
        this.startDate = new Date(startDate);
        this.endDate = new Date(endDate);
      })
      .catch(err => {
        console.log(err);
      });
  },
  mounted() {}
};
</script>

<style scoped>
.wrapper-cer {
  width: 100%;
  height: 100%;
  height: 800px;
  background-color: white;
}
.picture {
  display: block;
  margin: 0 auto;
  /* width: 600px; */
  /* height:100%; */
  /* background-color: #F00; */
  /* background-image:url('http://14.29.221.109:10250/upload/images/授权书.jpg'); */
  /* background-size: contain;
    background-repeat: no-repeat;
    position: relative; */
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
