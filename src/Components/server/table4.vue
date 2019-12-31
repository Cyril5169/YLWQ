<template>
  <div class="wrapper_inner">
    <div class="wrapper-search">
      <span class="title">年份:</span>
      <el-select v-model="str_year" class="select" @change="SelectYear">
        <el-option
          v-for="item in options"
          :key="item.CONTRACTYEAR"
          :label="item.STR_YEAR"
          :value="item.CONTRACTYEAR"
        ></el-option>
      </el-select>
    </div>
    <p class="title">
      {{str_year}}网签资料卡执行汇总
      <el-button @click="CardTotalExcel()" type="text">xls</el-button>
    </p>
    <el-table
      :data="showlist"
      stripe
      style="width: 100%"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      @row-click="rowClick"
    >
      <el-table-column label="资料卡状态" prop="STATE" :formatter="statusFormatter"></el-table-column>
      <el-table-column label="统计数" prop="QTY"></el-table-column>
    </el-table>

    <p class="title">
      {{str_year}}网签资料卡执行汇总(按大区)
      <el-button @click="CardExcel()" type="text">xls</el-button>
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
      <el-table-column label="资料卡状态" prop="STATE" :formatter="statusFormatter"></el-table-column>
      <el-table-column label="统计数" prop="QTY"></el-table-column>
    </el-table>
  </div>
</template>
<script>
import {
  SearchCardList,
  SearchCardTotal,
  CardExcel,
  GetCardYear
} from "@/api/table4ASP";
import { downLoadFile } from "@/common/js/downLoadFile";
import serSearch from "@/Components/server/ser-search";
import serPagination from "@/Components/server/ser-pagination";

export default {
  name: "table4",
  components: { serSearch, serPagination },

  data() {
    return {
      str_year: new Date().getFullYear(),
      // str_year:'2018年',
      options: [],
      showlist: [],
      loading: false, //控制加载遮罩
      loading1: false, //控制加载遮罩
      showlist2: []
    };
  },
  methods: {
    SelectYear() {
      console.log(this.str_year)
      this.ShowCard();
      this.ShowCard2();
    },

    ShowCard() {
      this.loading = true;
      var data = {
        year: this.str_year
      };
      SearchCardTotal(data).then(res => {
        this.showlist = res.data;
        this.loading = false;
      });
    },
    ShowCard2() {
      this.loading1 = true;
      var data = {
        year: this.str_year
      };
      SearchCardList(data).then(res => {
        this.showlist2 = res.data;
        this.loading1 = false;
      });
    },
    CardTotalExcel() {
      var year = this.str_year;
      downLoadFile(
        this.Global.baseUrl + `PUR_HEAD/CardTotalExcel?year=${year}`
      );
    },
    CardExcel() {
      var year = this.str_year;
      downLoadFile(this.Global.baseUrl + `PUR_HEAD/CardExcel?year=${year}`);
    },
    CardYear() {
      var data = {
        year: this.str_year
      };
      GetCardYear(data).then(res => {
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
      if (status == "CUSTOMERPORCESSING") return "客户填写中";
      if (status == "CUSTOMERPORCESSING2") return "客户修改中";
      if (status == "BUSINESSCHECKING") return "业务员审核中";
      if (status == "BIILDEPCHECKING") return "订单部审核中";
      if (status == "APPROVED") return "已通过";

      if (status == "ONCREATE") return "初始状态";
      if (status == "1234") return "测试专用";
      if (status == "" || status == null) return "未知状态";
    }
  },
  created() {
    this.CardYear();
    this.ShowCard();
    this.ShowCard2();
  }
};
</script>

<style scoped>
.title {
  text-align: center;
  font-size: 20px;
  margin-bottom: 20px;
}
.wrapper-search {
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
.title .el-button {
  font-size: 20px;
}
.wrapper-search .el-select .el-input__inner {
  height: 30px;
  width: 180px;
}
.wrapper-search .el-select .el-input__icon {
  line-height: 0px;
}
</style>