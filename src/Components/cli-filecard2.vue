<template>
  <div class="page">
    <div class="content">
      <div class="filesLeft">
        <div class="content-wrapper">
          <p class="title">联系人</p>
          <input type="text" readonly="contacts" class="readOnly" v-model="cardobj.txAgentName" />
        </div>
        <div class="content-wrapper">
          <p class="title">手机</p>
          <input type="text" readonly="phone" class="readOnly" v-model="cardobj.xHandset2" />
        </div>
        <div class="content-wrapper">
          <p class="title">QQ</p>
          <input type="text" v-model="qq" :readOnly="only" :class="{readOnly:only}" />
        </div>
        <div class="content-wrapper">
          <p class="title">通讯地址</p>
          <!-- <input type="text" readonly="address" class="readOnly" v-model="cardobj.xPostAddress"> -->
          <div class="readOnly longAddress">{{cardobj.xPostAddress}}</div>
        </div>
      </div>
      <div class="filesRight">
        <div class="content-wrapper">
          <p class="title">电话</p>
          <input
            type="text"
            name="phone"
            readonly="phone"
            class="readOnly"
            v-model="cardobj.xOfficeTel"
          />
        </div>
        <div class="content-wrapper">
          <p class="title">传真</p>
          <input type="text" name="xFax" v-model="xFax" :readOnly="only" :class="{readOnly:only}" />
        </div>
        <div class="content-wrapper">
          <p class="title">E-mail</p>
          <input
            type="text"
            name="xEmail"
            v-model="xEmail"
            :readOnly="only"
            :class="{readOnly:only}"
          />
        </div>
        <div class="content-wrapper">
          <p class="title">邮编</p>
          <input
            type="text"
            name="xZipCpde"
            v-model="xZipCode"
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
  name: "cli-filecard2",
  props: {
    cardobj: Object,
    only: Boolean
  },
  data() {
    return {
      qq: "",
      xFax: "",
      xEmail: "",
      xZipCode: ""
    };
  },
  methods: {
    back() {
      this.$emit("bridgepre");
    },
    next() {
      this.$emit("bridgenext");
      this.$emit("mergeMessage", {
        qq: this.qq,
        xFax: this.xFax,
        xEmail: this.xEmail,
        xZipCode: this.xZipCode
      });
    }
  },
  watch: {
    cardobj() {
      (this.qq = this.cardobj.qq),
        (this.xFax = this.cardobj.xFax),
        (this.xEmail = this.cardobj.xEmail),
        (this.xZipCode = this.cardobj.xZipCode);
    }
  }
};
</script>

<style scoped>
/*对那些地址比较长的不写input写成div了才够显示*/
.longAddress {
  width: 260px;
  line-height: 25px;
  border: solid 1px rgb(160, 160, 160) !important;
  padding: 0 10px;
  font-size: 14px;
}
.page {
  background-color: #ffffff;
  border-radius: 10px;
  text-align: -webkit-center;
}
.content {
  text-align: left;
  display: table-cell;
}
.content-wrapper {
  margin-bottom: 20px;
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

