<template>
  <div class="wrapper">
    <div class="wangqian" @click="show3=!show3">
      <img src="../../assets/images/wangqian.png" alt="签订年度协议" />
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
import { QueryWebMenuByUserId } from "@/api/card";

export default {
  name: "ser-header",
  data() {
    return {
      show3: true,
      isActive: true,
      items: [],
      item0: [
        {
          desc: "资料卡审核",
          router: "/server/card-gather",
        },
        {
          desc: "待审核协议",
          router: "/server/pending-protocol",
        },
        {
          desc: "审核过的协议",
          router: "/server/pended-protocol",
        },
      ],
      item1: [
        {
          desc: "资料卡审核",
          router: "/server/card-gather",
        },
      ],
      item2: [
        {
          desc: "资料卡审核",
          router: "/server/card-gather",
        },
        {
          desc: "待审核协议",
          router: "/server/pending-protocol",
        },
        {
          desc: "审核过的协议",
          router: "/server/pended-protocol",
        },
      ],
      item3: [
        {
          desc: "未抽查",
          router: "/server/spotCheck",
        },
        {
          desc: "已抽查未通过",
          router: "/server/spotCheckNoPass",
        },
        {
          desc: "已抽查已通过",
          router: "/server/spotCheckPass",
        },
      ],
      item4: [
        {
          desc: "资料卡协议书综合查询",
          router: "/server/comprehensiveQuery",
        },
        {
          desc: "资料卡执行汇总",
          router: "/server/card-exe-gather",
        },
        {
          desc: "协议执行汇总",
          router: "/server/cert-exe-gather",
        },
      ],
    };
  },
  methods: {
    handleRouter(item, index) {
      this.$store.commit("setCurrentUrl", index);
      if (window.location.href.split("#")[1] != item.router) {
        this.$router.push({ path: item.router });
      }
    },
  },
  computed: {
    ...mapState(["currentUrl"]),
  },
  mounted() {
    let position = this.$store.state.user.pos[0].position; //根据权限限制功能按键
    if (
      position == "SALEMAN_M" ||
      position == "SALEMAN_S" ||
      position == "BILLDEP_APPROVE"
    ) {
      this.items = this.item1; //业务经理，办事处经理，订单部
    } else if (position == "VSMAPPROVEXII") {
      this.items = this.item2; //销售总监
    } else if (position == "LEGALCHECK") {
      this.items = this.item3; //法务员
    } else {
      this.items = this.item0; //其他
    }
    QueryWebMenuByUserId({
      userid: this.$store.state.user.data.userId,
    }).then((res) => {
      if (res.data.children.length > 0) {
        for (var i = 0; i < this.item4.length; i++) {
          var contain = res.data.children.filter(
            (item) => item.MENU_LINK == this.item4[i].router
          );
          if (contain.length > 0) {
            //有权限
            this.item4[i].desc = contain[0].MENU_NAME;
            this.items.push(this.item4[i]);
          }
        }
      }
      if (
        window.location.href.split("#")[1] != this.items[this.currentUrl].router
      ) {
        this.$router.push({ path: this.items[this.currentUrl].router });
      }
    });
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