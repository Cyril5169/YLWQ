 <template>
  <div class="wrapper">
    <div class="scroll" ref="verifysLeap"></div>
    <div class="protocol">
      <serProtocol :cid="this.ccid" :flag="1" @close="closeProtocol" v-show="showProtocol"></serProtocol>
    </div>
    <div class="verify">
      <ser-verifys
        :cid="this.ccid"
        :showBtn="showBtn"
        @close="close"
        v-show="showVerify"
        @updatePage="updatePage"
      ></ser-verifys>
    </div>
    <!-- 搜索栏和过滤器 -->
    <ser-search
      :list="this.showlist"
      :flag="true"
      :area="area"
      @search="search"
      @filterStatus="filterStatus"
      @filterArea1="filterArea1"
      @filterArea2="filterArea2"
    ></ser-search>

    <!-- 表格大标题 -->
    <p class="title">2019客户资料卡查询</p>
    <xieyiblock
      v-show="showBlock"
      @hiddenBlock="hiddenBlock()"
      :ccid="this.ccid"
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
      <el-table-column prop="CNAME" label="客户名称" width="265"></el-table-column>
      <el-table-column prop="STATE" label="资料卡状态" :formatter="statusFormatter" width="120"></el-table-column>
      <el-table-column label="资料文件" :width="185">
        <template slot-scope="scope">
          <div class="file finish" v-show="scope.row.FILE_1_IDCARD ==1">身份证</div>
          <div class="file" v-show="scope.row.FILE_1_IDCARD ==0">身份证</div>
          <div class="file finish" v-show="scope.row.FILE_2_BUSINESSLICENSE ==1">营业执照</div>
          <div class="file" v-show="scope.row.FILE_2_BUSINESSLICENSE ==0">营业执照</div>
          <div class="file finish" v-show="scope.row.FILE_3_ORGCODE == 1">组织结构</div>
          <div class="file" v-show="scope.row.FILE_3_ORGCODE == 0">组织结构</div>
          <div class="file finish" v-show="scope.row.FILE_4_GTQC == 1">纳税资格</div>
          <div class="file" v-show="scope.row.FILE_4_GTQC == 0">纳税资格</div>
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
      <el-table-column label="审核" width="60">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="large"
            style="color:blue"
            @click="handleVerify(scope.row)"
            v-show="
             (scope.row.STATE == 'BUSINESSCHECKING'&&(position == 'SALEMAN_M'||position == 'SALEMAN_S'))||
             (scope.row.STATE == 'BIILDEPCHECKING'&&position == 'BILLDEP_APPROVE')"
          >审核</el-button>
        </template>
      </el-table-column>

      <el-table-column label="协议" width="60">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="large"
            style="color:blue"
            @click="createCer(scope.row.ACCOUNT1_NAME,scope.row.CID,$event)"
            v-show=" scope.row.STATE == 'APPROVED'&& scope.row.YLCSTATE != 'SALEMANMODIFYING'&&scope.row.YLCSTATE=='SALEMANFILLING'&&(position =='SALEMAN_M'||position == 'SALEMAN_S') "
          >创建</el-button>

          <el-button
            type="text"
            size="large"
            style="color:red"
            @click="createCer2(scope.row.ACCOUNT1_NAME,scope.row.CID,$event)"
            v-show="scope.row.YLCSTATE == 'SALEMANMODIFYING'&&(position =='SALEMAN_M'||position == 'SALEMAN_S')"
          >修改</el-button>

          <el-button
            type="text"
            size="large"
            style="color:#85ca80"
            @click="queryProtocol(scope.row)"
            v-show="(scope.row.YLCSTATE == 'CUSTOMERAFFIRM'||scope.row.YLCSTATE == 'ASM_CHECKING'||scope.row.YLCSTATE == 'DEP_MARKET_CHECK'||scope.row.YLCSTATE == 'CSA_CHECK')&&(position =='SALEMAN_M'||position == 'SALEMAN_S')"
          >查看</el-button>
        </template>
      </el-table-column>
      <el-table-column label="查看" width="60">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="large"
            style="color:#85ca80"
            @click="handleQuery(scope.row)"
            v-show="position == 'MARKETCHECKER'||position == 'VSMAPPROVEXII' || position == 'BILLDEP_APPROVE'||((position =='SALEMAN_M'||position == 'SALEMAN_S')&&(scope.row.STATE == 'APPROVED'||scope.row.STATE == 'BIILDEPCHECKING'||scope.row.STATE == 'CUSTOMERPORCESSING2'))"
          >{{scope.row.abc}}查看</el-button>
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
export default {
  name: "table1",
  components: { serSearch, serPagination, xieyiblock, serVerifys, serProtocol },
  data() {
    return {
      pagesize: 10, //每页的数据条数,
      currentPage: 1, //当前页面所在
      total: 1, //总条数，created时被赋值为后台传输的总条数
      showlist: [], //showlist存放展示用数据
      showBlock: false, //创建协议书是否显示
      ccid: "", //当前行客户id
      ccName: "", //当前行客户名称
      showVerify: false, //控制是否展示审核界面
      showProtocol: false,
      showReject: false, //控制是否展示.
      showBtn: true, //隐藏已通过的确定/退回按钮
      position: this.$store.state.user.pos[0].position,
      cid: this.$store.state.user.data.loginName,
      loading: false, //控制加载遮罩
      area: [], //当前账号所管辖的地区，大区或片区

      nowarea1: "" /***从筛选子组件拿到的三个筛选条件 */,
      nowarea2: "",
      nowstatus: "",
      nowylc: ""
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
      this.ccid = row.CID;
      this.showProtocol = true;
    },
    handleQuery(row) {
      //查询资料卡
      this.$refs.verifysLeap.scrollIntoView();
      var position = this.$store.state.user.pos[0].position;

      this.ccid = row.CID;
      this.showBtn = false;
      this.showVerify = true;
    },
    rowClick(row, column) {
      //点击每一行将信息列出来
      console.log(row)
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

    changeCurrentPage(data) {
      /**改变页数 */
      this.loading = true;
      this.currentPage = data;
      this.$axios
        .post("/yulan/customerInfo/getNcustomerinfo.do", {
          page: this.currentPage,
          limit: "10",
          year: this.$store.state.year,
          find: "",
          state: this.nowstatus,
          area_1: this.nowarea1,
          area_2: this.nowarea2,
          cid: this.cid,
          position: this.position,
          ylcstate: this.nowylc
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
    /*子组件通过或退回资料卡，更新当前页*/
    updatePage() {
      this.loading = true;
      this.$axios
        .post("/yulan/customerInfo/getNcustomerinfo.do", {
          page: this.currentPage,
          limit: "10",
          year: this.$store.state.year,
          state: "",
          find: "",
          area_1: "",
          area_2: "",
          cid: this.cid,
          position: this.position,
          ylcstate: this.nowylc
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
      this.loading = true;
      this.$axios
        .post("/yulan/customerInfo/getNcustomerinfo.do", {
          page: "1",
          limit: "10",
          year: this.$store.state.year,
          state: "",
          find: ae,
          area_1: "",
          area_2: "",
          cid: this.cid,
          position: this.position,
          ylcstate: ""
        })
        .then(res => {
          this.currentPage = 1;
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
    filterStatus(ae) {
      //状态筛选功能
      this.loading = true;
      let aa = "",
        bb = "";
      if (ae != "显示全部" && ae != "SALEMANMODIFYING") aa = ae;
      if (ae == "SALEMANMODIFYING") {
        aa = "";
        bb = "SALEMANMODIFYING";
      }
      this.nowstatus = aa;
      this.nowylc = bb;
      this.$axios
        .post("/yulan/customerInfo/getNcustomerinfo.do", {
          page: "1",
          limit: "10",
          year: this.$store.state.year,
          state: this.nowstatus,
          find: "",
          area_1: this.nowarea1,
          area_2: this.nowarea2,
          cid: this.cid,
          position: this.position,
          ylcstate: this.nowylc
        })
        .then(res => {
          this.currentPage = 1;
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
      //一级地区筛选功能
      this.loading = true;
      if (ae == "显示全部") ae = "";
      this.nowarea1 = ae;
      this.nowarea2 = "";
      this.$axios
        .post("/yulan/customerInfo/getNcustomerinfo.do", {
          page: "1",
          limit: "10",
          year: this.$store.state.year,
          state: this.nowstatus,
          find: "",
          area_1: this.nowarea1,
          area_2: this.nowarea2,
          cid: this.cid,
          position: this.position,
          ylcstate: this.nowylc
        })
        .then(res => {
          this.currentPage = 1;
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
      //二级地区筛选功能
      this.loading = true;
      if (ae == "显示全部") ae = "";
      this.nowarea2 = ae;
      this.nowarea1 = "";
      this.$axios
        .post("/yulan/customerInfo/getNcustomerinfo.do", {
          page: "1",
          limit: "10",
          year: this.$store.state.year,
          state: this.nowstatus,
          find: "",
          area_1: this.nowarea1,
          area_2: this.nowarea2,
          cid: this.cid,
          position: this.position,
          ylcstate: this.nowylc
        })
        .then(res => {
          this.currentPage = 1;
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
    hiddenBlock() {
      //控制创建协议书是否显示
      this.showBlock = false;
    },
    createCer(name, id, e) {
      var evt = window.event || e;
      if (this.position == "SALEMAN_M" || this.position == "SALEMAN_S") {
        evt.stopPropagation();
        this.showBlock = true;
        this.ccid = id;
        this.ccName = name;
      } else {
        this.$alert("权限不吻合");
      }
    },
    createCer2(name, id, e) {
      var evt = window.event || e;
      if (this.position == "SALEMAN_M" || this.position == "SALEMAN_S") {
        evt.stopPropagation();
        this.showBlock = true;
        this.ccid = id;
        this.ccName = name;
        this.showReject = true;
      } else {
        this.$alert("权限不吻合");
      }
    }
  },
  mounted() {
    this.loading = true;
    console.log(this.position)
    this.$axios
      .post("/yulan/customerInfo/getNcustomerinfo.do", {
        page: "1",
        limit: "10",
        year: this.$store.state.year,
        state: "",
        find: "",
        area_1: "",
        area_2: "",
        cid: this.cid,
        position: this.position,
        ylcstate: ""
      })
      .then(res => {
        let data = res.data.data;
        if (res.data != null) {
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
.protocol {
  width: 1000px;
  widows: 655px;
  position: absolute;
  top: 33px;
  left: 55px;
  z-index: 100;
  /* border: 1px solid #86cb7e; */
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
  width: 1100px;
  overflow: hidden;
  position: absolute;
  /* top: 53px; */
  /* left: 55px; */
  top: -120px;
  /* left: -100px; */
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

  