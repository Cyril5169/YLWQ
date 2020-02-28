<template>
  <div class="wrapper_inner">
    <div class="scroll" ref="verifysLeap"></div>
    <div class="protocol">
      <serProtocol
        :cid="this.ccid"
        :cyear="this.cyear"
        :flag="0"
        :showBtn="true"
        @close="close"
        @updatePage="updatePage"
        v-if="showProtocol"
      ></serProtocol>
    </div>
    <ser-search
      :list="this.showlist"
      :flag="false"
      :area="area"
      @search="search"
      @filterArea1="filterArea1"
      @filterArea2="filterArea2"
      @filterYear="filterYear"
    ></ser-search>
    <p class="title">待审核协议</p>
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
      <el-table-column prop="CNAME" label="客户名称"></el-table-column>
      <el-table-column prop="STATE" label="协议书状态" :formatter="statusFormatter" width="150"></el-table-column>
      <el-table-column label="协议" width="200">
        <template slot-scope="scope">
          <p style="font-size:14px">{{scope.row.MARKETNAME}}[{{scope.row.MARKETMANAGERNAME}}]</p>
          <p
            style="font-size:14px;color:#409EFF"
          >{{scope.row.SUBMARKETNAME}}[{{scope.row.SUBMARKETMANAGERNAME}}]</p>
        </template>
      </el-table-column>

      <el-table-column prop label="协议名称" width="250">
        <template slot-scope="scope">
          <p>{{scope.row.none}}玉兰墙纸年度经销协议书-{{scope.row.CYEAR}}</p>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button type="text" size="large" @click="verify(scope.row)">{{scope.row.none}}审核</el-button>
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
      cyear: "",
      showProtocol: false,
      position: this.$store.state.user.pos[0].position,
      cid: this.$store.state.user.data.loginName,
      area: [], //当前账号所管辖的地区，大区或片区
      find: "",
      nowarea1: "" /***从筛选子组件拿到的三个筛选条件 */,
      nowarea2: "",
      selYear: this.$store.state.year,
      loading: false
    };
  },
  computed: {
    totalPage: function() {
      return Math.floor((this.total * 1.0) / this.pagesize) + 1;
    }
  },
  methods: {
    verify(row) {
      this.$refs.verifysLeap.scrollIntoView();
      this.showProtocol = true;
      this.cyear = row.CYEAR;
      this.ccid = row.CID;
    },
    close(close) {
      this.showProtocol = false;
    },
    rowClick(row, event, column) {
      //点击行将CID传递
      //this.ccid = row.CID;
    },
    statusFormatter(row, column) {
      //状态格式化变成中文
      let status = row.STATE;
      if (status == "APPROVED") return "生效";
      if (status == "ASM_CHECKING") return "中心总经理审核中";
      if (status == "BIILDEPCHECKING") return "订单部审核中";
      if (status == "CSA_CHECK") return "销售副总批准中";
      if (status == "CUSTOMERAFFIRM") return "客户确认中";
      if (status == "DEP_MARKET_CHECK") return "市场部审核中";
      if (status == "SALEMANFILLING") return "业务员填写中";
      if (status == "SALEMANMODIFYING") return "业务员修改中";
    },
    updatePage() {
      this.currentPage = 1;
      this.searchAll();
    },
    changeCurrentPage(data) {
      /**改变页数 */
      this.currentPage = data;
      this.searchAll();
    },
    searchAll() {
      this.loading = true;
      this.$axios
        .post("/yulan/YLcontractentry/getYlcsbysigned.do", {
          limit: this.pagesize,
          page: this.currentPage,
          year: this.selYear,
          area_1: this.nowarea1,
          area_2: this.nowarea2,
          find: this.find,
          need: "checking",
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
      //客户搜索功能
      this.find = ae;
      this.currentPage = 1;
      this.searchAll();
    },
    filterArea1(ae) {
      //一级地区筛选功能
      if (ae == "显示全部") ae = "";
      this.nowarea1 = ae;
      this.nowarea2 = "";
      this.currentPage = 1;
      this.searchAll();
    },
    filterArea2(ae) {
      //二级地区筛选功能
      if (ae == "全部") ae = "";
      this.nowarea2 = ae;
      this.currentPage = 1;
      this.searchAll();
    },
    filterYear(year) {
      this.selYear = year;
      this.currentPage = 1;
      this.searchAll();
    }
  },
  mounted() {
    var me = this;
    window.onkeydown = event => {
      if (event.keyCode == 27) {
        if (me.showProtocol) me.close();
      }
    };
    this.loading = true;
    this.$axios
      .post("/yulan/YLcontractentry/getYlcsbysigned.do", {
        limit: this.pagesize,
        page: "1",
        year: this.selYear,
        area_1: "",
        area_2: "",
        find: "",
        need: "checking",
        cid: this.cid,
        position: this.position
      })
      .then(res => {
        if (res.data != null && res.data.code == 0) {
          if (Array.isArray(res.data.area)) {
            this.area = res.data.area;
          }
          this.showlist = res.data.data;
          console.log(this.showlist)
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