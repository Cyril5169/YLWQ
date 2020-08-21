<template>
  <div class="wrapper_inner">
    <div class="table5-search">
      <span class="title">年份:</span>
      <el-select v-model="str_year" class="select" @change="SelectYear">
        <el-option
          v-for="item in options"
          :key="item.CYEAR"
          :label="item.STR_YEAR"
          :value="item.CYEAR"
        ></el-option>
      </el-select>
    </div>
    <p class="title">
      {{str_year}}协议网签执行汇总
      <el-button @click="BookTotalExcel()" type="text">xls</el-button>
    </p>
    <el-table
      :data="showlist"
      stripe
      style="width: 100%"
      @row-click="rowClick"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
    >
      <el-table-column label="协议状态" prop="STATE" :formatter="statusFormatter"></el-table-column>
      <el-table-column label="统计数" prop="QTY"></el-table-column>
    </el-table>

    <p class="title">
      {{str_year}}协议网签执行汇总(按大区)
      <el-button @click="BookExcel()" type="text">xls</el-button>
    </p>
    <el-table
      :data="showlist2"
      stripe
      style="width: 100%"
      height="450"
      @row-click="rowClick"
      v-loading="loading1"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
    >
      <el-table-column label="大区" prop="MARKETING_CENTER"></el-table-column>
      <el-table-column label="办事处" prop="MARKETNAME"></el-table-column>
      <el-table-column label="协议状态" prop="STATE" :formatter="statusFormatter"></el-table-column>
      <el-table-column label="统计数" prop="QTY"></el-table-column>
    </el-table>
  </div>
</template>
<script>
import {
  SearchBookList,
  SearchBookTotal,
  CardExcel,
  BookExcel,
  GetBookYear
} from "@/api/table4ASP";
import { downLoadFile } from "@/common/js/downLoadFile";
import serPagination from "@/Components/server/ser-pagination";

export default {
  name: "table4",
  components: { serPagination },

  data() {
    return {
      str_year: new Date().getFullYear(),
      // str_year:'2018年',
      options: [],
      showlist: [],
      showlist2: [],
      loading: false,
      loading1: false
    };
  },
  methods: {
    SelectYear() {
      this.ShowBook();
      this.ShowBook2();
    },
    ShowBook() {
      this.loading = true;
      var data = {
        year: this.str_year
      };
      SearchBookTotal(data).then(res => {
        this.showlist = res.data;
        this.loading = false;
      });
    },
    ShowBook2() {
      this.loading1 = true;
      var data = {
        year: this.str_year
      };
      SearchBookList(data).then(res => {
        this.showlist2 = res.data;
        this.loading1 = false;
      });
    },
    BookTotalExcel() {
      var year = this.str_year;
      downLoadFile(
        this.Global.baseUrl + `PUR_HEAD/BookTotalExcel?year=${year}`
      );
    },
    BookExcel() {
      var year = this.str_year;
      downLoadFile(this.Global.baseUrl + `PUR_HEAD/BookExcel?year=${year}`);
    },
    BookYear() {
      var data = {
        year: this.str_year
      };
      GetBookYear(data).then(res => {
        this.options = res.data;
        //  this.options.push(res.data);
        // console.log(this.options);
      });
    },
    rowClick(row, event, column) {
      // console.log(row.STATE);
    },
    statusFormatter(row, column) {
      //状态格式化变成中文
      let status = row.STATE;
      if (status == "SALEMANFILLING") return "业务员填写中";
      if (status == "SALEMANMODIFYING") return "业务员修改中";
      if (status == "CUSTOMERAFFIRM") return "客户确认中";
      if (status == "ASM_CHECKING") return "中心总经理审核中";
      if (status == "DEP_MARKET_CHECK") return "市场部审核中";
      if (status == "CSA_CHECK") return "销售副总批准中";
      if (status == "APPROVED") return "已通过";

      if (status == "ONCREATE") return "初始状态";
      if (status == "1234") return "测试专用";
      if (status == "" || status == null) return "未知状态";
    }
  },
  created() {
    this.BookYear();
    this.ShowBook();
    this.ShowBook2();
  }
};
</script>

<style scoped>
.title {
  text-align: center;
  font-size: 20px;
  margin-bottom: 20px;
}
.table5-search {
  padding: 20px;
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
.table5-search .el-select .el-input__inner {
  height: 30px;
  width: 180px;
}
.table5-search .el-select .el-input__icon {
  line-height: 0px;
}
</style>