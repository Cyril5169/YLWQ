<template>
  <div class="wrapper-search">
    <span class="title">客户:</span>
    <input style="width:120px;" type="text" v-model="searchContent" @keyup="search" />

    <span class="title">区域:</span>
    <!-- 第一级地址 -->
    <el-select
      v-model="area1"
      class="select"
      @change="filterArea1"
      v-show="this.position!='SALEMAN_S'"
    >
      <el-option v-for="item in options1" :key="item.bname" :label="item.bname" :value="item.bname"></el-option>
    </el-select>

    <!-- 第二级地址 -->
    <el-select
      v-model="area2"
      class="select"
      @change="filterArea2"
      v-show="this.position!='SALEMAN_S'"
    >
      <el-option v-for="item in options2" :key="item.sname" :label="item.sname" :value="item.sname"></el-option>
    </el-select>

    <!-- 片区经理特殊对待地址 -->
    <el-select
      v-model="area2"
      class="select"
      @change="filterArea2"
      v-show="this.position=='SALEMAN_S'"
    >
      <el-option v-for="item in options4" :key="item.sname" :label="item.sname" :value="item.sname"></el-option>
    </el-select>
    
    <span class="title" v-show="flag">资料卡状态:</span>
    <el-select v-model="status" class="select" @change="filterStatus" v-show="flag">
      <el-option v-for="item in options3" :key="item.value" :value="item.value" :label="item.label"></el-option>
    </el-select>

    <span class="title" v-show="flag">协议书状态:</span>
    <el-select v-model="xystatus" class="select" @change="filterStatus2" v-show="flag">
      <el-option v-for="item in options5" :key="item.value" :value="item.value" :label="item.label"></el-option>
    </el-select>
    
    <span class="title">年份:</span>
    <el-select v-model="selYear" style="width:100px;" @change="filterYear">
      <el-option v-for="item in 83" :key="item+2017" :value="item+2017" :label="item+2017"></el-option>
    </el-select>
  </div>
</template>

<script>
var timer;
export default {
  props: {
    flag: {
      type: Boolean,
      default: true
    }, //判断是否出现状态筛选框
    list: Array, //接受父组件传过来的showlist
    area: Array,
  },
  data() {
    return {
      searchlist: [], //datalist用数组
      searchContent: "", //客户查询框的结果值
      options1: [],
      options4: [], //专门给片区经理地区显示
      options3: [
        //状态选择栏
        { value: "显示全部", label: "显示全部" },
        { value: "ONCREATE", label: "初始状态" },
        { value: "CUSTOMERPORCESSING", label: "客户填写中" },
        { value: "CUSTOMERPORCESSING2", label: "客户修改中" },
        { value: "BUSINESSCHECKING", label: "业务员审核中" },
        { value: "BIILDEPCHECKING", label: "订单部审核中" },
        { value: "APPROVED", label: "已通过" }
      ],
      options5: [
        //状态选择栏
        { value: "显示全部", label: "显示全部" },
        { value: "ONCREATE", label: "初始状态" },
        { value: "SALEMANFILLING", label: "业务员填写中" },
        { value: "SALEMANMODIFYING", label: "业务员修改中" },
        { value: "CUSTOMERAFFIRM", label: "客户确认中" },
        { value: "ASM_CHECKING", label: "中心总经理审核中" },
        { value: "DEP_MARKET_CHECK", label: "市场部审核中" },
        { value: "CSA_CHECK", label: "销售副总批准中" },
        { value: "APPROVED", label: "已通过" }
      ],
      status: "显示全部", //三个v-model的值
      xystatus: "显示全部",
      area1: "显示全部", //
      area2: "显示全部", //
      position: this.$store.state.user.pos[0].position,
      selYear: this.$store.state.year,
    };
  },
  computed: {
    options2() {
      //第二级地址
      for (var i = 0; i < this.options1.length; i++) {
        if (this.area1 == this.options1[i].bname) {
          this.area2 = "显示全部";
          let arr = [
            {
              sname: "显示全部",
            },
          ];
          return arr.concat(this.options1[i].Sarea);
        }
      }
    },
  },
  methods: {
    handleInput(e) {
      // 搜索datalist数组
      var v = e.target.bname,
        self = this;
      self.searchlist = [];
      if (v) {
        var ss = []; //临时数组

        this.list.forEach(function (item) {
          if (item.CID.indexOf(v) > -1) {
            // 检测客户customerId
            if (self.searchlist.indexOf(item.CID) == -1) {
              self.searchlist.push(item.CID);
            }
            ss.push(item);
          } else if (item.ACCOUNT1_NAME.indexOf(v) > -1) {
            // 检测客户名ACCOUNT1_NAME
            if (self.searchlist.indexOf(item.ACCOUNT1_NAME) == -1) {
              self.searchlist.push(item.ACCOUNT1_NAME);
            }
            ss.push(item);
          }
        });
      }
    },
    search(e) {
      if (
        e.keyCode != 20 &&
        e.keyCode != 16 &&
        e.keyCode != 17 &&
        e.keyCode != 18
      ) {
        this.debounce(function () {
          this.$emit("search", this.searchContent);
        }, 300);
      }
    },
    //去抖动函数
    debounce(fn, delay) {
      // 保存函数调用时的上下文和参数，传递给 fn
      var context = this;
      var args = arguments;

      // 每次这个返回的函数被调用，就清除定时器，以保证不执行 fn
      clearTimeout(timer);

      // 当返回的函数被最后一次调用后（也就是用户停止了某个连续的操作），
      // 再过 delay 毫秒就执行 fn
      timer = setTimeout(function () {
        fn.apply(context, args);
      }, delay);
    },
    filterStatus() {
      this.$emit("filterStatus", this.status);
    },
    filterStatus2() {
      this.$emit("filterStatus2", this.xystatus);
    },
    filterArea1() {
      this.$emit("filterArea1", this.area1);
    },
    filterArea2() {
      this.$emit("filterArea2", this.area2);
    },
    filterYear() {
      this.$emit("filterYear", this.selYear);
    },
  },
  watch: {
    area(newV) {
      if (this.position != "SALEMAN_S") {
        let arr = [
          {
            bname: "显示全部",
            bid: "0",
            Sarea: [],
          },
        ];
        let newnewV = arr.concat(newV);
        this.options1 = newnewV;
      } else {
        this.options4 = newV;
      }
    },
  },
};
</script>

<style scoped>
.wrapper-search {
  padding: 20px;
}
.title {
  font-size: 16px;
  padding-right: 0px;
  margin-left: 5px;
}
.search {
  cursor: pointer;
  width: 60px;
  height: 30px;
  display: inline-block;
  text-align: center;
  line-height: 30px;
  font-size: 16px;
  background-image: linear-gradient(74deg, #a7d64b 1%, #82c985 100%),
    linear-gradient(#a5d050, #a5d050);
  color: white;
  border-radius: 5px;
  margin: 0 10px;
  vertical-align: -3px;
  user-select: none;
}
#status {
  margin-left: 10px;
}
input[type="text"] {
  width: 180px;
  height: 30px;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  box-sizing: border-box;
  padding-left: 10px;
}
.select {
  height: 30px;
  width: 120px;
}
</style>

<style>
.wrapper-search .el-select .el-input__inner {
  height: 30px;
}
.wrapper-search .el-select .el-input__icon {
  line-height: 0px;
}
</style>