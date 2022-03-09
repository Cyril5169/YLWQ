<template>
  <div class="page">
    <div class="content">
      <div class="filesLeft">
        <div class="person">
          <img src="../assets/images/头像.png" />
          <span class="cliName">{{ cardobj.cname }}</span>
        </div>
        <div class="intention">
          <p class="title" style="position: relative; top: -14px">
            意向品牌
            <span class="must-input">（必选）</span>
          </p>
          <div class="inteninput">
            <input type="checkbox" name="brand" id="WallPaper" v-model="databool1" :disabled="only" />
            <label for="WallPaper">玉兰（墙纸、墙布、墙板、墙漆、辅料）</label>
            <br />
            <input type="checkbox" name="brand" id="SoftProducts" v-model="databool2" :disabled="only" />
            <label for="SoftProducts">兰居尚品（布艺类产品）</label>
          </div>
        </div>

        <div class="nowBrand">
          <p class="title">
            主营品牌（非玉兰）
            <span class="must-input">（必填）</span>
          </p>
          <input type="text" name="brandName" v-model="currentProduct" :readOnly="only" :class="{ readOnly: only }" />
        </div>
        <div class="receipt">
          <p class="title" style="position: relative; top: -22px">
            发票开具类型
            <br />
            <span class="must-input">（必选）</span>
          </p>
          <div class="recinput">
            <input type="radio" name="receiptType" value="不开发票" id="no" v-model="invoiceType"
              :disabled="only || this.cardobj.vatInvoiceFlag == 'Y'" />
            <label for="no">不开发票</label>
            <br />
            <input type="radio" name="receiptType" value="增值税普通发票" id="normal" v-model="invoiceType"
              :disabled="only || this.cardobj.vatInvoiceFlag == 'Y'" />
            <label for="normal">增值税普通发票</label>
            <input type="radio" name="receiptType" value="电子普通发票" id="electron" v-model="invoiceType"
              :disabled="only || this.cardobj.vatInvoiceFlag == 'Y'" />
            <label for="electron">电子普通发票</label>
            <br />
            <input type="radio" name="receiptType" value="增值税专用发票" id="only" v-model="invoiceType"
              :disabled="only || this.cardobj.vatInvoiceFlag == 'Y'" />
            <label for="only">增值税专用发票</label>
          </div>
        </div>
        <div class="taxPayer">
          <p class="title">一般纳税人</p>
          <input type="radio" name="payerType" value="yes" id="yes" v-model="taxPayerType"
            :disabled="only || this.cardobj.vatInvoiceFlag == 'Y'" />
          <label for="yes">是</label>
          <input type="radio" name="payerType" value="not" id="not" v-model="taxPayerType"
            :disabled="only || this.cardobj.vatInvoiceFlag == 'Y'" />
          <label for="not">否</label>
        </div>
        <!--发票开具类型不同选项-->
        <div class="message1" v-show="isShow1">
          <p class="title">接收邮箱</p>
          <input type="text" id="recipeTargetMb" name="email1" v-model="recipeTargetMb" :readOnly="only"
            :class="{ readOnly: only }" />
        </div>

        <div class="message2" v-show="isShow2">
          <p class="title">增值税发票开票信息</p>
          <div class="address">
            <p class="title">地址</p>
            <input type="text" name="invAddress" v-model="invAddress" :disabled="this.cardobj.vatInvoiceFlag == 'Y'"
              :readOnly="only" :class="{ readOnly: only }" />
          </div>
          <div class="telephone">
            <p class="title">电话</p>
            <input type="text" name="invTelephone" v-model="invTelephone" :disabled="this.cardobj.vatInvoiceFlag == 'Y'"
              :readOnly="only" :class="{ readOnly: only }" />
          </div>
          <div class="bank">
            <p class="title">开户银行</p>
            <input type="text" name="invBank" v-model="invBankname" :disabled="this.cardobj.vatInvoiceFlag == 'Y'"
              :readOnly="only" :class="{ readOnly: only }" />
          </div>
          <div class="bankAccount">
            <p class="title">银行账号</p>
            <input type="text" name="invBanmaccount" v-model="invBanmaccount" :disabled="this.cardobj.vatInvoiceFlag == 'Y'"
              :readOnly="only" :class="{ readOnly: only }" />
          </div>
        </div>
      </div>
      <div class="filesRight">
        <div class="owner">
          <p class="title">法人代表/经营者</p>
          <input type="text" name="ownerName" :readonly="true" class="readOnly" :value="cardobj.xJuridicPerson" />
        </div>
        <div class="owner">
          <p class="title">
            法人手机
            <span class="must-input">（必填）</span>
          </p>
          <input type="text" name="tel" v-model="juridicPersonHandset" :readOnly="only" :class="{ readOnly: only }" />
        </div>
        <div class="owner">
          <p class="title">店面面积 (平方米)</p>
          <input type="number" name="space" v-model="shopArea" :readOnly="only" :class="{ readOnly: only }"
            onpaste="return false;" oninput="value=value.replace(/[^\d]/g,'')" />
        </div>
      </div>
    </div>
    <div class="button">
      <button @click="next">下一步</button>
    </div>
  </div>
