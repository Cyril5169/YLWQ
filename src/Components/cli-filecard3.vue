<template>
  <div class="page">
    <div class="content">
      <div class="filesLeft">
        <div class="contact">
          <p class="title">联系人</p>
          <input type="text" class="readOnly" readonly="contact" v-model="cardobj.wlAgentName" />
        </div>
        <div class="mobilephone">
          <p class="title">物流手机</p>
          <input type="text" class="readOnly" readonly="mobilephone" v-model="cardobj.xHandset" />
        </div>
        <div class="delivery">
          <p class="title">收货地址</p>
          <!-- <input type="text" class="readOnly" readonly="" v-model="cardobj.xDeliveryAdress"> -->
          <div class="longAddress readOnly">{{cardobj.xDeliveryAdress}}</div>
        </div>
      </div>
      <div class="filesRight">
        <div class="telephone">
          <p class="title">电话</p>
          <input type="text" class="readOnly" readonly="phone" v-model="cardobj.xOfficeTel1" />
        </div>
        <div class="fax">
          <p class="title">传真</p>
          <input type="text" name="faxWl" v-model="faxWl" :readOnly="only" :class="{readOnly:only}" />
        </div>
        <div class="emailAddress">
          <p class="title">邮编</p>
          <input
            type="text"
            name="zipCodeWl"
            v-model="zipCodeWl"
            :readOnly="only"
            :class="{readOnly:only}"
          />
        </div>
      </div>
    </div>
    <div class="button">
      <button @click="back">上一步</button>
      <button @click="next">下一步</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "cli-filecard3",
  props: {
    cardobj: Object,
    only: Boolean
  },
  data() {
    return {
      faxWl: "",
      zipCodeWl: ""
    };
  },
  methods: {
    back() {
      this.$emit("bridgepre");
    },
    next() {
      this.$emit("bridgenext");
      this.$emit("mergeMessage", {
        faxWl: this.faxWl,
        zipCodeWl: this.zipCodeWl
      });
    }
  },
  watch: {
    cardobj() {
      this.faxWl = this.cardobj.faxWl;
      this.zipCodeWl = this.cardobj.zipCodeWl;
    }
  }
};
</script>

<style scoped>
.longAddress {
  width: 260px;
  line-height: 25px;
  border: solid 1px rgb(160 160 160) !important;
  padding: 0 10px;
  font-size: 14px;
}
.page {
  background-color: #ffffff;
  border-radius: 10px;
  height: 500px;
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
p {
  margin-bottom: 10px;
}
p.title {
  font-family: "微软雅黑";
  font-size: 16px;
}
input[type="text"] {
  width: 260px;
  height: 25px;
  border: solid 1px #a0a0a0;
  padding: 0 10px;
  font-size: 14px;
  outline: none;
  margin-bottom: 20px;
}
.readOnly {
  border: solid 1px #e9eeeb;
  background-color: #e9eeeb;
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
