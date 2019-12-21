<template>
  <div class="wrapper_inner">
    <div class="scroll" ref="verifysLeap"></div>
    <div class="protocol">
      <serProtocol :cid="this.ccid" :flag="1" @close="close" v-show="showProtocol"></serProtocol>
    </div>
    <ser-search
      :list="this.showlist"
      :flag="false"
      :area="area"
      @search="search"
      @filterArea1="filterArea1"
      @filterArea2="filterArea2"
    ></ser-search>

    <p class="title">审核过的协议</p>
    <el-table
      :data="showlist"
      stripe
      highlight-current-row
      style="width: 100%"
      @row-click="rowClick"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
    >
      <el-table-column prop="CID" label="客户号" width="80"></el-table-column>
      <el-table-column prop="CNAME" label="客户名称" width="330"></el-table-column>
      <el-table-column label="协议" width="160">
        <template slot-scope="scope">
          <p style="font-size:14px">{{scope.row.MARKETNAME}}[{{scope.row.MARKETMANAGERNAME}}]</p>
          <p
            style="font-size:14px;color:#409EFF"
          >{{scope.row.SUBMARKETNAME}}[{{scope.row.SUBMARKETMANAGERNAME}}]</p>
        </template>
      </el-table-column>
      <el-table-column prop label="协议" width="225">
        <template slot-scope="scope">
          <p style="font-size:14px">{{scope.row.none}}玉兰墙纸年度经销协议书-2019</p>
        </template>
      </el-table-column>
      <el-table-column prop label="协议状态" width="65">
        <template slot-scope="scope">
          <p style="font-size:14px;color:#409EFF">{{scope.row.none}}已通过</p>
        </template>
      </el-table-column>
      <el-table-column prop="MARKET" label="市场部审批" width="100"></el-table-column>
      <el-table-column prop="CSA" label="营销总监审批"></el-table-column>
      <el-table-column label="操作" width="60">
        <template slot-scope="scope">
          <el-button type="text" size="large" @click="verify">{{scope.row.none}}查看</el-button>
        </template>
      </el-table-column>
    </el-table>

    <ser-pagination
      :currentPage="this.currentPage"
      :total="total"
      :totalPage="totalPage"
      @bridge1="changeCurrentPage"
      @bridge2="changeCurrentPage"
      @bridge3="changeCurrentPage"
      @bridge4="changeCurrentPage"
    ></ser-pagination>
  </div>
</template>


<script>
import serSearch from "@/Components/server/ser-search";
import serPagination from "@/Components/server/ser-pagination";
import serProtocol from "@/Components/server/ser-protocol";
export default {
  name: "table2",
  components: { serSearch, serPagination, serProtocol },
  data() {
    return {
      pagesize: 10, //每页的数据条数,
      currentPage: 1, //当前页面所在
      total: 1, //总条数，created时被赋值为后台传输的总条数
      showlist: [], //showlist存放展示用数据
      ccid: "",
      showProtocol: false,
      position: this.$store.state.user.pos[0].position,
      cid: this.$store.state.user.data.loginName,

      area: [], //当前账号所管辖的地区，大区或片区

      nowarea1: "" /***从筛选子组件拿到的三个筛选条件 */,
      nowarea2: "",
      loading: false
    };
  },
  computed: {
    totalPage: function() {
      return Math.floor((this.total * 1.0) / this.pagesize) + 1;
    }
  },
  methods: {
    verify() {
      this.$refs.verifysLeap.scrollIntoView();
      this.showProtocol = true;
    },
    close(close) {
      this.showProtocol = false;
    },
    rowClick(row, event, column) {
      //点击行将CID传递
      this.ccid = row.CID;
    },
    changeCurrentPage(data) {
      this.loading = true;
      /**改变页数 */
      this.currentPage = data;
      this.$axios
        .post("/yulan/YLcontractentry/getYlcsbysigned.do", {
          limit: "10",
          page: this.currentPage,
          year: this.$store.state.year,
          // area_1: "",
          // area_2: "",
          area_1: this.nowarea1,
          area_2: this.nowarea2,
          find: "",
          need: "checkover",
          cid: this.cid,
          position: this.position
        })
        .then(res => {
          if (res.data != null && res.data.code == 0) {
            this.showlist = res.data.data;
            this.total = res.data.count;
            this.loading = false;
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    search(ae) {
      this.loading = true;
      //客户搜索功能
      this.$axios
        .post("/yulan/YLcontractentry/getYlcsbysigned.do", {
          limit: "10",
          page: this.currentPage,
          year: this.$store.state.year,
          area_1: "",
          area_2: "",
          find: ae,
          need: "checkover",
          cid: this.cid,
          position: this.position
        })
        .then(res => {
          if (res.data != null && res.data.code == 0) {
            this.showlist = res.data.data;
            this.total = res.data.count;
            this.loading = false;
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    filterArea1(ae) {
      this.loading = true;
      //一级地区筛选功能
      if (ae == "显示全部") ae = "";
      this.nowarea1 = ae;
      this.$axios
        .post("/yulan/YLcontractentry/getYlcsbysigned.do", {
          limit: "10",
          page: this.currentPage,
          year: this.$store.state.year,
          area_1: ae,
          area_2: "",
          find: "",
          need: "checkover",
          cid: this.cid,
          position: this.position
        })
        .then(res => {
          if (res.data != null && res.data.code == 0) {
            this.showlist = res.data.data;
            this.total = res.data.count;
            this.loading = false;
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    filterArea2(ae) {
      this.loading = true;
      //二级地区筛选功能
      if (ae == "全部") ae = "";
      this.nowarea2 = ae;
      this.$axios
        .post("/yulan/YLcontractentry/getYlcsbysigned.do", {
          limit: "10",
          page: this.currentPage,
          year: this.$store.state.year,
          area_1: "",
          area_2: ae,
          find: "",
          need: "checkover",
          cid: this.cid,
          position: this.position
        })
        .then(res => {
          if (res.data != null && res.data.code == 0) {
            this.showlist = res.data.data;
            this.total = res.data.count;
            this.loading = false;
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  },
  mounted() {
    this.loading = true;
    this.$axios
      .post("/yulan/YLcontractentry/getYlcsbysigned.do", {
        limit: "10",
        page: "1",
        year: this.$store.state.year,
        area_1: "",
        area_2: "",
        find: "",
        need: "checkover",
        cid: this.cid,
        position: this.position
      })
      .then(res => {
        if (res.data != null && res.data.code == 0) {
          if (Array.isArray(res.data.area)) {
            this.area = res.data.area;
          }
          this.showlist = res.data.data;
          this.total = res.data.count;
          this.loading = false;
        }
      })
      .catch(function(err) {
        console.log(err);
      });
  }
};
</script>

<style scoped>
.title {
  text-align: center;
  font-size: 20px;
  margin-bottom: 20px;
}
.scroll {
  width: 10px;
  height: 10px;
  background-color: red;
  position: absolute;
  top: -150px;
}
.protocol {
  width: 80%;
  widows: 655px;
  position: absolute;
  top: -20px;
  left: 10%;
  z-index: 100;
}
</style>

<style>
table {
  font-size: 16px;
}
.el-table__row--striped td {
  /*偶数栏背景颜色*/
  background-color: #edfdf0 !important;
}
tr th {
  background-color: #e9efea !important;
  font-weight: normal;
  font-size: 16px;
  color: #000000;
  text-align: center !important;
}
td {
  text-align: center !important;
}
</style>