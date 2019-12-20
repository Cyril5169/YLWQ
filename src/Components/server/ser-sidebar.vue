<template>
  <div class="wrapper">
    <div class="wangqian" @click="show3=!show3">
      <img src="../../assets/images/wangqian.png" alt="签订年度协议" />
      <p>签订年度协议</p>
    </div>

    <el-collapse-transition>
      <div v-show="show3">
        <!-- <router-link
          tag="li"
          v-for="(item,index) of items"
          :key="index"
          :to="item.router"
          @click="handleRouter(item)"
          style="cursor:pointer;"
        >
          <p>{{item.desc}}</p>
        </router-link>-->
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
  name: "ser-header",
  data() {
    return {
      show3: true,
      isActive: true,
      items: [
        {
          desc: "资料卡查询",
          router: "/server/card-gather"
        },
        {
          desc: "待审核协议",
          router: "/server/pending-protocol"
        },
        {
          desc: "审核过的协议",
          router: "/server/pended-protocol"
        },
        {
          desc: "资料卡执行汇总",
          router: "/server/card-exe-gather"
        },
        {
          desc: "协议执行汇总",
          router: "/server/cert-exe-gather"
        }
      ]
    };
  },
  methods: {
    handleRouter(item, index) {
      this.$store.commit("setCurrentUrl", index);
      if (window.location.href.split("#")[1] != item.router) {
        this.$router.push({ path: item.router });
      }
    }
  },
  computed: {
    ...mapState(["currentUrl"])
  },
  mounted() {
    let position = this.$store.state.user.pos[0].position; //根据权限限制功能按键
    if (
      position == "SALEMAN_M" ||
      position == "SALEMAN_S" ||
      position == "BILLDEP_APPROVE"
    )
      this.items = this.items.slice(0, 1);
    else if (position == "VSMAPPROVEXII") this.items = this.items.slice(0, 5);
    else this.items = this.items.slice(0, 3);
  }
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
  /* margin-left: 20px; */
  /* transform: translateX(-20px); */
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