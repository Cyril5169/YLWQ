 <template>
  <div class="wrapper_inner">
    <div class="scroll" ref="verifysLeap"></div>
    <div class="protocol">
      <serProtocol
        :cid="this.ccid"
        :cyear="cyear"
        :flag="1"
        :showBtn="showBtn"
        :showExport="true"
        :checkBtn="checkBtn"
        @close="closeProtocol"
        v-if="showProtocol"
      ></serProtocol>
    </div>
    <div class="verify">
      <ser-verifys
        :cid="this.ccid"
        :year="cyear"
        :showBtn="showBtn"
        :checkBtn="checkBtn"
        @close="close"
        v-if="showVerify"
        @updatePage="updatePage"
      ></ser-verifys>
    </div>
    <!-- 搜索栏和过滤器 -->
    <ser-search
      :list="this.showlist"
      :flag="true"
      :xyflag="true"
      :area="area"
      @search="search"
      @filterStatus="filterStatus"
      @filterStatus2="filterStatus2"
      @filterArea1="filterArea1"
      @filterArea2="filterArea2"
      @filterYear="filterYear"
    ></ser-search>

    <!-- 表格大标题 -->
    <p class="title">资料卡及协议书综合查询</p>
    <!-- 表格展示区 -->
    <el-table
      :data="showlist"
      stripe
      style="width: 100%"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
    >
      <el-table-column prop="CID" label="客户号" width="80"></el-table-column>
      <el-table-column prop="CNAME" label="客户名称" width="310"></el-table-column>
      <el-table-column prop="CONTRACTYEAR" label="年份" width="120"></el-table-column>
      <el-table-column prop="STATE" label="资料卡状态" :formatter="statusFormatter" width="150"></el-table-column>
      <el-table-column prop="YLCSTATE" label="协议书状态" :formatter="YLStatusFormatter" width="150"></el-table-column>
      <el-table-column label="所属办事处">
        <template slot-scope="scope">
          <p>{{scope.row.MARKETNAME}} - {{scope.row.SUBMARKETNAME}}</p>
        </template>
      </el-table-column>
      <el-table-column label="资料卡" width="80">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="large"
            style="color:#85ca80"
            @click="handleVerify(scope.row)"
          >查看</el-button>
        </template>
      </el-table-column>
      <el-table-column label="协议书" width="100">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="large"
            style="color:#85ca80"
            @click="queryProtocol(scope.row)"
            v-if="scope.row.YLCSTATE != 'SALEMANFILLING'"
          >查看</el-button>
          <span v-else>暂无协议</span>
        </template>
      </el-table-column>
    </el-table>

    <!-- 翻页功能 -->
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
import serVerifys from "@/Components/server/ser-verifys";
import serProtocol from "@/Components/server/ser-protocol";
import { GetCardAndContract } from "@/api/card";
export default {
  name: "table1",
  components: { serSearch, serPagination, serVerifys, serProtocol },
  data() {
    return {
      pagesize: 10, //每页的数据条数,
      currentPage: 1, //当前页面所在
      total: 1, //总条数，created时被赋值为后台传输的总条数
      showlist: [], //showlist存放展示用数据
      ccid: "", //当前行客户id
      cyear: "",
      showVerify: false, //控制是否展示审核界面
      showProtocol: false,
      showBtn: false, //隐藏已通过的确定/退回按钮
      checkBtn: false,
      position: this.$store.state.user.pos[0].position,
      cid: this.$store.state.user.data.loginName,
      loading: false, //控制加载遮罩
      area: [], //当前账号所管辖的地区，大区或片区
      find: "",
      nowarea1: "" /***从筛选子组件拿到的三个筛选条件 */,
      nowarea2: "",
      nowstatus: "",
      nowylc: "",
      selYear: this.$store.state.year
    };
  },
  computed: {
    totalPage: function() {
      return Math.floor((this.total * 1.0) / this.pagesize) + 1;
    }
  },
  methods: {
    close() {
      this.showVerify = false;
    },
    closeProtocol(close) {
      this.showProtocol = false;
    },
    queryProtocol(row) {
      var position = this.$store.state.user.pos[0].position;
      this.ccid = row.CID;
      this.cyear = row.CONTRACTYEAR;
      this.showProtocol = true;
    },
    handleVerify(row) {
      this.$refs.verifysLeap.scrollIntoView();
      var position = this.$store.state.user.pos[0].position;
      this.ccid = row.CID;
      this.cyear = row.CONTRACTYEAR;
      this.showVerify = true;
    },
    statusFormatter(row, column) {
      //状态格式化变成中文
      let status = row.STATE;
      if (status == "ONCREATE") return "初始状态";
      if (status == "CUSTOMERPORCESSING") return "客户填写中";
      if (status == "CUSTOMERPORCESSING2") return "客户修改中";
      if (status == "BUSINESSCHECKING") return "业务员审核中";
      if (status == "BIILDEPCHECKING") return "订单部审核中";
      if (status == "SALEMANMODIFYING") return "协议书待修改"; //原业务员修改中
      if (status == "APPROVED") return "已通过";
    },
    YLStatusFormatter(row, column) {
      //状态格式化变成中文
      let status = row.YLCSTATE;
      if (status == "SALEMANFILLING") return "业务员填写中";
      if (status == "SALEMANMODIFYING") return "业务员修改中";
      if (status == "CUSTOMERAFFIRM") return "客户确认中";
      if (status == "ASM_CHECKING") return "中心总经理审核中";
      if (status == "DEP_MARKET_CHECK") return "市场部审核中";
      if (status == "CSA_CHECK") return "销售副总批准中";
      if (status == "APPROVED") return "已通过";
      if (status == "ONCREATE") return "初始状态";
      if (status == "" || status == null) return "未知状态";
    },
    changeCurrentPage(data) {
      /**改变页数 */
      this.currentPage = data;
      this.searchAll();
    },
    /*子组件通过或退回资料卡，更新当前页*/
    updatePage() {
      this.searchAll();
    },
    searchAll() {
      this.loading = true;
      this.showlist = [];
      GetCardAndContract({
        page: this.currentPage,
        limit: this.pagesize,
        year: this.selYear,
        state: this.nowstatus,
        find: this.find,
        area_1: this.nowarea1,
        area_2: this.nowarea2,
        cid: this.cid,
        position: this.position,
        ylcstate: this.nowylc,
        spotCheckState: "",
        area: "N"
      })
        .then(res => {
          if (res.data != null) {
            this.showlist = res.data.data;
            this.total = res.count;
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
    filterStatus(ae) {
      //状态筛选功能
      let aa = ""
      if (ae != "显示全部") aa = ae;
      this.nowstatus = aa;
      this.currentPage = 1;
      this.searchAll();
    },
    filterStatus2(ae) {
      //状态筛选功能
      let aa = ""
      if (ae != "显示全部") aa = ae;
      this.nowylc = aa;
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
      if (ae == "显示全部") ae = "";
      this.nowarea2 = ae;
      //this.nowarea1 = "";
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
        if (me.showVerify) me.close();
        if (me.showProtocol) me.closeProtocol();
      }
    };
    this.loading = true;
    GetCardAndContract({
      page: this.currentPage,
      limit: this.pagesize,
      year: this.selYear,
      state: "",
      find: "",
      area_1: "",
      area_2: "",
      cid: this.cid,
      position: this.position,
      ylcstate: "",
      spotCheckState: "",
      area: "Y"
    })
      .then(res => {
        if (res.data != null) {
          if (Array.isArray(res.data.area)) {
            this.area = res.data.area;
          }
          this.showlist = res.data.data;
          this.total = res.count;
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
.protocol {
  width: 80%;
  overflow: hidden;
  position: absolute;
  top: -20px;
  left: 10%;
  z-index: 100;
}
.scroll {
  width: 10px;
  height: 10px;
  background-color: red;
  position: absolute;
  top: -150px;
}
.title {
  text-align: center;
  font-size: 20px;
  margin-bottom: 20px;
}
.verify {
  width: 80%;
  overflow: hidden;
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