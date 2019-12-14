<template>
  <div class="table4">
    <p class="title">2019网签资料卡执行汇总</p>
    <el-table :data="showlist" stripe style="width: 100%"  @row-click="rowClick">
      <el-table-column label="资料卡状态" :formatter="statusFormatter" prop="STATE"></el-table-column>
      <el-table-column label="统计数" prop="COUNT(STATE)"></el-table-column>
    </el-table>

    <p class="title">2019网签资料卡执行汇总(按大区)</p>
    <el-table :data="showlist2" stripe style="width: 100%" height="450" @row-click="rowClick">
      <el-table-column label="大区" prop="MARKETNAME"></el-table-column>
      <el-table-column label="业务经理" prop="MARKETMANAGERNAME"></el-table-column>
      <el-table-column label="资料卡状态"  :formatter="statusFormatter" prop="STATE"></el-table-column>
      <el-table-column label="统计数" prop="COUNT(STATE)"></el-table-column>
    </el-table>

  
  </div>
</template>


<script>
import serSearch from "@/Components/server/ser-search";
import serPagination from "@/Components/server/ser-pagination";

export default {
  name: "table4",
  components: { serSearch, serPagination },
  data(){
    return{
      showlist:[],
      showlist2:[]
    }
  },
  methods:{
      rowClick(row,event,column){
        console.log(row)
      },
      statusFormatter(row, column) {  //状态格式化变成中文
      let status = row.STATE;
      if (status == "1234") return "测试专用";
      if (status == "APPROVED") return "已通过";
      if (status == "CUSTOMERPORCESSING") return "客户填写中";
      if (status == "CUSTOMERPORCESSING2") return "客户修改中";
      if (status == "BUSINESSCHECKING") return "业务员审核中";
      if (status == "ONCREATE") return "初始状态";
      if (status == "BIILDEPCHECKING") return "订单部审核中"
      if (status == "SALEMANMODIFYING") return "业务员修改中";//修改协议书
    },
  },
  created(){
     this.$axios.post("/yulan/customerInfo/getAllCustomerInfoCardState.do", {
        year: "2018",
      })
      .then(res => {
        if (res.data != null) {
          this.showlist = res.data;
          console.log(this.showlist); 
        }
      })
      .catch(function(err) {
        console.log(err);
      });
      this.$axios.post("/yulan/customerInfo/getCustomerInfoCardStateByArea.do", {
        year: "2018",
      })
      .then(res => {
        if (res.data != null) {
          this.showlist2 = res.data;
          // console.log(this.showlist); 
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
