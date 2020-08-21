 <template>
  <div class="wrapper_inner">
    <div class="scroll" ref="verifysLeap"></div>
    <div class="protocol">
      <serProtocol
        :cid="this.ccid"
        :cyear="cyear"
        :flag="1"
        :showBtn="true"
        @close="closeProtocol"
        v-if="showProtocol"
      ></serProtocol>
    </div>
    <div class="verify">
      <ser-verifys
        :cid="this.ccid"
        :year="cyear"
        :showBtn="showBtn"
        @close="close"
        v-if="showVerify"
        @updatePage="updatePage"
      ></ser-verifys>
    </div>
    <!-- 搜索栏和过滤器 -->
    <ser-search
      :list="this.showlist"
      :area="area"
      @search="search"
      @filterStatus="filterStatus"
      @filterStatus2="filterStatus2"
      @filterArea1="filterArea1"
      @filterArea2="filterArea2"
      @filterYear="filterYear"
    ></ser-search>

    <!-- 表格大标题 -->
    <p class="title">客户资料卡查询</p>
    <xieyiblock
      v-if="showBlock"
      @hiddenBlock="hiddenBlock()"
      :ccid="this.ccid"
      :cyear="this.cyear"
      :ccName="this.ccName"
      :showReject="showReject"
      @updatePage="updatePage"
    ></xieyiblock>
    <!-- 表格展示区 -->
    <!-- :data="showlist.slice((currentPage-1)*pagesize,currentPage*pagesize)" -->
    <el-table
      :data="showlist"
      stripe
      style="width: 100%"
      @row-click="rowClick"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
    >
      <el-table-column prop="CID" label="客户号" width="80"></el-table-column>
      <el-table-column prop="CNAME" label="客户名称" width="200"></el-table-column>
      <el-table-column prop="CONTRACTYEAR" label="年份" width="80"></el-table-column>
      <el-table-column prop="STATE" label="资料卡状态" :formatter="statusFormatter" width="120"></el-table-column>
      <el-table-column prop="YLCSTATE" label="协议书状态" :formatter="YLStatusFormatter" width="120"></el-table-column>
      <el-table-column label="资料文件">
        <template slot-scope="scope">
          <div class="file" :class="{'finish': scope.row.FILE_1_IDCARD}">身份证</div>
          <div class="file" :class="{'finish': scope.row.FILE_2_BUSINESSLICENSE}">营业执照</div>
          <div class="file" :class="{'finish': scope.row.FILE_3_ORGCODE}">组织结构</div>
          <div class="file" :class="{'finish': scope.row.FILE_4_GTQC}">纳税资格</div>
        </template>
      </el-table-column>
      <el-table-column label="联系人/电话" width="130">
        <template slot-scope="scope">
          <p style="font-size:14px">
            <span v-show="!scope.row.WL_AGENT_NAME">[暂无]</span>
            <span v-show="scope.row.WL_AGENT_NAME">[{{scope.row.WL_AGENT_NAME}}]</span>
          </p>
          <p style="font-size:14px">
            <span v-show="!scope.row.JURIDIC_PERSON_HANDSET">[暂无]</span>
            <span v-show="scope.row.JURIDIC_PERSON_HANDSET">[{{scope.row.JURIDIC_PERSON_HANDSET}}]</span>
          </p>
        </template>
      </el-table-column>
      <el-table-column label="区域" width="140">
        <template slot-scope="scope">
          <p>{{scope.row.SUBMARKETNAME}}</p>
        </template>
      </el-table-column>
      <el-table-column label="资料卡" width="70">
        <template slot-scope="scope">
          <el-button
            type="text"
            style="color:blue"
            @click="handleVerify(scope.row)"
            v-show="
             (scope.row.STATE == 'BUSINESSCHECKING'&&(position == 'SALEMAN_M'||position == 'SALEMAN_S'))||
             (scope.row.STATE == 'BIILDEPCHECKING'&&position == 'BILLDEP_APPROVE')"
          >审核</el-button>
          <el-button
            type="text"
            style="color:#85ca80"
            @click="handleQuery(scope.row)"
            v-show="position == 'MARKETCHECKER'
            ||position == 'VSMAPPROVEXII' 
            || position == 'BILLDEP_APPROVE'
            ||((position =='SALEMAN_M'||position == 'SALEMAN_S')
            &&(scope.row.STATE == 'APPROVED'||scope.row.STATE == 'BIILDEPCHECKING'||scope.row.STATE == 'CUSTOMERPORCESSING2'))"
          >{{scope.row.abc}}查看</el-button>
        </template>
      </el-table-column>

      <el-table-column label="协议书" width="90">
        <template slot-scope="scope">
          <el-button
            type="text"
            style="color:blue"
            @click="createCer(scope.row.ACCOUNT1_NAME,scope.row.CID,scope.row.CONTRACTYEAR,$event)"
            v-show="scope.row.STATE == 'APPROVED'&& scope.row.YLCSTATE != 'SALEMANMODIFYING'&&scope.row.YLCSTATE=='SALEMANFILLING'&&(position =='SALEMAN_M'||position == 'SALEMAN_S') "
          >创建</el-button>

          <el-button
            type="text"
            style="color:red"
            @click="createCer2(scope.row.ACCOUNT1_NAME,scope.row.CID,scope.row.CONTRACTYEAR,$event)"
            v-show="scope.row.YLCSTATE == 'SALEMANMODIFYING'&&(position =='SALEMAN_M'||position == 'SALEMAN_S')"
          >修改</el-button>

          <el-button
            type="text"
            style="color:#85ca80"
            @click="queryProtocol(scope.row)"
            v-show="(scope.row.YLCSTATE == 'CUSTOMERAFFIRM'
            ||scope.row.YLCSTATE == 'ASM_CHECKING'
            ||scope.row.YLCSTATE == 'DEP_MARKET_CHECK'
            ||scope.row.YLCSTATE == 'CSA_CHECK' 
            || scope.row.YLCSTATE == 'APPROVED')
            &&(position =='SALEMAN_M'||position == 'SALEMAN_S')"
          >查看</el-button>
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
import xieyiblock from "@/Components/server/xieyiblock";
import serVerifys from "@/Components/server/ser-verifys";
import serProtocol from "@/Components/server/ser-protocol";
import { GetCardAndContract } from "@/api/card";
export default {
  name: "table1",
  components: { serSearch, serPagination, xieyiblock, serVerifys, serProtocol },
  data() {
    return {
      pagesize: 8, //每页的数据条数,
      currentPage: 1, //当前页面所在
      total: 1, //总条数
      showlist: [], //showlist存放展示用数据
      showBlock: false, //创建协议书是否显示
      ccid: "", //当前行客户id
      cyear: "",
      ccName: "", //当前行客户名称
      showVerify: false, //控制是否展示审核界面
      showProtocol: false,
      showReject: false, //false创建，true修改
      showBtn: true, //隐藏已通过的确定/退回按钮
      position: this.$store.state.user.pos[0].position,
      cid: this.$store.state.user.data.loginName,
      loading: false, //控制加载遮罩
      area: [], //当前账号所管辖的地区，大区或片区
      find: "",
      nowarea1: "" /***从筛选子组件拿到的三个筛选条件 */,
      nowarea2: "",
      nowstatus: "",
      nowylc: "",
      selYear: this.$store.state.year,
    };
  },
  computed: {
    totalPage: function () {
      return Math.floor((this.total * 1.0) / this.pagesize) + 1;
    },
  },
  methods: {
    close() {
      this.showVerify = false;
    },
    closeProtocol(close) {
      this.showProtocol = false;
    },
    queryProtocol(row) {
      this.ccid = row.CID;
      this.cyear = row.CONTRACTYEAR;
      this.showProtocol = true;
    },
    handleQuery(row) {
      //查询资料卡
      this.$refs.verifysLeap.scrollIntoView();
      var position = this.$store.state.user.pos[0].position;
      this.ccid = row.CID;
      this.cyear = row.CONTRACTYEAR;
      this.showBtn = false;
      this.showVerify = true;
    },
    rowClick(row, column) {
      //点击每一行将信息列出来
      console.log(row);
    },
    handleVerify(row) {
      this.$refs.verifysLeap.scrollIntoView();
      var position = this.$store.state.user.pos[0].position;

      if (
        (row.STATE == "BUSINESSCHECKING" &&
          (position == "SALEMAN_M" || position == "SALEMAN_S")) || //业务员审核中，业务员
        (row.STATE == "BIILDEPCHECKING" && position == "BILLDEP_APPROVE") || //订单部审核中，订单部
        (row.STATE == "APPROVED" &&
          (position == "SALEMAN_M" ||
            position == "SALEMAN_S" ||
            position == "VSMAPPROVEXII" ||
            position == "MARKETCHECKER")) //已通过，业务员
      ) {
        //只有在资料卡状态是业务员审核中的时候才能审核资料卡\
        this.ccid = row.CID; //正确账号
        this.cyear = row.CONTRACTYEAR;
        if (
          row.STATE == "APPROVED" ||
          position == "VSMAPPROVEXII" ||
          position == "MARKETCHECKER"
        )
          this.showBtn = false;
        //如果是已通过账号，就不用展示确定退回按钮
        else this.showBtn = true;

        this.showVerify = true; //展示出审核资料卡界面
      } else {
        this.$alert("权限不吻合！");
      }
    },
    statusFormatter(row, column) {
      //状态格式化变成中文
      let status = row.STATE;
      if (status == "APPROVED") return "已通过";
      if (status == "ONCREATE") return "初始状态";
      if (status == "CUSTOMERPORCESSING") return "客户填写中";
      if (status == "CUSTOMERPORCESSING2") return "客户修改中";
      if (status == "BUSINESSCHECKING") return "业务员审核中";
      if (status == "BIILDEPCHECKING") return "订单部审核中";
      if (status == "SALEMANMODIFYING") return "协议书待修改"; //原业务员修改中
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
      // this.$axios
      //   .post("/yulan/customerInfo/getNcustomerinfo.do", {
      //     page: this.currentPage,
      //     limit: this.pagesize,
      //     year: this.selYear,
      //     state: this.nowstatus,
      //     find: this.find,
      //     area_1: this.nowarea1,
      //     area_2: this.nowarea2,
      //     cid: this.cid,
      //     position: this.position,
      //     ylcstate: this.nowylc,
      //   })
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
      })
        .then((res) => {
          this.area = res.data.area;
          this.showlist = res.data.data;
          this.total = res.count;
          this.loading = false;
        })
        .catch((err) => {
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
      let aa = "";
      if (ae != "显示全部") aa = ae;
      this.nowstatus = aa;
      this.currentPage = 1;
      this.searchAll();
    },
    filterStatus2(ae) {
      //状态筛选功能
      let aa = "";
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
    },
    hiddenBlock() {
      //控制创建协议书是否显示
      this.showBlock = false;
    },
    createCer(name, id, year, e) {
      var evt = window.event || e;
      if (this.position == "SALEMAN_M" || this.position == "SALEMAN_S") {
        evt.stopPropagation();
        this.showBlock = true;
        this.ccid = id;
        this.cyear = year;
        this.ccName = name;
      } else {
        this.$alert("权限不吻合");
      }
    },
    createCer2(name, id, year, e) {
      var evt = window.event || e;
      if (this.position == "SALEMAN_M" || this.position == "SALEMAN_S") {
        evt.stopPropagation();
        this.showBlock = true;
        this.ccid = id;
        this.cyear = year;
        this.ccName = name;
        this.showReject = true;
      } else {
        this.$alert("权限不吻合");
      }
    },
  },
  mounted() {
    var me = this;
    window.onkeydown = (event) => {
      if (event.keyCode == 27) {
        if (me.showVerify) me.close();
        if (me.showBlock) me.hiddenBlock();
        if (me.showProtocol) me.closeProtocol();
      }
    };
    this.searchAll();
  },
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
.file {
  width: 75px;
  height: 25px;
  display: inline-block;
  border-radius: 8px;
  text-align: center;
  background-color: white;
  color: grey;
  font-size: 14px;
  padding: 1px 1px;
  margin: 1px 1px;
}
.file.finish {
  background-image: linear-gradient(74deg, #a7d64b 1%, #82c985 100%),
    linear-gradient(#ffffff, #ffffff);
  color: white;
}
.pagination {
  display: flex;
  flex-direction: row;
  float: right;
  padding-top: 15px;
  vertical-align: middle;
}
.pagination-button {
  width: 50px;
  height: 28px;
  line-height: 28px;
  border-radius: 5px;
  cursor: pointer;
  color: #ffffff;
  text-align: center;
  background: linear-gradient(to right, #a1d455, #86cb7e);
  margin-top: 1px;
  margin: 0 5px;
}
.number {
  padding: 3px;
}
.next,
.prev {
  width: 66px;
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