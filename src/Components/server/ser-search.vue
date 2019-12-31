<template>
  <div class="wrapper-search">
    <span class="title">客户:</span>
    <input style="width:130px;" type="text" list="cars" v-model="searchContent" @keyup="search" />
    <!-- <div class="search" @click="search">查询</div> -->

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
    <!--  -->
    <span class="title" id="status" v-show="flag">状态:</span>
    <el-select v-model="status" class="select" @change="filterStatus" v-show="flag">
      <el-option v-for="item in options3" :key="item.value" :value="item.value" :label="item.label"></el-option>
    </el-select>
    <span class="title" id="status">年份:</span>
    <el-select v-model="selYear" @change="filterYear">
      <el-option v-for="item in 83" :key="item+2017" :value="item+2017" :label="item+2017"></el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  props: {
    flag: Boolean, //判断是否出现状态筛选框
    list: Array, //接受父组件传过来的showlist
    area: Array
  },
  data() {
    return {
      searchlist: [], //datalist用数组
      searchContent: "", //客户查询框的结果值
      options1: [
        //二级联动的地址
        {
          bname: "显示全部",
          Sarea: [{ sname: "显示全部" }]
        },
        {
          bname: "北京办事处",
          Sarea: [
            { sname: "显示全部" },
            { sname: "河北省" },
            { sname: "北京市" },
            { sname: "天津市" }
          ]
        },
        {
          bname: "太原办事处",
          Sarea: [
            { sname: "显示全部" },
            { sname: "山西省" },
            { sname: "内蒙古自治区" },
            { sname: "粤北" }
          ]
        },
        {
          bname: "上海办事处",
          Sarea: [{ sname: "显示全部" }, { sname: "上海市" }, { sname: "苏南" }]
        },
        {
          bname: "南京办事处",
          Sarea: [
            { sname: "显示全部" },
            { sname: "江苏省" },
            { sname: "安徽省" },
            { sname: "苏南" },
            { sname: "江苏其他" }
          ]
        },
        {
          bname: "杭州办事处",
          Sarea: [{ sname: "显示全部" }, { sname: "浙江省" }, { sname: "浙南" }]
        },
        {
          bname: "广州办事处",
          Sarea: [
            { sname: "显示全部" },
            { sname: "广东省" },
            { sname: "粤北" },
            { sname: "粤西" }
          ]
        },
        {
          bname: "南宁办事处",
          Sarea: [
            { sname: "显示全部" },
            { sname: "广西省(桂柳邕)" },
            { sname: "海南省" },
            { sname: "广西其他" }
          ]
        },
        {
          bname: "成都办事处",
          Sarea: [
            { sname: "显示全部" },
            { sname: "四川省" },
            { sname: "云南省" },
            { sname: "西藏自治区" },
            { sname: "川南" },
            { sname: "川北" },
            { sname: "成都市" }
          ]
        },
        {
          bname: "重庆办事处",
          Sarea: [
            { sname: "显示全部" },
            { sname: "贵州省" },
            { sname: "重庆市" }
          ]
        },
        {
          bname: "郑州办事处",
          Sarea: [{ sname: "显示全部" }, { sname: "河南省" }, { sname: "豫南" }]
        },
        {
          bname: "济南办事处",
          Sarea: [
            { sname: "显示全部" },
            { sname: "山东省" },
            { sname: "鲁西南" }
          ]
        },
        {
          bname: "沈阳办事处",
          Sarea: [
            { sname: "显示全部" },
            { sname: "辽宁省" },
            { sname: "辽西南" }
          ]
        },
        {
          bname: "长春办事处",
          Sarea: [
            { sname: "显示全部" },
            { sname: "吉林省" },
            { sname: "黑龙江省" }
          ]
        },
        {
          bname: "兰州办事处",
          Sarea: [
            { sname: "显示全部" },
            { sname: "甘肃省" },
            { sname: "宁夏自治区" },
            { sname: "青海省" }
          ]
        },
        {
          bname: "西安办事处",
          Sarea: [
            { sname: "显示全部" },
            { sname: "陕西省" },
            { sname: "新疆维吾尔自治区" },
            { sname: "陕南" }
          ]
        },
        {
          bname: "长沙办事处" /*官网连着三个有问题*/,
          Sarea: [
            { sname: "显示全部" },
            { sname: "湖南省" },
            { sname: "湘中南" }
          ]
        },
        {
          bname: "武汉办事处" /*官网连着三个有问题*/,
          Sarea: [
            { sname: "显示全部" },
            { sname: "湖北省" },
            { sname: "湖南省" },
            { sname: "鄂西" }
          ]
        },
        {
          bname: "福州办事处",
          Sarea: [
            { sname: "显示全部" },
            { sname: "福建省" },
            { sname: "江西省" }
          ]
        },
        {
          bname: "南昌办事处",
          Sarea: [{ sname: "显示全部" }, { sname: "江西省" }]
        },
        {
          bname: "石家庄办事处",
          Sarea: [{ bname: "显示全部" }, { bname: "河北省" }]
        },
        {
          bname: "呼和浩特办事处",
          Sarea: [{ sname: "显示全部" }, { sname: "内蒙古自治区" }]
        },
        {
          bname: "合肥办事处",
          Sarea: [{ sname: "显示全部" }, { sname: "安徽省" }]
        },
        {
          bname: "昆明办事处",
          Sarea: [{ sname: "显示全部" }, { sname: "云南省" }]
        },
        {
          bname: "贵阳办事处",
          Sarea: [{ sname: "显示全部" }, { sname: "贵州省" }]
        }
      ],
      options4: [], //专门给片区经理地区显示
      options3: [
        //状态选择栏
        { value: "显示全部", label: "显示全部" },
        { value: "ONCREATE", label: "初始状态" },
        { value: "CUSTOMERPORCESSING", label: "客户填写中" },
        { value: "CUSTOMERPORCESSING2", label: "客户修改中" },
        { value: "BUSINESSCHECKING", label: "业务员审核中" },
        { value: "BIILDEPCHECKING", label: "订单部审核中" },
        { value: "APPROVED", label: "已通过" },
        { value: "SALEMANMODIFYING", label: "待修改协议书" }
      ],
      status: "显示全部", //三个v-model的值
      area1: "显示全部", //
      area2: "显示全部", //
      position: this.$store.state.user.pos[0].position,
      selYear: this.$store.state.year
    };
  },
  computed: {
    options2() {
      //第二级地址
      for (var i = 0; i < this.options1.length; i++) {
        if (this.area1 == this.options1[i].bname) {
          this.area2 = "显示全部";
          return this.options1[i].Sarea;
        }
      }
    }
  },
  methods: {
    handleInput(e) {
      // 搜索datalist数组
      var v = e.target.bname,
        self = this;
      self.searchlist = [];
      if (v) {
        var ss = []; //临时数组

        this.list.forEach(function(item) {
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
    search() {
      this.$emit("search", this.searchContent);
    },
    filterStatus() {
      this.$emit("filterStatus", this.status);
    },
    filterArea1() {
      this.$emit("filterArea1", this.area1);
    },
    filterArea2() {
      this.$emit("filterArea2", this.area2);
    },
    filterYear() {
      this.$emit("filterYear", this.selYear);
    }
  },
  watch: {
    area(newV) {
      if (this.position != "SALEMAN_S") {
        let arr = [
          {
            bname: "显示全部",
            bid: "0",
            Sarea: [{ sname: "显示全部" }]
          }
        ];
        let newnewV = arr.concat(newV);
        this.options1 = newnewV;
      } else {
        this.options4 = newV;
      }
    }
  }
};
</script>


<style scoped>
.wrapper-search {
  padding: 20px;
}
.title {
  font-size: 16px;
  padding-right: 15px;
  margin-left: 10px;
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
</style>

<style>
.wrapper-search .el-select .el-input__inner {
  height: 30px;
  width: 150px;
}
.wrapper-search .el-select .el-input__icon {
  line-height: 0px;
}
</style>