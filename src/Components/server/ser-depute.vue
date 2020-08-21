<template>
  <div class="wrapper-depute">
    <i class="el-icon-close" @click="dispear"></i>
    <div class="left">
      <div class="title">受委托人银行信息</div>
      <div class="input">
        <label for="name">姓名:</label>
        <input type="text" id="name" v-model="name" readonly />
      </div>
      <div class="input">
        <label for="idcardNo">身份证号:</label>
        <input type="text" id="idcardNo" v-model="idcardNo" readonly />
      </div>
      <div class="input">
        <label for="bank">开户银行:</label>
        <input type="text" id="bank" v-model="accountBank" readonly />
      </div>
      <div class="input">
        <label for="accout">银行账户:</label>
        <input type="text" id="accout" v-model="accout" readonly />
      </div>
      <div class="input">
        <label for="address">银行所在地:</label>
        <input type="text" id="address" v-model="accountLocation" readonly />
      </div>
      <!-- <div class="tips">
        <p>*限jpg或jpeg格式，图片大小限制在2M以内，若无法处理请联系业务员</p>
        <p>*委托人下载《授权付款委托书》后填写，并有双方的签字按印，将填写后的《授权付款委托书》扫描或拍照，在本页上传</p>
      </div>-->

      <!-- <div class="button submit" @click="submit">提交</div> -->
    </div>

    <div class="right">
      <!-- 1-授权付款委托书 -->
      <div class="picture">
        <p>1-《授权付款委托书》</p>
        <div class="avatar-uploader pic" @click="changeOuterPhoto2(imageUrl1)">
          <img alt :src="imageUrl1" />
          <!-- <input type="file" accept="image/jpg,image/jpeg" name=""  id="a1"  @change="handleUpload1"> -->
          <!-- <label for="a1"><p v-show="!imageUrl1" class="shangchuan">上传文件</p></label> -->
        </div>
      </div>

      <!-- 2-身份证正面 -->
      <div class="picture">
        <p>2-身份证正面</p>
        <div class="avatar-uploader pic" @click="changeOuterPhoto2(imageUrl2)">
          <img alt :src="imageUrl2" />
          <!-- <input type="file" accept="image/jpg,image/jpeg" name="" id="a2"   @change="handleUpload2"> -->
          <!-- <label for="a2"><p v-show="!imageUrl2" class="shangchuan">上传文件</p></label> -->
        </div>
      </div>

      <!--3-身份证背面 -->
      <div class="picture">
        <p>3-身份证背面</p>
        <div class="avatar-uploader pic" @click="changeOuterPhoto2(imageUrl3)">
          <img alt :src="imageUrl3" />
          <!-- <input type="file" accept="image/jpg,image/jpeg" name=""  id="a3"  @change="handleUpload3"> -->
          <!-- <label for="a3"><p v-show="!imageUrl3" class="shangchuan">上传文件</p></label> -->
        </div>
      </div>

      <div class="button close" @click="dispear">关闭</div>
    </div>
  </div>
</template>

<script>
var remoteImageURL = "http://14.29.221.4:10250/upload";
export default {
  name: "ser-depute",
  props: {
    ccid: "",
    year: ""
  },
  data() {
    return {
      show: true,
      name: "", //姓名
      idcardNo: "", //身份证号
      accountBank: "", //开户银行
      accout: "", //银行账户
      accountLocation: "", //银行所在地
      imageUrl1: "", //三张图片绑定的url
      imageUrl2: "",
      imageUrl3: ""
    };
  },
  watch: {
    cidYear(newV) {
      this.$axios
        .post("/yulan/customerInfo/getYLcontract.do", {
          ccid: newV.ccid,
          ccyear: newV.year
        })
        .then(res => {
          if (res.data.data != null) {
            this.imageUrl1 = remoteImageURL + res.data.data.authfileIamge;
            this.imageUrl2 = remoteImageURL + res.data.data.idcardIamge1;
            this.imageUrl3 = remoteImageURL + res.data.data.idcardIamge2;
            (this.name = res.data.data.name), //姓名
              (this.idcardNo = res.data.data.idcardNo), //身份证号
              (this.accountBank = res.data.data.accountBank), //开户银行
              (this.accout = res.data.data.accout), //银行账户
              (this.accountLocation = res.data.data.accountLocation); //银行所在地
          }
        })
        .catch(err => {
          console.log("审核时拿委托信息失败", err);
        });
    }
  },
  methods: {
    changeOuterPhoto(value) {
      this.$emit("showDeputePhoto", value);
    },
    changeOuterPhoto2(value) {
      var l = (screen.availWidth - 667) / 2;
      var t = (screen.availHeight - 885) / 2;
      window.open(
        value,
        "newWin",
        "width=667,height=885,top=" +
          t +
          ",left=" +
          l +
          ",toolbar=no,menubar=no,location=no,status=yes"
      );
    },
    dispear() {
      this.$emit("dispearDepute");
    }
  },
  computed: {
    cidYear() {
      return {
        ccid: this.ccid,
        year: this.year
      };
    }
  }
};
</script>


