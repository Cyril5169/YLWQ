<template>
  <div class="pagination">
    <div
      class="pagination-button"
      @click='to_firstpage'
    >首页</div>
    <div
      class="pagination-button prev"
      @click='to_prev'
    >上一页</div>
    <div class="number">{{currentPage}}</div>
    <div
      class="pagination-button next"
      @click="to_next"
    >下一页</div>
    <div
      class="pagination-button"
      @click='to_lastpage'
    >尾页</div>
    <div class="number">记录数:{{total}}</div>
    <div class="number">页数:{{totalPage}}</div>
  </div>
</template>


<script>
export default {
  props: {
    currentPage: Number,
    total: Number,
    totalPage: Number
  },
  methods: {
    to_firstpage() {
      this.$emit("bridge1", 1);
    },
    to_lastpage() {
      this.$emit("bridge2", this.totalPage);
    },
    to_prev() {
      if (this.currentPage != 1) {
        this.$emit("bridge3", this.currentPage - 1);
      } else {
        // this.$message({
        //   message: "当前已经是第一页了",
        //   type: "warning",
        //   duration: 500
        // });
        this.$alert('当前已经是第一页了')
      }
    },
    to_next() {
      if (this.currentPage != this.totalPage) {
        this.$emit("bridge4", this.currentPage + 1);
      } else {
        // this.$message({
        //   message: "当前已经是最后一页了",
        //   type: "warning",
        //   duration: 500
        // });
         this.$alert('当前已经是最后一页了')
      }
    }
  }
};
</script>



<style scoped>
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
  font-size: 16px;
  user-select: none;
}
.number {
  padding: 3px;
}
.next,
.prev {
  width: 66px;
}
</style>