</template>
    
<script>
export default {
  name: "cli-filecard1",
  props: {
    cardobj: null,
    only: Boolean,
  },
  data() {
    return {
      databool1: false, //bool1
      databool2: false, //bool2
      preferedbrand: "", //最后要传的意向品牌，搞定
      isShow1: false,
      isShow2: false,
      currentProduct: "", //现主营产品品牌
      invoiceType: "",
      taxPayerType: "",
      shopArea: this.cardobj.shopArea, //店面面积
      invAddress: this.cardobj.invAddress, //地址
      invTelephone: this.cardobj.invTelephone, //电话
      invBankname: this.cardobj.invBankname, //开户银行
      invBanmaccount: this.cardobj.invBanmaccount, //银行账号
      juridicPersonHandset: this.cardobj.juridicPersonHandset, //手机
      recipeTargetMb: this.cardobj.recipeTargetMb, //电子普通发票邮箱
      // vatInvoiceFlag:"N" //是否已开增值税发票：Y是，N否
    };
  },
  watch: {
    invoiceType() {
      //把发票类型放在vuex给card4用
      this.$store.commit("setFaPiao", this.invoiceType);

      // this.vatInvoiceFlag = "N";//后来加的字段

      if (this.invoiceType == "不开发票") {
        this.taxPayerType = "not";
      }
      if (this.invoiceType == "增值税普通发票") {
        this.taxPayerType = "not";
      }
      if (this.invoiceType == "电子普通发票") {
        this.isShow1 = true;
        this.taxPayerType = "not";
      } else {
        this.isShow1 = false;
      }
      if (this.invoiceType == "增值税专用发票") {
        this.isShow2 = true;
        this.taxPayerType = "yes";
        // this.vatInvoiceFlag = "Y";//后来加的字段
      } else {
        this.isShow2 = false;
      }
    },
    taxPayerType() {
      if (this.taxPayerType == "yes") {
        this.invoiceType = "增值税专用发票";
      } else {
        // this.invoiceType = "不开发票";
        // if(this.cardobj.invoiceType != "增值税专用发票"){
        //   // this.invoiceType = this.cardobj.invoiceType;
        //   if(!this.cardobj.invoiceType)this.invoiceType = "不开发票";
        //   else this.invoiceType = this.cardobj.invoiceType;
        // }else{

        // }
        if (this.invoiceType == "增值税专用发票") this.invoiceType = "不开发票";
      }
    },
    cardobj(newV, oldV) {
      if (newV) {
        if (newV.preferedbrand) {
          this.preferedbrand = newV.preferedbrand;
          this.databool1 = this.preferedbrand.indexOf("墙纸") != -1;
          this.databool2 =
            this.preferedbrand.indexOf("软装") != -1 ||
            this.preferedbrand.indexOf("布") != -1;
        }
        (this.shopArea = this.cardobj.shopArea), //店面面积
          (this.invAddress = this.cardobj.invAddress), //地址
          (this.invTelephone = this.cardobj.invTelephone), //电话
          (this.invBankname = this.cardobj.invBankname), //开户银行
          (this.invBanmaccount = this.cardobj.invBanmaccount), //银行账号
          (this.juridicPersonHandset = this.cardobj.juridicPersonHandset), //手机
          (this.recipeTargetMb = this.cardobj.recipeTargetMb), //电子普通发票邮箱
          (this.invoiceType = this.cardobj.invoiceType), //发票类型
          (this.currentProduct = this.cardobj.currentProduct); //当前主营品牌
        // this.vatInvoiceFlag=this.cardobj.vatInvoiceFlag//是否已开增值税发票：Y是，N否
        if (this.cardobj.vatInvoiceFlag == "Y") {
          this.invoiceType = "增值税专用发票";
        }
      }
    },
    databool1(newV, oldV) {
      if (newV) {
        if (this.databool2) {
          this.preferedbrand =
            "√玉兰（墙纸、墙布、墙板、墙漆、辅料）√兰居尚品（布艺类产品）";
        } else {
          this.preferedbrand = "√玉兰（墙纸、墙布、墙板、墙漆、辅料）";
        }
      } else {
        if (this.databool2) {
          this.preferedbrand = "√兰居尚品（布艺类产品）";
        } else {
          this.preferedbrand = "";
        }
      }
    },
    databool2(newV, oldV) {
      if (newV) {
        if (this.databool1) {
          this.preferedbrand =
            "√玉兰（墙纸、墙布、墙板、墙漆、辅料）√兰居尚品（布艺类产品）";
        } else {
          this.preferedbrand = "√兰居尚品（布艺类产品）";
        }
      } else {
        if (this.databool1) {
          this.preferedbrand = "√玉兰（墙纸、墙布、墙板、墙漆、辅料）";
        } else {
          this.preferedbrand = "";
        }
      }
    },
  },
  methods: {
    handleInput(e) {
      let a = e.key.replace(/[^\d]/g, "");
      if (!a) {
        e.preventDefault();
      }
    },
    keyPress() {
      var keyCode = event.keyCode || event.which;
      if (keyCode >= 48 && keyCode <= 57) event.returnValue = true;
      else event.returnValue = false;
    },
    next() {
      if (!this.only) {
        if (!this.preferedbrand) {
          this.$alert("请选择意向品牌");
          return;
        }
        if (!this.currentProduct) {
          this.$alert("请填写主营品牌（非玉兰）");
          return;
        }
        if (!this.invoiceType) {
          this.$alert("请选择发票开具类型");
          return;
        }
        if (!this.juridicPersonHandset) {
          this.$alert("请填写法人手机");
          return;
        }
        if (this.invoiceType == "电子普通发票" && !this.recipeTargetMb) {
          this.$alert("请填写电子普通发票接收邮箱");
          return;
        }
        if (this.invoiceType == "增值税专用发票") {
          if (!this.invAddress) {
            this.$alert("请填写增值税专用发票地址");
            return;
          }
          if (!this.invTelephone) {
            this.$alert("请填写增值税专用发票电话");
            return;
          }
          if (!this.invBankname) {
            this.$alert("请填写增值税专用发票开户银行");
            return;
          }
          if (!this.invBanmaccount) {
            this.$alert("请填写增值税专用发票银行账号");
            return;
          }
        }
      }
      // 　　var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"); // //邮箱正则
      // 　　if(this.recipeTargetMb === ""){ //输入不能为空
      // 　　　　this.$alert("邮箱输入不能为空!");
      // 　　　　return false;
      // 　　}else if(!reg.test(this.recipeTargetMb)){ //正则验证不通过，格式不对
      // 　　　　this.$alert("邮箱验证不通过!");
      // 　　　　return false;
      // 　　}

      this.$emit("bridgenext");
      this.$emit("mergeMessage", {
        preferedbrand: this.preferedbrand, //意向品牌
        currentProduct: this.currentProduct, //现主营产品品牌
        invoiceType: this.invoiceType, //发票类型
        recipeTargetMb: this.recipeTargetMb, //电子普通发票邮箱
        shopArea: this.shopArea, //店面面积
        invAddress: this.invAddress, //地址
        invTelephone: this.invTelephone, //电话
        invBankname: this.invBankname, //开户银行
        invBanmaccount: this.invBanmaccount, //银行账号
        juridicPersonHandset: this.juridicPersonHandset, //手机
        // vatInvoiceFlag:this.vatInvoiceFlag//是否已开增值税发票：Y是，N否
      });
    },
    //检查
    // check(){
    //   if(!this.shopArea || !this.juridicPersonHandset || !this.currentProduct)return false;
    //   if(this.invoiceType == "电子普通发票"){
    //     if(!this.recipeTargetMb)return false;

    //   }
    //   if(this.invoiceType == "增值税专用发票"){
    //     if(!this.invAddress ||!this.invAddress ||!this.invTelephone || !this.invBankname){
    //       return false;
    //     }
    //   }
    //   return true;
    // }
  },
};
</script>