<style scoped>
.wrapper-depute {
  width: 800px;
  height: 600px;
  margin: 0 auto;
  background-color: #edfdf0;
  border-radius: 10px;
  font-size: 16px;
  position: absolute;
  left: 100px;
  z-index: 100;
  font-family: "微软雅黑";
}
.left {
  width: 40%;
  height: 100%;
  float: left;
}
.right {
  width: 60%;
  height: 100%;
  float: left;
}
.title {
  text-align: right;
  margin: 20px 45px;
  font-size: 18px;
}
.address-wrapper {
  padding-left: 30px;
}
.address-wrapper:after {
  content: "";
  clear: both;
  display: block;
}
.address-wrapper select {
  width: 201px;
  height: 25px;
  border: solid 1px #a0a0a0;
  padding: 0 10px;
  font-size: 14px;
  outline: none;
  background-color: transparent;
  margin: 4px 0;
  outline: none;
}
.let-right {
  float: right;
}
.tips p {
  font-size: 14px;
  color: gray;
  margin: 30px 10px;
  text-indent: 18px;
}
.input {
  text-align: center;
  height: 50px;
  text-align: right;
  /* box-sizing: border-box; */
}
label + input[type="text"] {
  width: 180px;
  height: 25px;
  border: solid 1px #a0a0a0;
  padding: 0 10px;
  font-size: 14px;
  outline: none;
  background-color: transparent;
}
/*取消输入框默认填充样式*/
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  transition-delay: 9999s;
  transition: color 9999s ease-out, background-color 9999s ease-out;
}

.picture {
  display: inline-block;
  margin-top: 22px;
  position: relative;
  box-sizing: border-box;
}
.picture p {
  text-align: center;
}

.picture div {
  width: 200px;
  height: 150px;
  background-color: #e9efea;
  margin: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border-radius: 5px;
}
/* .picture div:hover {
  background-color: #444746;
} */

.button {
  position: relative;
  left: -155px;
  margin: 0 auto;
  width: 100px;
  outline: none;
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
.close {
  margin-top: 58px;
}
.submit {
  transform: translateY(-4px);
}
.el-icon-close {
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
  color: red;
  font-size: 18px;
}
.pic input {
  width: 100%;
  height: 100%;
  position: absolute;
  right: 0;
  top: 0;
  opacity: 0;
  filter: alpha(opacity=0);
  cursor: pointer;
}
.pic img {
  display: inline-block;
  height: 100%;
  width: 100%;
}
.shangchuan {
  position: absolute;
  font-size: 16px;
  line-height: 16px;
  top: 45%;
  left: 50%;
  transform: translateX(-50%);
  border: 1px solid white;
  border-radius: 5px;
  padding: 4px;
  color: white;
  display: none;
}
.avatar-uploader:hover .shangchuan {
  display: inline-block;
}
/*以下是旧的东西*/
.avatar-uploader {
  border-radius: 6px;
  /* cursor: pointer; */
  position: relative;
  overflow: hidden;
  background-color: #e9efea;
}
</style>