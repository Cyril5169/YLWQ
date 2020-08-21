<template>
  <div class="wrapper">
    <div class="wangqian" @click="show3=!show3">
      <img src="../assets/images/wangqian.png" alt="签订年度协议" />
      <p>签订年度协议</p>
    </div>

    <el-collapse-transition>
      <div v-show="show3">
        <li
          v-for="(item,index) of items"
          :key="index"
          @click="handleRouter(item,index)"
          v-bind:class="{ currentPage:index==currentUrl}"
          style="cursor:pointer;"
        >
          <p>{{item.desc}}</p>
        </li>
      </div>
    </el-collapse-transition>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "cli-sidebar",
  data() {
    return {
      show3: true,
      isActive: true,
      items: [
        {
          desc: "网络订单交易提示",
          router: "/client/tip",
        },
        {
          desc: "客户资料卡",
          router: "/client/cards",
        },
        {
          desc: "玉兰墙纸经销协议书",
          router: "/client/protocol",
        },
        {
          desc: "授权书(支持另存为)",
          router: "/client/certificate",
        },
      ],
    };
  },
  computed: {
    ...mapState(["currentUrl"]),
  },
  methods: {
    handleRouter(item, index) {
      if (this.$store.state.user.data.userState == "1") {
        this.$store.commit("setCurrentUrl", index);
        if (window.location.href.split("#")[1] != item.router) {
          this.$router.push({ path: item.router });
        }
      }
      if (this.$store.state.user.data.userState != "1") {
        if (this.items.indexOf(item) == 1) {
          this.$message({
            showClose: true,
            message:
              "如您未勾选[我已知悉上述条款...],系统将不显示相关资料卡文本！",
            type: "error",
          });
        } else if (this.items.indexOf(item) == 2) {
          this.$message({
            showClose: true,
            message:
              "如您未勾选[我已知悉上述条款...],系统将不显示相关协议书文本！",
            type: "error",
          });
        } else if (this.items.indexOf(item) == 3) {
          this.$message({
            showClose: true,
            message:
              "如您未勾选[我已知悉上述条款...],系统将不显示相关授权书文本！",
            type: "error",
          });
        }
      }
    },
  },
  mounted() {
    if (this.$store.state.user.data.userState == "1") {
      this.$store.commit("setCurrentUrl", 1);
      if (window.location.href.split("#")[1] != "/client/cards")
        this.$router.replace({ path: "/client/cards" });
    }
  },
};
</script>

<style scoped>
.wrapper {
  width: 100%;
  height: 100%;
  position: relative;
}
.space {
  height: 55px;
  width: 100%;
}
.wangqian {
  cursor: pointer;
}
.wangqian img {
  display: inline-block;
  width: 25px;
  height: 31px;
  transform: translateX(-15px);
}
.wangqian p {
  display: inline-block;
  font-size: 18px;
  color: white;
}
.wangqian {
  width: 100%;
  height: 63px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(74deg, #a7d64b 1%, #82c985 100%),
    linear-gradient(#a5d050, #a5d050);
}
ul {
  width: 100%;
}
li {
  width: 100%;
  height: 63px;
  display: flex;
  align-items: center;
  background-color: #474646;
  position: relative;
}
li:hover {
  background-color: #151515;
}

li p {
  margin-left: 20px;
  font-size: 16px;
  line-height: 16px;
  color: white;
}
.currentPage {
  background-color: #151515;
}
.currentPage p::before {
  content: "";
  position: absolute;
  width: 4px;
  height: 40px;
  background-color: #a5d050;
  top: 11px;
  left: 8px;
  border-radius: 2px;
}
.router-link-exact-active {
  background-color: #151515;
}
.router-link-exact-active p::before {
  content: "";
  position: absolute;
  width: 4px;
  height: 40px;
  background-color: #a5d050;
  top: 11px;
  left: 8px;
  border-radius: 2px;
}
</style>