<style scoped>
.must-input {
  color: red;
}
input::-webkit-inner-spin-button,
input::-webkit-outer-spin-button {
  -webkit-appearance: none !important;
}
input[type="number"] {
  -moz-appearance: textfield;
}
input[type="checkbox"]:checked + label::before {
  content: "\2714";
  /* font-size: 180%; */
  color: #769b20;
  background-color: #e5f3cb;
}
input[type="checkbox"] + label::before {
  content: "\A0";
  font-size: 180%;
  display: inline-block;
  vertical-align: 0.2em;
  width: 0.8em;
  height: 0.8em;
  margin-right: 0.2em;
  background-color: #e5f3cb;
  text-indent: 0.15em;
  line-height: 0.65em;
  border: 1px solid #a4d041;
  position: relative;
  top: 8px;
}
input[type="checkbox"] {
  position: absolute;
  opacity: 0; /*完全透明*/
}

/*下面是整体界面的样式*/
.page {
  background-color: #ffffff;
  border-radius: 10px;
  text-align: -webkit-center;
}
.content {
  text-align: left;
  display: table-cell;
}
.filesLeft {
  margin-right: 100px;
  margin-top: 20px;
  display: inline-block;
}
.filesRight {
  vertical-align: top;
  display: inline-block;
  margin-top: 20px;
}
div {
  margin-bottom: 20px;
}
p.title {
  font-family: "微软雅黑";
  font-size: 16px;
  margin-bottom: 10px;
}

/*以下是左边的样式*/
.person img {
  height: 40px;
  float: left;
}
.cliName {
  font-size: 16px;
  margin-left: 10px;
  vertical-align: -9px;
}
p {
  margin-bottom: 10px;
}
.receipt {
  margin-bottom: 0;
}
.receipt p {
  display: inline-block;
  margin-right: 25px;
}
.inteninput,
.recinput {
  display: inline-block;
}

.taxPayer p {
  display: inline-block;
  margin-right: 40px;
}
.address p,
.telephone p {
  display: inline-block;
  margin-right: 42px;
}
.bank p,
.bankAccount p {
  display: inline-block;
  margin-right: 10px;
}
/*下面调各种按钮的样式*/
label {
  font-size: 14px;
  cursor: pointer;
}
input[type="radio"] + label::before {
  cursor: pointer;
  content: "";
  display: inline-block;
  vertical-align: middle;
  position: relative;
  top: -2px;
  font-size: 12px;
  width: 1em;
  height: 1em;
  margin-right: 0.4em;
  border-radius: 50%;
  border: 1px solid #7f7f7f;
  text-indent: 0.15em;
  padding: 0.2em;
  /*注意这里有个padding，这是为了裁切背景色的时候让内容和边框留个间隙，这样就形成了Radio的外观*/
}
input[type="radio"]:checked + label::before {
  background-color: #a7d64b;
  background-clip: content-box;
}
input[type="radio"] {
  position: absolute;
  opacity: 0; /*完全透明*/
}

.intention p {
  display: inline-block;
}
input[type="text"],
input[type="number"] {
  width: 260px;
  height: 25px;
  border: solid 1px #a0a0a0;
  padding: 0 10px;
  font-size: 14px;
  outline: none;
}
.readOnly {
  border: solid 1px #e9eeeb;
  background-color: #e9eeeb;
  height: 25px;
}
button {
  outline: none;
  cursor: pointer;
  border-radius: 10px;
  margin: 10px 30px 50px;
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
.page .el-popup-parent--hidden {
  overflow-x: hidden !important;
  overflow-y: scroll !important;
}
.page .el-button--primary {
  border-color: rgb(160, 212, 86) !important;
  background-color: rgb(160, 212, 86) !important;
}
</style>